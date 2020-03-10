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
  isPlainObject
} from './value_type.mjs'

type ExpectChecks = {
  toEqual: (expected: mixed) => void,
  toNotEqual: (expected: mixed) => void,
  toThrow: (expectedError?: Error) => void,
  toNotThrow: () => void,
  toMatch: (expected: string | RegExp) => void,
  toNotMatch: (expected: string | RegExp) => void,
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
  isNotUndefined: () => void,
  isFunction: () => void,
  isNotFunction: () => void,
  isPromise: () => void,
  isNotPromise: () => void,
  isPlainObject: () => void,
  isNotPlainObject: () => void,
  toBeResolved: () => Promise<ExpectChecks>,
  toBeRejected: (expectedError?: Error) => Promise<void>,
}

export function expect(given: mixed): ExpectChecks {
  return {
    toEqual(expected: mixed) {
      const isEqual = equal(given, expected)
      if (!isEqual) {
        throw new BaumError(
          // $FlowFixMe
          `${given.toString()} is not equal to ${expected.toString()}`
        )
      }
    },
    toNotEqual(expected: mixed) {
      const isEqual = equal(given, expected)
      if (isEqual) {
        throw new BaumError(
          // $FlowFixMe
          `${given.toString()} is equal to ${expected.toString()}`
        )
      }
    },
    toThrow(expectedError?: Error) {
      if (typeof given !== 'function') {
        throw new TypeError(
          `Tested parameter is not function type! Actual: ${typeof given}`
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
      if (!receivedError) {
        throw new BaumError(`"${given.name}" do not throw an error!`)
      } else if (expectedError) {
        if (
          receivedError.name !== expectedError.name ||
          receivedError.message !== expectedError.message
        ) {
          throw new BaumError(`"${given.name}" throws error that do not equal to expected
        Given name: ${receivedError.name} - expected name: ${expectedError.name}
          Given message: ${receivedError.message} - expected message: ${expectedError.message}`)
        }
      }
    },
    toNotThrow() {
      if (typeof given !== 'function') {
        throw new TypeError(
          `Tested parameter is not function type! Given: ${typeof given}`
        )
      }

      try {
        // $FlowFixMe - given may be only function
        given()
      } catch (error) {
        throw new BaumError(`"${given.name}" throw an error!`, error)
      }
    },
    toMatch(expected: string | RegExp) {
      const isMatched = match(given, expected)
      if (!isMatched) {
        throw new BaumError(
          // $FlowFixMe - given is a string, otherwise match throws an error
          `"${given}" does not match to ${expected.toString()}`
        )
      }
    },
    toNotMatch(expected: string | RegExp) {
      const isMatched = match(given, expected)
      if (isMatched) {
        throw new BaumError(
          // $FlowFixMe - given is a string, otherwise match throws an error
          `"${given}" match to ${expected.toString()}`
        )
      }
    },
    isString() {
      const isType = isString(given)
      if (!isType) {
        throw new BaumError(
          // $FlowFixMe - given is a string, otherwise match throws an error
          `"${given}" is not type of "string"`
        )
      }
    },
    isNotString() {
      const isType = isString(given)
      if (isType) {
        throw new BaumError(
          // $FlowFixMe - given is a string, otherwise match throws an error
          `"${given}" is type of "string"`
        )
      }
    },
    isNumber() {
      const isType = isNumber(given)
      if (!isType) {
        throw new BaumError(
          // $FlowFixMe - given is a number, otherwise match throws an error
          `"${given}" is not type of "number"`
        )
      }
    },
    isNotNumber() {
      const isType = isNumber(given)
      if (isType) {
        throw new BaumError(
          // $FlowFixMe - given is a number, otherwise match throws an error
          `"${given}" is type of "number"`
        )
      }
    },
    isNaN() {
      const isType = isNaN(given)
      if (!isType) {
        throw new BaumError(
          // $FlowFixMe - given is a NaN, otherwise match throws an error
          `"${given}" is not "NaN"`
        )
      }
    },
    isNotNaN() {
      const isType = isNaN(given)
      if (isType) {
        throw new BaumError(
          // $FlowFixMe - given is a NaN, otherwise match throws an error
          `"${given}" is "NaN"`
        )
      }
    },
    isBoolean() {
      const isType = isBoolean(given)
      if (!isType) {
        throw new BaumError(
          // $FlowFixMe - given is a boolean, otherwise match throws an error
          `"${given}" is not type of "boolean"`
        )
      }
    },
    isNotBoolean() {
      const isType = isBoolean(given)
      if (isType) {
        throw new BaumError(
          // $FlowFixMe - given is a boolean, otherwise match throws an error
          `"${given}" is type of "boolean"`
        )
      }
    },
    isNull() {
      const isType = isNull(given)
      if (!isType) {
        throw new BaumError(
          // $FlowFixMe - given is a null, otherwise match throws an error
          `"${given}" is not "null"`
        )
      }
    },
    isNotNull() {
      const isType = isNull(given)
      if (isType) {
        throw new BaumError(
          // $FlowFixMe - given is a null, otherwise match throws an error
          `"${given}" is "null"`
        )
      }
    },
    isUndefined() {
      const isType = isUndefined(given)
      if (!isType) {
        throw new BaumError(
          // $FlowFixMe - given is a undefined, otherwise match throws an error
          `"${given}" is not "undefined"`
        )
      }
    },
    isNotUndefined() {
      const isType = isUndefined(given)
      if (isType) {
        throw new BaumError(
          // $FlowFixMe - given is a undefined, otherwise match throws an error
          `"${given}" is "undefined"`
        )
      }
    },
    isArray() {
      const isType = isArray(given)
      if (!isType) {
        throw new BaumError(
          // $FlowFixMe - given is a array, otherwise match throws an error
          `"${given}" is not "array"`
        )
      }
    },
    isNotArray() {
      const isType = isArray(given)
      if (isType) {
        throw new BaumError(
          // $FlowFixMe - given is a array, otherwise match throws an error
          `"${given}" is "array"`
        )
      }
    },
    isSet() {
      const isType = isSet(given)
      if (!isType) {
        throw new BaumError(
          // $FlowFixMe - given is a Set, otherwise match throws an error
          `"${given}" is not "Set"`
        )
      }
    },
    isNotSet() {
      const isType = isSet(given)
      if (isType) {
        throw new BaumError(
          // $FlowFixMe - given is a Set, otherwise match throws an error
          `"${given}" is "Set"`
        )
      }
    },
    isWeakSet() {
      const isType = isWeakSet(given)
      if (!isType) {
        throw new BaumError(
          // $FlowFixMe - given is a WeakSet, otherwise match throws an error
          `"${given}" is not "WeakSet"`
        )
      }
    },
    isNotWeakSet() {
      const isType = isWeakSet(given)
      if (isType) {
        throw new BaumError(
          // $FlowFixMe - given is a WeakSet, otherwise match throws an error
          `"${given}" is "WeakSet"`
        )
      }
    },
    isMap() {
      const isType = isMap(given)
      if (!isType) {
        throw new BaumError(
          // $FlowFixMe - given is a Map, otherwise match throws an error
          `"${given}" is not "Map"`
        )
      }
    },
    isNotMap() {
      const isType = isMap(given)
      if (isType) {
        throw new BaumError(
          // $FlowFixMe - given is a Map, otherwise match throws an error
          `"${given}" is "Map"`
        )
      }
    },
    isWeakMap() {
      const isType = isWeakMap(given)
      if (!isType) {
        throw new BaumError(
          // $FlowFixMe - given is a WeakMap, otherwise match throws an error
          `"${given}" is not "WeakMap"`
        )
      }
    },
    isNotWeakMap() {
      const isType = isWeakMap(given)
      if (isType) {
        throw new BaumError(
          // $FlowFixMe - given is a WeakMap, otherwise match throws an error
          `"${given}" is "WeakMap"`
        )
      }
    },
    isFunction() {
      const isType = isFunction(given)
      if (!isType) {
        throw new BaumError(
          // $FlowFixMe - given is a function, otherwise match throws an error
          `"${given}" is not a "function"`
        )
      }
    },
    isNotFunction() {
      const isType = isFunction(given)
      if (isType) {
        throw new BaumError(
          // $FlowFixMe - given is a function, otherwise match throws an error
          `"${given}" is a "function"`
        )
      }
    },
    isPlainObject() {
      const isType = isPlainObject(given)
      if (!isType) {
        throw new BaumError(
          // $FlowFixMe - given is a function, otherwise match throws an error
          `"${given}" is not a "plain object"`
        )
      }
    },
    isNotPlainObject() {
      const isType = isPlainObject(given)
      if (isType) {
        throw new BaumError(
          // $FlowFixMe - given is a function, otherwise match throws an error
          `"${given}" is a "plain object"`
        )
      }
    },
    isPromise() {
      const isType = isPromise(given)
      if (!isType) {
        throw new BaumError(
          // $FlowFixMe - given is a function, otherwise match throws an error
          `"${given}" is not a "Promise"`
        )
      }
    },
    isNotPromise() {
      const isType = isPromise(given)
      if (isType) {
        throw new BaumError(
          // $FlowFixMe - given is a function, otherwise match throws an error
          `"${given}" is a "Promise"`
        )
      }
    },
    async toBeResolved() {
      if (!(given instanceof Promise)) {
        throw new TypeError(`In order to check rejecting Promise, you must pass to "expect()" "Promise",
        but received "${typeof given}"`)
      }

      let value = null

      try {
        // $FlowFixMe - given may be Promise and function
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
        // $FlowFixMe - given may be Promise and function
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
