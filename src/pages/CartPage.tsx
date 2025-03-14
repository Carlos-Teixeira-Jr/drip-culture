import { useSelector } from "react-redux";
import { AuthBreadCrumb } from "../components/breadcrumbs/authBreadCrumb/AuthBreadCrumb";
import { CartProductsComponent } from "../components/products/chart/cartProducts/CartProducts";
import { RootState } from "../../store";
import { ICart } from "../interfaces/cart.interface";
import { OrderSummary } from "../components/checkout/OrderSummary";

export function CartPage() {
  const cart: ICart = useSelector((state: RootState) => state.cart) as ICart;
  console.log("🚀 ~ CartPage ~ cart:", cart);
  return (
    <main>
      <AuthBreadCrumb />
      <div className="px-44 flex gap-30 pt-18 pb-34">
        <CartProductsComponent cart={cart} />
        <OrderSummary cart={cart}/>
      </div>
    </main>
  );
}
