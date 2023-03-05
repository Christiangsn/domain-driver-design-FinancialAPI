import { type IHttpResponse } from '@application/contracts/app.contracts'
import { InternalServerError } from '@application/helpers/internalServerError'

export abstract class useCases<DTO> {
  public abstract run (httpRequest: DTO): Promise<IHttpResponse>
  protected messageError: string

  public constructor (onMessageError?: string) {
    this.messageError = onMessageError || 'Internal Server Error'
  }

  public async execute (httpRequest: DTO): Promise<IHttpResponse> {
    try {
      return await this.run(httpRequest)
    } catch (error) {
      return InternalServerError(this.messageError)
    }
  }
}
