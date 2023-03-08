/* eslint-disable  */

import { DateCommonValueObject, EmailValueObject, IpValueObject, PasswordValueObject, TermsValueObject, UserAggregate } from '@domain/user'
import { type IUserRepositoryContract } from '@domain/contracts/repositories/userRepository.contract'
import { Result } from '@domain/shared/core'
import { type ISignUpDTO } from './signupDTO'
import { useCases } from '@application/useCases/useCases'
import { Inject, NotAcceptableException } from '@nestjs/common'

export class SignupUseCases extends useCases<ISignUpDTO> {
  public constructor (
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepositoryContract
  ) { 
    super('SignUp')
  }

  public async run (props: ISignUpDTO): Promise<Result<void>> {

    if (!props.acceptedTerms) {
      return Result.fail<void>('Terms should be accepted')
    }

    // Validar os DTO e se ocorreu um erro retornar
    const emailOrError = EmailValueObject.create(props.email)
    const passwordOrError = PasswordValueObject.create(props.password)
    const accepetAtOrError = DateCommonValueObject.create(new Date())
    const ipOrError = IpValueObject.create(props.ip)
    const hasErrorOnValueObjects = Result.combine([emailOrError, passwordOrError, accepetAtOrError, ipOrError])
    if (hasErrorOnValueObjects.isFailure) return Result.fail<void>(hasErrorOnValueObjects.error)

    // Validar Termos e se ocorreu um erro retornar
    const termsOrError = TermsValueObject.create({
      acceptedAt: accepetAtOrError.getResult(),
      ip: ipOrError.getResult(),
      userAgent: {
        name: props.userAgent.name,
        os: props.userAgent.os,
        type: props.userAgent.type,
        version: props.userAgent.version
      }
    })
    if (termsOrError.isFailure) return Result.fail<void>(termsOrError.error.toString())

    const password = passwordOrError.getResult()
    void await password.encryptPassword()
    // Validar o usuário agregado e retornar erro caso ocorra um erro
    const userOrError: Result<UserAggregate> = UserAggregate.create({
      email: emailOrError.getResult(),
      password,
      terms: [termsOrError.getResult()]
    })
    if (userOrError.isFailure) return Result.fail<void>(userOrError.error.toString())

    // Verificar se o usuário já existe
    const alreadyExistsForEmail = await this.userRepository.exist({ email: userOrError.getResult().email.value })
    if (alreadyExistsForEmail) return Result.fail<void>('User already exist for provided email')

    // Salvar usuario
    const user = userOrError.getResult()
    void await this.userRepository.save(user)

    return Result.ok<void>()
  }
}
