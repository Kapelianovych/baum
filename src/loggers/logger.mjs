// @flow

import type { TestResults } from '../collector.mjs'

/**
 * Shows results of tests to user.
 * Default behavior is loggint results to *console*.
 */
export default class Logger {
  /**
   * Shows to user results of tests passing.
   * This is the main method.
   */
  log(results: TestResults) {
    for (const groupTitle in results) {
      console.warn(`----- ${groupTitle} -----`)

      for (const [title, result] of results[groupTitle].entries()) {
        if (typeof result === 'boolean') {
          console.log(`   +  Test: "${title}" successfully passed!`)
        } else {
          console.error(`   -  Test: "${title}" has errors!
          Error: ${result.toString()}
          `)
        }
      }
    }
  }
}
