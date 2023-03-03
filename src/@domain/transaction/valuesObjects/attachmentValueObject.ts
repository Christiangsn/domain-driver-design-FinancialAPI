import { ErrorMessages } from '@domain/shared/common/errors'
import { Result, ValueObject } from '@domain/shared/core'

type IAttachmentValueObject = { value: string }
export class AttachmentValueObject extends ValueObject<IAttachmentValueObject> {
  static #isValidDirectoryRegex: RegExp = /^(.*)\/([^\/]+)$/
  static #isURlRegex: RegExp = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i

  private constructor (props: IAttachmentValueObject) {
    super(props)
  }

  public get value (): string { return this.props.value }
  public static create (path: string): Result<AttachmentValueObject> {
    const isValidUrl = this.#isURlRegex.test(path)
    const isValidDirectory = this.#isValidDirectoryRegex.test(path)
    if (!isValidUrl && !isValidDirectory) return Result.fail<AttachmentValueObject>(ErrorMessages.TRANSACTION_INVALID_ATTACHMENT_PATH)
    return Result.ok<AttachmentValueObject>(new AttachmentValueObject({ value: path }))
  }
}
