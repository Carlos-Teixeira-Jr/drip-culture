import { useDispatch, useSelector } from "react-redux";
import ArrowLeftIcon from "../../../assets/icons/arrow-left-icon.png";
import ArrowRightIcon from "../../../assets/icons/arrow-right-icon.png";
import { AppDispatch, RootState } from "../../../slices/store";
import { fetchProducts, setPage  } from "../../../slices/productsSlice";
import { useEffect } from "react";

export function Pagination() {

  const dispatch = useDispatch<AppDispatch>()

  const { pagination, page } = useSelector((state: RootState) => state.products);

  const handleNextPage = () => {
    if (pagination.links.next) {
      const newPage = page + 1
      dispatch(setPage(newPage));
      dispatch(fetchProducts({ customUrl: pagination.links.next }));
      window.scrollTo({
        top: 250,
        behavior: "smooth",
      });
    }
  };

  const handlePreviousPage = () => {
    if (pagination.links.prev) {
      dispatch(setPage(page - 1));
      dispatch(fetchProducts({ customUrl: pagination.links.prev }));
      window.scrollTo({
        top: 250,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    dispatch(fetchProducts({}));
  },[dispatch])

  return (
    <div className="flex border border-borderColor rounded-sm mt-10 md:mt-0 p-2 gap-2 w-fit justify-between items-center">
      <div className={`p-3 ${!pagination?.links?.prev ? "opacity-25" : "cursor-pointer"}`} onClick={handlePreviousPage}>
        <img src={ArrowLeftIcon} alt="" className="w-6 h-6" />
      </div>

      <div className="bg-offWhite rounded-sm p-3 w-10 flex justify-center cursor-pointer">
        <p>{page}</p>
      </div>
      <div className={`p-3 ${!pagination?.links?.next ? "opacity-25" : "cursor-pointer"}`} onClick={ handleNextPage}>
        <img src={ArrowRightIcon} alt="" className="w-6 h-6" />
      </div>
    </div>
  );
}

