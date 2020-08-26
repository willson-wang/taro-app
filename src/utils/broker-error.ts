interface ErrOpts {
  [key: string]: string
}

export class RequestError extends Error {
  opt?: ErrOpts
  constructor(message: string, opt?: ErrOpts) {
    super(message)
    this.name = 'Request Error'
    this.stack = new Error().stack
    this.message = message
    this.opt = opt
  }
}

export class NormalError extends Error {
  opt?: ErrOpts
  constructor(message: string, opt?: ErrOpts) {
    super(message)
    this.name = 'Normal Error'
    this.stack = new Error().stack
    this.message = message
    this.opt = opt
  }
}

