import { StatusTransactionValueObject } from '@domain/transaction'

describe('StatusTransactionValueObject', () => {
  it('Should create a valid statusTransaction', () => {
    const result = StatusTransactionValueObject.create('PENDENTE')
    expect(result.isSuccess).toBe(true)
  })

  it('Should fail if provide an invalid transactionType string', () => {
    const result = StatusTransactionValueObject.create('INVALID_TYPE')
    expect(result.isSuccess).toBe(false)
    expect(result.isFailure).toBe(true)
    expect(result.error).toBe('Invalid status option')
  })

  it('Should create validd statusTransaction', () => {
    const result = StatusTransactionValueObject.create('pendente' as any)
    expect(result.isSuccess).toBe(true)
    expect(result.getResult().value).toBe('PENDENTE')
  })
})
