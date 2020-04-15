import { submittableDays } from 'utils/time'
import { NullableNumberValidator, NumberValidator } from 'utils/validators'

export type MaybePrice = number | null

export interface IWeekPriceRecord {
  year: number,
  week: number,
  record: IPriceRecord,
}

export interface IPriceRecord {
  buyPrice: MaybePrice,
  prices: MaybePrice[],
}

export const EmptyPriceRecord: IPriceRecord = {
  buyPrice: null,
  prices: new Array(submittableDays.length * 2),
}

export class WeekPriceRecord implements IWeekPriceRecord {
  week: number
  year: number
  record: IPriceRecord

  constructor(obj: IWeekPriceRecord) {
    this.week = obj.week
    this.year = obj.year
    this.record = new PriceRecord(obj.record)
  }

  static sanitize(obj: any): WeekPriceRecord {
    if (!NumberValidator.validate(obj.year)) {
      throw new TypeError("year is not a number")
    }
    if (!NumberValidator.validate(obj.week)) {
      throw new TypeError("week is not a number")
    }

    return new WeekPriceRecord({
      ...obj,
      record: PriceRecord.sanitize(obj.record)
    })
  }

}

export class PriceRecord implements IPriceRecord {
  buyPrice: MaybePrice
  prices: MaybePrice[]

  constructor(obj: IPriceRecord = EmptyPriceRecord) {
    this.buyPrice = obj.buyPrice
    this.prices = [...obj.prices]
  }
  static sanitize(obj: any): PriceRecord {
    if (!NullableNumberValidator.validate(obj.buyPrice)) {
      throw new TypeError("buyPrice is not a number")
    }

    const prices: (number | null)[] = (obj.prices ?? []).map((p: any) => {
      if (!NullableNumberValidator.validate(p)) {
        throw new TypeError(`Invalid price: ${p}`)
      }
      return p
    })
    return new PriceRecord({
      ...obj,
      prices,
    })
  }
}
