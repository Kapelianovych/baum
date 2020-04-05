// @flow

import { passed, notPassed, groupTitle } from './viewers/console.mjs'
export { expect } from './expect/expect.mjs'

export async function group(title: string, fn: () => Promise<void> | void) {
  groupTitle(title)
  const maybePromise = fn()

  if (maybePromise instanceof Promise) {
    await maybePromise
  }
}

export async function test(title: string, fn: () => Promise<void> | void) {
  try {
    const maybePromise = fn()

    if (maybePromise instanceof Promise) {
      await maybePromise
    }

    passed(title)
  } catch (error) {
    notPassed(title, error)
  }
}
