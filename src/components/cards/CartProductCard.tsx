import { CartProductType, ICart } from "../../interfaces/cart.interface";
import MinusIcon from "../../assets/icons/minus-icon.png";
import PlusIcon from "../../assets/icons/plus-icon.png";
import { useState } from "react";
import CloseIcon from "../../assets/icons/close.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../slices/store";
import { setCart } from "../../slices/productsSlice";
import { useIsMobile } from "../../utils/hooks/useIsMobile";

export function CartProductCard(product: CartProductType) {
  const cart = useSelector((state: RootState) => state.cart) as ICart;
  const isMobile = useIsMobile();

  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(1);

  const handleAddProduct = () => {
    setQuantity(quantity + 1);

    const newProduct = cart.products.map((item) =>
      item.id === product.id ? { ...item, quantity: quantity + 1 } : item
    );

    const updatedCart = {
      ...cart,
      products: newProduct,
    };

    console.log("🚀 ~ handleAddProduct ~ updatedCart:", updatedCart);

    dispatch(setCart(updatedCart));
  };

  const handleDecrementProduct = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);

      const productIndex = cart.products.findIndex(
        (item) => item.id === product.id
      );
      const updatedProducts = [...cart.products];

      if (productIndex !== -1) {
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          quantity: quantity - 1,
        };

        const updatedCart = {
          ...cart,
          products: updatedProducts,
        };

        dispatch(setCart(updatedCart));
      } else {
        console.log("Product not found in cart.");
      }
    }
  };

  const handleRemoveProduct = () => {
    if (cart.products.length <= 1) {
      dispatch(setCart({ id: 0, userEmail: "", products: [] }));
    } else {
      const updatedProducts = [...cart.products];

      const productIndex = cart.products.findIndex(
        (item) => item.id === product.id
      );

      if (productIndex !== -1) {
        updatedProducts.splice(productIndex, 1);
      }

      const updatedCart = {
        ...cart,
        products: updatedProducts,
      };

      dispatch(setCart(updatedCart));
    }
  };

  return (
    <div className="flex md:flex-row flex-col justify-between items-center">
      <Link to={`/product/${product.id}`}>
        <div className="bg-offWhite md:px-2.5 md:w-20 md:min-w-20 md:h-20 flex justify-center items-center">
          <img
            src={product?.image && product?.image}
            alt={product.title}
            className="md:w-11 md:h-16 w-56"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-1.5 justify-between w-full max-w-42 pl-8.5">
        <p className="text-sm w-full truncate">{product.title}</p>
        <div className="flex justify-between w-fit gap-2 items-center">
          <p className="">Color:</p>
          <div
            className={`rounded-full w-3 h-3`}
            style={{ backgroundColor: product.color }}
          />
          <p className="">—</p>
          <p className="">Size: {product.size}</p>
        </div>
      </div>
      <div className="flex justify-start w-full pl-27">
        <h5>${product.price}.00</h5>
      </div>
      <div className="flex gap-2.5 md:pl-8 md:pr-4 mr-auto py-5">
        <div className="flex items-center gap-2 px-4 py-3 border border-borderColor rounded-sm justify-between w-full min-w-[127px]">
          <img
            src={MinusIcon}
            className="w-4 h-4 cursor-pointer"
            onClick={handleDecrementProduct}
          />
          <h5 className=" px-4.5">
            {
              cart.products.find(
                (item: CartProductType) => item.id === product.id
              )?.quantity
            }
          </h5>
          <img
            src={PlusIcon}
            className="w-4 h-4  cursor-pointer"
            onClick={handleAddProduct}
          />
        </div>
        {isMobile && (
          <div
            className="rounded-sm p-2.5 bg-offWhite shrink-0 h-fit my-auto"
            onClick={handleRemoveProduct}
          >
            <img src={CloseIcon} className="w-5 h-5 cursor-pointer" />
          </div>
        )}
      </div>
      {!isMobile && (
        <div
          className="rounded-sm p-2.5 bg-offWhite shrink-0"
          onClick={handleRemoveProduct}
        >
          <img src={CloseIcon} className="w-5 h-5 cursor-pointer" />
        </div>
      )}
    </div>
  );
}
