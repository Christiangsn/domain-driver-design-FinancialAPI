import { useCases } from '@application/useCases/useCases'
import { type ISignUpDTO } from '@application/useCases/user/signup/signupDTO'
import { Inject, PreconditionFailedException } from '@nestjs/common'

export class UserService {
  public constructor (
    @Inject('ISignUpUseCase')
    private readonly signupUseCase: useCases<ISignUpDTO>
  ) { }

  public async signup (dto: ISignUpDTO): Promise<void> {
    const result = await this.signupUseCase.execute(dto)
    if (result.isFailure) throw new PreconditionFailedException(result.error)
  }
}
