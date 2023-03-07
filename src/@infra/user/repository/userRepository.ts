import { User, type UserDocument } from './../entities/userSchema'
import { type IUserRepositoryContract } from '@domain/contracts/repositories/userRepository.contract'
import { type UserAggregate } from '@domain/user'
import { type IFilterInterface } from '@infra/shared'
import { UserMapper } from './userMapper'
import { type Model } from 'mongoose'
import { Inject } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

export class UserRepository implements IUserRepositoryContract {
  public constructor (
    @Inject(UserMapper)
    private readonly mapper: UserMapper,
    @InjectModel(User.name)
    private readonly conn: Model<UserDocument>
  ) {}

  public async save (entity: UserAggregate): Promise<void> {
    const schema = this.mapper.toPersistence(entity)
    const user = new this.conn(schema)
    await user.save()
  }

  public async delete (id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  public async find (filter: IFilterInterface): Promise<UserAggregate[] | null> {
    throw new Error('Method not implemented.')
  }

  public async exist (filter: IFilterInterface): Promise<boolean> {
    return await this.conn.exists(filter)
  }
}
