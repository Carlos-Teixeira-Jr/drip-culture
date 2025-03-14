import { useState } from "react";
import { AuthBreadCrumb } from "../components/breadcrumbs/authBreadCrumb/AuthBreadCrumb";
import { Product } from "../components/products/product/Product";
import { IProduct } from "../interfaces/product.interface";


export function ProductPage() {
  const [product, setProduct] = useState<IProduct>()
  return (
    <main>
      <AuthBreadCrumb product={product}/>
      <Product onProductFetched={(product: IProduct) => setProduct(product)}/>
    </main>
  )
}