import { useDispatch, useSelector } from "react-redux";
import { BreadCrumb } from "../components/breadcrumbs/breadCrumb/BreadCrumb";
import { CategoriesSideMenu } from "../components/products/shop/categoriesSideMenu/CategoriesSideMenu";
import { ProductsListing } from "../components/products/shop/productsListing/ProductsListing";
import { AppDispatch, RootState } from "../slices/store";
import { useEffect } from "react";
import { fetchPriceEndPoints, fetchProducts } from "../slices/productsSlice";
import { Loading } from "../components/loading/Loading";

export function ShopPage() {
  const { products, categories } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts({}));
    dispatch(fetchPriceEndPoints());
  }, [dispatch]);

  return (
    <>
      {products.length === 0 || categories.length === 0 ? (
        <Loading />
      ) : (
        <main>
          <BreadCrumb />
          <div className="flex flex-col md:flex-row mt-8 gap-7">
            <CategoriesSideMenu categories={categories} />
            <ProductsListing products={products} />
          </div>
        </main>
      )}
    </>
  );
}
