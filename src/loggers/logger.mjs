// @flow

import type BaumError from '../baum_error.mjs'

export type TestResult = {
  test: string,
  passed: true | BaumError,
}

/**
 * Shows results of tests to user.
 * Default behavior is loggint results to *console*.
 */
export default class Logger {
  /**
   * Shows to user results of tests passing.
   * This is the main method.
   */
  log(groupTitle: string, results: TestResult[]) {
    console.warn(`----- ${groupTitle} -----`)

    results.forEach(({ test, passed }) => {
      if (typeof passed === 'boolean') {
        console.log(`   +  Test: "${test}" successfully passed!`)
      } else {
        console.error(`   -  Test: "${test}" has errors!
        Error: ${passed.toString()}
        `)
      }
    })
  }
}
