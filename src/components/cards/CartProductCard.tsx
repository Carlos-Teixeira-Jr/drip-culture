import { CartProductType } from "../../interfaces/cart.interface";
import MinusIcon from "../../assets/icons/minus-icon.png";
import PlusIcon from "../../assets/icons/plus-icon.png";
import { useState } from "react";
import CloseIcon from "../../assets/icons/close.png";

export function CartProductCard(product: CartProductType) {
  const [quantity, setQuantity] = useState(1);

  const handleAddProduct = () => {
    setQuantity(quantity + 1);
  };

  const handleRemoveProduct = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex justify-between items-center gap-8">
      <div className="bg-offWhite px-2.5 w-20 min-w-20 h-20 flex justify-center items-center">
        <img src={product.image} alt={product.title} className="w-11 h-16" />
      </div>
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
        <div className="flex items-center gap-2 px-4 py-3 border border-borderColor rounded-sm justify-between w-fit">
          <img
            src={MinusIcon}
            className="w-4 h-4 cursor-pointer"
            onClick={handleRemoveProduct}
          />
          <h5 className="text-neutral px-4.5">{quantity}</h5>
          <img
            src={PlusIcon}
            className="w-4 h-4  cursor-pointer"
            onClick={handleAddProduct}
          />
        </div>
      </div>
      <div className="rounded-sm p-2.5 bg-offWhite shrink-0">
        <img src={CloseIcon} className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
  );
}
