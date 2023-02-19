import { type ProgressDomain, type RejectDomain } from './responses'

export interface UseCasesDomain<Request = any, Response = any> {
  execute: (props: Request) => Promise<RejectDomain | ProgressDomain<Response>>
}
