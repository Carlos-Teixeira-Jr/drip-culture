import { IAddress } from "./address.interface";
import { ICart } from "./cart.interface";

export interface IOrders {
  id: string,
  address: IAddress,
  cart: ICart
}