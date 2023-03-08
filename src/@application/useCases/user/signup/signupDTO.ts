import { type OS } from '@domain/user'

export interface ISignUpDTO {
  email: string
  password: string
  ip: string
  acceptedTerms: boolean
  userAgent: {
    name: string
    version: string
    os: keyof typeof OS
    type: string
  }
}
