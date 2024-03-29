// @flow

declare module '@prostory/baum' {
  declare export class BaumError extends Error {
    constructor(message: string, error?: Error): BaumError;

    toString(): string;
  }

  declare export function group(
    groupTitle: string,
    fn: () => TestObject[],
    hooks?: TestHooks,
  ): Promise<void>

  declare export function test(
    title: string,
    fn: () => Promise<void> | void
  ): TestObject

  declare export function expect(given: mixed): ExpectChecks

  declare type TestObject = {|
    title: string,
    fn: () => Promise<void> | void
  |}

  declare type TestHooks = {
    beforeAll?: () => void,
    afterAll?: () => void,
    beforeEach?: () => void,
    afterEach?: () => void,
  }

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
