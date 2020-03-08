// @flow

declare module '@prostory/baum' {
  declare export class BaumError extends Error {
    constructor(message: string, error?: Error): BaumError;

    toString(): string
  }

  declare export function group(title: string, fn: () => Promise<void>): Promise<void>

  declare export function test(title: string, fn: () => Promise<void>): Promise<void>

  declare export function expect(given: mixed): ExpectChecks

  declare type ExpectChecks = {
    toEqual: (expected: mixed) => void,
    toNotEqual: (expected: mixed) => void,
    toThrow: (expectedError?: Error) => void,
    toNotThrow: () => void,
    toBeResolved: () => Promise<ExpectChecks>,
    toBeRejected: (expectedError?: Error) => Promise<void>,
  }
}
