// @flow

export function isString(given: mixed) {
  return typeof given === 'string'
}

export function isNumber(given: mixed) {
  return typeof given === 'number'
}

export function isNaN(given: mixed) {
  return Object.is(given, NaN)
}

export function isBoolean(given: mixed) {
  return typeof given === 'boolean'
}

export function isNull(given: mixed) {
  return Object.is(given, null)
}

export function isUndefined(given: mixed) {
  return Object.is(given, undefined)
}

export function isArray(given: mixed) {
  return Array.isArray(given)
}

export function isSet(given: mixed) {
  return given instanceof Set
}
export function isWeakSet(given: mixed) {
  return given instanceof WeakSet
}

export function isMap(given: mixed) {
  return given instanceof Map
}

export function isWeakMap(given: mixed) {
  return given instanceof WeakMap
}
