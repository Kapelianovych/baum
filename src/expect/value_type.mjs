// @flow

export function isString(given: mixed): boolean %checks {
  return typeof given === 'string'
}

export function isNumber(given: mixed): boolean %checks {
  return typeof given === 'number'
}

export function isNaN(given: mixed): boolean %checks {
  return Object.is(given, NaN)
}

export function isBoolean(given: mixed): boolean %checks {
  return typeof given === 'boolean'
}

export function isNull(given: mixed): boolean %checks {
  return Object.is(given, null)
}

export function isUndefined(given: mixed): boolean %checks {
  return Object.is(given, undefined)
}

export function isFunction(given: mixed): boolean %checks {
  return typeof given === 'function'
}

export function isPromise(given: mixed): boolean %checks {
  return given instanceof Promise
}

export function isArray(given: mixed): boolean %checks {
  return Array.isArray(given)
}

export function isSet(given: mixed): boolean %checks {
  return given instanceof Set
}
export function isWeakSet(given: mixed): boolean %checks {
  return given instanceof WeakSet
}

export function isMap(given: mixed): boolean %checks {
  return given instanceof Map
}

export function isWeakMap(given: mixed): boolean %checks {
  return given instanceof WeakMap
}

export function isRegExp(given: mixed): boolean %checks {
  return given instanceof RegExp
}

export function isPlainObject(given: mixed): boolean %checks {
  return (
    typeof given === 'object' &&
    !isNull(given) &&
    !isArray(given) &&
    !isSet(given) &&
    !isWeakSet(given) &&
    !isMap(given) &&
    !isWeakMap(given) &&
    !isPromise(given) &&
    !isRegExp(given)
  )
}

export function isTruthy(given: mixed): boolean %checks {
  return !!given
}
