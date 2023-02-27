import { Identifer } from './identifier'

export class UniqueEntityID extends Identifer<string | number> {
  public constructor (id?: string | number) {
    super(id || UniqueEntityID.#createUUID())
  }

  static #createUUID (): string {
    let dt = new Date().getTime()
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uuid
  }
}
