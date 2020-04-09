import { group, test, expect } from '../dist/index.mjs'

let beforeAllNumber = 0
let beforeEachNumber = 0
let afterEachNumber = 0

group('Test group hooks', () => {
  return [
    test('beforeAll hook: beforeAllNumber must be equal to 8', () => {
      expect(beforeAllNumber).toEqual(8)
    }),
    test('beforeEach hook: beforeEachNumber must be equal to 2', () => {
      expect(beforeEachNumber).toEqual(2)
    }),
    test('afterEach hook: afterEachNumber must be equal to 4', () => {
      expect(afterEachNumber).toEqual(4)
    }),
  ]
}, {
  beforeAll() {
    beforeAllNumber = 8
  },
  afterAll() {
    console.log(`afterEachNumber must be equal to 6. Given: ${afterEachNumber}`)
  },
  beforeEach() {
    beforeEachNumber++
  },
  afterEach() {
    afterEachNumber = afterEachNumber + 2
  }
})
