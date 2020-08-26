class Logger {
  namespace: string
  constructor(namespace: string) {
    this.namespace = namespace
  }

  log(...args: any[]): void {
    console.log(`${this.namespace}`, ...args)
  }

  warn(...args: any[]): void {
    console.warn(`${this.namespace}`, ...args)
  }

  error(...args: any[]): void {
    console.error(`${this.namespace}`, ...args)
  }

  trace(): void {
    console.trace(`${this.namespace}`)
  }
}

export default Logger
