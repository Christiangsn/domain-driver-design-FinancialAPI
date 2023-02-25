import { UniqueEntityID } from '@domain/shared';
import { Result } from './../../../../src/@domain/shared/result';
import { AggregateRoot } from "@domain/shared/aggregateRoot"
import { AcceptAtValueObject, EmailValueObject, IpValueObject, PasswordValueObject, TermsValueObject, UserAggregate } from "@domain/user"

describe('UserAggregate', () => {
  const fakeEmail: string = 'john@domain.com'
  const fakePassword: string= '12345'
  const fakeBugetBoxIds: string[] = ['validId01', 'validId02', 'validId03']
  const fakeTotaBalance: number = 0 
  const fakeTerms: { acceptedAt: Date, ip: string, userAgent: { name: string, version: string, os: "LINUX" | "MACOS" | "WINDOWS" | "IOS" | "IPHONE" | "MACINTOSH" | "ANDROID" | "IPAD", type: string } } = {
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
  let valueBudgetBoxIds: string[]
  let valueTotalBalance: number
  let valueTermsValueObject: TermsValueObject[]

  let userAggregate: Result<UserAggregate>

  beforeAll(() => {
    valueEmail = EmailValueObject.create(fakeEmail).getResult()
    valuePassword = PasswordValueObject.create(fakePassword).getResult()
    valueBudgetBoxIds = fakeBugetBoxIds
    valueTotalBalance = fakeTotaBalance
    valueTermsValueObject = [TermsValueObject.create({
      acceptedAt: AcceptAtValueObject.create(fakeTerms.acceptedAt).getResult(),
      ip: IpValueObject.create(fakeTerms.ip).getResult(),
      userAgent: fakeTerms.userAgent
    }).getResult()]
  })

  it('Should create a valid user', () => {
    userAggregate = UserAggregate.create({ email: valueEmail, password: valuePassword, terms: valueTermsValueObject, totalBalanceAvaliable: valueTotalBalance, budgetBoxIds: valueBudgetBoxIds }) 
    expect(userAggregate.isSuccess).toBe(true)
  })

  it('Should get valid values', () => {
    userAggregate = UserAggregate.create({ email: valueEmail, password: valuePassword, terms: valueTermsValueObject, totalBalanceAvaliable: valueTotalBalance, budgetBoxIds: valueBudgetBoxIds }) 

    const user = userAggregate.getResult()
    expect(user.id).toBeDefined()
    expect(user.createdAt).toBeDefined()
    expect(user.budgetBoxIds).toEqual(fakeBugetBoxIds)
    expect(user.password.value).toBe(fakePassword)
    expect(user.email.value).toBe(fakeEmail)
    expect(user.totalBalanceAvaliable).toBe(0)
    expect(user.terms[0].value.acceptedAt.value).toBeDefined()
    expect(user.terms[0].value.ip.value).toBe(fakeTerms.ip)
    expect(user.terms[0].value.userAgent).toEqual(fakeTerms.userAgent)
    expect(user.isDeleted).toBeFalsy()
  })

  it('Should return empty array if not provide budgetBoxIds', () => {
    userAggregate = UserAggregate.create({ email: valueEmail, password: valuePassword, terms: valueTermsValueObject, totalBalanceAvaliable: valueTotalBalance })
    const user = userAggregate.getResult()
    expect(user.budgetBoxIds).toEqual([])
  })

  it('Should create a valid user with provided id', () => {
    userAggregate = UserAggregate.create({ email: valueEmail, password: valuePassword, terms: valueTermsValueObject, totalBalanceAvaliable: valueTotalBalance, budgetBoxIds: valueBudgetBoxIds }, new UniqueEntityID('valid_id')) 
    expect(userAggregate.getResult().id.toValue()).toBe('valid_id')
  })
})

