import { useEffect, useState } from "react";
import { AuthBreadCrumb } from "../components/breadcrumbs/authBreadCrumb/AuthBreadCrumb";
import { CategoriesSideMenu, Category } from "../components/products/shop/categoriesSideMenu/CategoriesSideMenu";
import { IProduct } from "../interfaces/product.interface";
import { ProductsListing } from "../components/products/shop/productsListing/ProductsListing";

export function ShopPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [priceEndPoints, setPriceEndPoints] = useState({ min: 0, max: 0 });
  const [price, setPrice] = useState(priceEndPoints.min);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filterParams = filters.length > 0 ? `&category=${filters.join(",")}` : "";
        const response = await fetch(`http://localhost:3001/products?${filterParams}&price_lte=${price}&_page=${page}&_limit=9`);
        const data: IProduct[] = await response.json();

        setProducts(data);

        const categoriesResponse = await fetch("http://localhost:3001/categories");
        const categoriesData = await categoriesResponse.json();

        setCategories(categoriesData);

        const allData = await fetch(`http://localhost:3001/products`);
        const allDataJson: IProduct[] = await allData.json();

        setTotalProducts(allDataJson.length);

        let minPrice = 0;

        for(let i = 0; i < allDataJson.length; i++) {
          if(i === 0) {
            minPrice = allDataJson[i].price;
          } else {
            if(allDataJson[i].price < minPrice) {
              minPrice = allDataJson[i].price;
            }
          }
        }


        let maxPrice = 0;

        for(let i = 0; i < allDataJson.length; i++) {
          if(i === 0) {
            maxPrice = allDataJson[i].price;
          } else {
            if(allDataJson[i].price > maxPrice) {
              maxPrice = allDataJson[i].price;
            }
          }
        }

        setPriceEndPoints({ min: minPrice, max: maxPrice });
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, [filters, price]);

  return (
    <main>
      <AuthBreadCrumb />
      <div className="flex mt-8 gap-7">
        <CategoriesSideMenu
          categories={categories}
          selectedFilters={filters}
          onFiltersChange={(filters: string[]) => setFilters(filters)}
          onPriceChange={(price: number) => setPrice(price)}
          priceEndPoints={priceEndPoints}
          priceProp={price}
        />
        <ProductsListing
          filtersProp={filters}
          onCloseFilter={(filters: string[]) => setFilters(filters)}
          products={products} 
          onPageChange={(page: number) => setPage(page)} 
          page={page}
          totalProducts={totalProducts}     
        />
      </div>
    </main>
  );
}