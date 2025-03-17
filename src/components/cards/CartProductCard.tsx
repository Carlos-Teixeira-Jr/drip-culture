import { CartProductType, ICart } from "../../interfaces/cart.interface";
import MinusIcon from "../../assets/icons/minus-icon.png";
import PlusIcon from "../../assets/icons/plus-icon.png";
import { useState } from "react";
import CloseIcon from "../../assets/icons/close.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../slices/store";
import { setCart } from "../../slices/productsSlice";

export function CartProductCard(product: CartProductType) {
  const cart = useSelector((state: RootState) => state.cart) as ICart;

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
    <div className="flex justify-between items-center">
      <Link to={`/product/${product.id}`}>
        <div className="bg-offWhite px-2.5 w-20 min-w-20 h-20 flex justify-center items-center">
          <img
            src={product?.image && product?.image}
            alt={product.title}
            className="w-11 h-16"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-1.5 justify-between w-42">
        <h5 className="text-neutral">{product.title}</h5>
        <div className="flex justify-between w-fit gap-2 items-center">
          <p className="text-vividBlack">Color:</p>
          <div
            className={`rounded-full w-3 h-3`}
            style={{ backgroundColor: product.color }}
          />
          <p className="text-vividBlack">—</p>
          <p className="text-vividBlack">Size: {product.size}</p>
        </div>
      </div>
      <div>
        <h5>${product.price}.00</h5>
      </div>
      <div className="flex flex-col gap-2.5 pl-8 pr-4">
        <div className="flex items-center gap-2 px-4 py-3 border border-borderColor rounded-sm justify-between w-full">
          <img
            src={MinusIcon}
            className="w-4 h-4 cursor-pointer"
            onClick={handleDecrementProduct}
          />
          <h5 className="text-neutral px-4.5">
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
      </div>
      <div
        className="rounded-sm p-2.5 bg-offWhite shrink-0"
        onClick={handleRemoveProduct}
      >
        <img src={CloseIcon} className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
  );
}
