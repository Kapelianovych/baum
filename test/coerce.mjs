import { group, test, expect } from '../dist/index.mjs'

import { coerce } from '../dist/utils/coerce.mjs'

group('Coercing tests', () => {
  return [
    test('Test coercing literals', () => {
      expect(coerce(1)).toEqual('1')
      expect(coerce('a')).toEqual('a')
      expect(coerce(true)).toEqual('true')
      expect(coerce(null)).toEqual('null')
      expect(coerce(undefined)).toEqual('undefined')
    }),

    test('Test coercing objects', () => {
      expect(coerce({ a: false })).toEqual('{"a":false}')
      expect(coerce(new Set([{}]))).toEqual('Set( {} )')
      expect(coerce(new Map([[1, {}]]))).toEqual('Map( 1: {}, )')
      expect(coerce(/a$/)).toEqual('/a$/')
      expect(coerce([1, 'b'])).toEqual('[ 1, b ]')
    }),
  ]
})
