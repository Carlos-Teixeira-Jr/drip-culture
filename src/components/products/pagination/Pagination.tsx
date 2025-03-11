import ArrowLeftIcon from "../../../assets/icons/arrow-left-icon.png";
import ArrowRightIcon from "../../../assets/icons/arrow-right-icon.png";

interface IPagination {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: IPagination) {

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1
      onPageChange(newPage);
      return newPage;
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
      return page - 1;
    }
  }

  return (
    <div className="flex border border-borderColor rounded-sm p-2 gap-2 w-fit justify-between items-center">
      <div className={`p-3 ${page === 1 ? "opacity-25" : "cursor-pointer"}`} onClick={handlePreviousPage}>
        <img src={ArrowLeftIcon} alt="" className="w-6 h-6" />
      </div>

      <div className="bg-offWhite rounded-sm p-3 w-10 flex justify-center cursor-pointer">
        <p>{page}</p>
      </div>
      <div className={`p-3 ${page < totalPages ? "opacity-25" : "cursor-pointer"}`} onClick={handleNextPage}>
        <img src={ArrowRightIcon} alt="" className="w-6 h-6" />
      </div>
    </div>
  );
}
