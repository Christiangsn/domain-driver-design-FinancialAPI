import { type OS } from '@domain/user'

export interface ISignUpDTO {
  email: string
  password: string
  ip: string
  userAgent: {
    name: string
    version: string
    os: OS
    type: string
  }
}
