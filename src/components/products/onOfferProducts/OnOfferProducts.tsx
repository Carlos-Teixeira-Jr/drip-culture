import { IProduct } from "../../../interfaces/product.interface";

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
          <p className=" text-4xl">On Offer</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col max-w-62">
            <img
              src={product.images[0].images[0]}
              alt={product.title}
              className="w-[15rem] h-[19.5rem] object-cover"
            />
            <h3 className="py-3 text-center md:text-start w-full truncate">{product.title}</h3>
            <div className="flex items-center md:justify-start justify-center gap-4">
              <div className="border border-borderColor rounded-full px-4 py-0.5">
                <p className="">IN STOCK</p>
              </div>
              <h6 className="">${product.price}</h6>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
