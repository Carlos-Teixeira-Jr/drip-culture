import { IProduct } from "../../../interfaces/product.interface";
import { ProductSmallCard } from "../../cards/ProductSmallCard";

interface IBestSellingProduct {
  products: IProduct[]
}

export function BestSellingProducts({ products }: IBestSellingProduct) {

  return (
    <main className="flex flex-col justify-center items-center py-[4.5] md:px-44 px-5 md:pb-[10.5rem] pb-30">
      <div className="md:pb-20 pb-10">
        <p className="text-slateGrey">SHOP NOW</p>
        <h1>Best Selling</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        {products.map((product) => (
          <ProductSmallCard product={product}/>
        ))}
      </div>
    </main>
  );
}
