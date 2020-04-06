// @flow

import type BaumError from './baum_error.mjs'

export type TestResults = { [string]: Map<string, true | BaumError> }

/**
 * Collect results from test function (passed or not).
 */
export default class Collector {
  declare _results: TestResults
  declare _currentGroup: string | void

  constructor() {
    this._results = {}
  }

  set title(value: string) {
    if (!(value in this._results)) {
      this._results[value] = new Map()
      this._currentGroup = value
    } else {
      console.error(`Group with title "${value}" already declared.`)
    }
  }

  get results() {
    return this._results
  }

  passed(test: string, passed: true | BaumError) {
    if (this._currentGroup) {
      this._results[this._currentGroup].set(test, passed)
    }
  }

  clear() {
    this._results = {}
  }

  remove(title: string) {
    if (title in this._results) {
      delete this._results[title]
    }
  }
}
