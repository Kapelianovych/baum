import { group, test, expect } from '../dist/index.mjs'

group('Test promises', async () => {
  await test('Test "toBeResolved()": Promise must toBeResolved properly', async () => {
    await expect(Promise.resolve(1)).toBeResolved()
  })

  await test('Test getting value from Promise and checking it', async () => {
    ;(await expect(Promise.resolve(1)).toBeResolved()).toEqual(1)
  })

  await test('Check Promise rejecting', async () => {
    await expect(Promise.reject(new Error('Error'))).toBeRejected()
  })

  await test('Check Promise rejecting with expected error', async () => {
    await expect(Promise.reject(new Error('Error'))).toBeRejected(
      new Error('Error')
    )
  })
})
