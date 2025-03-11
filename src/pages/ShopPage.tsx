import { AuthBreadCrumb } from "../components/breadcrumbs/authBreadCrumb/AuthBreadCrumb";
import {
  CategoriesSideMenu,
} from "../components/products/shop/categoriesSideMenu/CategoriesSideMenu";
import { ProductsListing } from "../components/products/shop/productsListing/ProductsListing";

export function ShopPage() {
  return (
    <main>
      <AuthBreadCrumb />
      <div className="flex mt-8 gap-7">
        <CategoriesSideMenu/>
        <ProductsListing/>
      </div>
    </main>
  );
}
