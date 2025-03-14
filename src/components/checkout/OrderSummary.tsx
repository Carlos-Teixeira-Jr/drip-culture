import { useEffect, useState } from "react";
import { ICart } from "../../interfaces/cart.interface";

interface IOrderSummary {
  cart: ICart;
}

export function OrderSummary({ cart }: IOrderSummary) {
  const [subTotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartData, setCartData] = useState(cart);

  useEffect(() => {
    let newSubTotal = 0;
    cartData.products.forEach((p) => {
      if (p.price) {
        newSubTotal += p.price;
      }
    });
    setSubtotal(newSubTotal);
  }, [cartData]);

  useEffect(() => {
    let newTotal = 0;
    cartData.products.forEach((p) => {
      if (p.price) {
        newTotal += p.price;
      }
    });
    newTotal += 3;
    setTotal(newTotal);
  }, [cartData]);

  const summarryItens = [
    {
      id: 1,
      name: "Subtotal",
      price: subTotal,
    },
    {
      id: 2,
      name: "Shipping",
      price: 0,
    },
    {
      id: 3,
      name: "Tax",
      price: 3,
    },
  ];

  return (
    <section className="w-[341px] border border-borderColor rounded-sm py-8 px-6 h-fit">
      <h1 className="text-neutral">Order Summary</h1>

      <div>
        {summarryItens.map((item) => (
          <div key={item.id} className="flex justify-between my-4">
            <h5 className="text-vividBlack">{item.name}</h5>
            <h5>$ {item.price}</h5>
          </div>
        ))}
      </div>

      <hr className="text-borderColor" />

      <div className="flex justify-between my-4">
        <h5 className="text-vividBlack">Total</h5>
        <h5>$ {total}</h5>
      </div>

      <button className="w-full my-8">Checkout</button>

      <div className="flex justify-center">
        <p className="text-neutral underline cursor-pointer">Continue Shopping</p>
      </div>
    </section>
  );
}
