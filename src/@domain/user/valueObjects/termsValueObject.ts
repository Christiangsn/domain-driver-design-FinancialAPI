import { type AcceptAtValueObject } from '@domain/user/valueObjects/termsObject/acceptAtValueObject'
import { type IpValueObject } from '@domain/user/valueObjects/termsObject/ipValueObject'
import { Result, ValueObject } from '@domain/shared'

export enum OS {
  LINUX = 'LINUX',
  MACOS = 'MACOS',
  WINDOWS = 'WINDOWS',
  IOS = 'IOS',
  IPHONE = 'IPHONE',
  MACINTOSH = 'MACINTOSH',
  ANDROID = 'ANDROID',
  IPAD = 'IPAD',
}

type IUserAgent = {
  name: string
  version: string
  os: keyof typeof OS
  type: string
}

type ITermsValueObject = {
  ip: IpValueObject
  acceptedAt: AcceptAtValueObject
  userAgent: IUserAgent
}

export class TermsValueObject extends ValueObject<ITermsValueObject> {
  private constructor (props: ITermsValueObject) {
    super(props)
  }

  public get value (): ITermsValueObject { return this.props }

  public static create (props: ITermsValueObject): Result<TermsValueObject> {
    const isValid = Object.values(OS).includes(props.userAgent.os.toUpperCase() as OS)
    if (!isValid) return Result.fail<TermsValueObject>('Invalid user agent OS')
    return Result.ok<TermsValueObject>(new TermsValueObject(props))
  }
}
