import { group, test, expect } from '../dist/index.mjs'

group('Equality tests', () => {
  test('Test "toEqual()": 1 === 1', () => {
    expect(1).toEqual(1)
  })

  test('Test "not.toEqual()": 1 !== 2', () => {
    expect(1).not.toEqual(2)
  })

  test('Test "toEqual()": () => {} === () => {}', () => {
    expect(() => {}).toEqual(() => {})
  })

  test('Test "not.toEqual()": () => {} !== (parameter) => {}', () => {
    expect(() => {}).not.toEqual((parameter) => {})
  })

  test('Test "toEqual()": { a: 1 } === { a: 1 }', () => {
    expect({ a: 1 }).toEqual({ a: 1 })
  })

  test('Test "not.toEqual()": { a: 1 } !== { a: 2 }', () => {
    expect({ a: 1 }).not.toEqual({ a: 2 })
  })

  test('Test "toEqual()": [1] === [1]', () => {
    expect([1]).toEqual([1])
  })

  test('Test "not.toEqual()": [1] !== ["a"]', () => {
    expect([1]).not.toEqual(['a'])
  })

  test('Test "toEqual()": new Set([1]) === new Set([1])', () => {
    expect(new Set([1])).toEqual(new Set([1]))
  })

  test('Test "not.toEqual()": new Set([1]) !== new Set(["a"])', () => {
    expect(new Set([1])).not.toEqual(new Set(['a']))
  })

  test("Test \"toEqual()\": new Map('a' [1]) === new Map('a' [1])", () => {
    const givenMap = new Map()
    givenMap.set('a', [1])

    const expectedMap = new Map()
    expectedMap.set('a', [1])

    expect(givenMap).toEqual(expectedMap)
  })

  test("Test \"not.toEqual()\": new Map('a' [1]) !== new Map('a' [12])", () => {
    const givenMap = new Map()
    givenMap.set('a', [1])

    const expectedMap = new Map()
    expectedMap.set('a', [12])

    expect(givenMap).not.toEqual(expectedMap)
  })

  test('Test "toMatch()": " sdf" to "/sdf/"', () => {
    expect(' sdf  alsdkf').toMatch(/sdf/)
  })

  test('Test "toMatch()": " sdf " to "/^[\\s]+sdf[\\s]+$/"', () => {
    expect(' sdf ').toMatch(/^[\s]+sdf[\s]+$/)
  })

  test('Test "toMatch()": " sdf" to "sdf"', () => {
    expect(' sdf').toMatch('sdf')
  })

  test('Test "not.toMatch()": " sdf" to "/sdt/"', () => {
    expect(' sdf').not.toMatch(/sdt/)
  })
  test('Test "not.toMatch()": " sdf" to "sdt"', () => {
    expect(' sdf').not.toMatch('sdt')
  })

  test('Test "not.toMatch()": "sdf " to "/^[\\s]+sdf[\\s]+$/"', () => {
    expect('sdf ').not.toMatch(/^[\s]+sdf$/)
  })
})
