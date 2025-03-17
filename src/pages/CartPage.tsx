import { useSelector } from "react-redux";
import { BreadCrumb } from "../components/breadcrumbs/breadCrumb/BreadCrumb";
import { CartProductsComponent } from "../components/products/chart/cartProducts/CartProducts";
import { RootState } from "../slices/store";
import { ICart } from "../interfaces/cart.interface";
import { OrderSummary } from "../components/checkout/order/OrderSummary";

export function CartPage() {
  const cart: ICart = useSelector((state: RootState) => state.cart) as ICart;
  console.log("🚀 ~ CartPage ~ cart:", cart);
  return (
    <main>
      <BreadCrumb />
      <div className="px-44 flex gap-30 pt-18 pb-34">
        <CartProductsComponent cart={cart} />
        <OrderSummary/>
      </div>
    </main>
  );
}
