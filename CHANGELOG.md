# 0.6.0

**Breaking changes!**
- Remove collector layer.
- *fn* parameter of `group` function now returns array of `test` functions results.
- `test` function returns an object status about test now.
- Update README.

## 0.5.0

- Remake `group` and `test` functions asyncrounous. They may accept asyncronous functions now.
- Rewrite logging results logic.
- Add collector layer for properly structuring test results.
- Update README.

## 0.4.1

- Add `toBeTruthy()` method.

## 0.4.0

**Breaking changes!**
- Add `not` property to returning by `expect` function object, that contains reversed tests (`toMatch()` => `not.toMatch()` etc).
- Remove all `toNot...` and `isNot...` methods.
- Replace all `is...` methods with new `toBe(type: string)` method.
- Fix logging errors and chage `Array` log.

## 0.3.3

- Add `isRegExp` and `isNotRegExp` methods.
- Improved logging results of tests.

## 0.3.2

- `toEqual` and `toNotEqual` now can compare functions.

## 0.3.1

- Add new methods for examining types:
```javascript
isFunction: () => void,
isNotFunction: () => void,
isPromise: () => void,
isNotPromise: () => void,
isPlainObject: () => void,
isNotPlainObject: () => void,
```

## 0.3.0

- Add new methods for examining types:
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