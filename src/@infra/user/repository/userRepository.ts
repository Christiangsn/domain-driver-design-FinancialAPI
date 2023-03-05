import { type UserDocument } from './../entities/userSchema'
import { type IUserRepositoryContract } from '@domain/contracts/repositories/userRepository.contract'
import { type UserAggregate } from '@domain/user'
import { type IFilterInterface } from '@infra/shared'
import { type UserMapper } from '../mappers/userMapper'
import { type Model } from 'mongoose'

export class UserRepository implements IUserRepositoryContract {
  public constructor (
    private readonly mapper: UserMapper,
    private readonly conn: Model<UserDocument>
  ) {}

  public async save (entity: UserAggregate): Promise<void> {
    throw new Error('Method not implemented.')
  }

  public async delete (id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  public async find (filter: IFilterInterface): Promise<UserAggregate[] | null> {
    throw new Error('Method not implemented.')
  }

  public async exist (filter: IFilterInterface): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
