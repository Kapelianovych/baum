# Baum 🌴 - for testing ES modules in browser and NodeJS

It is designed as set of ES modules and will not work in *commonjs* module system.

## API

Library exports three main functions:

1. `group(title: string, fn: () => Promise<void>): Promise<void>`:

It is used for grouping relative tests together.

```javascript
import { group } from '/node_modules/@prostory/baum/dist/index.mjs'

group('Group tests that check functions that works with numbers', () => {
  // Here is test() functions.
})
```

2. `test(title: string, fn: () => Promise<void>): Promise<void>`:

This function defines single test. It accepts *title* as test description and test function.

```javascript
import { group, test } from '/node_modules/@prostory/baum/dist/index.mjs'

group('Group tests that check number equality', () => {
  test('1 + 1 must equal to 2', () => {
    // Test desctiption here
  })
})
```

3. `expect(value: mixed): ExpectChecks`:

This is the main function which performs testing your code. It accepts *value* that must be tested and returns object with methods for testing *value*:

  - `toEqual(expected: mixed): void`
    this function checks if *value* is equal to *expected*. They may be type of `string`, `number`, `boolean`, `undefined`, `object`(plain objects, `Array`, `Set` and `Map`). Objects checks by equality of their shape and values. So **{ a: 1 }** will be equal to **{ a: 1 }** and so on.

    ```javascript
    import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

    group('Group tests that check number equality', () => {
      test('1 + 1 must equal to 2', () => {
        expect(1 + 1).toEqual(2) // pass
      })
    })
    ```

  - `toNotEqual(expected: mixed): void` - opposite version of previous method.

  ```javascript
  import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

  group('Group tests that check number equality', () => {
    test('1 + 1 must not equal to 3', () => {
      expect(1 + 1).toNotEqual(3) // pass
    })
  })
  ```

  - `toThrow(expectedError?: Error) => void`
    checks if *value*(function only) throws an error. If *expectedError* is provided, received and expected errors are compated for equality.

    ```javascript
    import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

    group('Group tests that check functions', () => {
      test('function must throw an error', () => {
        expect(() => throw new Error('Error')).toThrow() // pass
      })

      test('function must throw an error', () => {
        expect(() => throw new Error('Error')).toThrow(new Error('Error')) // pass
      })
    })
    ```

  - `toNotThrow(): void`
    opposite version of previous method.

    ```javascript
    import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

    group('Group tests that check functions', () => {
      test('function must not throw an error', () => {
        expect(() => throw new Error('Error')).toNotThrow() // do not pass
      })

      test('function must not throw an error', () => {
        expect(() => 'Not error').toNotThrow() // pass
      })
    })
    ```

  - `toMatch(expected: string | RegExp): void`
    this method checks if *value*(string) match to *expected*.

    ```javascript
    import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

    group('Group tests that check functions', () => {
      test('"test " does match "test"', () => {
        expect('test ').toMatch('test') // pass
      })

      test('"test " does match "/test/"', () => {
        expect('test ').toMatch(/test/) // pass
      })
    })
    ```

  - `toNotMatch(expected: string | RegExp): void`
    this method checks if *value*(string) does not math to *expected*.

    ```javascript
    import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

    group('Group tests that check functions', () => {
      test('"test d" does not match "tested"', () => {
        expect('test d').toNotMatch('tested') // pass
      })

      test('"test " does match "/^test^/"', () => {
        expect('test ').toNotMatch(/^test$/) // pass
      })
    })
    ```

  - `toBeResolved(): Promise<ExpectChecks>`
    this method checks for **resolving** Promise. If you need to check if `Promise` does not rejects - simply invoke it. If you need to test resolved value, *await* function and on result invoke needed methods that described here (`toBeResolved()` returns the same object as `expect(...)` function).

    ```javascript
    import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

    group('Group tests that check Promises', () => {
      test('Promise must be resolved successfully', async () => {
        await expect(Promise.resolve(1)).toBeResolved() // pass
      })

      test('Promise must be resolved successfully and value is 1', async () => {
        ;(await expect(Promise.resolve(1)).toBeResolved()).toEqual(1) // pass
      })
    })
    ```

  - `toBeRejected(expectedError?: Error): Promise<void>`
    this methos checks if `Promise` rejects. If `expectedError` is provided, received and expected errors are compated for equality.

    ```javascript
    import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

    group('Group tests that check Promises', () => {
      test('Promise must be rejected', async () => {
        await expect(Promise.reject(new Error('Error'))).toBeRejected() // pass
      })

      test('Promise must be rejected with specific error', async () => {
        await expect(Promise.reject(new Error('Error'))).toBeRejected(new Error('Error')) // pass
      })
    })
    ```

> Note - all tests are executed asyncrounously, in other words - concurrently. So they finish in not the same order as were started. Also for testing `Promises` you must `await` results of `toBeResolved()` and `toBeRejected()`, in order to tests finish properly.

With ❤️ to JS