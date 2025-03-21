import { IProduct } from "../../interfaces/product.interface";

interface IProductSmallCard {
  product: IProduct
}

export function ProductSmallCard({product}: IProductSmallCard) {
  return (
    <div key={product.id} className="flex flex-col max-w-62">
      <img
        src={product.images[0].images[0]}
        alt={product.title}
        className="w-[15rem] h-[19.5rem] object-cover md:mx-0 mx-auto"
      />
      <h3 className="py-3 text-center md:text-start truncate w-full text-neutral">
        {product.title}
      </h3>
      <div className="flex items-center md:justify-start justify-center gap-4">
        <div className="border border-borderColor rounded-full px-4 py-0.5">
          <p className="text-neutral">IN STOCK</p>
        </div>
        <h6 className="text-slateBlack">${product.price}</h6>
      </div>
    </div>
  );
}
