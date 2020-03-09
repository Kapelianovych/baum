// @flow

import { passed, notPassed, groupTitle } from './viewers/console.mjs'
export { expect } from './expect/expect.mjs'

export async function group(title: string, fn: () => Promise<void>) {
  groupTitle(title)

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
