import { AttachmentValueObject } from '@domain/transaction'

import { faker } from '@faker-js/faker'

describe('AttachmentValueObject', () => {
  it('Should create a valid attachment', () => {
    const url = faker.internet.url()
    const attachment = AttachmentValueObject.create(url)
    expect(attachment.isSuccess).toBe(true)
    expect(attachment.isFailure).toBe(false)
    expect(attachment.getResult().value).toBe(url)
  })

  it('Should create a valid attachment', () => {
    const attachment = AttachmentValueObject.create('invalid_url')
    expect(attachment.isSuccess).toBe(false)
    expect(attachment.isFailure).toBe(true)
    expect(attachment.error).toBe('Invalid Url')
  })

  it('Should create a valid attchment path if porovide a directory', () => {
    const attachment = AttachmentValueObject.create('/folder/public/image.jpeg')
    expect(attachment.isSuccess).toBe(true)
    expect(attachment.isFailure).toBe(false)
    expect(attachment.getResult().value).toBe('/folder/public/image.jpeg')
  })
})
