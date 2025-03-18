import { useNavigate } from "react-router-dom";
import { ICart } from "../../../../interfaces/cart.interface";
import { dateFormatter } from "../../../../utils/formatters/dateFomatter";

interface ICartProductsContainer {
  cart: ICart;
}

export function CartProductsContainer({ cart }: ICartProductsContainer) {
  const navigate = useNavigate();

  return (
    <main>
      <h3 className="pb-14">Orders</h3>

      {cart.products.map((product, idx) => (
        <div key={product.id} className="flex flex-col">
          <div className="flex gap-5 w-full items-center">
            <div className="flex gap-8 w-full">
              <div className="w-20 h-20 bg-offWhite flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-11 h-15"
                />
              </div>

              <div className="flex flex-col justify-between">
                <h5 className="text-neutral">{product.title}</h5>
                <div className="flex">
                  <p className="text-vividBlack">
                    Ordered On: {dateFormatter(product.orderDate)}
                  </p>
                </div>
                <p className="text-neutral">$ {product.price}.00</p>
              </div>
            </div>
            <button
              className="bg-white text-neutral border border-neutral h-fit text-nowrap"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              View item
            </button>
          </div>
          {idx !== cart.products.length - 1 && (
            <hr className="border border-borderColor my-8" />
          )}
        </div>
      ))}
    </main>
  );
}
