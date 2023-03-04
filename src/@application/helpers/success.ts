import { type IHttpResponse } from '@infra/contracts/app.contracts'

export const Success = <Data> (data: Data): IHttpResponse<Data> => ({
  statusCode: 200,
  data
})
