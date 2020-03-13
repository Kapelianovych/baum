// @flow

import {
  isNull,
  isArray,
  isSet,
  isMap,
  isRegExp,
} from '../expect/value_type.mjs'

export function coerce(value: mixed): string {
  switch (typeof value) {
    case 'string':
    case 'number':
      return `${value}`
    case 'boolean':
      return value ? 'true' : 'false'
    case 'undefined':
      return 'undefined'
    case 'function':
      return value.toString()
    case 'object':
      return coerceObjects(value)
    default:
      // $FlowFixMe
      return `${value}`
  }
}

function coerceObjects(
  value: null | Map<mixed, mixed> | Set<mixed> | mixed[] | { +[string]: mixed }
) {
  if (isNull(value)) {
    return 'null'
  } else if (isArray(value)) {
    return stringifyArray(value)
  } else if (isSet(value)) {
    return stringifySet(value)
  } else if (isMap(value)) {
    return stringifyMap(value)
  } else if (isRegExp(value)) {
    return stringifyRegExp(value)
  } else {
    return JSON.stringify(value) || ''
  }
}

function stringifyArray(value: mixed[]) {
  return `[ ${value.map(coerce).join(',')} ]`
}

function stringifySet(value: Set<mixed>) {
  return `Set( ${Array.from(value).map(coerce).join(', ')} )`
}

function stringifyMap(value: Map<mixed, mixed>) {
  let stringifiedMap = 'Map( '
  for (const [key, val] of value.entries()) {
    stringifiedMap += `${coerce(key)}: ${coerce(val)}, `
  }
  return stringifiedMap + ')'
}

function stringifyRegExp(value: RegExp) {
  return value.toString()
}
