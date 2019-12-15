---
title: "Under the C: PyObject"
date: 2018-04-21
thumbnail:
  url: ./thumbnail.jpg
summary: 파이썬의 모든 자료형의 부모 PyObject를 알아봅시다
tags:
  - Python
  - Under the C
---
파이썬의 모든 것은 객체다. 당연하게 들릴 수 있으나 객체 지향 언어라고 하려 모든것이 객체인건 아니다.
예를 들어 자바의 거의 모든것은 객체지만, 원시 자료형 (Primitive Type)은 아니다.
그러나 파이썬은 숫자도 객체다.
```python
>>> 42..__add__(3)  # 점을 두개 붙어야 호출 가능하다
45.0
```
이와 같은 이유로 객체를 알아보는건 파이썬 내부를 알아보는데 좋은 출발점이다.

# PyObject
파이썬의 객체는 `PyObject`로 이뤄져 있다.
`PyObject`는 `Include` 폴더의 `object.h`에 다음과 같이
[정의](https://github.com/python/cpython/blob/f320be7/Include/object.h#L106)
되어 있다.

```c
typedef struct _object {
    _PyObject_HEAD_EXTRA
    Py_ssize_t ob_refcnt;
    struct _typeobject *ob_type;
} PyObject;
```
이중 `_PyObject_HEAD_EXTRA`매크로는 디버깅에만 사용되므로 무시하자.
따라서 `PyObject`는 다음의 구조체다.
```c
typedef struct _object {
    Py_ssize_t ob_refcnt;
    struct _typeobject *ob_type;
} PyObject;
```

`_typeobject`는 외부에는 `PyTypeObject`라는 이름으로 사용된다.
이름처럼 객체에 관한 정보가 기록 된다. `PyTypeObject`의 자세한 소스코드는 [GitHub](https://github.com/python/cpython/blob/f320be7/Include/object.h#L346)을 참고하라.
예를 들어 파이썬 객체의 `__doc__`정보는 `PyTypeObject`의 `tp_doc`필드에 저장된다.

따라서 필요하다면 C언어로 `PyTypeObject`를 상속받아 새로운 객체를 만들 수도 있다.
`PyTypeObject`의 내용은 다음에 다루기로 하고, 지금은 다른 필드 `ob_refcnt`를 알아보자.
변수명에서 눈치 챘겠지만, 레퍼런스 카운팅(이하 RC)을 위한 필드다.

# Reference Counting
파이썬의 주 메모리 관리는 RC로 이뤄진다.
RC는 객체가 얼마나 사용되는지 레퍼런스 카운트에 기록한다.
객체가 사용되는 만큼 레퍼런스 카운트를 1씩 증가/감소하며, 레퍼런스 카운트가 0이 되면 메모리에서 해제한다.

```python
class Foo:
    name = None

    def __init__(self, name):
        self.name = name

    def __del__(self):
        print('Foo("{}")가 메모리에서 제거 되었습니다'.format(self.name))

a = Foo("a")  # Foo("a")가 새로 생성 되었으므로 레퍼런스 카운트는 1이 된다
b = a  # B도 a를 참조 있으므로 Foo의 레퍼런스 카운트는 2가 된다

b = 0  # B가 더이상 Foo("a")를 사용하지 않으므로 Foo("a")의 레퍼런스 카운트는 1 줄어 들어 1 이 된다
a = 0  # a도 더이상 Foo("a")를 사용하지 않으므로 Foo("a")의 레퍼런스 카운트는 1 줄어 0이 되어, 해재하며 소멸자를 호출한다
```

파이썬에서 `__init__`는 생성자, `__del__`은 소멸자이다.
위 코드를  **인터프리터 모드**에서 실행하면 `a = None`을 실행한 직후 `Foo("a")가 메모리에서 제거 되었습니다`라는 메시지를 볼 수 있을 것이다.
이처럼 RC를 사용하면 메모리가 필요 없어진 순간 제거 된다.

파이썬 내부에선 Reference Count 관리를 위해 `Py_INCREF`와 `Py_DECREF`를 사용한다.
```c
#define Py_INCREF(op) (                         \
    _Py_INC_REFTOTAL  _Py_REF_DEBUG_COMMA       \
    ((PyObject *)(op))->ob_refcnt++)
```

```c
#define Py_DECREF(op)                                   \
    do {                                                \
        PyObject *_py_decref_tmp = (PyObject *)(op);    \
        if (_Py_DEC_REFTOTAL  _Py_REF_DEBUG_COMMA       \
        --(_py_decref_tmp)->ob_refcnt != 0)             \
            _Py_CHECK_REFCNT(_py_decref_tmp)            \
        else                                            \
            _Py_Dealloc(_py_decref_tmp);                \
    } while (0)
```

`_Py_DEC_REFTOTAL`, `_Py_REF_DEBUG_COMMA` 처럼 디버그에서 사용하는 내용을 지우면,
`Py_INCREF`는 다음과 같으며,
```c
((PyObject *)(op))->ob_refcnt++;
```
`Py_DECREF`는 다음과 같다.
```c
PyObject *_py_decref_tmp = (PyObject *)(op);
if (--(_py_decref_tmp)->ob_refcnt == 0)
  _Py_Dealloc(_py_decref_tmp);
```

RC를 사용하면 프로그래머가 큰 신경을 쓰지 않아도, 필요 없다고 판단된 메모리는 그 즉시 해제할 수 있다.
개인적으로 RC는 *비용있는* 추상화 방식 중에서는 가장 우아한 방식이라고 생각한다.
아래의 문제점들만 없다면 말이다.

# 문제
메모리관리에 대해 알아본 프로그래머라면 알겠지만, 아쉽게도 RC는 만병통치약이 아니다.

## 오버헤드
첫번째로 오버헤드를 이야기 할 수 있다.
우선 `PyObject`의 `ob_refcnt` 처럼 레퍼런스 카운트를 저장할 공간이 추가적으로 필요하고,
변수를 할당할때도 추가적으로 레퍼런스 카운트를 관리해야 한다.

[저번 글](https://blog.sn0wle0pard.io/2018/under-the-c-1/)에 나온 내용을 다시 살펴보자.
```python
if A != True:
    pass
```
파이썬 인터프리터에게 위 코드는 다음의 C 코드와 비슷하다.
```c
PyObject *T = Py_True;
Py_INCREF(T);
if (PyObject_RichCompareBool(A, T, Py_NE)) {
}
Py_DECREF(T);
```
변수 `A`와 `True`를 비교하기 위해 임시 변수 `T`를 만들었고, T는 `Py_True`값을 참조 한다.
아쉽게도 단순히 참조에서 끝나는게 아니라 필요에 따라 `Py_INCREF`와 `Py_DECREF`가 호출 된다.

오버헤드는 메모리 관리에 드는 수고를 생각하면 넘어갈 수 있을 수도 있다.
그러나 아쉽게도 해제할 수 없는 메모리도 있다.

## 순환참조
RC는 안전하지만 완전하진 않다.
모든 해제된 메모리는 필요 없는 메모리지만, 모든 필요없는 메모리가 헤제되는건 아니다.

예를 들어 다음의 코드를 보자,
```python
class Foo:
    child = None
    name = None

    def __init__(self, name):
        self.name = name

    def __del__(self):
        print('Foo("{}")가 메모리에서 제거 되었습니다'.format(self.name))

a = Foo("a")  # Foo("a")의 ref count는 1
b = Foo("b")  # Foo("b")의 ref count는 1

a.child = b  # a.child가 Foo("b")를 참조하므로 Foo("b")의 레퍼런스 카운트는 1 증가하여 2가 된다
b.child = a  # b.child가 Foo("a")를 참조하므로 Foo("a")의 레퍼런스 카운트는 1 증가하여 2가 된다

a = 0  # a가 더이상 Foo("a")를 참조하지 않으므로 레퍼런스 카운트는 1 감소해서 1 이다
b = 0  # b가 더이상 Foo("b")를 참조하지 않으므로 레퍼런스 카운트는 1 감소해서 1 이다

# Foo("a")와 Foo("b")모두 접근할 수 없지만, 레퍼런스 카운트가 남아 있으므로 해재되지 않는다
```
위 코드를  **인터프리터 모드**에서 실행하면 `a = 0`이나 `b = 0`이 되면 더이상 `Foo("a")`와 `Foo("b")`에 접근 할 수 없다.
그러나 `a.child`와 `b.child`의 참조때문에 올라간 레퍼런스 카운트가 존재해 a와 b가 더이상 child에 접근 못 하더라도 해제가 불가능 하다.

```python
class Foo:
    child = None
    name = None

    def __init__(self, name):
        self.name = name

    def __del__(self):
        print('Foo("{}")가 메모리에서 제거 되었습니다'.format(self.name))

a = Foo("a")  # Foo("a")의 ref count는 1
a.child = a  # a.child가 Foo("a")를 참조하므로 Foo("a")의 레퍼런스 카운트는 1 증가하여 2가 된다

a = 0  # a가 더이상 Foo("a")를 참조하지 않으므로 레퍼런스 카운트는 1 감소해서 1 이다

# Foo("a")에 접근할 수 없지만, 레퍼런스 카운트가 남아 있으므로 해재되지 않는다
```
또 하나, 위처럼 자기 자신을 참조하는 경우도 마찬가지로 해재할 수 없다.
이 처럼 서로 참조하는 경우를 **순환참조**라고 하며, 레퍼런스 카운트로는 해결하기 까다롭다.

좀 더 쉬운 예를 하나 보면,
```python
x = [1, 2, 3]
x.append(x)
```
파이썬의 경우 위의 코드는 자기자신을 참조한다.

# GC
이러한 이유로 파이썬은 RC만을 사용하지 않고, 추가적으로 GC도 사용한다.
엄밀하게 말하면 RC도 GC의 일부지만 이 글에선 RC가 아닌 GC를 말하기로 하자.
파이썬의 GC는 `gcmodule.c`에 [정의](https://github.com/python/cpython/blob/master/Modules/gcmodule.c) 되어 있으며,
자세한 내용은 추후에 다루도록 하겠다.

```python
class Foo:
    child = None
    name = None

    def __init__(self, name):
        self.name = name

    def __del__(self):
        print('Foo("{}")가 메모리에서 제거 되었습니다'.format(self.name))

a = Foo("a")  # a의 ref count는 1
b = Foo("b")  # b의 ref count는 1

b.child = a  # a의 ref count는 2
a.child = b  # b의 ref count는 2

a = 0  # a의 ref count는 1 감소해서 1 이다 (b.child에 참조가 남아있다)
b = 0  # b의 ref count는 1 감소해서 1 이다 (a.child에 참조가 남아있다)

import gc
gc.collect()  # GC를 직접 호출해보자 (원래는 필요한 경우 자동으로 호출 된다)
```
위의 코드를 실행하면 `gc.collect()`가 더이상 접근할 수 없는 객체를 해재하는 것을 볼 수 있다.
특별한 설정을 하지 않는다면 파이썬은 자동으로 필요할때 gc를 호출해 RC로 해재할 수 없는 객체를 해제해 준다.

GC도 사용하므로 파이썬의 메모리 관리는 아쉽게도 RC하나만 사용하는 것에 비해 추가적인 비용이 든다.

다행인 점은 파이썬의 GC는 순환참조를 만들 가능성이 있는 컨테이너 객체를 대상으로 사용되어 모든 객체를 검사하진 않는다.

실제로, GC는 파이썬 2.0 버전부터 도입 되었으며 [당시 자료](http://www.arctrix.com/nas/python/gc/)를 보면 이전 버전에 비해 약 4%의 성능 저하의 원인으로 생각한다고 한다.

이런 이유로 성능에 여유가 없거나, 순환참조를 피할 자신이 있다면 `gc.disable()`로 GC를 꺼도 된다.
대표적으로 [인스타그램](https://instagram-engineering.com/dismissing-python-garbage-collection-at-instagram-4dca40b29172)은 GC를 사용하지 않는다고 한다.

## 덤: 약한참조
다른 RC를 사용하는 언어를 사용한 분들은 들어본적이 있겠지만,
순환참조로 인한 메모리 누수를 피하는 또다른 방법은 **약한참조**가 있다.

쉽게 설명하면 참조는 하되, 레퍼런스 카운트는 올리지 않는 것이다.
파이썬은 `weakref`모듈을 통해 약한 참조를 사용할 수 있다.
```python
class Foo:
    child = None
    name = None

    def __init__(self, name):
        self.name = name

    def __del__(self):
        print('Foo("{}")가 메모리에서 제거 되었습니다'.format(self.name))

a = Foo("a")  # a의 ref count는 1
b = Foo("b")  # b의 ref count는 1

import weakref

# weakref를 사용했으므로 레퍼런스 카운트는 변화하지 않는다
a.child = weakref.ref(b)  # Foo("b")의 레퍼런스 카운트는 여전히 1 이다
b.child = weakref.ref(a)  # Foo("a")의 레퍼런스 카운트는 여전히 1 이다

# 그러나 접근은 가능하다
# child 자체는 weakref 객체이므로 호출을 통해 가리키는 객체를 가져올수 있다
print(a.child().name)
print(b.child().name)

a = 0  # Foo("a")의 레퍼런스 카운트는 1 감소해서 0 이다
# 소멸자가 호출된다

# 더이상 접근이 불가능하므로 None이 반환된다
print(b.child())

b = 0  # Foo("b")의 레퍼런스카운트는 1 감소해서 0 이다
# 소멸자가 호출된다
```
`weakref`는 접근이 가능하면 해당 객체를, 해당객체가 접근 불가능 하면 `None`을 반환한다.

# RC와 GIL
CPython은 멀티 *스레드*를 효율적으로 사용하지 못한다.
한 파이썬 프로세스는 한번에 한 스레드만 사용하며, 이를 GIL (Global interpreter lock) 이라고 부른다.

CPython에서 GIL을 제거하려는 시도는 종종 있지만, 아직까지는 GIL이 남아 있다.
그 이유중 하나가 바로 RC 때문이다.

다만 GIL 자체는 선택사항이며 원한다면 RC를 쓰고도 GIL을 제거 할 수도 있다.
잠시 다른 파이썬 구현체를 보자.

* Jython은 GC로 관리 하며, GIL이 없다
* IronPython은 GC로 메모리 관리 하며, GIL이 없다
* PyPy는 GC로 메모리 관리를 하며, GIL이 *있다*

PyPy가 대표적으로 GC만 사용하나, GIL이 존재한다.
그러나, PyPy는 2017년 8월 블로그글 [Let's remove the Global Interpreter Lock](https://morepypy.blogspot.kr/2017/08/lets-remove-global-interpreter-lock.html)를 통해 GIL을 제거할 수 있음을 알렸다.

PyPy의 블로그 글에 따르면 CPython에서 GIL을 제거하기 힘든 두가지 이유는 다음과 같다.

* how do we guard access to mutable data structures with locks and
* what to do with reference counting that needs to be guarded.

멀티스레드에서 발생하는 문제중 하나는 여러 스레드가 동시에 한 변수를 수정하려는 문제이다.
멀티스레드를 사용해본 경험이 있다면 `lock guard`와 `mutex`등을 보거나 사용해본 점이 있을 것이다.

그렇다면 스레드간 공유하는 객체는 읽기만 가능하고, 수정은 못하게 한다면 되지 않을까?
좋은 접근이지만 RC를 사용하면 쉽지많은 않은 일이다.

다시 위의 코드를 보자
```python
import sys


class Foo:
    pass

a = Foo()
print(sys.getrefcount(a))

def read_foo(foo):
    print(sys.getrefcount(foo)

read_foo(a)  # read_foo의 매개변수 foo가 a를 참조 있으므로 Foo의 레퍼런스 카운트는 증가하였다
# read_a 함수가 끝나면 레퍼런스 카운트는 다시 줄어든다
print(sys.getrefcount(a))
```
`getrefcount`는 객체의 레퍼런스 카운트 갯수를 구하는 함수다.
우리가 생각한 레퍼런스 카운트 횟수보다 좀 더 많을 텐데 [문서](https://docs.python.org/3/library/sys.html#sys.getrefcount)의 내용에 따르면, `getrefcount`함수를 실행하기 위해 매개변수로 참조 카운트가 증가 하여 그렇다.

내용으로 돌아가면 `read_foo`는 `a`의 내용을 읽기만 하고 수정하진 않았지만, 매개변수등 참조가 일어 날때마나 `obj_refcnt`는 증/감 한다.
여러 스레드가 동시에 참조를 만든다면 동시수정과 다름 없는 상태가 된다.

추가로 RC를 사용하고도 이 문제를 피할 방법 자체는 있다.
예를 들어 `std::atomic`이 있다([C++ 문서](http://www.cplusplus.com/reference/atomic/atomic/)).
atomic은 DB의 Atomic 성질 처럼 순서대로 진행하는걸 보장하는데,
즉 두 스레드가 거의 동시에 레퍼런스 카운트를 변화 하려고 하면, 먼저 요청한 스레드의 요청대로 한 obj_refcnt를 변화시키고, 그 다음 스레드 요청을 처리한다.

대표적인 예로 Rust의 `Rc`와 `ARc`가 있다.
Rust 자체는 무비용 추상화로 메모리를 관리하지만, 원한다면 RC로 관리되는 객체를 만들 수 있다.
이 경우 싱글 스레드면 `Rc`를 멀티 스레드면 `ARc`를 사용하면 되는데, `ARc`는 레퍼런스 카운트가 atomic 하게 동작한다.

Atomic을 보장하는 것은 추가적인 오버헤드가 있다는 이야기다.
실제로 ARc [문서](https://doc.rust-lang.org/std/sync/struct.Arc.html)를 보면,
원자성 보장은 일반 메모리 접근보다 비용이 많이 들고, 싱글스레드라면 비용을 줄이기 위에 `Rc`를 쓸 수 있다고 언급하고 있다.

현재 파이썬의 대부분은 싱글 스레드 환경이며, 멀티스레드를 위해 싱글스레드 저하를 선택할 것인가는 논쟁의 여지가 있다.
현재로는 파이썬 커뮤니티는 멀티스레드 사용을 위해 싱글스레드 성능이 저하 되는 해결을 받아 들이고 싶어 하지 않는다.
[파이썬 위키](https://wiki.python.org/moin/GlobalInterpreterLock?action=show&redirect=GIL)의 GIL 항목을 인용 하면
> The BDFL has said he will reject any proposal in this direction that slows down single-threaded programs.

BDFL은 파이썬 창시자 귀도 반 로썸을 말한다. 위키백과의 설명을 인용한다.

> 자비로운 종신독재자(BDFL, Benevolent Dictator for Life)란 소수의 오픈 소스 소프트웨어 개발 리더에게 부여되는 칭호이다. 주로 커뮤니티 내에서 논쟁이 있을 때 최종적으로 결론을 내려줄 수 있는, 프로젝트 창시자인 경우가 많다. 이 표현은 1995년에 파이썬의 창시자 귀도 반 로섬을 가리키는 호칭으로 처음 사용되었다.

개인적으로도 멀티스레드를 위해 싱글스레드 성능저하가 심각하다면 받아 들이고 싶지 않다.

실제로 파이썬에 atomic 레퍼런스 카운트를 사용하게되면 [약 23%의 성능저하](https://greek0.net/blog/2015/05/23/python_atomic_refcounting_slowdown/)를 보인다고 한다.

공유하는 객체만 원자성 보장을 하면 어떨까?
멀티 스레드를 사용하는 코딩을 해도 스레드간 공유될 객체가 몇 안될 것 같다고 생각한다면,
파이썬 콘솔을 켜서 다음 코드를 실행해 보길 권한다.
```python
>>> import sys
>>> sys.getrefcount(None)
2296
```
글을 시작하며 언급한것 처럼 파이썬의 모든건 객체다.
단순한 값으로 생각할 수 있는 `None`도 하나의 객체며 여러곳에서 공유하고 있다.
왜 어려운 문제인지 짐작 할 수 있을 것이다.
