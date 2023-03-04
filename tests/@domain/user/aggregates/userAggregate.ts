import { DateCommonValueObject } from '../../../../src/@domain/shared/common/valueObjects/dateCommonValueObject'
import { UniqueEntityID } from '@domain/shared/core'
import { type Result } from '@domain/shared/core/result'
import { EmailValueObject, IpValueObject, PasswordValueObject, TermsValueObject, UserAggregate } from '@domain/user'

describe('UserAggregate', () => {
  const fakeEmail: string = 'john@domain.com'
  const fakePassword: string = '12345'

  const fakeTerms: { acceptedAt: Date, ip: string, userAgent: { name: string, version: string, os: 'LINUX' | 'MACOS' | 'WINDOWS' | 'IOS' | 'IPHONE' | 'MACINTOSH' | 'ANDROID' | 'IPAD', type: string } } = {
    acceptedAt: new Date(),
    ip: '127.0.0.1',
    userAgent: {
      name: 'firefox',
      version: '86.0.0',
      os: 'LINUX',
      type: 'browser'
    }
  }

  let valueEmail: EmailValueObject
  let valuePassword: PasswordValueObject
  let valueTermsValueObject: TermsValueObject[]
  let userAggregate: Result<UserAggregate>

  beforeAll(() => {
    valueEmail = EmailValueObject.create(fakeEmail).getResult()
    valuePassword = PasswordValueObject.create(fakePassword).getResult()
    valueTermsValueObject = [TermsValueObject.create({
      acceptedAt: DateCommonValueObject.create(fakeTerms.acceptedAt).getResult(),
      ip: IpValueObject.create(fakeTerms.ip).getResult(),
      userAgent: fakeTerms.userAgent
    }).getResult()]
  })

  it('Should create a valid user', () => {
    userAggregate = UserAggregate.create({ email: valueEmail, password: valuePassword, terms: valueTermsValueObject })
    expect(userAggregate.isSuccess).toBe(true)
  })

  it('Should get valid values', () => {
    userAggregate = UserAggregate.create({ email: valueEmail, password: valuePassword, terms: valueTermsValueObject })

    const user = userAggregate.getResult()
    expect(user.id).toBeDefined()
    expect(user.createdAt).toBeDefined()

    expect(user.password.value).toBe(fakePassword)
    expect(user.email.value).toBe(fakeEmail)

    expect(user.terms[0].value.acceptedAt.value).toBeDefined()
    expect(user.terms[0].value.ip.value).toBe(fakeTerms.ip)
    expect(user.terms[0].value.userAgent).toEqual(fakeTerms.userAgent)
    expect(user.isDeleted).toBeFalsy()
  })

  it('Should create a valid user with provided id', () => {
    userAggregate = UserAggregate.create({ email: valueEmail, password: valuePassword, terms: valueTermsValueObject }, new UniqueEntityID('valid_id'))
    expect(userAggregate.getResult().id.toValue()).toBe('valid_id')
  })
})
