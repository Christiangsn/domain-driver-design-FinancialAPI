/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Result, ValueObject } from '@domain/shared/core'

type IDateCommonProps = { value: Date }

export class DateCommonValueObject extends ValueObject<IDateCommonProps> {
  private constructor (props: IDateCommonProps) {
    super(props)
  }

  // public get value (): Date {
  //   const locateDate = new Date(this.props.value)
  //   const dateStr =
  //   ('00' + (locateDate.getMonth() + 1)).slice(-2) + '-' +
  //   ('00' + locateDate.getDate()).slice(-2) + '-' +
  //   locateDate.getFullYear() + ' ' +
  //   ('00' + locateDate.getHours()).slice(-2) + ':' +
  //   ('00' + locateDate.getMinutes()).slice(-2) + ':' +
  //   ('00' + locateDate.getSeconds()).slice(-2)

  //   return dateStr as unknown as Date
  // }

  public get value (): Date { return this.props.value }
  public static create (date: Date): Result<DateCommonValueObject> {
    // Validation typeof Date
    if (!(date instanceof Date && !isNaN(date.valueOf()))) return Result.fail<DateCommonValueObject>('Invalid Date')
    return Result.ok<DateCommonValueObject>(new DateCommonValueObject({ value: date }))
  }
}
