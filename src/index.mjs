// @flow

import type { TestResult } from './loggers/logger.mjs'
import Logger from './loggers/logger.mjs'
export { expect } from './expect/expect.mjs'

const defaultLogger = new Logger()

export async function group(
  groupTitle: string,
  fn: () => (TestResult | Promise<TestResult>)[]
) {
  const results = await Promise.all(fn())

  defaultLogger.log(groupTitle, results)
}

export async function test(
  title: string,
  fn: () => Promise<void> | void
): Promise<TestResult> {
  try {
    const maybePromise = fn()

    if (maybePromise instanceof Promise) {
      await maybePromise
    }

    return {
      test: title,
      passed: true,
    }
  } catch (error) {
    return {
      test: title,
      passed: error,
    }
  }
}
