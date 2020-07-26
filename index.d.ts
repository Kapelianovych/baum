declare module '@prostory/baum' {
  export class BaumError extends Error {
    constructor(message: string, error?: Error)

    toString(): string
  }

  export function group(
    groupTitle: string,
    fn: () => TestObject[],
    hooks?: TestHooks
  ): Promise<void>

  export function test(
    title: string,
    fn: () => Promise<void> | void
  ): TestObject

  export function expect(given: any): ExpectChecks

  type TestObject = {
    title: string
    fn: () => Promise<void> | void
  }

  type TestHooks = {
    beforeAll?: () => void
    afterAll?: () => void
    beforeEach?: () => void
    afterEach?: () => void
  }

  type ExpectRightChecks = {
    toEqual: (expected: any) => void
    toThrow: (expectedError?: Error) => void
    toMatch: (expected: string | RegExp) => void
    toBe: (
      type:
        | 'string'
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
    ) => void
    toBeTruthy: () => void
  }

  type ExpectChecks = ExpectRightChecks & {
    not: ExpectRightChecks
    toBeResolved: () => Promise<ExpectChecks>
    toBeRejected: (expectedError?: Error) => Promise<void>
  }

  type TestResult = {
    test: string
    passed: true | BaumError
  }
}
