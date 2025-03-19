import { useDispatch, useSelector } from "react-redux";
import ArrowLeftIcon from "../../../assets/icons/arrow-left-icon.png";
import ArrowRightIcon from "../../../assets/icons/arrow-right-icon.png";
import { AppDispatch, RootState } from "../../../slices/store";
import { fetchProducts, setPage  } from "../../../slices/productsSlice";
import { useEffect } from "react";

export function Pagination() {

  const dispatch = useDispatch<AppDispatch>()

  const { totalPages, page } = useSelector((state: RootState) => state.products);

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1
      dispatch(setPage(newPage));
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    dispatch(fetchProducts());
  },[dispatch, page])

  return (
    <div className="flex border border-borderColor rounded-sm mt-10 md:mt-0 p-2 gap-2 w-fit justify-between items-center">
      <div className={`p-3 ${page === 1 ? "opacity-25" : "cursor-pointer"}`} onClick={handlePreviousPage}>
        <img src={ArrowLeftIcon} alt="" className="w-6 h-6" />
      </div>

      <div className="bg-offWhite rounded-sm p-3 w-10 flex justify-center cursor-pointer">
        <p>{page}</p>
      </div>
      <div className={`p-3 ${page >= totalPages ? "opacity-25" : "cursor-pointer"}`} onClick={handleNextPage}>
        <img src={ArrowRightIcon} alt="" className="w-6 h-6" />
      </div>
    </div>
  );
}

