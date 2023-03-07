import { User, UserSchema } from './entities/userSchema'
import { MongooseModule } from '@nestjs/mongoose'
import { UserMapper } from './repository/userMapper'
import { SignupUseCases } from '@application/useCases/user'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserResolver } from './resolver/user.resolver'
import { UserService } from './user.service'
import { UserRepository } from './repository/userRepository'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'ISignUpUseCase', useClass: SignupUseCases },
    { provide: 'IUserRepository', useClass: UserRepository },
    UserMapper,
    UserResolver,
    UserService
  ],
  exports: []
})
export class UserModule {}
