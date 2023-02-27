export class Identifer<T> {
  constructor (private value: T) {
    this.value = value
  }

  public equals (id?: Identifer<T>): boolean {
    if (id === null || id === undefined) return false
    if (!(id instanceof this.constructor)) return false
    else return id.toValue() === this.value
  }

  public toString (): string { return String(this.value) }
  public toValue (): T { return this.value }
}
