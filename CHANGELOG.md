# 0.3.0

- Add new methods for examining literals:
```javascript
isNumber: () => void,
isNotNumber: () => void,
isString: () => void,
isNotString: () => void,
isNaN: () => void,
isNotNaN: () => void,
isBoolean: () => void,
isNotBoolean: () => void,
isArray: () => void,
isNotArray: () => void,
isSet: () => void,
isNotSet: () => void,
isWeakSet: () => void,
isNotWeakSet: () => void,
isMap: () => void,
isNotMap: () => void,
isWeakMap: () => void,
isNotWeakMap: () => void,
isNull: () => void,
isNotNull: () => void,
isUndefined: () => void,
isNotUndefined: () => void
```
- Make `group` and `test` functions syncronous, so output of tests will be in execution order.
- Smal reorganization of library.

## 0.2.2

- Fix errors equality in `toThrow(error)` method.
- Join error messages.

## 0.2.1

- Fix `Map` equality.

## 0.2.0

- Create `toMatch()` function.
- Create `toNotMatch()` function.
- Make error messages more clear.
- Update typings.
- Update README.

## 0.1.0

- Create `group()` function.
- Create `test()` function.
- Create `expect()` function. Realize checking for checking equality of literals, objects, `Array`s, `Set`s, `Map`s; checking for throwed `Error`s by functions and checking for resolving or rejecting of `Promise`s.
- Write tests.
- Write documentations.

## 0.0.1

- Initial commit. Creating a library.