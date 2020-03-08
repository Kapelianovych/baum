import { group, test, expect } from '../dist/index.mjs'

group('Self tests', () => {
  test('Test "toEqual()": 1 === 1', () => {
    expect(1).toEqual(1)
  })

  test('Test "toNotEqual()": 1 !== 2', () => {
    expect(1).toNotEqual(2)
  })

  test('Test "toEqual()": { a: 1 } === { a: 1 }', () => {
    expect({ a: 1 }).toEqual({ a: 1 })
  })

  test('Test "toNotEqual()": { a: 1 } !== { a: 2 }', () => {
    expect({ a: 1 }).toNotEqual({ a: 2 })
  })

  test('Test "toEqual()": [1] === [1]', () => {
    expect([1]).toEqual([1])
  })

  test('Test "toNotEqual()": [1] !== ["a"]', () => {
    expect([1]).toNotEqual(['a'])
  })

  test('Test "toEqual()": new Set([1]) === new Set([1])', () => {
    expect(new Set([1])).toEqual(new Set([1]))
  })

  test('Test "toNotEqual()": new Set([1]) !== new Set(["a"])', () => {
    expect(new Set([1])).toNotEqual(new Set(['a']))
  })

  test('Test "resolves()": Promise must resolves properly', async () => {
    await expect(Promise.resolve(1)).resolves()
  })

  test('Test getting value from Promise and checking it', async () => {
    ;(await expect(Promise.resolve(1)).resolves()).toEqual(1)
  })

  test('Check Promise rejecting', async () => {
    await expect(Promise.reject(new Error('Error'))).rejects()
  })

  test('Check Promise rejecting with expected error', async () => {
    await expect(Promise.reject(new Error('Error'))).rejects(new Error('Error'))
  })
})
