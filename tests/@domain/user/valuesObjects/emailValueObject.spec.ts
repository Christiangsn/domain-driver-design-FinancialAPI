import { EmailValueObject } from '@domain/user/valueObjects/emailValueObject'

describe('emailValueObject', () => {
  it('Should return a valid email', () => {
    const email = EmailValueObject.create('valid.mail@domain.com')
    expect(email.isFailure).toBe(false)
  })

  it('Should return a fail if provide an invalid email', () => {
    const email = EmailValueObject.create('invalid_mail')
    expect(email.isFailure).toBe(true)
  })

  it('Should return a fail if provide an invalid email', () => {
    const email = EmailValueObject.create('invalid_mail')
    expect(email.isFailure).toBe(true)
  })

  it('Should normalize email to ToLowerCase()', () => {
    const email = EmailValueObject.create('joNhJoE@teTes.CoM')
    expect(email.getResult().value).toBe('jonhjoe@tetes.com')
  })
})
