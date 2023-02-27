/* eslint-disable no-sequences */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { DateCommonValueObject } from '@domain/shared/common'
import { IpValueObject } from '@domain/user/valueObjects/termsObject/ipValueObject'
import { type OS, TermsValueObject } from '@domain/user/valueObjects/termsValueObject'

/**
   *
    {
      "ip": "120.06.09.011",
      "acceptedAt": "01-01-2021 10:00:00", // ISODATE 8006
      "userAgent": {
          "name": "firefox",
          "version": "86.0.0",
          "os": "Linux",
          "type": "browser"
      },
    },
*/

describe('TermValueObject', () => {
  let ip: IpValueObject
  let acceptedAt: DateCommonValueObject
  let userAgent: { name: string, version: string, os: keyof typeof OS, type: string }

  beforeEach(() => {
    ip = IpValueObject.create('123.123.123.123').getResult(),
    acceptedAt = DateCommonValueObject.create(new Date()).getResult(),
    userAgent = {
      name: 'firefox',
      version: '86.0.0',
      os: 'LINUX',
      type: 'browser'
    }
  })

  it('Should create a valid term', () => {
    const terms = TermsValueObject.create({ ip, acceptedAt, userAgent })
    expect(terms.isSuccess).toBe(true)
    expect(terms.getResult().value).toBe(terms.getResult().value)
  })

  it('Should fail if provide an invalid os', () => {
    const terms = TermsValueObject.create({
      ip,
      acceptedAt,
      userAgent: {
        name: 'firefox',
        version: '86.0.0',
        os: 'invalid' as any,
        type: 'browser'
      }
    })

    expect(terms.isFailure).toBe(true)
    expect(terms.error).toBe('Invalid user agent OS')
  })
})
