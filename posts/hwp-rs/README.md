---
title: 'hwp-rs와 libhwp를 공개합니다'
date: 2022-10-09T00:23:59+09:00
thumbnail: ./hwp-rs.png
summary: 나랏말싸미 문서에 달아 문자와로 서르 사맛디 아니할쎄
category: tech
---
> 나랏말싸미 [문서에 달아](https://ko.wikipedia.org/wiki/%EC%9D%B8%EA%B0%84%EC%9D%B4_%EC%9D%BD%EC%9D%84_%EC%88%98_%EC%9E%88%EB%8A%94_%EB%A7%A4%EC%B2%B4) 문자와로 서르 사맛디 아니할쎄
>
> 이런 젼차로 개발자가 니르고져 홀빼이셔도
>
> 마참내 제 뜨들 시러펴디 몯할 노미 하니라
>
> 내 이랄 위하야 새로 꾸러미랄 맹가노니
>
> 사람마다 수비니겨 날로 쑤메 뼌한킈 하고저 할 따라미니라

제 이름은 순 우리말 '한' 입니다. '한글'의 '한'과 같은 '크다, 바르다'라는 의미를 가지고 있습니다. 그래서인지 이전부터 아래아한글 포멧에 관심이 많았습니다.

아래아 한글을 분석하려는 노력은 곧 [CFB](https://ko.wikipedia.org/wiki/%EB%B3%B5%ED%95%A9_%ED%8C%8C%EC%9D%BC_%EC%9D%B4%EC%A7%84_%ED%98%95%EC%8B%9D)파일 분석에서 막혔고, 그 후로 오랫동안 잊고 있었습니다.
[js-cfb](https://github.com/SheetJS/js-cfb) 라이브러리를 발견한 후 곧바로 아래아 한글이 생각났습니다. 마침 그 시기에 한글파일을 읽을 일도 많이 생겨 개인적인 필요성도 생겼습니다. 그렇게 [hwp.js](https://github.com/hahnlee/hwp.js)가 탄생했고 만족스러웠습니다.

hwp.js 이후 한글 파일을 읽을 일이 줄어든데다, hwpx 포멧이 기본확장자로 바뀐 덕에 아래아 한글에 대한 관심이 빠르게 식었습니다.

이번 학기 저는 "AI와 스토리텔링"이라는 수업을 듣게 되었는데, 이 수업을 들으며 한국어 자료의 부족함을 생각하게 되었습니다. 한국어의 많은 문서자료는 기계와 인간이 읽기 어려운 포멧으로 남아있습니다. 조금은 긍정적으로 아래아한글은 기계와 인간이 읽을 수 있는 hwpx 포멧을 기본 포멧으로 변경하였으나, 이전까지 만들어진 자료는 여전히 hwp 포멧으로 남아있습니다.

이런 문제를 해결하기 위해 만든 [hwp-rs](https://github.com/hahnlee/hwp-rs)와 libhwp를 공개합니다.

# hwp-rs
hwp-rs는 낮은 수준의 hwp 파서 입니다. hwp의 완전한 해독과, hwp파일에 최대한 가까운 구조를 유지하려고 합니다.

hwp.js를 만들때 저는 렌더링에 필요하지 않은 많은 정보를 건너 뛰었습니다. 또한 hwp 파일에 대한 많은 정보를 몰랐기 때문에, 비 순차적인 파싱이 이루어졌습니다.
예를 들면 아래처럼요.
```js
visit(reader: RecordReader, paragraph: Paragraph, control?: Control) {
  const record = reader.read()

  switch (record.tagID) {
    case SectionTagID.HWPTAG_LIST_HEADER: {
      this.visitListHeader(record, reader, control)
      break
    }

    case SectionTagID.HWPTAG_PAGE_DEF: {
      this.visitPageDef(record)
      break
    }
  }
  // ...
}
```
언제 `HWPTAG_LIST_HEADER`를 만날지 모르니 switch case문을 만나고 `HWPTAG_LIST_HEADER`를 만났을때 파싱하여 결과를 집어 넣었죠. hwp-rs는 다릅니다.

```rs
let mut line_segments = Vec::new();
if header.aligns > 0 {
    assert!(
        record.is_next_child_id(BodyTextRecord::HWPTAG_PARA_LINE_SEG as u32),
        "잘못된 레코드 입니다"
    );
    let child = record.next_child();
    let mut reader = child.get_data_reader();
    for _ in 0..header.aligns {
        let line_segment = LineSegment::from_reader(&mut reader);
        line_segments.push(line_segment);
    }
}
```
hwp-rs는 표준문서 정의된 순서대로 다음 레코드를 파싱합니다. 한글 문서에 대한 더 많은 이해도가 있으며, hwp.js에 비해서도 더 많은 내용을 파싱합니다.

# libhwp
libhwp는 러스트로 작성된 높은 수준의 파이썬 라이브러리 입니다. `pip install libhwp`로 설치할 수 있으며 한글 문서의 정보를 추출 할 수 있습니다.
```python
from libhwp import HWPReader

hwp = HWPReader('<파일 경로>')

# 모든 문단 출력 (표, 캡션 포함)
for paragraph in hwp.find_all('paragraph'):
    print(paragraph)

# 표 내용 출력 (표 안의 표 포함)
for table in hwp.find_all('table'):
    for cell in table.cells:
        for paragraph in cell.paragraphs:
            print(paragraph)

# 표 내용 출력 (표 안의 표 무시)
for table in hwp.find_all('table', recursive=False):
    for cell in table.cells:
        for paragraph in cell.paragraphs:
            print(paragraph)

# 표 안의 표 내용 출력 방법 2
for table in hwp.find_all('table'):
    for cell in table.cells:
        for paragraph in cell.paragraphs:
            print(paragraph)

            # paragraph에서도 recursive 하게 찾을 수 있다
            for p in paragraph.find_all('paragraph'):
                print(p)

# 수식 내용 출력
for equation in hwp.find_all('equation'):
    print(equation.script)  # eg. f(x)= logx+sinx

# 문서에 사용된 파일 저장
for file in hwp.bin_data:
    with open(file.name, 'wb') as f:
        f.write(file.data)
```
아쉽게도, 아직 hwp-rs에 비해 많은 내용을 파싱하진 못합니다. 또한 어떤 API가 필요한지 많은 고민이 있습니다. [피드백을 주시면](https://github.com/hahnlee/hwp-rs/discussions) 좋은 라이브러리를 만드는데 도움 될 것 같습니다.

# 🦀 = ❤
hwp-rs는 rust로 작성되었습니다. 러스트로 작성한 이유는 첫번째는 제가 러스트를 좋아하기 때문이며, 두번째는 이식성 때문입니다. 러스트는 napi-rs](https://napi.rs/), [wasm-bindgen](https://github.com/rustwasm/wasm-bindgen), [cbindgen](https://github.com/eqrion/cbindgen), [pyo3](https://pyo3.rs/)등 다양한 바인딩 라이브러리가 있습니다.

실제로 libhwp는 pyo3를 이용해 파이썬 바인딩을 만들었습니다. 다만 현 버전은 바인딩을 위한 코드를 다시 만드는것에 가깝기 때문에, 효율적으로 작성하는 방법을 찾아야합니다.
이 점도 많은 고수들의 관심과 도움을 부탁드립니다.

여러 바인딩중 napi-rs에 대해 더 알고 싶다면 [제 블로그 글](https://blog.hanlee.io/2022/napi-rs)도 참고해보세요 😉.

# 남은 과제.
hwp-rs는 많은 내용을 파싱하지만 아직 남은 과제도 있습니다. 먼저 좋은 리더 API를 찾아야합니다.

아래아한글은 pdf와 달리 명시적인 페이지 구별이 없습니다.[^1] 이로 인해 가장 많은 수요가 있을 것으로 생각하는 "특정페이지에 특정문단 추출" 기능을 구현하는 점이 괭장히 어렵습니다.
페이지 커서 구현은 필요한 기능으로 생각해 이를 구현하기 위해 내부 구조가 크게 바뀔 수 있습니다.

또한 wasm 지원을 계획하고 있습니다. 따라서 OS의존적인 변경은 거부될 수 있습니다.

hwpx는 고려하고 있지만, 아직 계획에는 없습니다. 앞서 설명 드린것처럼 hwpx 포멧은 훨씬 더 쉽게 텍스트 추출이 가능하기 때문입니다.
하지만 이 또한 결국에는 지원해야한다고 생각합니다.

hwp 쓰기, 수정 기능은 계획하고 있지 않습니다. 이전과 달리 hwp포멧에 대한 이해도가 올라갔으며 수요도 공감하고 있기 때문에 언젠가는 도전해 볼 수도 있을 것 같습니다. 하지만 지금은 아닙니다.

hwp-rs와 libhwp가 한글 파일 해석에 도움이 되길 바라며, 여러분이 만들 멋진 것들을 기대하고 있겠습니다.

제 576돌 한글날.

이한 올림.

[^1]: 이점은 doc, docx 포멧도 마찬가지 입니다.
