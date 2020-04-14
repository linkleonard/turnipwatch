import { WeekPriceRecord } from 'models'

export interface IPriceStore {
  save(r: WeekPriceRecord): Promise<void>
  get(year: number, month: number): Promise<WeekPriceRecord | undefined>
  list(): Promise<WeekPriceRecord[]>
}
