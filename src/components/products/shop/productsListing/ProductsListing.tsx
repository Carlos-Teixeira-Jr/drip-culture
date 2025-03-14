import { useEffect, useState } from "react";
import CloseIcon from "../../../../assets/icons/close.png";
import SearchIcon from "../../../../assets/icons/search-icon.png";
import { IProduct } from "../../../../interfaces/product.interface";
import { Pagination } from "../../pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store";
import {
  fetchPriceEndPoints,
  fetchProducts,
  fetchTotalProducts,
  setFilters,
  setPrice,
  setTitleFilter,
} from "../../../../slices/productsSlice";
import { ProductCard } from "../../../cards/ProductCard";

export function ProductsListing() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    products,
    totalProducts,
    filter,
    titleFilter,
    price,
    page,
    priceEndPoints,
  } = useSelector((state: RootState) => state.products);

  const [titleFilterInput, setTitleFilterInput] = useState("");

  const handleCloseFilters = () => {
    dispatch(setFilters(""));
  };

  const handleResetPriceFilter = () => {
    dispatch(setPrice(priceEndPoints.max));
  };

  const handleTitleFilter = () => {
    dispatch(setTitleFilter(titleFilterInput));
    dispatch(fetchProducts());
  };

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchPriceEndPoints());
    dispatch(fetchTotalProducts());
  }, [dispatch, filter, price]);

  return (
    <section className="flex flex-col justify-center items-center pb-32">
      <div>
        <div className="flex flex-col gap-3">
          <h5>Applied Filter:</h5>
          <div className="flex gap-3">
            <div>
              {filter && (
                <div
                  className="flex gap-2 px-4 py-0.5 rounded-full border border-borderColor cursor-pointer"
                  onClick={handleCloseFilters}
                >
                  <p className="text-neutral">{filter}</p>
                  <img src={CloseIcon} alt="close" />
                </div>
              )}
              {price < priceEndPoints.max && (
                <div
                  className="flex gap-2 px-4 py-0.5 rounded-full border border-borderColor cursor-pointer"
                  onClick={handleResetPriceFilter}
                >
                  <p className="text-neutral">${price}.00</p>
                  <img src={CloseIcon} alt="close" />
                </div>
              )}
            </div>
            <div className="w-full">
              <div className="relative w-fit ml-auto">
                <input
                  className="float-right w-64.5 pl-12 font-medium text-sm"
                  placeholder="Search products"
                  value={titleFilterInput}
                  onChange={(e) => setTitleFilterInput(e.target.value)}
                />
                <img
                  src={SearchIcon}
                  alt="close"
                  className="absolute left-2 top-2.5 w-6 h-6 cursor-pointer"
                  onClick={handleTitleFilter}
                />
              </div>
            </div>
          </div>
          <p className="text-vividBlack py-5.5">
            Showing {page}-{products.length} of {totalProducts} results.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {products.map((product: IProduct) => (
            <ProductCard product={product} key={product.id}/>
          ))}
        </div>
      </div>

      <Pagination />
    </section>
  );
}
