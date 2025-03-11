import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store";
import { fetchCategories, fetchPriceEndPoints, fetchProducts, setFilters, setPrice } from "../../../../slices/productsSlice";

export type Category = {
  id: string;
  name: string;
};

export function CategoriesSideMenu() {
  const dispatch = useDispatch<AppDispatch>();

  const { categories, price, priceEndPoints, filters } = useSelector((state: RootState) => state.products);

  const [position, setPosition] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const percent =
        (price - Number(slider.min)) /
        (Number(slider.max) - Number(slider.min));
      const newPosition = percent * slider.clientWidth;
      setPosition(newPosition);
    }
  }, [price]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(e.target.value);
    dispatch(setPrice(newPrice));
  };

  const handleSelectFilter = (category: string) => {
    let updatedFilters: string[];

    if (!filters.includes(category)) {
      updatedFilters = [...filters, category];
    } else {
      updatedFilters = filters.filter((filter) => filter !== category);
    }

    dispatch(setFilters(updatedFilters));
  };

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchPriceEndPoints());
  },[dispatch, filters])

  return (
    <section className="ml-44 border border-borderColor pt-6 pl-4.5 pr-3.5 w-60.5 rounded-md h-fit relative">
      <div className="mb-10">
        <h5 className="mb-4">Categories</h5>
        {categories.map((category: Category) => (
          <div
            key={category.id}
            className="flex items-center gap-2.5 border-b border-borderColor py-3"
            onClick={() => handleSelectFilter(category.name)}
          >
            <div
              className={`w-4.5 h-4.5 border-2 rounded-xs border-borderColor cursor-pointer ${
                filters.includes(category.name) ? "bg-neutral" : ""
              }`}
            />
            <h6 className="text-slateBlack">{category.name}</h6>
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
            className="px-0 accent-slateGrey cursor-pointer w-full"
            onChange={handlePriceChange}
          />
          <div
            className="bg-neutral text-white text-xs w-fit py-1 px-2 rounded-sm absolute bottom-6 transform -translate-x-1/8"
            style={{ left: `${position}px` }}
          >
            <p className="relative z-50">$ {price}</p>

            <div
              data-popper-arrow
              className="absolute top-[-0.2rem] right-3.5 w-3 h-3 rotate-45 bg-neutral z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
