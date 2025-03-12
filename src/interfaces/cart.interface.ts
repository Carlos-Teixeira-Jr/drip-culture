
export type Cartproducts = {
  id: number | string | undefined,
  title: string | undefined,
  price: number | undefined,
  quantity: number | undefined,
  orderDate: string | undefined | Date,
  image: string | undefined,
};

export interface ICart {
  id: number;
  userEmail: string;
  products: Cartproducts[];
}
