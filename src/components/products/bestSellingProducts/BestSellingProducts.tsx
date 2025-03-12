import { IProduct } from "../../../interfaces/product.interface";

interface IBestSellingProduct {
  products: IProduct[]
}

export function BestSellingProducts({ products }: IBestSellingProduct) {

  return (
    <main className="flex flex-col justify-center items-center py-[4.5] px-44 pb-[10.5rem]">
      <div className="pb-20">
        <p>SHOP NOW</p>
        <h1>Best Selling</h1>
      </div>

      <div className="flex gap-5">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col">
            <img src={product.images[0].images[0]} alt={product.title} className="w-[15rem] h-[19.5rem] object-cover"/>
            <h3 className="py-3">{product.title}</h3>
            <div className="flex items-center gap-4">
              <div className="border border-borderColor rounded-full px-4 py-0.5"><p className="text-neutral">IN STOCK</p></div>
              <h6 className="text-slateBlack">${product.price}</h6>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
