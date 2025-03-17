import { CartProductType, ICart } from "../../../../interfaces/cart.interface";
import { CartProductCard } from "../../../cards/CartProductCard";

interface ICartProducts {
  cart: ICart
}

export function CartProductsComponent({cart}: ICartProducts) {
  return (
    <section>
      <h1 className="pb-4.5">Your cart</h1>
      <hr className="text-lightBlue pb-12"/>
      <div className="flex flex-col gap-10 min-w-[528px]">
        {cart.products.map((product: any) => <CartProductCard key={product.id} {...product}/>)}
      </div>
    </section>
  )
}