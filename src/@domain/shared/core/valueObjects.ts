import { type Result } from './result'

// O mesmo que type IValueObjectProps = { [index: string]: any }
type IValueObjectProps = Record<string, any>
export abstract class ValueObject<T extends IValueObjectProps> {
  public static create: (props: any) => Result<any>
  protected props: T

  public constructor (props: T) {
    const baseProps: any = { ...props }
    this.props = baseProps
  }

  public equals (valueObject?: ValueObject<T>): boolean {
    if (valueObject === null || valueObject === undefined) return false
    if (valueObject.props === undefined) return false
    return JSON.stringify(this.props) === JSON.stringify(valueObject.props)
  }
}
