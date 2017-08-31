---
title: Rx와 함께 춤을
date: 2017-08-31 10:00:39
tags:
    - Rx
---
# 들어가며
저는 중학교때 안드로이드 개발을 하며 프로그래밍을 시작했습니다. 고등학교때 프로그래밍을 잊고 지내다 다시 컴퓨터 전공을 선택하며 공부하고 있습니다.
오랜만에 안드로이드 개발을 공부하니 매우 많은것이 추가 되었고 새로운 이야기도 많이 보였습니다. 이 중 눈에 띄는 것이 있었습니다. Rx입니다.
이전에 많은 프로그래머들이 추천한 MVP 패턴을 도입하고 매우 만족스러웠던 경험이 있기에, Rx또한 매우 높은 기대를 가지고 도입해 봤습니다.

그렇지만 MVP와는 달리 개념와 장점을 이해하는데 어려움을 겪었습니다.

이 글은 제가 이해한 Rx를 설명할 것입니다. 오개념이 있다면 언제든 알려주시면 감사하겠습니다.
그리고 이 글이 다른 분들에게 도움이 되었으면 좋겠습니다.

# 혼란스로운 용어들
Rx를 배울때 자주 보게 되는 다이어그램이 있습니다.
마블 다이어그램이라고도 불리는 Rx Operator 동작 모습을 표현한 다이어그램입니다.
{% asset_img schedulers.png Rx %}
이 그림을 보면 생각나는 말이 하나 있습니다.
> 이건 사실 진짜 멋지다… 하지만 위의 다이어그램만 보고는 그렇게 말하긴 아마 좀 힘들것이다.
Flux를 이해하고 나서는, 위의 다이어그램은 아주 쉽게 이해된다. 하지만 만약 Flux에 대해서 완전히 모르는 상태에서 본다면 Flux를 이해하는데 그닥 도움이 되진 않을 것이다.. 하지만 사실 그것이 다이어그램의 목적이다. 세부적인 것들을 제대로 알기 전에 시스템의 전반적인 큰 그림을 보여주는 것이다. - 
[Lin Clark](https://code-cartoons.com/a-cartoon-guide-to-flux-6157355ab207) [번역](http://bestalign.github.io/2015/10/06/cartoon-guide-to-flux/)

Lin Clark의 글에서 따온 내용입니다, 여기서 Flux를 Rx로 바꿔도 여전히 성립할 것 입니다.
Rx를 이해하기 위해선 우선 용어와 용법을 정리할 필요가 있습니다.

반응형 확장, 선언형 프로그래밍, 구독과 해지, Observable을 생성하거나 구독해야한다, 데이터의 흐름에 탑승하거나 만들어야 한다 등등등 많은 용어가 등장합니다.

저는 Rx의 두 가지 핵심 키워드를 *선언형*과 *반응형*이라고 생각합니다.

## 선언형 프로그래밍
> Your Mouse is a Database - [Erik Meijer](http://queue.acm.org/detail.cfm?id=2169076)

Rx를 소개하는 글을 보면 *선언형 프로그래밍*이란 말을 들을 수 있습니다.
선언형 프로그래밍이라니? 무엇을 말하는 걸까요? 
[위키백과](https://ko.wikipedia.org/wiki/%EC%84%A0%EC%96%B8%ED%98%95_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)의 정의를 한번 보죠.

> 프로그램이 *어떤 방법*으로 해야 하는지를 나타내기보다 *무엇과 같은지*를 설명하는 경우에 *선언형*이라고 한다.

선언형 프로그램의 대표적인 예는 SQL입니다. 다음 구문은 가격이 10000원과 *같은* 책들의 모임 입니다.
```sql
SELECT * FROM Book WHERE amount=10000;
```
ORM으로는 다음처럼 표현 할 수 있습니다.
```python
from book.model import Book
books = Book.objects.filter(amount=10000)
```
여기서 `books`는 가격이 1000원인 책과 같으며, *선언하여* 가져왔을 뿐 어떤 일을 맡기진 않았습니다.
나머지는 저 `books`를 가지고 어떤일을 할지 *명령하여* 실행하는 일입니다.

위처럼 선언형 프로그래밍은 *무엇과 같은지*를 설명하는 것이고,
*명령형 프로그래밍*은 저 `books`를 가지고 *무엇을 할지* 시스템에 명령하고 행동합니다.

Rx에도 선언형 프로그래밍이 있습니다. 다음 코드는 가격이 10000원이 책과 같은 Observable의 모음 입니다.
```js
const source = Rx.Observable.from(
  [
    {title: 'About Rx', amout: 10000},
    {title: 'Hello World', amount: 5000}
  ]
);
const books = source.filter(book => book.amount === 10000);
```
위에 ORM 코드와 매우 유사하죠? 다만 Rx는 ORM이 아니므로 DB와 같은 데이터 Source가 따로 있지 않습니다.
그러니 가져올 데이터를 *프로그래머들이 정의해 줘야 합니다*.

그럼 어떤게 데이터 Source가 될 수 있을까요? 위에 제가 인용한 문장을 다시 언급하죠 `여러분의 마우스는 데이터베이스 입니다`.
위의 JavaScript Map 뿐만 아니라, 사용자의 클릭, 현재 시간 등등 *모든 것을 데이터 Source로 만들 수 있습니다*.
만드는 방법은 차근차근 언급하겠습니다.

Rx 다이어 그램에서 보았던 많은 operator들의 대부분이 데이터를 걸러내고, 조건을 만드는 선언형 프로그래밍을 위한 도우미 입니다.

단순한 선언형 프로그래밍 이기만 한다면 Rx에 프로그래머들이 열광하지 않겠죠, Rx는 또 다른 특징을 가지고 있습니다.
ORM은 선언의 결과로 특별한 일을 하지 않는 단순한 데이터를 전달해 준다면, Rx는 다른 함수나 프로그램이 *구독*할 수 있는 `Observable`을 전달합니다.

## 반응형 프로그래밍

그런데 제 혼란은 이 반응형 프로그래밍에서 왔습니다.
# 데이터 흐름과 생명 주기
```kotlin
val busArriveRequest: BusArriveRequest = Retrofit.Builder()
            .baseUrl("some url")
            .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create<BusArriveRequest>(BusArriveRequest::class.java)
```
```kotlin
busArriveRequest.getBusArriveInfo(busStopID)
                .subscribeOn(Schedulers.io())
                .observeOnAndroidSchedulers.mainThread()).subscribe(
                {
                    // On Next
                    busArriveInfoList ->
                        if (busArriveInfoList.list.isEmpty()) {
                            view.onEmpty()
                        } else {
                            view.setRecyclerView(busArriveInfoList.list)
                        }
                },
                {
                    // On Error
                })
```