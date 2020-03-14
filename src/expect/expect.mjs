// @flow

import BaumError from '../baum_error.mjs'
import { match, equal } from './equality.mjs'
import {
  isString,
  isNumber,
  isBoolean,
  isNaN,
  isArray,
  isSet,
  isWeakSet,
  isMap,
  isWeakMap,
  isNull,
  isUndefined,
  isFunction,
  isPromise,
  isPlainObject,
  isRegExp,
} from './value_type.mjs'
import { coerce } from '../utils/coerce.mjs'

type ExpectRightChecks = {
  toEqual: (expected: mixed) => void,
  toThrow: (expectedError?: Error) => void,
  toMatch: (expected: string | RegExp) => void,
  toBe: (
    type: 'string'
      | 'number'
      | 'NaN'
      | 'boolean'
      | 'null'
      | 'undefined'
      | 'function'
      | 'PlainObject'
      | 'Set'
      | 'Map'
      | 'RegExp'
      | 'WeakMap'
      | 'WeakSet'
      | 'Promise'
      | 'Array'
  ) => void,
}

type ExpectChecks = {
  ...ExpectRightChecks,
  not: {
    ...ExpectRightChecks,
  },
  toBeResolved: () => Promise<ExpectChecks>,
  toBeRejected: (expectedError?: Error) => Promise<void>,
}

export function expect(given: mixed): ExpectChecks {
  return {
    ...checks(given, false),
    not: {
      ...checks(given, true),
    },
    async toBeResolved() {
      if (!(given instanceof Promise)) {
        throw new TypeError(`In order to check rejecting Promise, you must pass to "expect()" "Promise",
        but received "${typeof given}"`)
      }

      let value = null

      try {
        // $FlowFixMe - given may be only Promise
        value = await given
      } catch (error) {
        throw new BaumError('"Promise" is not resolved!', error)
      }

      return expect(value)
    },
    async toBeRejected(expectedError?: Error) {
      if (!(given instanceof Promise)) {
        throw new TypeError(`In order to check rejecting Promise, you must pass to "expect()" "Promise",
        but received "${typeof given}"`)
      }

      let receivedError: ?Error = null

      try {
        // $FlowFixMe - given may be only Promise
        await given
      } catch (error) {
        if (error) {
          receivedError = error
        }
      }
      if (!receivedError) {
        throw new BaumError('"Promise" is not rejected!')
      } else if (expectedError) {
        if (
          expectedError.name !== receivedError.name ||
          expectedError.message !== receivedError.message
        ) {
          throw new BaumError(`Rejection error: actual error is not equal to expected:
          Given name: ${receivedError.name} - expected name: ${expectedError.name}
          Given message: ${receivedError.message} - expected message: ${expectedError.message}`)
        }
      }
    },
  }
}

