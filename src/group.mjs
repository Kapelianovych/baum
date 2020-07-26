// @flow

import Logger from './loggers/logger.mjs'
import type { TestObject } from './test.mjs'

type TestHooks = {
  beforeAll?: () => void,
  afterAll?: () => void,
  beforeEach?: () => void,
  afterEach?: () => void,
}

const defaultLogger = new Logger()

export async function group(
  groupTitle: string,
  fn: () => TestObject[],
  hooks?: TestHooks = {}
) {
  const { beforeAll, afterAll, beforeEach, afterEach } = hooks

  const arrayOfTestsObjects = fn()
  const results = []

  if (beforeAll) {
    beforeAll()
  }

  for (const { title, fn } of arrayOfTestsObjects) {
    if (beforeEach) {
      beforeEach()
    }

    try {
      const maybePromise = fn()
      if (maybePromise instanceof Promise) {
        await maybePromise
      }
      results.push({
        test: title,
        passed: true,
      })
    } catch (error) {
      results.push({
        test: title,
        passed: error,
      })
    }

    if (afterEach) {
      afterEach()
    }
  }

  defaultLogger.log(groupTitle, results)

  /**
   * If user will log some to console, it will be showed after all test results.
   */
  if (afterAll) {
    afterAll()
  }
}
