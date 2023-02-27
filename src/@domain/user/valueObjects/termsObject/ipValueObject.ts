import { Result, ValueObject } from '@domain/shared/core'

type IIpValueObjectProps = { value: string }

export class IpValueObject extends ValueObject<IIpValueObjectProps> {
  static #validateIpRegex: RegExp = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/

  private constructor (props: IIpValueObjectProps) {
    super(props)
  }

  public get value (): string { return this.props.value }

  public static create (ip: string): Result<IpValueObject> {
    const isValidIp = this.#validateIpRegex.test(ip)
    if (!isValidIp) return Result.fail<IpValueObject>('Invalid IP Address')
    return Result.ok<IpValueObject>(new IpValueObject({ value: ip }))
  }
}
