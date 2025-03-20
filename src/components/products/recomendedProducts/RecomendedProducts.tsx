import { useEffect, useState } from "react"
import { IProduct } from "../../../interfaces/product.interface"
import { ProductCard } from "../../cards/ProductCard";

interface IRecomendedProducts {
  category: string | undefined
}


export function RecomendedProducts({ category }: IRecomendedProducts) {

  const [similarProducts, setSimilarProducts] = useState<IProduct[]>();

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products?category=${category}&_limit=4`);
        const data = await response.json();
        setSimilarProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSimilarProducts()
  },[category])

  return (
    <section className="flex flex-col px-5 md:px-0 gap-2">
      <h1 className=" pt-4">You might also like</h1>
      <p className="text-slateGrey">SIMILAR PRODUCTS</p>

      <div className="flex flex-col md:flex-row gap-5 pt-14 pb-15 md:pb-32.5">
        {similarProducts?.map((product) => (
          <ProductCard product={product} key={product.id}/>
        ))}
      </div>
    </section>
  )
}