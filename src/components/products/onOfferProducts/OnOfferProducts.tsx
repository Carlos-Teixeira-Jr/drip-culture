import { IProduct } from "../../../interfaces/product.interface";
import { ProductSmallCard } from "../../cards/ProductSmallCard";

interface IBestSellingProduct {
  products: IProduct[]
}

export function OnOfferProducts({
  products,
}: IBestSellingProduct) {
  return (
    <main className="flex flex-col justify-center items-center py-[4.5] md:px-44 pb-10 md:pb-[10.5rem] pt-[9.5rem]">
      <div className="pb-10 md:pb-20">
        <div className="border border-borderColor rounded-full px-4 py-0.5">
          <p className="font-medium text-sm text-neutral">On Offer</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        {products.map((product) => (
          <ProductSmallCard product={product}/>
        ))}
      </div>
    </main>
  );
}
