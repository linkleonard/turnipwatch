import { PriceSnapshot } from "../types";

export interface PriceApi {
  add(s: PriceSnapshot): Promise<void>
  list(): Promise<PriceSnapshot[]>
}
