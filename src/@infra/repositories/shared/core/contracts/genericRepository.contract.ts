
export type IFilterGeneric = { [x: string]: string | number }
export interface IGenericRepositoryContract<TargetEntity> {
    save: () => Promise<void>
    delete: () => Promise<void>
    find: (target: IFilterGeneric) => Promise<TargetEntity[]>
    exists: (target: IFilterGeneric) => Promise<boolean>
}