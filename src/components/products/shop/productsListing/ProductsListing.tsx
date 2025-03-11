import { useEffect, useState } from "react";
import CloseIcon from "../../../../assets/icons/close.png";
import { IProduct } from "../../../../interfaces/product.interface";
import { Pagination } from "../../pagination/Pagination";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store";
import { fetchPriceEndPoints, fetchProducts, setFilters } from "../../../../slices/productsSlice";

interface IProductsListing {
  onPageChange: (page: number) => void;
  page: number;
}

export function ProductsListing({
  onPageChange,
  page,
}: IProductsListing) {
  const dispatch = useDispatch<AppDispatch>();

  const [totalProductsOnPage, setTotalProductsOnPage] = useState(page * 9);

  const { products, totalProducts, filters, price } = useSelector((state: RootState) => state.products);

  const [totalPages, setTotalPages] = useState(totalProducts > 9 ? Math.ceil(Number(totalProducts) / 9) : 1);

  const handleCloseFilters = (filter: string) => {
    const updatedFilters = filters.filter((f) => f !== filter);
    dispatch(setFilters(updatedFilters));
  };

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchPriceEndPoints());
  },[dispatch, filters, price]);

  return (
    <section className="flex flex-col justify-center items-center pb-32">
      <div>
        <div className="flex flex-col gap-3">
          <h5>Applied Filters:</h5>
          <div className="flex gap-3">
            {filters.map((filter) => (
              <div
                key={filter}
                className="flex gap-2 px-4 py-0.5 rounded-full border border-borderColor cursor-pointer"
                onClick={() => handleCloseFilters(filter)}
              >
                <p>{filter}</p>
                <img src={CloseIcon} alt="close" />
              </div>
            ))}
          </div>
          <p className="text-vividBlack py-5.5">Showing {page}-{totalProductsOnPage} of {totalProducts} results.</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {products.map((product: IProduct) => (
            <Link to={`/shop/${product.id}`} key={product.id}>
              <div
                className="flex flex-col gap-5 items-center w-64.5 h-[443px] cursor-pointer"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-80"
                />
                <div className="flex flex-col gap-3 justify-between">
                  <h5>{product.title}</h5>
                  <div className="flex gap-4">
                    <div className="flex border border-borderColor rounded-full px-4 py-0.5">
                      <p>IN STOCK</p>
                    </div>
                    <h6 className="text-slateBlack">$ {product.price}.00</h6>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={(page: number) => onPageChange(page)}/>
    </section>
  );
}
