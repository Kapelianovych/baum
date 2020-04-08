// @flow

declare module '@prostory/baum' {
  declare export class BaumError extends Error {
    constructor(message: string, error?: Error): BaumError;

    toString(): string;
  }

  declare export function group(
    groupTitle: string,
    fn: () => (TestResult | Promise<TestResult>)[]
  ): Promise<void>

  declare export function test(
    title: string,
    fn: () => Promise<void> | void
  ): Promise<TestResult> | TestResult

  declare export function expect(given: mixed): ExpectChecks

  declare type ExpectRightChecks = {
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
    toBeTruthy: () => void,
  }

  declare type ExpectChecks = {
    ...ExpectRightChecks,
    not: {
      ...ExpectRightChecks,
    },
    toBeResolved: () => Promise<ExpectChecks>,
    toBeRejected: (expectedError?: Error) => Promise<void>,
  }

  declare type TestResult = {
    test: string,
    passed: true | BaumError,
  }
}
