// @flow

import { passed, notPassed, groupTitle } from './viewers/console.mjs'
export { expect } from './expect/expect.mjs'

export function group(title: string, fn: () => void) {
  groupTitle(title)
  fn()
}

export function test(title: string, fn: () => Promise<void> | void) {
  try {
    const maybePromise = fn()

    if (maybePromise instanceof Promise) {
      maybePromise
        .then(() => {
          passed(title)
        })
        .catch(error => {
          notPassed(title, error)
        })
    } else {
      passed(title)
    }
  } catch (error) {
    notPassed(title, error)
  }
}
