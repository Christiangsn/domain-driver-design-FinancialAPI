export type IFilterInterface = Record<string, string | number>

/**
   * `TargetPersistence` as Entity to persist on database and
   * `DomainAggregate` as Aggregate Entity
   * `ORM` as instance or connection or installed ORM
   * @example UserPersistence from infra
   * @example UserAggregate from domain
   * @example ORM return method types `findOne` `finMany` ...
   *
   */
export interface IGenericRepositoryContract<DomainAggregate > {
  /**
   * @returns - Promise void
   * @description - this method must updated or create on cascde
   * @example
   * public async save (target: domainAggregate): Promise<void> {
   *  const persistenceTarget = this.mapper.toPersistence(target)
   *  const { id } = persistenceTarget
   *  exists = await this.exists({ id })
   *  if (exists) {
   *    await this.connection.update(persistenceTarget)
   *  } else {
   *    await this.connection.create(persistenceTarget)
   *  }
   * }
   */
  save: (entity: DomainAggregate) => Promise<void>
  delete: (id: string) => Promise<void>
  find: (filter: IFilterInterface) => Promise<DomainAggregate[] | null>
  /**
   * @param filter  as (key: value)
   *
   * @returns Boolean (true or false)
   */
  exist: (filter: IFilterInterface) => Promise<boolean>
  // orm: () => ORM
}
