// @flow

export default class BaumError extends Error {
  constructor(message: string, error?: Error) {
    super(message)
    this.name = 'BaumError'
    // $FlowFixMe
    this.originalError = error
  }

  toString() {
    let mainMessage = `${this.name}: ${this.message}.`
    // $FlowFixMe
    if (this.originalError) {
      mainMessage += ` \nError: ${this.originalError}`
    }
    return mainMessage
  }
}
