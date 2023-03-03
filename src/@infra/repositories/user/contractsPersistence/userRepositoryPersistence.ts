import { IGenericRepositoryContract } from "@infra/repositories/shared/core/contracts/genericRepository.contract";

export interface IUserRepositoryPersistence<ITargetUserPersistence, ORM> extends IGenericRepositoryContract<ITargetUserPersistence> {
    methods: () => ORM
}