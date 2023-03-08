
import { SignupUseCases } from '@application/useCases/user/signup/signUpUseCases'
import { type IUserRepositoryContract } from '@domain/contracts/repositories/userRepository.contract'
import { OS } from '@domain/user'
import { mock, type MockProxy } from 'jest-mock-extended'

export interface IFakerDTO {
  email?: string
  password?: string
  ip?: string
  acceptedTerms?: boolean
  userAgent?: {
    name?: string
    version?: string
    os?: keyof typeof OS
    type?: string
  }
}

describe('SignUpUseCase', () => {
  const fakeDTO = (props: IFakerDTO) => {
    return {
      acceptedTerms: props?.acceptedTerms ?? true,
      email: props?.email ?? 'johnjoe@example.com',
      ip: props?.ip ?? '123.123.123.123',
      password: props?.password ?? 'valid_password',
      userAgent: {
        name: props?.userAgent?.name ?? 'Mozilla/5.0',
        os: props?.userAgent?.os ?? 'LINUX',
        type: props?.userAgent?.type ?? 'Browser',
        version: props?.userAgent?.version ?? '29.0.12.1.236'
      }
    }
  }

  let userRepository: MockProxy<IUserRepositoryContract>
  let signupUseCases: SignupUseCases

  beforeEach(() => {
    userRepository = mock()
    signupUseCases = new SignupUseCases(userRepository)
  })

  it('Should be defined', () => {
    expect(signupUseCases).toBeDefined()
  })

  it('Shoudl return fails if not accept the terms', async () => {
    const fakerDTO = fakeDTO({ acceptedTerms: false })
    const result = await signupUseCases.execute(fakerDTO)
    expect(result.isFailure).toBe(true)
    expect(result.isSuccess).toBe(false)
  })
})
