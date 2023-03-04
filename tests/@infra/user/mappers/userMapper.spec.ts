import { UserMapper } from '@infra/user/mappers/userMapper'

describe('UserMapper', () => {
  it('should be defined', () => {
    const mapper = new UserMapper()
    expect(mapper).toBeDefined()
  })
})
