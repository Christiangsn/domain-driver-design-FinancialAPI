import { Result, Entity, type UniqueEntityID } from '@domain/shared/core'

export class ReasonIdValueObject extends Entity<any> {
  private constructor (id?: UniqueEntityID) {
    super(null, id)
  }

  public get id (): UniqueEntityID { return this._id }

  public static create (id?: UniqueEntityID): Result<ReasonIdValueObject> {
    return Result.ok<ReasonIdValueObject>(new ReasonIdValueObject(id))
  }
}
