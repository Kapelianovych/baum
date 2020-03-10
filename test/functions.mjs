import { group, test, expect } from '../dist/index.mjs'

group('Test functions', () => {
  test('Test "toThrow()": function throws an error', () => {
    expect(() => { throw new Error('Error') }).toThrow()
  })

  test('Test "toThrow()": function throws an error with message "Error"', () => {
    expect(() => { throw new Error('Error') }).toThrow(new Error('Error'))
  })

  test('Test "toNotThrow()": function is not throw an error', () => {
    expect(() => {}).toNotThrow()
  })
})
