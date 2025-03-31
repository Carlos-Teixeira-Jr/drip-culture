import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { ICart } from "../../../interfaces/cart.interface";
import { RootState } from "../../../slices/store";

export function OrderSummary() {
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const cart = useSelector((state: RootState) => state.cart) as ICart;
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [isFirstOrder, setIsFirstOrder] = useState(false);

  useEffect(() => {
    let newSubTotal = 0;
    let newTotal = 0;

    cart.products.forEach((p) => {
      if (p.price) {
        if (p.quantity) {
          newSubTotal += p.price * p.quantity;
          newTotal += p.price * p.quantity;
        } else {
          newSubTotal += p.price;
          newTotal += p.price;
        }
      }
    });
    newTotal += 3;
    if (isFirstOrder) {
      let discount = (25 * newTotal) / 100;
      newTotal -= discount;
    }
    setSubTotal(newSubTotal);
    setTotal(newTotal);
  }, [cart, isFirstOrder]);

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

    useEffect(()  => {
      const fetchOrders = async () => {
        try {
          const response = await fetch(`http://localhost:3001/checkout?userEmail=${user?.emailAddresses[0].emailAddress}`);
          const data = await response.json();
          setIsFirstOrder(data.length < 1);
        } catch (error) {
          console.error(error);
        }
      }
      fetchOrders()
    },[user])

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

      {isFirstOrder && (
        <div className="flex justify-between mb-4">
          <h5 className="text-vividBlack">First Order Discount</h5>
          <h5 className="text-neutral font-bold">- 25%</h5>
        </div>
      )}

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
