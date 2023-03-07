import { DateCommonValueObject, EmailValueObject, IpValueObject, PasswordValueObject, TermsValueObject, UserAggregate } from '@domain/user'
import { type IMapperContract } from '@infra/shared'
import { type User } from '../entities/userSchema'
import { UniqueEntityID } from '@domain/shared/core'

export class UserMapper implements IMapperContract<User, UserAggregate> {
  public toDomain (target: User): UserAggregate {
    return UserAggregate.create({
      email: EmailValueObject.create(target.email).getResult(),
      password: PasswordValueObject.create(target.password).getResult(),
      terms: target.terms.map((term) => TermsValueObject.create({
        ip: IpValueObject.create(term.ip).getResult(),
        userAgent: term.userAgent,
        acceptedAt: DateCommonValueObject.create(term.acceptedAt).getResult()
      }).getResult()),
      createdAt: target.createdAt,
      updatedAt: target.updatedAt
    }, new UniqueEntityID(target.id)).getResult()
  }

  public toPersistence (target: UserAggregate): User {
    return {
      id: target.id.toString(),
      email: target.email.value,
      password: target.password.value,
      terms: target.terms.map((term) => ({
        ip: term.value.ip.value.toString(),
        acceptedAt: term.value.acceptedAt.value,
        userAgent: term.value.userAgent
      })),
      createdAt: target.createdAt,
      updatedAt: target.updatedAt
    }
  }
}
