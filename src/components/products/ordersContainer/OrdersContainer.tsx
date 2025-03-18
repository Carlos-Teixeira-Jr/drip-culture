import { ICart } from "../../../interfaces/cart.interface";
import { CartProductsContainer } from "../chart/chartProductsContainer/ChartProductsContainer";
import { EmptyCartContainer } from "../chart/emptyChartContainer/EmptyCartContainer";
import { useSelector } from "react-redux";
import { RootState } from "../../../slices/store";


export function OrdersContainer() {

  const cart = useSelector((state: RootState) => state.cart) as ICart;

  return (
    <main className="pl-12 w-2/3">
      {!cart ? <EmptyCartContainer/> : <CartProductsContainer cart={cart}/>}
    </main>
  )
}