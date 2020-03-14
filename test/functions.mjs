import { group, test, expect } from '../dist/index.mjs'

group('Test functions', () => {
  test('Test "toThrow()": function throws an error', () => {
    expect(() => { throw new Error('Error') }).toThrow()
  })

  test('Test "toThrow()": function throws an error with message "Error"', () => {
    expect(() => { throw new Error('Error') }).toThrow(new Error('Error'))
  })

  test('Test "not.toThrow()": function is not throw an error', () => {
    expect(() => {}).not.toThrow()
  })
  test('Test "not.toThrow()": function is not throw Another error', () => {
    expect(() => { throw new Error('Error') }).not.toThrow(new Error('Another'))
  })
})
