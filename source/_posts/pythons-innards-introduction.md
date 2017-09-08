---
title: "Python의 내부: 소개"
date: 2017-09-02 12:34:11
tags:
    - Python
    - Python's Innards
    - 번역
---
> 이글은 [Yaniv Aknin](https://tech.blog.aknin.name/)의 [Python's Innards: Introduction](https://tech.blog.aknin.name/2010/04/02/pythons-innards-introduction/)을 번역한 글입니다.
원글에 따라 이 글도 [CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/) 라이센스를 따릅니다.


한 친구가 제게 말한적이 있습니다.
너도 알겠지만 몇몇 사람들에게 C는 그저 어셈블리로 확장되는 매크로야.
몇 년 전의 일이었습니다 (잘난놈들: 그건 llvm 이전의 이야기였지, 알겠어?),
그렇지만 그 말은 저를 속박했습니다.
*Kernighan*과 *Ritchie*는 정말로 C프로그램에서 어셈블리 코드를 보나요?
*Tim Berners-Lee*는 저나 여러분과 다르게 웹서핑을 하나요?
그리고 *Keanu Reeves*는 그 펑키한 초록색 스프(funky green gibberish soup)[^1]를 다 보았을때 도데체 무슨 짓을 한 걸까요?
아니, 정말이지, 그가 도제체 무슨 짓을 한 거야?!
음, 프로그램으로 돌아가죠.
어쨌든, Gudio van Rossum[^2]의 눈에 Python은 어떻게 생겼을까요?

이 글은 파이썬 내부 구조에 대한 [시리즈](https://tech.blog.aknin.name/tag/pythons-innards/)로 나아갈 시작점 이며,
저는 무언가를 이해하기 위한 가장 좋은 방법은 설명하는 것 이라고 생각하기 때문에 글을 쓰고 있습니다.
그리고 저는 제가 Python 코드를 읽으면서 Python의 '펑키한 녹색 스프'를 더 많이 시각화 할 수 있기를 바라고 있습니다.
커리큘럼은 *CPython*, *py3k*[^3], *바이트코드 해석*(저는 별로 컴파일 과정의 광팬이 아닙니다.)을 다룰 겁니다.
그렇지만 Python과 Python 같은 코드(*Unladen Swallow*[^4], *Jython*, *CPython* 등)를 실행하는 모든 것들은 이 시리즈의 좋은 주제가 될 수 있습니다.
간결함과 제 정신을 위해서, Python은 특별히 언급하지 않는 한 CPython을 의미합니다.
또, 다른 언급이 없다면 저는 POSIX 또는 (만약 특별한 경우) Linux를 가정하겠습니다.

여러분은 Python이 어떻게 동작하는지 알고 싶다면 이글을 읽어야 합니다.
여러분은 CPython에 기여하고 싶다면 이글을 읽어야 합니다.
여러분은 제 실수를 찾기 위해서 이 글을 읽어야 하고, 제 뒤에서 저를 비웃거나 악플을 달아야 합니다.
저는 그것들이 단지 애정을 표현하는 *여러분들*의 특별한 방법이라는 것을 알았습니다.

저는 주로 Python의 소스코드나 다른 좋은 자료들(Python 문서, 특히 [이것](https://docs.python.org/3/c-api/index.html)과 [이것](https://docs.python.org/3/extending/index.html), PyCon 강연, [python-dev](https://mail.python.org/mailman/listinfo/python-dev)[검색](https://tech.blog.aknin.name/2010/05/07/searching-mailing-list-archives-offline/) 결과)을 모아 놓은 것에서 자료를 모을 것 입니다.
모든 자료들이 그곳들에 있겠지만,
자료들을 RSS구독을 할 수 있는 한 곳에 모으려는 제 노력이 여러분의 여정을 더 쉽게 만들어 주기를 바랍니다.
저는 독자 분들이 C언어 지식, 조금의 OS 이론, (어떤 아키텍쳐든) 조금 적은 어셈블리 지식, 조금 많은 Python 지식 그리고 UNIX 적합성(즉, 편한한 마음으로 출처에서 무언가를 설치할 수 있어야 합니다)을 가지고 있다고 생각하겠습니다.
만약에 여러분이 이중 하나 (혹은 그 이상)익숙하지 않더라도 두려워 하지는 마세요,
그렇지만 저는 순조로운 항해를 약속 할 수는 없습니다.
또한, Python 개발에 사용할 툴체인이 없다면 [여기](https://tech.blog.aknin.name/2010/04/08/contributing-to-python/)로 가서 두번째 (그리고 관련있는 다음)단락에서 말한 대로 하는 것이 좋을 것 입니다.

여러분이 이미 알고 있는 것부터 시작해 봅시다.
그렇지만 적어도 제가 이해하는 바로는... 이해할 수 있는 모든 것은 중요하다고 생각합니다.
저는 Python을 기계를 처럼 봅니다.
Python의 경우는 (다른 인터프리터 언어와 마찬가지로) 가상머신위에서 동작하므로 더 이해하기 쉽습니다.
이 문맥에서 *[가상머신](https://en.wikipedia.org/wiki/Virtual_machine#Process_virtual_machines)*을 정확하게 이해하세요.
VirtualBox보다는 JVM과 같은것 으로 생각하세요
(매우 기술적인 관점에서 보면 둘은 같습니다, 하지만 현실 세계에서는 일반적으로 이 두 종류의 VM을 구별합니다).
저는 *가상머신*을 문자 그대로 이해 하는 것이 가장 쉽다는 것을 알았습니다.
가상머신은 소프트웨어로 만들어진 기계입니다. 
CPU는 단지 모든 입력값(기계어, 데이터)을 받고 상태값(레지스터)를 가지며 입력값과 상태에 따라 (RAM이나 버스에) 출력값을 보내는 복잡한 전자 기계입니다, 맞죠?
자, CPython은 상태값과 명령 처리방법을 가지고 있는 소프트웨어로 만들어진 기계입니다 (다른 구현체는 다소 다른 설명이 필요할 수도 있음).
이 소프트웨어 기계는 Python 인터프리터를 호스팅하는 프로세서에서 작동합니다.
이 점을 기억해 두세요. 저는 ([여기서](https://tech.blog.aknin.name/2010/07/04/pythons-innards-for-my-wife/) 상세히 설명한 것 처럼) [기계](https://en.wikipedia.org/wiki/Turing_machine)에 비유하는걸 좋아합니다.

즉, 다음과 `$ python -c 'print("Hello, world!")'` 같은 일을 할 때 일어나는 일에 대한 개요를 봅시다.
Python 바이너리가 실행됩니다,
표준 C 라이브러리 초기화는 거의 모든 프로세스에서 발생합니다 
그리고 main 함수가 실행됩니다
(`./Modules/python.c: main`코드를 보세요, 곧 `./Modules/main.c: Py_Main`을 호출 합니다).
평범한 초기화 작업
(argument를 파싱하고, 환경변수가 동작에 영향을 주는지 확인하고, 표준 스트림[^5]에 접근하고 그에 따라 행동 하는 등등)을 마치고 나면 
[./Python/pythonrun.c: Py_Initialize](https://docs.python.org/3/c-api/init.html#Py_Initialize)가 호출 됩니다.
 여러가지 방법으로, 이 함수는 CPython 기계를 실행하는데 필요한 부품을 '빌드'하고 모아서 '프로세스'를 'Python 인터프리터가 있는 프로세스'로 만듭니다.
무엇보다도 두 가지 매우 중요한 *인터프리터 상태*와 *스레드 상태*에 관한 Python 데이터 구조를 생성합니다.
또한 내장 모듈 *sys*와 모든 [내장 함수](https://docs.python.org/3/library/functions.html#built-in-functions)모듈을 호스팅 합니다.
이후 글들에서 이 모든 것들을 깊이 있게 다룰 것입니다.

이 다음, Python은 실행 방법에 따라 다음 몇 가지 중 하나를 실행합니다.
대략적으로, 문자열을 실행하거나 (`-c` 옵션), 모듈을 실행파일로 실행하거나 (`-m` 옵션), (커맨드라인에서 명시적으로 전달되거나 스크립트의 인터프리터로 사용될 때 커널에 의해 전달된) 파일을 실행 하거나 또는 [REPL 루프](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)를 실행합니다
(이건 조금 특별한 경우로, 파일 실행이 대화형 인터프리터 위에서 일어나는 경우 입니다)를 실행합니다.
지금 저희는 `-c`를 사용해 하나의 문자열을 실행하는 경우를 따르고 있습니다.
이 단일 문자열을 실행하기 위해, `./Python/pythonrun.c: PyRun_SimpleStringFlags`가 호출 됩니다.
이 함수는 `__main__` *네임 스페이스*를 만듭니다.
이 네임 스페이스는 우리의 문자열이 실행되는 곳 입니다
(만약에 `$ python -c 'a=1; print(a)'`를 실행하면, 어디에 저장될까요? 여기에 저장됩니다.).
네임 스페이스가 생성 된 후 문자열은 그 위에서 실행됩니다.
이를 위해선 먼저 문자열을 기계가 작업할 수 있는 형태로 변환해야 합니다.

앞서 말했듯이, 저는 Python의 파서/컴파일러 내부에 집중하지 않을 것입니다.
저는 컴파일러 전문가가 아니며,
컴파일러 내부에 별로 관심이 없습니다 그리고 제가 아는 한 Python은 CS(Computer Science) 컴파일 강의를 넘어서는 컴파일 후속 조치가 없습니다.
우리는 여기서 일어나는 일들에 대한 개요를 (매우)빠르게 살펴볼 것 입니다,
아마 나중에도 CPython의 동작을 명확히 볼 필요 있을때만 돌아올 것입니다 (파싱에 영향을 미치는 것으로 알려진 [gloobal](https://docs.python.org/3/reference/simple_stmts.html#the-global-statement)문을 참고하세요).
그래서, `PyRun_SimpleStringFlags`의 파서/컴파일러 단계는 크게 다음과 같습니다.
소스 코드를 토큰화 하고 [구체 구문 트리](https://en.wikipedia.org/wiki/Concrete_syntax_tree)(Concrete Syntax Tree, CST)를 만들고,
CST를 [추상 구문 트리](https://en.wikipedia.org/wiki/Abstract_syntax_tree)(Abstract Syntax Tree, AST)로 변환하고 마지막으로 `./Python/ast.c: PyAST_FromNode.`를 사용하여 AST를 *Code Object*[^6]로 컴파일 합니다.
지금은 Code Object를 Python VM의 기계가 작동할 수 있는 기계어 이진 문자열이라고 생각합시다.
이제 우리는 (다시, Python의 말로) 해석할 준비가 되어 있습니다.

우리는 (거의) 빈 `__main__`을 가지고 있고, Code Object를 가지고 있으며, 이제 그것을 *평가*하려고 합니다.
이제 뭘 할까요?
저희는 지금 이 라인의 `Python/pythonrun.c: run_mod, v = PyEval_EvalCode(co, globals, locals);` 역할울 하고 있습니다.
그것은 Code Object와 *전역* 및 *지역* 네임 스페이스를 받습니다
(우리의 경우, 둘 다 새로 생성된 `__main__` 네임 스페이스가 됩니다) 
그리고 이것 들로 부터 *frame object*를 작성해 실행합니다.
여러분은 `Py_Initialize`가 스레드 상태를 생성하며 이것에 대해 나중에 이야기 할 것이라고 한 걸 기억 하나요?
자, 다시 말씀 드리자면, 각각의 Python 스레드는 Python 스레드가 소유한 스레드 상태로 표현 되며, 스레드 상태는 (다른 것들 가운데서) 현재 실행중인 frame의 스택을 가리킵니다.
frame object가 생성되고 스레드 상태 스택에 배치된 후 `./Python/ceval.c: PyEval_EvalFrameEx` 코드에 의해 목적코드로 평가됩니다.

`PyEval_EvalFrameEx`는 frame을 가져와 목적코드(만약 피연산자가 들어가 있다면 피연산자)를 생성하고, 목적코드와 일치하는 짧은 C코드를 실행합니다.
컴파일 된 Python 코드를 분해하여 이러한 "목적코드"가 어떻게 생겼는지 자세히 살펴 보겠습니다.
```python
>>> from dis import dis # 오! 편리한 역어셈블리 함수!
>>> co = compile("spam = eggs - 1", "<string>", "exec")
>>> dis(co)
  1           0 LOAD_NAME                0 (eggs)
              3 LOAD_CONST               0 (1)
              6 BINARY_SUBTRACT     
              7 STORE_NAME               1 (spam)
             10 LOAD_CONST               1 (None)
             13 RETURN_VALUE        
>>> 
```
... 심지어 Python 바이트 코드에 대해서 잘 알지 못한다고 해도, 이건 상당히 읽기 쉽습니다.
여러분은 `eggs`를 "로드" 했고(어디에서 로드 한 걸까요? 어디로 로드할까요? 곧 알려 드리죠),
상수 값 (1)을 로드 합니다, 
그런 다음 "바이너리 뺄셈(binary subtract)"을 실행합니다 
(이 문맥에서 "바이너리(binary)"는 무엇을 의미하나요? 피 연산자 사이에 있는 것들 인가요?).
그리고 기타 등등 작업을 합니다.
여러분들은 아마 짐작 했겠지만, 앞에서 살펴본 *전역* 및 *지역* 네임스페이스에서 변수가 "로드"되고,
그들은 피연산자 스택(실행중인 프래임의 스택과 혼동해서는 안 됨)에 로드 됩니다.
바이너리 뺄셈은 그들을 빼내고,
그중 하나를 다른 하나와 뺀다음 그 결과를 다시 피연산자 스택에 넣을 것 입니다.
"바이너리 뺄셈"은 두개의 피연산자가 있는 빼기 연산 코드를 의미합니다.
(이 이유로 "바이너리 (binary)"라고 부릅니다, 이것은 피연산자가 0, 1로 이루어진 이진수(binary number)를 말하는 것이 아닙니다)

여러분은 `./Python/ceval.c`에서 `PyEval_EvalFrameEx`를 살펴볼 수 있으며,
그 함수는 어떤 의미로도 작다고 할 수 없습니다.
여러 실용적인 이유로 여기에 많은 코드를 붙여 넣을 수는 없지만,BINARY_SUBTRACT 목적코드가 발견되었을때 실행되는 코드를 분여 넣을 것 입니다.
저는 이 코드가 정말 잘 설명하고 있다고 생각합니다.
```c
TARGET(BINARY_SUBTRACT)
    w = POP();
    v = TOP();
    x = PyNumber_Subtract(v, w);
    Py_DECREF(v);
    Py_DECREF(w);
    SET_TOP(x);
    if (x != NULL) DISPATCH();
    break;
```
... 어떤 값을 가져오고,
(피연산자 스택의) 맨위를 기져오고, 
C함수 `PyNumber_Subtract()`를 호출하고,
우리가 여전히 이해하지 못하는 (하지만 나중에 이해하게될) “Py_DECREF”을 양쪽 모두에게 호출하고,
스택의 상단을 뺄샘의 결과로 설정하고 (이전의 상단을 덮어씀)
마지막으로 x가 null이 아니면 이해할 수 없는 것을 (“DISPATCH”)합니다.
따라서 여전히 우리가 이해할 수 없는 것들이 있지만,
제 생각에는,
가능한 가장 낮은 레벨에서 Python이 두 숫자를 어떻게 뺄셈 하는지는 매우 분명해 보입니다.
그리고 여기까지 설명하는 데 고작 약 1,500 단어를 사용했습니다!

frame이 실행되고, `PyRun_SimpleStringFlags`가 반환된 후,
메인 함수는 청소를 합니다 (특히, 나중에 우리가 논의할 [Py_Finalize](https://docs.python.org/3/c-api/init.html#Py_Finalize)).
표준 C 라이브러리 초기화 해제(deinitialization)작업이 완료되고,
프로세스가 종료됩니다.

저는 이 글이 "좋은" 개요를 제공하여, 다른 글의 발판으로 사용되길 바랍니다.
우리는 Python의 다양한 영역에 대해 보다 구체적인 논의를 할 것 입니다.
우리는 다음과 같은 나중에 다시 설명하기로 약속한 몇 가지 용어를 가지고 있습니다.
인터프리터와 스레드 상태, 네임 스페이스, 모듈과 내장 객체, code와 frame object는 물론 `BINARY_SUBTRACT`구현에서 이해할 수 없었던,
`DECREF`와 `DISPATCH`.
여기에 우리가 이 글 내내 '이것' 근처에서 춤을 추었지만 이름으로 부르지 않은 매우 중요한 '유령'용어도 있습니다. 객체 입니다.
CPython의 객체 시스템은 CPython이 어떻게 작동하는지 이해하는데 있어 핵심적인 역할을 합니다.
그리고 저는 이 시리즈의 다음글에서 다룰것이라고 생각하빈다. 계속지켜봐 주세요.

[^1]: 역주 - Keanu Reeves는 메트릭스에서 Neo 역할을 맡아 연기했습니다. 매트릭스에 관한 비유 같습니다. 

[^2]: 이 시리즈는 명시적으로 언급하지 않는 한 누구도 지지하거나 제휴되어 있지 않는 다는 점을 유의 하세요.
또한 Python은 [Guido van Rossum](https://en.wikipedia.org/wiki/Guido_van_Rossum)에 의해 시작 되었지만,
많은 사람들이 수년 동안 Python 프로젝트와 파생 프로젝트에 [기여해 왔습니다](https://en.wikipedia.org/wiki/History_of_Python).
저는 Guido나 다른 기여자들을 확인해본 적은 없지만,
저는 어떤 기여자들도 Guido 보다 Python을 명확하게 보지 못할 것이라고 확신합니다.

[^3]: 역주 - [Python 문서](https://www.python.org/dev/peps/pep-3000/)를 참고하세요

[^4]: 역주 - [위키백과](https://en.wikipedia.org/wiki/CPython#Unladen_Swallow) 구글이 후원한 CPython의 llvm JIT 구현체

[^5]: 역주 - [위키백과](https://ko.wikipedia.org/wiki/표준_스트림) 참고

[^6]: 역주 - [Python 문서](https://docs.python.org/3/c-api/code.html) 참고