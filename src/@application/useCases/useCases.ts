/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type IUseCases } from '@application/contracts/app.contracts'
import { Result } from '@domain/shared/core'

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
export abstract class useCases<DTO> implements IUseCases<DTO, Result<void>> {
  public abstract run (httpRequest: DTO): Promise<Result<void>>
  readonly #handlerName: string

  /**
   *
   * @param handlerName
   * @example
   *  SignUp || SignIn || Logout || CreateUser
   */
  public constructor (handlerName: string) {
    this.#handlerName = handlerName
  }

  public async execute (httpRequest: DTO): Promise<Result<void>> {
    try {
      return await this.run(httpRequest)
    } catch (error) {
      console.error(error)
      return Result.fail<void>(`Internal Server Error on ${this.#handlerName} Use Case`)
    }
  }
}
