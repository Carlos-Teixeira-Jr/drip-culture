import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../slices/store";
import {
  setFilters,
  setPrice,
} from "../../../../slices/productsSlice";
import { useIsMobile } from "../../../../utils/hooks/useIsMobile";

export type Category = {
  id: string;
  name: string;
};

interface ICategoriesSideMenu {
  categories: Category[]
}

export function CategoriesSideMenu({categories}: ICategoriesSideMenu) {
  const dispatch = useDispatch<AppDispatch>();

  const { price, priceEndPoints, filter } = useSelector(
    (state: RootState) => state.products
  );

  const [position, setPosition] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const percent =
        (price - Number(slider.min)) /
        (Number(slider.max) - Number(slider.min));
      const newPosition = percent * slider.clientWidth;

      const tooltipWidth = 1;
      const adjustedPosition = Math.min(
        Math.max(newPosition - tooltipWidth / 2, 0),
        slider.clientWidth - tooltipWidth
      );

      if (isMobile) {
        setPosition(adjustedPosition + 40);
      } else {
        setPosition(adjustedPosition + 38);
      }
    }
  }, [price, priceEndPoints]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(e.target.value);
    dispatch(setPrice(newPrice));
  };

  const handleSelectFilter = (category: string) => {
    if (filter === category) {
      dispatch(setFilters(""));
    } else {
      dispatch(setFilters(category));
    }
  };

  return (
    <section className="md:ml-44 md:mb-24 border border-borderColor pt-6 pl-4.5 pr-3.5 w-full md:w-60.5 rounded-md h-fit relative">
      <div className="mb-10">
        <h5 className="mb-4">Categories</h5>
        {categories.map((category: Category) => (
          <div
            key={category.id}
            className="flex items-center gap-2.5 border-b border-borderColor py-3"
            onClick={() => handleSelectFilter(category.name)}
          >
            <div
              className={`md:w-4.5 md:h-4.5 w-10 h-10 border-2 rounded-xs border-borderColor cursor-pointer ${
                filter === category.name ? "bg-neutral" : ""
              }`}
            />
            <h6 className=" text-2xl md:text-sm text-slateBlack">
              {category.name}
            </h6>
          </div>
        ))}
      </div>

      <div className="pr-3">
        <h5 className="mb-4">Price</h5>

        <div className="flex flex-col pb-12">
          <input
            type="range"
            ref={sliderRef}
            min={priceEndPoints.min}
            max={priceEndPoints.max}
            step={1}
            value={price}
            className="px-0 accent-slateGrey cursor-pointer w-[85%] md:w-[80%] mx-auto"
            onChange={handlePriceChange}
          />
          <div
            className={`neutral-div text-white text-xs w-fit py-1 px-2 rounded-sm absolute bottom-1 md:bottom-6 left-0 transform -translate-x-1/2`}
            style={{ left: `${position}px` }}
          >
            <p className="relative z-50 text-white">$ {price}</p>

            <div
              data-popper-arrow
              className="absolute top-[-0.2rem] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 neutral-div z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
