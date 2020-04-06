// @flow

import Collector from './collector.mjs'
import Logger from './loggers/logger.mjs'
export { expect } from './expect/expect.mjs'

const defaultCollector = new Collector()
const defaultLogger = new Logger()

export async function group(title: string, fn: () => Promise<void> | void) {
  defaultCollector.title = title

  const maybePromise = fn()

  if (maybePromise instanceof Promise) {
    await maybePromise
  }

  defaultLogger.log(defaultCollector.results)
  defaultCollector.remove(title)
}

export async function test(title: string, fn: () => Promise<void> | void) {
  try {
    const maybePromise = fn()

    if (maybePromise instanceof Promise) {
      await maybePromise
    }

    defaultCollector.passed(title, true)
  } catch (error) {
    defaultCollector.passed(title, error)
  }
}
