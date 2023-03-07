import { SignUpInput } from './../inputs/signupInput'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserType } from '../types/userType'
import { UserService } from '../user.service'
import { Inject, NotAcceptableException } from '@nestjs/common'

@Resolver(() => UserType)
export class UserResolver {
  constructor (
    @Inject('IUserService')
    private readonly userService: UserService
  ) {}

  @Query(() => [UserType])
  public async users (): Promise<UserType[]> {
    const user = new UserType()
    user.email = 'fake@mail.com'
    user.id = '454151-Sdsa4889-dasd45'
    user.terms = []
    user.terms.push({
      acceptedAt: new Date(),
      ip: '127.0.0.1',
      userAgent: {
        name: 'Mozilla/5.0',
        os: 'MACOS',
        type: 'Browser',
        version: '69.5.7'
      }
    })

    return [user]
  }

  @Mutation(() => Boolean)
  public async signup (@Args(SignUpInput.name) user: SignUpInput): Promise<boolean> {
    if(!user.acceptedTerms) {
      throw new NotAcceptableException('Terms should be accepted')
    }
    await this.userService.signup({
      ...user,
      ip: user.ip,
      userAgent: {
        name: 'Mozilla/5.0',
        os: 'LINUX' as any,
        type: 'browser',
        version: '86.01'
      }
    })
    return true
  }
}
