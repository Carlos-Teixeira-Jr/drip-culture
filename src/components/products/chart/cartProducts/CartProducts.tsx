import { CartProductType, ICart } from "../../../../interfaces/cart.interface";
import { CartProductCard } from "../../../cards/CartProductCard";

interface ICartProducts {
  cart: ICart
}

export function CartProductsComponent({cart}: ICartProducts) {
  return (
    <section className="px-5 md:px-0">
      <h1 className="pb-4.5">Your cart</h1>
      <hr className="text-lightBlue pb-6 md:pb-12"/>
      <div className="flex flex-col-reverse gap-10 md:min-w-[528px] w-full">
        {cart.products.map((product: any) => <CartProductCard key={product.id} {...product}/>)}
      </div>
    </section>
  )
}