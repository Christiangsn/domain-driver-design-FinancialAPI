/* eslint-disable @typescript-eslint/no-unused-vars */
import { type IDomainEvent } from './IDomainEvent'

export interface IHandle<IDomainEvent> {
  setupSubscriptions: () => void
}
