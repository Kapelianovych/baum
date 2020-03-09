// @flow

import BaumError from './baum_error.mjs'
import { equal } from './utils/equality.mjs'

type ExpectChecks = {
  toEqual: (expected: mixed) => void,
  toNotEqual: (expected: mixed) => void,
  toThrow: (expectedError?: Error) => void,
  toNotThrow: () => void,
  toMatch: (expected: string | RegExp) => void,
  toNotMatch: (expected: string | RegExp) => void,
  toBeResolved: () => Promise<ExpectChecks>,
  toBeRejected: (expectedError?: Error) => Promise<void>,
}

export async function group(title: string, fn: () => Promise<void>) {
  console.log(`--- ${title} ---`)
  await fn()
}

export async function test(title: string, fn: () => Promise<void>) {
  try {
    await fn()
    passed(title)
  } catch (error) {
    notPassed(title, error)
  }
}

export function expect(given: mixed): ExpectChecks {
  return {
    toEqual(expected: mixed) {
      const isEqual = equal(given, expected)
      if (!isEqual) {
        // $FlowFixMe
        throw new BaumError(`${given.toString()} is not equal to ${expected.toString()}`)
      }
    },
    toNotEqual(expected: mixed) {
      const isEqual = equal(given, expected)
      if (isEqual) {
        // $FlowFixMe
        throw new BaumError(`${given.toString()} is equal to ${expected.toString()}`)
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
      if (typeof given !== 'string') {
        throw new TypeError(
          `Matched value must be of type "string", but given ${typeof given}`
        )
      }

      const regexpedExpected =
        typeof expected === 'string' ? new RegExp(expected) : expected

      const isMatched = regexpedExpected.test(given)
      if (!isMatched) {
        throw new BaumError(
          `"${given}" does not match to ${regexpedExpected.toString()}`
        )
      }
    },
    toNotMatch(expected: string | RegExp) {
      if (typeof given !== 'string') {
        throw new TypeError(
          `Matched value must be of type "string", but given ${typeof given}`
        )
      }

      const regexpedExpected =
        typeof expected === 'string' ? new RegExp(expected) : expected

      const isMatched = regexpedExpected.test(given)
      if (isMatched) {
        throw new BaumError(
          `"${given}" match to ${regexpedExpected.toString()}`
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

function passed(title: string) {
  console.log(`   +  Test: "${title}" successfully passed!`)
}

function notPassed(title: string, error: BaumError) {
  console.error(`   -  Test: "${title}" has errors!
    : ${error.toString()}

  ------ End of error ------`)
}
