/* eslint-disable @typescript-eslint/no-invalid-void-type */

import { type IFilterInterface } from './genericContractRepository'

/**
 * `TargetEntity` as Entity to persist on database and
 * `ORM` as instance or connection or installed ORM
 * @example UserPersistence from infra
 * @example TypeORM installed instance
 *
 * @method save:
 * @method delete:
 * @method find:
 * @method orm:
 */
export interface IConnectionContract<TargetEntity> {
  save: (entity: TargetEntity) => Promise<void | TargetEntity>
  delete: (id: string) => Promise<void | TargetEntity>
  find: (filter: IFilterInterface) => Promise<TargetEntity[] | null>
  // orm: () => ORM
}
