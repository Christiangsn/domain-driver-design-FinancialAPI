import { IpValueObject } from '@domain/user/valueObjects/termsObject/ipValueObject'

describe('IpValueObject', () => {
  it('Should create valid ip', () => {
    const ip = IpValueObject.create('123.123.123.123')

    expect(ip.isSuccess).toBe(true)
    expect(ip.getResult().value).toBe('123.123.123.123')
  })

  it('Should fail if provide an invalid ip', () => {
    const ip = IpValueObject.create('invalid_ip')

    expect(ip.isFailure).toBe(true)
    expect(ip.error).toBe('Invalid IP Address')
  })
})
