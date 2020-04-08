import { group, test, expect } from '../dist/index.mjs'

group('Test promises', () => {
  return [
    test('Test "toBeResolved()": Promise must toBeResolved properly', async () => {
      await expect(Promise.resolve(1)).toBeResolved()
    }),

    test('Test getting value from Promise and checking it', async () => {
      ;(await expect(Promise.resolve(1)).toBeResolved()).toEqual(1)
    }),

    test('Check Promise rejecting', async () => {
      await expect(Promise.reject(new Error('Error'))).toBeRejected()
    }),

    test('Check Promise rejecting with expected error', async () => {
      await expect(Promise.reject(new Error('Error'))).toBeRejected(
        new Error('Error')
      )
    }),
  ]
})
