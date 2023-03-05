import { Query, Resolver } from '@nestjs/graphql'
import { UserType } from '../types/userType'

@Resolver(() => UserType)
export class UserResolver {
  @Query(() => [UserType])
  public async users (): Promise<UserType[]> {
    const user = new UserType()
    user.email = 'fake@mail.com'
    user.id = '454151-Sdsa4889-dasd45'
    user.terms = []
    user.terms.push({
      acceptedAt: new Date(),
      ip: '127.0.0.1',
      userAgentType: {
        name: 'Mozilla/5.0',
        os: 'MACOS',
        type: 'Browser',
        version: '69.5.7'
      }
    })

    return [user]
  }
}
