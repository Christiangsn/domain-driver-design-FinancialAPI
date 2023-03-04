import { type IHttpResponse } from '@application/contracts/app.contracts'

export const InternalServerError = (message: string): IHttpResponse => ({
  statusCode: 500,
  data: {
    statusCode: 500,
    message
  }
})
