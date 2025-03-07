
export type Chartproducts = {
  id: number,
  title: string,
  price: number,
  quantity: number,
  orderDate: string,
  image: string,
};

export interface IChart {
  id: number;
  userEmail: string;
  products: Chartproducts[];
}
