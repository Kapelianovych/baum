import { group, test, expect } from '../dist/index.mjs'

group('Test methods, that exemine types', () => {
  test('1 is number', () => {
    expect(1).isNumber()
  })

  test('"1" is not number', () => {
    expect('1').isNotNumber()
  })
  test('NaN is NaN', () => {
    expect(NaN).isNaN()
  })

  test('1 is not NaN', () => {
    expect(1).isNotNaN()
  })

  test('"1" is string', () => {
    expect('1').isString()
  })

  test('1 is not string', () => {
    expect(1).isNotString()
  })

  test('true is boolean', () => {
    expect(true).isBoolean()
  })

  test('"true" is not boolean', () => {
    expect('true').isNotBoolean()
  })

  test('null is null', () => {
    expect(null).isNull()
  })

  test('"null" is not null', () => {
    expect('null').isNotNull()
  })

  test('undefined is undefined', () => {
    expect(undefined).isUndefined()
  })

  test('"undefined" is not undefined', () => {
    expect('undefined').isNotUndefined()
  })

  test('[] is Array', () => {
    expect([]).isArray()
  })

  test('{} is not Array', () => {
    expect({}).isNotArray()
  })

  test('Set is Set', () => {
    expect(new Set()).isSet()
  })

  test('{} is not Set', () => {
    expect({}).isNotSet()
  })

  test('WeakSet is WeakSet', () => {
    expect(new WeakSet()).isWeakSet()
  })

  test('Set is not WeakSet', () => {
    expect(new Set()).isNotWeakSet()
  })

  test('Map is Map', () => {
    expect(new Map()).isMap()
  })

  test('{} is not Map', () => {
    expect({}).isNotMap()
  })

  test('WeakMap is WeakMap', () => {
    expect(new WeakMap()).isWeakMap()
  })

  test('Map is not WeakMap', () => {
    expect(new Map()).isNotWeakMap()
  })
})
