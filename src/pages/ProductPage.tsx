import { useState } from "react";
import { BreadCrumb } from "../components/breadcrumbs/breadCrumb/BreadCrumb";
import { Product } from "../components/products/product/Product";
import { IProduct } from "../interfaces/product.interface";

export function ProductPage() {
  const [product, setProduct] = useState<IProduct>();
  return (
    <main>
      <BreadCrumb product={product} />
      <Product onProductFetched={(product: IProduct) => setProduct(product)} />
    </main>
  );
}
