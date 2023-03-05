import { IpValueObject } from '@domain/user/valueObjects/termsObject/ipValueObject'
import { type ISignUpDTO } from './signupDTO'
import { DateCommonValueObject, EmailValueObject, PasswordValueObject, TermsValueObject, UserAggregate } from '@domain/user'
import { Result } from '@domain/shared/core'
import { type IUserRepositoryContract } from '@domain/contracts/repositories/userRepository.contract'
import { useCases } from '@application/useCases/default'
import { type IHttpResponse } from '@application/contracts/app.contracts'
import { BadRequest } from '@application/helpers/badRequest'
import { Success } from '@application/helpers/success'

/**
 * @event
 *   Validar dados da request
 *  @event
 *   Criar instancia do domínio do usuário
 * @event
 *   Verificar se existem dados incorretos
 * @event
 *   Verificar se já existe um usuario com email informado
 * @event
 *   Salvar usuário
 * @event
 *   Retornar status de sucesso
 */
export class SignupUseCases extends useCases<ISignUpDTO> {
  public constructor (
    private readonly userRepository: IUserRepositoryContract
  ) {
    super('Iterrnal Server Error on Signup Use Case')
  }

  public async run (props: ISignUpDTO): Promise<IHttpResponse> {
    // Validar os DTO e se ocorreu um erro retornar
    const emailOrError = EmailValueObject.create(props.email)
    const passwordOrError = PasswordValueObject.create(props.password)
    const accepetAtOrError = DateCommonValueObject.create(new Date())
    const ipOrError = IpValueObject.create(props.ip)
    const hasErrorOnValueObjects = Result.combine([emailOrError, passwordOrError, accepetAtOrError, ipOrError])
    if (hasErrorOnValueObjects.isFailure) return BadRequest(hasErrorOnValueObjects.error)

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
    if (termsOrError.isFailure) return BadRequest(termsOrError.error.toString())

    const password = passwordOrError.getResult()
    await password.encryptPassword()
    // Validar o usuário agregado e retornar erro caso ocorra um erro
    const userOrError: Result<UserAggregate> = UserAggregate.create({
      email: emailOrError.getResult(),
      password,
      terms: [termsOrError.getResult()]
    })
    if (userOrError.isFailure) return BadRequest(userOrError.error.toString())

    // Verificar se o usuário já existe
    const alreadyExistsForEmail = await this.userRepository.exist({ email: userOrError.getResult().email.value })
    if (alreadyExistsForEmail) return BadRequest('User already exists')

    // Salvar usuario
    const user = userOrError.getResult()
    await this.userRepository.save(user)

    return Success(null)
  }
}
