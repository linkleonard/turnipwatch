import { IWeekPriceRecord } from 'models'

export interface IPriceStore {
  save(r: IWeekPriceRecord): Promise<void>
  get(year: number, month: number): Promise<IWeekPriceRecord | undefined>
  list(): Promise<IWeekPriceRecord[]>
}
