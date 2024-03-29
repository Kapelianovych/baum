# Baum 🌴 - for testing ES modules and CommonJS in browser and NodeJS

## Installing

```sh
$ npm i -D @prostory/baum
```

## Importing

```js
// ES modules
import { group } from '/path/to/@prostory/baum/dist/index.mjs'

// CommonJS
const { group } = require('@prostory/baum')
```

## API

Library exports three main functions:

1. `group(title: string, fn: () => TestObject[], hooks?: TestHooks): Promise<void>`:

It is used for grouping relative tests together. All `test` functions must be inside of `group` function. They are executing in order of defining.

**hooks** is an object which can have four method:

  1. `beforeAll: () => void` - executes before all tests in `group`.
  2. `beforeEach: () => void` - executes before each test in `group`.
  3. `afterEach: () => void` - executes after each test in `group`.
  4. `afterAll: () => void` - executes after all tests in `group`.

```javascript
import { group } from '/node_modules/@prostory/baum/dist/index.mjs'

group('Group tests that check functions that works with numbers', () => {
  return [
    // Here is test() functions.
  ]
})
```

2. `test(title: string, fn: () => Promise<void> | void): TestObject`:

This function defines single test. It accepts *title* as test description and test function.

```javascript
import { group, test } from '/node_modules/@prostory/baum/dist/index.mjs'

group('Group tests that check number equality', () => {
  return [
    test('Syncronous test', () => {
      expect(1).toEqual(1)
    }),

    test('Asyncronous test', async () => {
      const number = await expect(Promise.resolve(1)).toBeResolved()
      expect(number).toEqual(1)
    })
  ]
})
```

3. `expect(value: mixed): ExpectChecks`:

This is the main function which performs testing your code. It accepts *value* that must be tested and returns object with methods for testing *value*:

  - `toEqual(expected: mixed): void`
    this function checks if *value* is equal to *expected*. They may be type of `string`, `number`, `boolean`, `undefined`, `object`(plain objects, `Array`, `Set` and `Map`). Objects checks by equality of their shape and values. So **{ a: 1 }** will be equal to **{ a: 1 }** and so on.

    ```javascript
    import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

    group('Group tests that check number equality', () => {
      return [
        test('1 + 1 must equal to 2', () => {
          expect(1 + 1).toEqual(2) // pass
        })
      ]
    })
    ```

  - `toThrow(expectedError?: Error): void`
    checks if *value*(function only) throws an error. If *expectedError* is provided, received and expected errors are compated for equality.

    ```javascript
    import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

    group('Group tests that check functions', () => {
      return [
        test('function must throw an error', () => {
          expect(() => throw new Error('Error')).toThrow() // pass
        }),

        test('function must throw an error', () => {
          expect(() => throw new Error('Error')).toThrow(new Error('Error')) // pass
        })
      ]
    })
    ```

  - `toMatch(expected: string | RegExp): void`
    this method checks if *value*(string) match to *expected*.

    ```javascript
    import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

    group('Group tests that check functions', () => {
      return [
        test('"test " does match "test"', () => {
          expect('test ').toMatch('test') // pass
        }),

        test('"test " does match "/test/"', () => {
          expect('test ').toMatch(/test/) // pass
        })
      ]
    })
    ```

  - `toBeResolved(): Promise<ExpectChecks>`
    this method checks for **resolving** Promise. If you need to check if `Promise` does not rejects - simply invoke it. If you need to test resolved value, *await* function and on result invoke needed methods that described here (`toBeResolved()` returns the same object as `expect(...)` function).

    ```javascript
    import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

    group('Group tests that check Promises', () => {
      return [
        test('Promise must be resolved successfully', async () => {
          await expect(Promise.resolve(1)).toBeResolved() // pass
        }),

        test('Promise must be resolved successfully and value is 1', async () => {
          ;(await expect(Promise.resolve(1)).toBeResolved()).toEqual(1) // pass
        })
      ]
    })
    ```

  - `toBeRejected(expectedError?: Error): Promise<void>`
    this methos checks if `Promise` rejects. If `expectedError` is provided, received and expected errors are compated for equality.

    ```javascript
    import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

    group('Group tests that check Promises', () => {
      return [
        test('Promise must be rejected', async () => {
          await expect(Promise.reject(new Error('Error'))).toBeRejected() // pass
        }),

        test('Promise must be rejected with specific error', async () => {
          await expect(Promise.reject(new Error('Error'))).toBeRejected(new Error('Error')) // pass
        })
      ]
    })
    ```

  - `toBe(type: string): void` - checks given value if its match to provided(**type** parameter).
  You can check such types: `'string' | 'number' | 'NaN' | 'boolean' | 'null' | 'undefined' | 'function' | 'PlainObject' | 'Set' | 'Map' | 'RegExp' | 'WeakMap' | 'WeakSet' | 'Promise' | 'Array'`

    ```javascript
    import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

    group('Group tests that check type of given value', () => {
      return [
        test('1 is number', () => {
          expect(1).toBe('number') // pass
        }),

        test('Array to be Array type', () => {
          expect([7, 'd']).toBe('Array') // pass
        })
      ]
    })
    ```

  - `toBeTruthy(): void` - checks given value if it is truthy.
    ```javascript
    import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

    group('Group tests that check type of given value', () => {
      return [
        test('1 is truthy value', () => {
          expect(1).toBeTruthy() // pass
        }),

        test('0 is falsy value', () => {
          expect(0).not.toBeTruthy() // pass
        })
      ]
    })
    ```

  - `not` property. It contains methods that described above but they (except `toBeResolved` and `toBeRejected`) do opposite job.

    ```javascript
    import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

    group('Group tests that check type of given value', () => {
      return [
        test('1 is not Set', () => {
          expect(1).not.toBe('Set') // pass
        }),

        test('"Array" match not "Arrau"', () => {
          expect('Array').not.toMatch('Arrau') // pass
        }),

        // You can check if function does not throw error at all or
        // function may throw error except one checked against.
        test('Function is not throwing an error at all', () => {
          expect(() => {}).not.toThrow() // pass
        }),

        test('Function is not throwing specific error', () => {
          expect(() => { throw new Error('Error') }).not.toThrow(new Error('Another error')) // pass
        })
      ]
    })
    ```

> Note - for testing `Promises` you must `await` Promise that returns by of `toBeResolved()` and `toBeRejected()` or return it, in order to tests finish properly. This methods do the same in `not` property also.

With ❤️ to Baum