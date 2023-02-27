import { TransactionTypeValueObject } from '@domain/transaction'

describe('TransactionTypeValueObject', () => {
  it('Should create a valid transactionType', () => {
    const result = TransactionTypeValueObject.create('ENTRADA')
    expect(result.isSuccess).toBe(true)
  })

  it('Should fail if provide an invalid transactionType string', () => {
    const result = TransactionTypeValueObject.create('INVALID_TYPE' as any)
    expect(result.isSuccess).toBe(false)
    expect(result.isFailure).toBe(true)
    expect(result.error).toBe('Invalid option')
  })
})
