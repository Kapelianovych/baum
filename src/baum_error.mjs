// @flow

export default class BaumError extends Error {
  declare originalError: Error | void

  constructor(message: string, error?: Error) {
    super(message)
    this.name = 'BaumError'
    this.originalError = error
  }

  toString() {
    let mainMessage = `${this.name}: ${this.message}.`
    if (this.originalError) {
      mainMessage += ` \nError: ${this.originalError.toString()}`
    }
    return mainMessage
  }
}
