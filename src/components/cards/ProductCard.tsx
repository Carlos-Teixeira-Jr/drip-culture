import { Link } from "react-router-dom";
import { IProduct } from "../../interfaces/product.interface";

interface IProductCard {
  product: IProduct;
}

export function ProductCard({ product }: IProductCard) {
  console.log("🚀 ~ ProductCard ~ product:", product)
  return (
    <Link to={`/product/${product.id}`} key={product.id}>
      <div className="flex flex-col gap-5 w-64.5 h-[443px] cursor-pointer">
        <img
          src={product.images[0].images[0]}
          alt={product.title}
          className="w-full h-80"
        />
        <div className="flex flex-col gap-3 justify-between">
          <h5>{product.title}</h5>
          <div className="flex gap-4">
            <div className="flex border border-borderColor rounded-full px-4 py-0.5">
              <p>IN STOCK</p>
            </div>
            <h6 className="text-slateBlack">$ {product.price}.00</h6>
          </div>
        </div>
      </div>
    </Link>
  );
}
