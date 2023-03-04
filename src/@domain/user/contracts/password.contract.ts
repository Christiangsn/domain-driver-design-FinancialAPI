export type IPasswordValueObjectProps = {
  value: string
}

export interface IDomainPasswordContract {
  encryptPassword: () => Promise<void>
  comparePassword: (plainText: string) => Promise<boolean>
}
