import { TermsValueObject } from '@domain/user/valueObjects/termsValueObject'
import { PasswordValueObject } from '@domain/user/valueObjects/passwordValueObject'
import { EmailValueObject } from '@domain/user/valueObjects/emailValueObject'
import { AcceptAtValueObject } from '@domain/user/valueObjects/termsObject/acceptAtValueObject'
import { IpValueObject } from '@domain/user/valueObjects/termsObject/ipValueObject'
import { UserAggregate } from '@domain/user/aggregates/userAggregate'

describe('UserAggregate', () => {
  it('Should create a valid user', () => {
    const user = UserAggregate.create({
      email: EmailValueObject.create('john@domain.com').getResult(),
      password: PasswordValueObject.create('12345').getResult(),
      totalBalanceAvaliable: 0,
      terms: [
        TermsValueObject.create({
          acceptedAt: AcceptAtValueObject.create(new Date()).getResult(),
          ip: IpValueObject.create('127.0.0.1').getResult(),
          userAgent: {
            name: 'firefox',
            version: '86.0.0',
            os: 'LINUX',
            type: 'browser'
          }
        }).getResult()
      ]
    })
    
    expect(user.isSuccess).toBe(true)
  })
})
