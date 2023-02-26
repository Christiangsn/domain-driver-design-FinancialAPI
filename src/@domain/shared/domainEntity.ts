import { UniqueEntityID } from './uniqueEntityID'
import { type BaseDomainEntity } from './baseDomainEntity'

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity
}

export abstract class Entity<T extends BaseDomainEntity> {
  protected readonly _id: UniqueEntityID
  protected readonly props: T

  public constructor (props: T, id?: UniqueEntityID) {
    this._id = id || new UniqueEntityID()
    this.props = props
  }

  public get createdAt (): Date { return this.props.createdAt ?? new Date() }
  public get updatedAt (): Date { return this.props.updatedAt ?? new Date() }
  public get deletedAt (): Date { return this.props.deletedAt ?? new Date() }
  public get isDeleted (): boolean { return this.props.isDeleted ?? false }

  public equals (object?: Entity<T>): boolean {
    if (object === null || object === undefined) return false
    if (this === object) return true
    if (!isEntity(object)) return false
    else return this._id.equals(object._id)
  }
}
