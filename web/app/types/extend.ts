import { Product } from "./schema";

export interface ProductExtend extends Product {
  quantity: number;
}
