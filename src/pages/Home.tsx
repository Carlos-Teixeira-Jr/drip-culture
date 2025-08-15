import { useEffect, useState } from "react";
import { AdvantagesBanner } from "../components/banners/advantagesBanner/AdvantagesBanner";
import { BrowsingProductsBanner } from "../components/banners/browsingProductsBanner/BrowsingProductsBanner";
import { NewCollectionBanner } from "../components/banners/newCollectionBanner/NewCollectionBanner";
import { BestSellingProducts } from "../components/products/bestSellingProducts/BestSellingProducts";
import { OnOfferProducts } from "../components/products/onOfferProducts/OnOfferProducts";
import { IProduct } from "../interfaces/product.interface";
import { useDispatch } from "react-redux";

export function Home() {
  const [bestSellingProduct, setBestSellingProducts] = useState<IProduct[]>([]);
  const [productsOnOffer, setProductsOnOffer] = useState<IProduct[]>([]);
  const dispatch = useDispatch();

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
          const data: IProduct[] = await response.json();

          const productsOnOffer = data
            .map((product) => ({
              ...product,
              priceDifference:
                product.price * (product.discountPercentage / 100),
            }))
            .sort((a, b) => b.priceDifference - a.priceDifference)
            .slice(0, 4);

          setProductsOnOffer(productsOnOffer);

          const bestSellingProducts = data
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4);
          setBestSellingProducts(bestSellingProducts);
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
      <NewCollectionBanner />
      <AdvantagesBanner />
      <BestSellingProducts products={bestSellingProduct} />
      <BrowsingProductsBanner />
      <OnOfferProducts products={productsOnOffer} />
    </div>
  );
}
