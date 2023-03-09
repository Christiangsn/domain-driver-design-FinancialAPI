import { useCases } from '@application/useCases/useCases'
import { Result } from '@domain/shared/core'

type fakeDTOuseCaseStub = string
class UseCasesStub extends useCases<fakeDTOuseCaseStub> {
  constructor () {
    super('Faker_tester')
  }

  public async run (httpRequest: string): Promise<Result<void>> {
    return Result.ok<void>()
  }
}

describe('AbstractClass useCases', () => {
  let sut: UseCasesStub

  beforeEach(() => {
    jest.clearAllMocks()
    sut = new UseCasesStub()
  })

  it('should return Result.fail if execute throw exception', async () => {
    const error = new Error('To throw exception')
    jest.spyOn(sut, 'run').mockRejectedValueOnce(error)
    jest.spyOn(console, 'error').mockImplementation(() => {})
    // jest.spyOn(global.console, 'warn').mockImplementation()

    const logon = await sut.execute('any_value')

    expect(console.error).toHaveBeenCalled()
    expect(logon.error).toBe(Result.fail<void>('Internal Server Error on Faker_tester Use Case').error)
  })

  it('Should return same result as execute', async () => {
    const logon = await sut.execute('any_value')
    expect(logon).toEqual(Result.ok<void>())
  })
})
