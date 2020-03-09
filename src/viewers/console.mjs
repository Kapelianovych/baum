// @flow

import BaumError from '../baum_error.mjs'

export function groupTitle(title: string) {
  console.warn(`----- ${title} -----`)
}

export function passed(title: string) {
  console.log(`   +  Test: "${title}" successfully passed!`)
}

export function notPassed(title: string, error: BaumError) {
  console.error(`   -  Test: "${title}" has errors!
    : ${error.toString()}

  ------ End of error ------`)
}
