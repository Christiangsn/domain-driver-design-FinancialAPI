import { type UniqueEntityID } from './../../shared/uniqueEntityID'
import { Entity, Result } from '@domain/shared'

export class UserIdValueObject extends Entity<any> {
  private constructor (id?: UniqueEntityID) {
    super(null, id)
  }

  public get id (): UniqueEntityID { return this._id }

  public static create (id?: UniqueEntityID): Result<UserIdValueObject> {
    return Result.ok<UserIdValueObject>(new UserIdValueObject(id))
  }
}