function checks(given: mixed, not: boolean) {
  let testPassed = false

  return {
    toEqual(expected: mixed) {
      testPassed = equal(given, expected)
      if (needToThrowError(testPassed, not)) {
        throw new BaumError(
          `${coerce(given)} is ${not ? '' : 'not'} equal to ${coerce(expected)}`
        )
      }
    },
    toThrow(expectedError?: Error) {
      if (typeof given !== 'function') {
        throw new TypeError(
          `Tested parameter is not function type! Actual: ${coerce(given)}`
        )
      }

      let receivedError: ?Error = null

      try {
        // $FlowFixMe - given may be only function
        given()
      } catch (error) {
        if (error) {
          receivedError = error
        }
      }

      testPassed = !!receivedError

      if (!not && !needToThrowError(testPassed, not)) {
        if (
          receivedError &&
          expectedError &&
          receivedError.name !== expectedError.name &&
            receivedError.message !== expectedError.message
        ) {
          throw new BaumError(`"${given.name}" throws error that ${
            not ? '' : 'do not'
          } equal to expected
        Given name: ${receivedError.name} - expected name: ${expectedError.name}
          Given message: ${receivedError.message} - expected message: ${
            expectedError.message
          }`)
        }
      } else if (not) {
        if (
          receivedError &&
          expectedError &&
          receivedError.name !== expectedError.name &&
            receivedError.message !== expectedError.message
        ) {
          throw new BaumError(`"${given.name ||
            'function'}" throws error that ${
            not ? '' : 'do not'
          } equal to expected
        Given name: ${receivedError.name} - expected name: ${expectedError.name}
          Given message: ${receivedError.message} - expected message: ${
            expectedError.message
          }`)
        } else if (!receivedError && expectedError) {
          throw new BaumError(`"${given.name || 'function'}" must not throws "${
            expectedError.name
          }: ${expectedError.message}" error,
          but it is not throws any errors.`)
        } else if (receivedError && !expectedError) {
          throw new BaumError(`"${given.name}" throw an error!`)
        }
      } else {
        throw new BaumError(
          `"${given.name} ${not ? '' : 'does not'} throw an error!`
        )
      }
    },
    toBe(
      type: 'string'
        | 'number'
        | 'NaN'
        | 'boolean'
        | 'null'
        | 'undefined'
        | 'function'
        | 'PlainObject'
        | 'Set'
        | 'Map'
        | 'RegExp'
        | 'WeakMap'
        | 'WeakSet'
        | 'Promise'
        | 'Array'
    ) {
      switch (type) {
        case 'string':
          testPassed = isString(given)
          break
        case 'number':
          testPassed = isNumber(given)
          break
        case 'NaN':
          testPassed = isNaN(given)
          break
        case 'boolean':
          testPassed = isBoolean(given)
          break
        case 'null':
          testPassed = isNull(given)
          break
        case 'undefined':
          testPassed = isUndefined(given)
          break
        case 'function':
          testPassed = isFunction(given)
          break
        case 'PlainObject':
          testPassed = isPlainObject(given)
          break
        case 'Set':
          testPassed = isSet(given)
          break
        case 'WeakSet':
          testPassed = isWeakSet(given)
          break
        case 'Map':
          testPassed = isMap(given)
          break
        case 'WeakMap':
          testPassed = isWeakMap(given)
          break
        case 'RegExp':
          testPassed = isRegExp(given)
          break
        case 'Promise':
          testPassed = isPromise(given)
          break
        case 'Array':
          testPassed = isArray(given)
          break
        default:
          console.warn(`Unknown type: ${type}`)
      }

      if (needToThrowError(testPassed, not)) {
        switch (type) {
          case 'string':
            throw new BaumError(
              `"${coerce(given)}" is ${not ? '' : 'not'} type of "string"`
            )
          case 'number':
            throw new BaumError(
              `"${coerce(given)}" is ${not ? '' : 'not'} type of "number"`
            )
          case 'NaN':
            throw new BaumError(
              `"${coerce(given)}" is ${not ? '' : 'not'} type of "NaN"`
            )
          case 'boolean':
            throw new BaumError(
              `"${coerce(given)}" is ${not ? '' : 'not'} type of "boolean"`
            )
          case 'null':
            throw new BaumError(
              `"${coerce(given)}" is ${not ? '' : 'not'} type of "null"`
            )
          case 'undefined':
            throw new BaumError(
              `"${coerce(given)}" is ${not ? '' : 'not'} type of "undefined"`
            )
          case 'function':
            throw new BaumError(
              `"${coerce(given)}" is ${not ? '' : 'not'} type of "function"`
            )
          case 'PlainObject':
            throw new BaumError(
              `"${coerce(given)}" is ${not ? '' : 'not'} type of "plain object"`
            )
          case 'Set':
            throw new BaumError(
              `"${coerce(given)}" is ${not ? '' : 'not'} type of "Set"`
            )
          case 'WeakSet':
            throw new BaumError(
              `"${coerce(given)}" is ${not ? '' : 'not'} type of "WeakSet"`
            )
          case 'Map':
            throw new BaumError(
              `"${coerce(given)}" is ${not ? '' : 'not'} type of "Map"`
            )
          case 'WeakMap':
            throw new BaumError(
              `"${coerce(given)}" is ${not ? '' : 'not'} type of "WeakMap"`
            )
          case 'RegExp':
            throw new BaumError(
              `"${coerce(given)}" is ${not ? '' : 'not'} type of "RegExp"`
            )
          case 'Promise':
            throw new BaumError(
              `"${coerce(given)}" is ${not ? '' : 'not'} type of "Promise"`
            )
          case 'Array':
            throw new BaumError(
              `"${coerce(given)}" is ${not ? '' : 'not'} type of "Array"`
            )
          default:
            console.warn(`Unknown type: ${type}`)
        }
      }
    },
    toMatch(expected: string | RegExp) {
      testPassed = match(given, expected)
      if (needToThrowError(testPassed, not)) {
        throw new BaumError(
          `"${coerce(given)}" does ${not ? '' : 'not'} match to ${coerce(
            expected
          )}`
        )
      }
    },
  }
}

function needToThrowError(testPassed: boolean, not: boolean) {
  return not ? testPassed : !testPassed
}
