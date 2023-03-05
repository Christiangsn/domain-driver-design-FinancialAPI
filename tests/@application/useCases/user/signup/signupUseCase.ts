import { SignupUseCases } from '@application/useCases/user/signup/signUpUseCases'
import { type IUserRepositoryContract } from '@domain/contracts/repositories/userRepository.contract'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('SignUpUseCase', () => {
  let userRepository: MockProxy<IUserRepositoryContract>

  beforeEach(() => {
    userRepository = mock()
  })

  it('Should be defined', () => {
    const controller = new SignupUseCases(userRepository)
    expect(controller).toBeDefined()
  })
})
