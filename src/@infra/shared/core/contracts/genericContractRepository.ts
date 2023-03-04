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
export interface IGenericRepositoryContract< TargetPersistence, DomainAggregate > {
  save: (entity: TargetPersistence) => Promise<void>
  delete: (id: string) => Promise<void>
  find: (filter: IFilterInterface) => Promise<DomainAggregate[] | null>
  exist: (filter: IFilterInterface) => Promise<boolean>
  // orm: () => ORM
}
