import { type IHttpResponse } from '@application/contracts/app.contracts'

export const BadRequest = (message: string): IHttpResponse => ({
  statusCode: 400,
  data: {
    message,
    statusCode: 400
  }
})
