import { IProduct } from "../../../interfaces/product.interface";

interface IBestSellingProduct {
  products: IProduct[]
}

export function BestSellingProducts({ products }: IBestSellingProduct) {

  return (
    <main className="flex flex-col justify-center items-center py-[4.5] md:px-44 px-5 md:pb-[10.5rem] pb-30">
      <div className="md:pb-20 pb-10">
        <p>SHOP NOW</p>
        <h1>Best Selling</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col max-w-62">
            <img src={product.images[0].images[0]} alt={product.title} className="w-[15rem] h-[19.5rem] object-cover md:mx-0 mx-auto"/>
            <h3 className="py-3 text-center md:text-start truncate w-full">{product.title}</h3>
            <div className="flex items-center md:justify-start justify-center gap-4">
              <div className="border border-borderColor rounded-full px-4 py-0.5"><p className="">IN STOCK</p></div>
              <h6 className="">${product.price}</h6>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
