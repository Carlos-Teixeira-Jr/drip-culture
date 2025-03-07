import { useEffect, useState } from "react"
import { AdvantagesBanner } from "../components/banners/advantagesBanner/AdvantagesBanner"
import { BrowsingProductsBanner } from "../components/banners/browsingProductsBanner/BrowsingProductsBanner"
import { NewCollectionBanner } from "../components/banners/newCollectionBanner/NewCollectionBanner"
import { Header } from "../components/header/Header"
import { BestSellingProducts } from "../components/products/bestSellingProducts/BestSellingProducts"
import { OnOfferProducts } from "../components/products/onOfferProducts/OnOfferProducts"
import { IProduct } from "../interfaces/product.interface"
import { Footer } from "../components/footer/Footer"

export function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const first4Products = data.slice(0, 4);
          setProducts(first4Products);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div>
      <NewCollectionBanner/>
      <AdvantagesBanner/>
      <BestSellingProducts products={products}/>
      <BrowsingProductsBanner/>
      <OnOfferProducts products={products}/>
    </div>
  )
}