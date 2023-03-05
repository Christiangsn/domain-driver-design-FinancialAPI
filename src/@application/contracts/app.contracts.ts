export interface IHttpResponse<Data = any> {
  statusCode: number
  data: Data
}
/**
 *  Validation request data
 *  Create a new instances domain
 *  Verify incorrect parameters
 */
export interface IUseCasesAPP<DTO> {
  run: (props: DTO) => Promise<IHttpResponse>
}
