---
title: "Under the C: 소개"
date: 2018-04-11 11:41:22
thumbnail:
  url: ./thumbnail.jpg
summary: CPython의 구현을 살펴봅시다
tags:
  - Python
  - Under the C
---
# 소개
* Under the C 시리즈는 작년, 파이썬에 [아주 작은 기여](https://github.com/python/cpython/pull/3085)를 하며 공부한 내용을 정리한 글 입니다.
* 잘못된 내용을 알려주신다면, 최대한 빨리 수정하도록 하겠습니다
* 파이썬 구현체는 계속 발전하고 있으므로, 이 글의 내용과 다소 달라질 수 있습니다.
* 특별한 언급이 없다면, 파이썬은 공식 구현체인
[CPython](https://github.com/python/cpython)의 파이썬 3.x 구현을 의미합니다.

# 들어가며
파이썬은 `인터프리터 언어`다. 사소한 말이지만 몇가지 사실을 품고 있다.
코드를 한줄 한줄 읽고 실행을 하는 인터프리터 언어는 컴파일 언어에 비해 최적화의 여지가 적다.

인터프리터 언어를 다룬다면, 같은 결과가 나오는 코드를 작성하여도,
프로그래머의 최적화, 언어의 이해도에 따라 꽤 다른 실행을 하는 코드를 작성할 수 있다.

몇가지 동일한 결과를 내는 파이썬 코드를 비교해보자.

# 코드 최적화
다음 코드를 보자.
```python
fruits = dict()
fruits['apple'] = 10
fruits['strawberry'] = 20
```
빈 딕셔너리를 만들고 두쌍의 키-값을 할당했다. 위의 코드는 어떤 바이트 코드를 만들까?

```python
from dis import dis
code = '''
fruits = dict()
fruits['apple'] = 10
fruits['strawberry'] = 20
'''
co = compile(code, '<string>', 'exec')
dis(co)
```
위 코드로 바이트 코드를 확인 할 수 있다. `dis` 모듈은 파이썬의 내장 모듈로, 바이트코드 역어셈블러 모듈이다.

위 코드를 인터프리터 모드에서 실행하면 다음와 같은 결과를 볼 수 있다.
```log
  2           0 LOAD_NAME                0 (dict)
              2 CALL_FUNCTION            0
              4 STORE_NAME               1 (fruits)

  3           6 LOAD_CONST               0 (10)
              8 LOAD_NAME                1 (fruits)
             10 LOAD_CONST               1 ('apple')
             12 STORE_SUBSCR

  4          14 LOAD_CONST               2 (20)
             16 LOAD_NAME                1 (fruits)
             18 LOAD_CONST               3 ('strawberry')
             20 STORE_SUBSCR
             22 LOAD_CONST               4 (None)
             24 RETURN_VALUE
```

딕셔너리를 만드는, 더 파이썬다운 코드는 제너릭을 이용하는 것 이다.
```python
fruits = {
    'apple': 10,
    'strawberry': 20,
}
```

위 코드도 같은 바이트코드를 만들까? 한번 코드의 바이트코드를 한번 확인해보자.
```python
from dis import dis
code = '''
fruits = {
    'apple': 10,
    'strawberry': 20,
}
'''
co = compile(code, '<string>', 'exec')
dis(co)
```

```log
  3           0 LOAD_CONST               0 (10)

  4           2 LOAD_CONST               1 (20)
              4 LOAD_CONST               2 (('apple', 'strawberry'))
              6 BUILD_CONST_KEY_MAP      2
              8 STORE_NAME               0 (fruits)
             10 LOAD_CONST               3 (None)
             12 RETURN_VALUE
```

같은 역할을 하지만 서로 다른 바이트코드를 생성하는 것을 확인 할 수 있다.
사실 이 예제는 파이썬 입장에선 조금 억울 하고, 최적화가 쉽지 않을 수 있다.
파이썬 인터프리터에게 첫번째 코드는 3줄의 코드이며, 두번째 코드는 한줄의 코드이기 때문이다.
(파이썬은 괄호안의 줄바꿈을 무시한다)

그렇다면 한가지 예를 더 살펴 보자.
PyConKR 2017에서 차영호님이 라이트닝 토크 시간에 발표한,
[Back to the Low Level](https://docs.google.com/presentation/d/1mpgEviFIolgPLy3tYjK2DIEWRKT671vJdb4RCiXvCyY/)
에서 코드와 내용을 가져왔다.

```python
A = False
if A != True:
    pass
```

```python
from dis import dis
code = '''
A = False
if A != True:
    pass
'''
co = compile(code, '<string>', 'exec')
dis(co)
```

```log
  2           0 LOAD_CONST               0 (False)
              2 STORE_NAME               0 (A)

  3           4 LOAD_NAME                0 (A)
              6 LOAD_CONST               1 (True)
              8 COMPARE_OP               3 (!=)
             10 POP_JUMP_IF_FALSE       12

  4     >>   12 LOAD_CONST               2 (None)
             14 RETURN_VALUE
```

위 코드보다 더 파이썬 다운 코드는 아래와 같다. (조건문 실행여부를 이미 알고 있는건 넘어가자)
```python
A = False
if not A:
    pass
```
```python
from dis import dis
code = '''
A = False
if not A:
    pass
'''
co = compile(code, '<string>', 'exec')
dis(co)
```
```log
  2           0 LOAD_CONST               0 (False)
              2 STORE_NAME               0 (A)

  3           4 LOAD_NAME                0 (A)
              6 POP_JUMP_IF_TRUE         8

  4     >>    8 LOAD_CONST               1 (None)
             10 RETURN_VALUE
```
위 코드는 매우 비슷하며, 같은 역할을 하지만, 두 코드는 서로 다른 바이트코드를 만들었고, 연산 횟수도 다르다.

## Under the C
위의 두 코드를 C언어레벨에서 확인하면 더 두드러진 차이를 볼 수 있다.
마찬가지로 PyConKR 2017에서 차영호님이 라이트닝 토크 시간에 발표한,
[Back to the Low Level](https://docs.google.com/presentation/d/1mpgEviFIolgPLy3tYjK2DIEWRKT671vJdb4RCiXvCyY/)
에서 코드와 내용을 가져왔다.

```python
if A != True:
    pass
```
파이썬 인터프리터에게 위 코드는 다음의 C 코드와 같다.

```c
PyObject *T = Py_True;
Py_INCREF(T);
if (PyObject_RichCompareBool(A, T, Py_NE)) {
}
Py_DECREF(T);
```

그리고 이 코드는
```python
if not A:
    pass
```
다음의 코드와 같다
```c
if (PyObject_Not(A)) {
}
```
왜 파이썬 다운 코드를 작성해야하는지 이해할 수 있을 것이다.

## 여담
파이썬다운 코드가 항상 성능 향상을 약속하진 않다, 예를 들어 `elif`가 있다.

```python
from dis import dis

def print_2(raw):
    if raw == 2:
        print(raw)
    else:
        if raw == 1:
            print(raw)
        else:
            print(2)

dis(print_2)
```
```log
  2           0 LOAD_FAST                0 (raw)
              2 LOAD_CONST               1 (2)
              4 COMPARE_OP               2 (==)
              6 POP_JUMP_IF_FALSE       18

  3           8 LOAD_GLOBAL              0 (print)
             10 LOAD_FAST                0 (raw)
             12 CALL_FUNCTION            1
             14 POP_TOP
             16 JUMP_FORWARD            26 (to 44)

  5     >>   18 LOAD_FAST                0 (raw)
             20 LOAD_CONST               2 (1)
             22 COMPARE_OP               2 (==)
             24 POP_JUMP_IF_FALSE       36

  6          26 LOAD_GLOBAL              0 (print)
             28 LOAD_FAST                0 (raw)
             30 CALL_FUNCTION            1
             32 POP_TOP
             34 JUMP_FORWARD             8 (to 44)

  8     >>   36 LOAD_GLOBAL              0 (print)
             38 LOAD_CONST               1 (2)
             40 CALL_FUNCTION            1
             42 POP_TOP
        >>   44 LOAD_CONST               0 (None)
             46 RETURN_VALUE
```

```python
from dis import dis

def print_2(raw):
    if raw == 2:
        print(raw)
    elif raw == 1:
        print(raw)
    else:
        print(2)

dis(print_2)
```
```log
  2           0 LOAD_FAST                0 (raw)
              2 LOAD_CONST               1 (2)
              4 COMPARE_OP               2 (==)
              6 POP_JUMP_IF_FALSE       18

  3           8 LOAD_GLOBAL              0 (print)
             10 LOAD_FAST                0 (raw)
             12 CALL_FUNCTION            1
             14 POP_TOP
             16 JUMP_FORWARD            26 (to 44)

  4     >>   18 LOAD_FAST                0 (raw)
             20 LOAD_CONST               2 (1)
             22 COMPARE_OP               2 (==)
             24 POP_JUMP_IF_FALSE       36

  5          26 LOAD_GLOBAL              0 (print)
             28 LOAD_FAST                0 (raw)
             30 CALL_FUNCTION            1
             32 POP_TOP
             34 JUMP_FORWARD             8 (to 44)

  7     >>   36 LOAD_GLOBAL              0 (print)
             38 LOAD_CONST               1 (2)
             40 CALL_FUNCTION            1
             42 POP_TOP
        >>   44 LOAD_CONST               0 (None)
             46 RETURN_VALUE
```
줄번호는 다르지만 같은 바이트코드를 생성하는 걸 볼 수 있다. `elif`는 그저 문법 설탕이다.

# 마치며
> 섣부른 최적화는 만악의 근원이다 — 도널드 커누스

사실 언어적 특성이 코딩에 미치는 영향보단, 프로그램의 로직이 더 중요하다고 생각한다.

그러나 파이썬 인터프리터 (C언어) 아래에서 일어나는 일을 이해한다면,
분명 더 나은 프로그래머가 될 수 있을 것이고, 재미있는 특성들도 알게 될 것이다.

다음에는 파이썬을 이해하는데 매우 중요한 `PyObject`를 다룰 예정이다.
