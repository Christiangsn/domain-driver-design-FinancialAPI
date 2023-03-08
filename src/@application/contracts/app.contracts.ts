export interface IUseCases<DTO, Return> {
  run: (props: DTO) => Promise<Return>
}
