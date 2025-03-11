import { AuthBreadCrumb } from "../components/breadcrumbs/authBreadCrumb/AuthBreadCrumb";
import {
  CategoriesSideMenu,
} from "../components/products/shop/categoriesSideMenu/CategoriesSideMenu";
import { ProductsListing } from "../components/products/shop/productsListing/ProductsListing";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setPage } from "../slices/productsSlice";

export function ShopPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    page,
  } = useSelector((state: RootState) => state.products);

  return (
    <main>
      <AuthBreadCrumb />
      <div className="flex mt-8 gap-7">
        <CategoriesSideMenu/>
        <ProductsListing
          onPageChange={(page: number) => dispatch(setPage(page))}
          page={page}
        />
      </div>
    </main>
  );
}
