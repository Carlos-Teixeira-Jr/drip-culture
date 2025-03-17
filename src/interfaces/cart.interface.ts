
export interface CartProductType {
  id: number | string | undefined,
  title: string | undefined,
  price: number | undefined,
  color: string | undefined,
  size: string | undefined,
  quantity: number | undefined,
  orderDate: string | undefined | Date,
  image: string | undefined,
};

export interface ICart {
  id: number;
  userEmail: string;
  products: CartProductType[];
}
