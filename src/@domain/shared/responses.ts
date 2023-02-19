export class RejectDomain {
  readonly #statusCode: number
  readonly #message: string

  constructor (statusCode: number, message: string) {
    this.#message = message
    this.#statusCode = statusCode
  }

  public get statusCode (): number { return this.#statusCode }
  public get message (): string { return this.#message }
}

export class ProgressDomain <D = any> {
  readonly #statusCode: number
  readonly #data: D

  constructor (statusCode: number, data: D) {
    this.#data = data
    this.#statusCode = statusCode
  }

  public get statusCode (): number { return this.#statusCode }
  public get data (): D { return this.#data }
}
