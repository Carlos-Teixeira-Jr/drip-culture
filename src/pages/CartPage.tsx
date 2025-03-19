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
      <div className="md:px-44 flex flex-col-reverse md:flex-row md:gap-30 gap-8 md:pt-18 md:pb-34 pb-10">
        <CartProductsComponent cart={cart} />
        <OrderSummary/>
      </div>
    </main>
  );
}
