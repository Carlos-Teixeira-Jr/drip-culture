import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ICart } from "../../../interfaces/cart.interface";
import { RootState } from "../../../slices/store";

export function OrderSummary() {
  const [subTotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const cart = useSelector((state: RootState) => state.cart) as ICart;
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    let newSubTotal = 0;
    cart.products.forEach((p) => {
      if (p.price) {
        if (p.quantity) {
          newSubTotal += p.price * p.quantity;
        } else {
          newSubTotal += p.price;
        }
      }
    });
    setSubtotal(newSubTotal);
  }, [cart]);

  useEffect(() => {
    let newTotal = 0;
    cart.products.forEach((p) => {
      if (p.price) {
        if (p.quantity) {
          newTotal += p.price * p.quantity;
        } else {
          newTotal += p.price;
        }
      }
    });
    newTotal += 3;
    setTotal(newTotal);
  }, [cart]);

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
    <section className="md:w-[341px] border border-borderColor rounded-sm py-8 px-6 h-fit">
      <h1 className="">Order Summary</h1>

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
        <h5 className="">Total</h5>
        <h5>$ {total}</h5>
      </div>

      <button
        className="w-full my-8 disabled:opacity-25 disabled:cursor-auto"
        disabled={cart.products.length === 0}
        onClick={() => {
          isSignedIn
            ? navigate("/checkout")
            : navigate("/login")
        }}
      >
        {isSignedIn ? "Checkout" : "Login to Checkout"}
      </button>

      <div className="flex justify-center">
        <Link to="/shop">
          <p className=" underline cursor-pointer">
            Continue Shopping
          </p>
        </Link>
      </div>
    </section>
  );
}
