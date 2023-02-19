/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Result, ValueObject } from '@domain/shared'

type IAcceptValueObjectProps = { value: Date }

export class AcceptAtValueObject extends ValueObject<IAcceptValueObjectProps> {
  private constructor (props: IAcceptValueObjectProps) {
    super(props)
  }

  public get value (): Date {
    const locateDate = new Date(this.props.value)
    const dateStr =
    ('00' + (locateDate.getMonth() + 1)).slice(-2) + '-' +
    ('00' + locateDate.getDate()).slice(-2) + '-' +
    locateDate.getFullYear() + ' ' +
    ('00' + locateDate.getHours()).slice(-2) + ':' +
    ('00' + locateDate.getMinutes()).slice(-2) + ':' +
    ('00' + locateDate.getSeconds()).slice(-2)

    return dateStr as unknown as Date
  }

  public static create (date: Date): Result<AcceptAtValueObject> {
    // Validation typeof Date
    if (!(date instanceof Date && !isNaN(date.valueOf()))) return Result.fail<AcceptAtValueObject>('Invalid Date')
    return Result.ok<AcceptAtValueObject>(new AcceptAtValueObject({ value: date }))
  }
}
