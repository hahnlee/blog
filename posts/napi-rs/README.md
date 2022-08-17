---
title: Node.js와 Rust의 우아한 결합 napi-rs
date: 2022-08-16T10:00:00+09:00
thumbnail: ./thumbnail.png
summary: 어쩌면 가장 멋진 만남
category: tech
---
import YoutubePlayer from '@components/YoutubePlayer'

[napi-rs](https://github.com/napi-rs/napi-rs)는 Node API를 이용해 러스트로 작성된 코드를 노드에서 사용할 수 있도록 해주는 멋진 라이브러리 입니다.

# 노드 애드온
노드에서 네이티브 확장 기능은 [노드 애드온](https://nodejs.org/api/addons.html)이라고 합니다.
노드 애드온은 `.node` 확장자를 가진 동적 라이브러리 입니다. 윈도우에서는 dll, 맥에서는 dylib, 리눅스에서는 so와 동일합니다.

노드의 `require` 함수는 `.node`확장자를 만나면 동적 라이브러리로 판단하고 초기화 합니다. 개발자는 노드와 상호작용할 수 있는 코드를 만들고 이를 `.node`확장자를 가진 동적 라이브러리로 만들면 네이티브 기능을 노드와 연동할 수 있습니다.

# 노드 애드온의 간단한 역사
노드의 애드온 개발은 험난한 역사를 가지고 있어 노드와 상호작용 하는 방법이 여러가지가 있습니다. 왜 Node API가 나왔고, 우리는 Node API를 사용해야 하는지 알아봅시다.

## V8
초기 노드 애드온은 V8의 헤더를 직접 사용하여 작성되었습니다.
그런데 V8의 API는 V8에 버전에 따라서 너무나 빠르고 다양하게 변경되었습니다. 이런 이유로 노드 애드온을 유지 보수하는 일은 쉬운일이 아니었습니다.

## NAN
> 아래의 코드는 [napi-rs](https://napi.rs/docs/deep-dive/history) 문서에서 가져왔습니다.

위와 같은 문제를 해결하기 위해 노드 0.8버전부터 [NAN](https://github.com/nodejs/nan)이 만들어졌습니다. NAN은 Native Abstractions for Node.js의 약자로, V8 API를 추상화하여 서로 다른 V8엔진이더라도 **코드의 수정없이** 사용할 수 있도록 제공하였습니다.

NAN은 C++의 매크로와 템플릿을 이용하여 컴파일에 서로 다른 코드로 변경 합니다.

예를들어 아래의 코드는
```cpp
NAN_METHOD(Echo)
{
}
```

버전에 따라 컴파일 타임에 서로 다른 코드로 변경되었습니다.

```cpp
Handle<Value> Echo(const Arguments& args);    // 0.10.x
void Echo(FunctionCallbackInfo<Value>& args); // 6.x
```

이렇게 NAN을 이용하면 버전별로 **다른 코드**를 자동으로 만들어, V8의 API가 변해도 NAN의 버전만 올리면 코드의 수정없이 새로운 V8엔진에 대응할 수 있었습니다.
NAN은 널리 사용되었으며, 지금도 노드의 네이티브 지원에 대해 검색해보면 많은 튜토리얼이 노출되고 있습니다.

그런데 NAN도 문제가 있습니다. 코드는 호환되지만, 컴파일한 결과물은 서로 다릅니다. V8의 버전이 달라지면 이전 버전에서 컴파일한 노드 애드온은 새 버전에서 작동하지 않습니다. 새 버전에서 작동하려면 다시 컴파일을 해야했습니다.
**즉, 서로 다른 노드 버전간 코드는 호환되지만 결과물은 호환되지 않습니다.**

이와 같은 이유로 노드 8버전 이전에 node-sass 같은 라이브러리를 사용했다면, 노드의 버전이 올라갔을때 새로운 버전을 받거나, `npm rebuild` 명령어로 라이브러리를 다시 빌드해야지만 사용할 수 있었습니다.

## Node API (N-API)
이런 문제를 해결하기 위해 [N-API](https://nodejs.org/api/n-api.html)가 탄생하였습니다. N-API는 노드 버전 8부터 도입되었으며, 현재는 Node API로 이름이 변경 되었습니다. (이와 같은 이유로 Node API보다는 N-API로 검색하면 더 다양한 자료를 찾을 수 있습니다.)

Node API의 가장 큰 특징은 NAN과 다르게 [ABI](https://ko.wikipedia.org/wiki/응용_프로그램_이진_인터페이스) 호환성을 가진다는 점입니다. Node API로 작성된 노드 애드온은 재 컴파일을 하지 않아도, 서로 다른 버전의 노드에서 문제 없이 사용할 수 있습니다.

Node API가 가지는 또 다른 장점은, V8의 API들과 독립적인 점 입니다.

V8은 C++로 작성되어 있어, 여러 C++ 클래스를 직접 사용해야하여 NAN은 C++를 사용해야했습니다. Node API는 C로 개발할 수 있도록 작성되었으며, 덕분에 다양한 언어에서 호환성이 높아졌습니다. (일반적으로 C언어에 호환되는 FFI를 만드는것이 더 쉽습니다.)

또다른 장점은 다른 JS 엔진을 사용해도 네이티브 기능을 사용하는 라이브러리를 호환 시킬 수 있습니다.
실제로 최근 주목받았던 새로운 JS런타임 [bun](https://github.com/oven-sh/bun)은 자바스크립트 엔진으로 WebKit의 JavaScriptCore를 사용하지만 [Node API를 구현하여](https://github.com/oven-sh/bun#node-api-napi) 노드 애드온도 호환 됩니다.

이런 이유로 현 시점에서 노드의 네이티브 확장을 위해서는 Node API를 사용하는것이 가장 좋습니다.

그렇다면 napi-rs는 어떻게 러스트와 Node API를 이어줄까요?

# 우아한 API
> 이 문단의 많은 코드는 napi-rs 문서에서 가져왔습니다.

napi-rs의 API는 러스트와 노드를 한 몸처럼 이어 줍니다. 예를 들어 두 숫자를 더하는 러스트 함수를 노드에서 사용하도록 만들어봅시다. 우선 러스트 함수는 아래와 같을 겁니다.

```rust
fn add_numbers(n: u32, m: u32) -> u32 {
  return n + m;
}
```

이제 napi-rs를 사용해 노드에서 사용할 수 있게 바꿔봅니다.

```rust{3}
use napi::bindgen_prelude::*;

#[napi]
fn add_numbers(n: u32, m: u32) -> u32 {
  return n + m;
}
```
`#[napi]` 매크로만 추가한다면 아주 간단히 노드에서 사용할 수 있는 코드로 변경됩니다!

위 코드는 노드에서 아래 처럼 사용할 수 있습니다.
```ts
import { addNumbers } from './output.node'

// out: 3
console.log(addNumbers(1, 2))
```
특별한 지정이 없다면 napi-rs는 함수이름을 camelCase로 변경해줍니다.

참고로 JS의 여러 기본함수가 camelCase로 작성된것과 달리 러스트는 함수이름을 snake_case로 짓는것을 권장합니다. napi-rs를 이용하면 두 언어에서 널리 사용되는 컨벤션을 지키면서 코딩할 수 있게 해줍니다.

napi-rs는 더 멋진일도 도와줍니다. 우선, napi-rs는 struct를 class로 사용할 수 있게 바꿔줍니다.
```rust
use napi::bindgen_prelude::*;

#[napi(js_name = "QueryEngine")]
struct QueryEngine {}

#[napi(js_name = "QueryEngine")]
struct JsQueryEngine {
  engine: QueryEngine,
}

#[napi]
impl JsQueryEngine {
  #[napi(factory)]
  pub fn with_initial_count(count: u32) -> Self {
    JsQueryEngine { engine: QueryEngine::with_initial_count(count) }
  }

  #[napi(constructor)]
  pub fn new() -> Self {
    JsQueryEngine { engine: QueryEngine::new() }
  }

  /// Class method
  #[napi]
  pub async fn query(&self, query: String) -> napi::Result<String> {
    self.engine.query(query).await
  }

  #[napi(getter)]
  pub fn status(&self) -> napi::Result<u32> {
    self.engine.status()
  }

  #[napi(setter)]
  pub fn count(&mut self, count: u32) {
    self.engine.count = count;
  }
}
```

노드에선 아래같은 코드처럼 사용 할 수 있습니다.
```ts
export class QueryEngine {
  static withInitialCount(count: number): QueryEngine
  constructor()
  query(query: string): Promise<string>
  get status(): number
  set count(count: number)
}
```

러스트도 자바스크립트처럼 `async-await` 함수를 지원하는데요, napi-rs는 `async`함수를 노드에서 사용할 수 있게 바꿀 수 있습니다.

```rust
use futures::prelude::*;
use napi::bindgen_prelude::*;

#[napi]
async fn read_file_async(path: String) -> Result<Buffer> {
  // ...
}
```

심지어 노드의 `Promise`를 러스트 코드에서 `await`할 수 있도록 지원해주기 까지 합니다.

```rust
use napi::bindgen_prelude::*;

#[napi]
pub async fn async_plus_100(p: Promise<u32>) -> Result<u32> {
  let v = p.await?;
  Ok(v + 100)
}
```
```js
import { asyncPlus100 } from './output.node'

const result = await asyncPlus100(
  new Promise((resolve) => {
    setTimeout(() => resolve(20), 50)
  }),
)

console.log(result) // 120
```

위처럼 napi-rs를 사용하면 `#[napi]`의 추가만으로 아주 자연스럽게 러스트와 노드를 이어줄 수 있습니다.

어떻게 이런일이 가능할까요? 이건 러스트의 강력한 매크로 덕분입니다.

## macro
러스트의 매크로는 아주 강력합니다. C/C++의 매크로는 문자열 치환 정도의 기능을 가지는데 비해 러스트의 매크로는 코드의 맥락을 이해할 수 있고, 컴파일 타임에 경고를 줄 수도 있는등 메타프로그래밍을 지원합니다.

napi-rs는 rust의 강력한 매크로를 사용해 **컴파일 타임**에 함수/클래스의 이름, 함수의 인자 등 을 분석하고, 적절한 헬퍼함수를 삽입하는 등 코드를 변형해 Node API를 사용하게 해줍니다.

러스트의 매크로에 대해 더 알아보고 싶다면 [공식문서의 매크로 항목](https://doc.rust-lang.org/book/first-edition/macros.html)과 [Rust 로 복잡한 매크로를 작성하기: 역폴란드 표기법](https://blog.cloudflare.com/ko-kr/writing-complex-macros-in-rust-reverse-polish-notation-ko-kr/)글을 추천합니다.

# 편리한 빌드 / 배포 시스템
napi-rs의 또다른 장점은 편리한 빌드 시스템입니다. napi-rs의 빌드 시스템은 노드에서 주로 사용되는 빌드 시스템의 불편한 점과 배포 방법의 불편한점을 해결해줍니다.

# 기존 시스템의 불편한점
주로 사용되는 기존 시스템들은 아래와 같은 문제를 가지고 있었습니다.

## node-gyp
노드의 많은 네이티브 애드온은 [GYP](https://ko.wikipedia.org/wiki/GYP_(%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4))와 `gyp`를 래핑한 `node-gyp`을 이용합니다. `gyp`은 크롬팀에서 개발한 **크로스 플렛폼**을 지원하는 C/C++ 빌드 도구 입니다.

`gyp`의 정의 파일은 복잡할 뿐만 아니라 파이썬과 같은 외부 의존성을 가지고 있습니다. gyp을 만든 크롬팀도 유지보수 등의 문제로 새로운 빌드도구 [GN](https://ko.wikipedia.org/wiki/GN_(%EB%B9%8C%EB%93%9C_%EC%8B%9C%EC%8A%A4%ED%85%9C))을 개발해 GYP을 더이상 사용하지 않습니다.

실제로 노드와 deno를 만든 Ryan Dahl은 node.js에서 후회하는 것 중 하나로 꼽기도 했습니다.

<YoutubePlayer id="M3BM9TB-8yA" cc="ko" start={420} />

위와 같은 이유로 노드 애드온 개발에 [cmake-js](https://github.com/cmake-js/cmake-js)를 사용하는 경우도 있습니다.

## 패키지 배포의 문제
위에서 설명한 것처럼 NAN은 소스코드는 서로 다른 노드버전이라도 호환되지만, 컴파일된 결과물은 호환 되지않습니다. 이와같은 문제로 많은 패키지들이 C/C++ 소스코드를 제공하고 `postinstall`에서 컴파일 하는 방식으로 배포되었습니다.

조금 더 세련된 방식은 [node-pre-gyp](https://github.com/mapbox/node-pre-gyp)을 이용해 사전에 컴파일된 바이너리가 있다면 CDN에서 받아오고, 만약 받아오는데 실패한다면 컴파일을 하는 방식도 널리 이용됩니다.

아마 여러분의 노드 프로젝트를 보시면 종종 `node_modules`내부에 `node-gyp`또는 `node-pre-gyp`이 보일겁니다.

이런 방식은 몇가지 문제점이 있습니다.
우선, 런타임에 불필요한 도구들을 설치해야합니다. `node-gyp`을 사용하려면 파이썬, make, gcc등이 있어야 합니다. 이런 이유로 노드만 사용하는 도커 이미지에 파이썬과 make등이 추가로 설치되어 용량의 증가와 관리에 어려움을 겪기도 합니다. cmake-js를 이용해도 C/C++ 소스를 배포한다면 런타임에 불필요한 도구를 설치해야한다는점은 동일합니다.

CDN을 활용하는 방법도 CDN의 속도나 방화벽등의 문제를 겪을 수 있습니다. 아마 AWS S3리전이 북미등 먼 지역으로 되어있어 설치가 아주 오래 걸린 경험을 해본 분들도 많이 계실겁니다.

# napi-rs의 빌드/배포 시스템
napi-rs는 [esbuild](https://github.com/evanw/esbuild/tree/master/npm)처럼 여러 플랫폼의 패키지를 생성하며, 이를 기본 패키지의 `optionalDependencies`에 추가하고 바인딩 코드를 제공합니다.

사용자는 기본 패키지만 설치하면 `optionalDependencies`도 설치되며, 기본 패키지에 해당 플랫폼에 맞는 파일을 골라 실행하는 코드가 있어 필요한 패키지를 실행하게 됩니다.

이 방법은 npm을 이용하기 때문에 방화벽 설정이나 속도에서 이점이 있고, 특정 플렛폼의 빌드가 복잡하다면 따로 관리할 수 있는 장점이 있습니다.

`optionalDependencies`를 사용하기때문에 배포시 설치되지 않아도 문제없이 넘어가는 특징이 있어, 설령 다른 플랫폼의 패키지를 못 가져와도 동작하지만 만약 이 기능이 불안하시다면 기본 패키지에 여러 플랫폼에 맞는 `.node`파일을 만들어도 됩니다. napi-rs가 생성하는 바인딩 코드는 `some-package-darwin-x64.node` 같은 파일을 먼저 탐색하고 해당파일이 없다면 `@some-package/darwin-x64`파일을 불러오기 때문에 한 패키지에 모든 플렛폼을 지원하도록 할 수도 있습니다.

그리고 원한다면 위 과정을 자동으로 수행하는 GitHub Action 스크립트를 만들어 줍니다.

### Tip
참고로 yarn을 사용한다면 3.1 버전부터 [supportedArchitectures](https://dev.to/arcanis/yarn-31-corepack-esm-pnpm-optional-packages--3hak#conditional-packages) 설정을 통해 불필요한 `optionalDependencies`를 받지 않도록 설정 할 수 있습니다.

## TypeScript
napi-rs의 빌드 시스템의 또 다른 장점은 러스트 코드를 보고 타입스크립트 지원을 위한 `.d.ts`을 자동으로 생성해줍니다. 이 역시 러스트의 매크로를 활용하여 함수의 정보를 받아와 생성해줍니다.

## Cargo = ❤️
마지막으로 napi-rs의 장점은 러스트의 개발환경 입니다. [canter](https://github.com/hahnlee/canter)라는 라이브러리를 개발하던 도중 `Objective-C`로 개발된 코드와 연동할 일이 많아 차라리 C/C++/Obj-C로 개발환경을 바꿀까 하는 고민을 많이 했었는데요, 개발을 하면 점점 더 그런 고민이 사라졌습니다.

C/C++에 비해 Cargo라는 표준적, 현대적인 패키지매니저 덕분에 다양한 라이브러리를 쉽게 사용할 수 있었고, 개발환경을 설치하기 위한 과정도 몹시 간단한데다 크로스플랫폼 빌드도 더 간단합니다.

러스트언어도 다양한 자료구조, 안전함을 제공하는것도 매력이고요.

C/C++ 연동도 러스트와 Cargo의 기능만으로도 가능하지만, 복잡한 경우에도 [cc](https://github.com/rust-lang/cc-rs)같은 도구를 이용하면 비교적 어렵지 않았습니다.
Rust와 함께 사용할 C/C++ 코드가 크로스 플렛폼 빌드가 필요하다면 napi-rs의 --zig 옵션을 통해 `zig cc`를 사용할 수도 있습니다. (zig cc도 정말 멋진도구 입니다! 따로 소개할 예정이니 기대해주세요 😆)

만약 네이티브 연동이 필요하시다면 러스트와 napi-rs를 한번 사용해보세요. 아마 후회하지 않을겁니다.

