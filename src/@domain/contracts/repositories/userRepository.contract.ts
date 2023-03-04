import { type UserAggregate } from '@domain/user'
import { type IGenericRepositoryContract } from '@infra/shared/core/contracts/genericContractRepository'

export type IUserRepositoryContract = IGenericRepositoryContract<UserAggregate>
