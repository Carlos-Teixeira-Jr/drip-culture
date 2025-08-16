import { useEffect, useState } from "react";
import { AdvantagesBanner } from "../components/banners/advantagesBanner/AdvantagesBanner";
import { BrowsingProductsBanner } from "../components/banners/browsingProductsBanner/BrowsingProductsBanner";
import { NewCollectionBanner } from "../components/banners/newCollectionBanner/NewCollectionBanner";
import { BestSellingProducts } from "../components/products/bestSellingProducts/BestSellingProducts";
import { OnOfferProducts } from "../components/products/onOfferProducts/OnOfferProducts";
import { IProduct } from "../interfaces/product.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../slices/store";
import { Loading } from "../components/loading/Loading";
import { fetchProducts } from "../slices/productsSlice";

export function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, products } = useSelector(
    (state: RootState) => state.products
  );

  // dispara a busca quando o componente monta
  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  // Deriva bestSelling e onOffer direto do Redux.products
  const bestSellingProducts: IProduct[] = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const productsOnOffer: IProduct[] = products
    .map((product) => ({
      ...product,
      priceDifference: product.price * (product.discountPercentage / 100),
    }))
    .sort((a, b) => b.priceDifference - a.priceDifference)
    .slice(0, 4);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <NewCollectionBanner />
          <AdvantagesBanner />
          <BestSellingProducts products={bestSellingProducts} />
          <BrowsingProductsBanner />
          <OnOfferProducts products={productsOnOffer} />
        </div>
      )}
    </>
  );
}
