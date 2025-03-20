import { useEffect, useState } from "react";
import { RootState } from "../../../slices/store";
import { ICart } from "../../../interfaces/cart.interface";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IAddress } from "../../../interfaces/address.interface";
import { Toast } from "../../toasts/toast";
import { setCart } from "../../../slices/productsSlice";

interface IPlaceOrder {
  address: IAddress;
}

export function PlaceOrder({ address }: IPlaceOrder) {
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart) as ICart;

  useEffect(() => {
    const hasEmptyValues = Object.values(address).some((value) => !value);
    if (!hasEmptyValues) {
      setBtnIsDisabled(false);
    }
  }, [address]);

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
    setSubTotal(newSubTotal);
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

  const handlePaymentBtnClick = async () => {
    try {
      const response = await fetch("http://localhost:3001/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          cart,
        }),
      });

      if (response.ok){
        dispatch(setCart({
          id: 0,
          userEmail: "",
          products: [],
        }));
        window.scrollTo({ top: 0 });
        navigate("/after-payment");
      }
    } catch (error) {
      console.log(error);
      setShowToast({
        show: true,
        message: "Error on payment",
        type: "error",
      });
    }
  };

  return (
    <section className="md:w-[341px] md:border-l-2 border-l-borderColor rounded-sm py-8 md:pl-16 h-fit">
      <div className="flex flex-col">
        <h1 className="">Your order</h1>
        <button
          className="ml-auto bg-white border border-lightBtnBorder  px-6 py-3 md:text-sm font-medium md:my-16 my-10"
          onClick={() => navigate("/cart")}
        >
          Edit Cart
        </button>
      </div>

      <div>
        {summarryItens.map((item) => (
          <div key={item.id} className="flex justify-between my-4">
            <h5 className="">{item.name}</h5>
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
        disabled={btnIsDisabled}
        onClick={handlePaymentBtnClick}
      >
        Place Order
      </button>

      <Toast toastProps={showToast} handleRemoveToast={setShowToast} />
    </section>
  );
}
