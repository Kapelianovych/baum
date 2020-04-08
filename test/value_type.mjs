import { group, test, expect } from '../dist/index.mjs'

group('Test methods, that exemine types', () => {
  return [
    test('1 is number', () => {
      expect(1).toBe('number')
    }),

    test('"1" is not number', () => {
      expect('1').not.toBe('number')
    }),
    test('NaN is NaN', () => {
      expect(NaN).toBe('NaN')
    }),

    test('1 is not NaN', () => {
      expect(1).not.toBe('NaN')
    }),

    test('"1" is string', () => {
      expect('1').toBe('string')
    }),

    test('1 is not string', () => {
      expect(1).not.toBe('string')
    }),

    test('true is boolean', () => {
      expect(true).toBe('boolean')
    }),

    test('"true" is not boolean', () => {
      expect('true').not.toBe('boolean')
    }),

    test('null is null', () => {
      expect(null).toBe('null')
    }),

    test('"null" is not null', () => {
      expect('null').not.toBe('null')
    }),

    test('undefined is undefined', () => {
      expect(undefined).toBe('undefined')
    }),

    test('"undefined" is not undefined', () => {
      expect('undefined').not.toBe('undefined')
    }),

    test('[] is Array', () => {
      expect([]).toBe('Array')
    }),

    test('{} is not Array', () => {
      expect({}).not.toBe('Array')
    }),

    test('Set is Set', () => {
      expect(new Set()).toBe('Set')
    }),

    test('{} is not Set', () => {
      expect({}).not.toBe('Set')
    }),

    test('WeakSet is WeakSet', () => {
      expect(new WeakSet()).toBe('WeakSet')
    }),

    test('Set is not WeakSet', () => {
      expect(new Set()).not.toBe('WeakSet')
    }),

    test('Map is Map', () => {
      expect(new Map()).toBe('Map')
    }),

    test('{} is not Map', () => {
      expect({}).not.toBe('Map')
    }),

    test('WeakMap is WeakMap', () => {
      expect(new WeakMap()).toBe('WeakMap')
    }),

    test('Map is not WeakMap', () => {
      expect(new Map()).not.toBe('WeakMap')
    }),

    test('function is function', () => {
      expect(() => {}).toBe('function')
    }),

    test('1 is not a function', () => {
      expect(1).not.toBe('function')
    }),

    test('Promise is Promise', () => {
      expect(new Promise((resolve, reject) => {})).toBe('Promise')
    }),

    test('1 is not a Promise', () => {
      expect(1).not.toBe('Promise')
    }),

    test('/a/ is RegExp', () => {
      expect(/a/).toBe('RegExp')
    }),

    test('1 is not a RegExp', () => {
      expect(1).not.toBe('RegExp')
    }),

    test('{} is {}', () => {
      expect({}).toBe('PlainObject')
    }),

    test('1 is not a {}', () => {
      expect(1).not.toBe('PlainObject')
    }),

    test('Non zero number is truthy value', () => {
      expect(5).toBeTruthy()
    }),

    test('Object is truthy value', () => {
      expect({}).toBeTruthy()
    }),

    test('Non empty string is truthy value', () => {
      expect('string').toBeTruthy()
    }),

    test('Empty string is falsy value', () => {
      expect('').not.toBeTruthy()
    }),

    test('Zero is falsy value', () => {
      expect(0).not.toBeTruthy()
    }),

    test('Null is falsy value', () => {
      expect(null).not.toBeTruthy()
    }),

    test('Undefined is falsy value', () => {
      expect(undefined).not.toBeTruthy()
    }),

    test('NaN is falsy value', () => {
      expect(NaN).not.toBeTruthy()
    }),
  ]
})
