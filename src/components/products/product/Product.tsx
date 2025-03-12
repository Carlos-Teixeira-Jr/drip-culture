import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IProduct } from "../../../interfaces/product.interface";
import ShareIcon from "../../../assets/icons/share-icon.png";
import StarIcon from "../../../assets/icons/star-icon.png";
import MinusIcon from "../../../assets/icons/minus-icon.png";
import PlusIcon from "../../../assets/icons/plus-icon.png";
import MoreIcon from "../../../assets/icons/more-icon.png";
import { RecomendedProducts } from "../recomendedProducts/RecomendedProducts";
import ArrowRightIcon from "../../../assets/icons/arrow-right-icon.png";

export function Product() {
  const { pathname } = useLocation();

  const [product, setProduct] = useState<IProduct>();
  const [productId, setProductId] = useState(pathname.split("/")[2]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [actualImage, setActualImage] = useState<{
    image: string;
    index: number;
  }>({
    image: "",
    index: 0,
  });

  console.log("🚀 ~ Product ~ actualImage:", actualImage);

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const handleAddProduct = () => {
    setQuantity(quantity + 1);
  };

  const handleRemoveProduct = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleNextImage = (index: number) => {
    if (product) {
      const colorImageIndex = product?.images.findIndex(
        (img) => img.color === selectedColor
      );
      if (colorImageIndex !== -1) {
        if (
          product &&
          index < product.images[colorImageIndex].images.length - 1
        ) {
          const nextIndex = index + 1;
          setActualImage({
            image: product?.images[colorImageIndex].images[nextIndex],
            index: nextIndex,
          });
        }
      }
    }
  };

  const handlePreviousImage = (index: number) => {
    if (product) {
      const colorImageIndex = product?.images.findIndex(
        (img) => img.color === selectedColor
      );
      if (colorImageIndex !== -1) {
        if (
          product &&
          index > 0
        ) {
          const nextIndex = index - 1;
          setActualImage({
            image: product?.images[colorImageIndex].images[nextIndex],
            index: nextIndex,
          });
        }
      }
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/products?id=${productId}`
        );
        const data: IProduct[] = await response.json();
        setProduct(data[0]);
        setActualImage({
          image: data[0].images[0].images[0],
          index: 0,
        });
        setSelectedColor(data[0].colors[0]);
        setSelectedSize(data[0].sizes[0]);
      } catch (error) {
        setShowToast({
          show: true,
          message: "Error fetching product",
          type: "error",
        });
      }
    };

    fetchProduct();
  }, []);

  return (
    <section className="px-44 mt-4">
      <div className="flex gap-28.5">
        <div className="flex flex-col gap-24.5 pt-7 px-28.5 bg-offWhite relative">
          <img
            src={actualImage.image}
            alt="product image"
            className="w-72 h-[404px]"
          />
          <div className="absolute w-full flex gap-90 left-10 top-[40%]">
            <img
              src={ArrowRightIcon}
              className="w-10 h-10 rotate-180"
              onClick={() => handlePreviousImage(actualImage.index)}
            />
            <img
              src={ArrowRightIcon}
              className="w-10 h-10"
              onClick={() => handleNextImage(actualImage.index)}
            />
          </div>
          <div className="flex justify-center items-center">
            {product?.images[0].images.map((image, index) => (
              <h1
                key={index}
                className={`text-5xl ${
                  index === 0 ? "text-neutral" : "text-gray-500"
                }`}
              >
                •
              </h1>
            ))}
          </div>
        </div>

        <div className="w-[27.5rem]">
          <div className="flex justify-between">
            <h1>{product?.title}</h1>
            <img src={ShareIcon} alt="product image" className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="bg-offWhite flex justify-between items-center gap-2 px-4 py-0.5 rounded-full w-fit">
                <img src={StarIcon} alt="product image" className="w-4 h-4" />
                <p className="text-vividBlack">
                  {product?.rating} — {product?.reviews.length === 0} reviews
                </p>
              </div>

              <div className="border border-borderColor rounded-full px-4 py-0.5">
                <p className="text-vividBlack">IN STOCK</p>
              </div>
            </div>

            <p className="text-lg font-semibold pt-6 pb-8">
              ${product?.price}.00
            </p>

            <div className="flex flex-col gap-2.5 mb-6.5">
              <p className="text-vividBlack">AVAILABLE COLORS</p>
              <div className="flex items-center gap-2.5">
                {product?.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-center gap-2 border ${
                      color === selectedColor
                        ? "border-neutral"
                        : "border-borderColor"
                    } rounded-full w-8 h-8`}
                  >
                    <div
                      className="w-7 h-7 rounded-full border border-white"
                      style={{ background: color }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <p className="text-vividBlack">SELECT SIZE</p>
              <div className="flex items-center gap-2">
                {product?.sizes.map((size, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-center gap-2 border ${
                      size === selectedSize
                        ? "border-neutral"
                        : "border-borderColor"
                    } rounded-sm w-10 h-10`}
                  >
                    <div className="w-7 h-7 border border-white flex items-center justify-center">
                      <p className="text-center text-vividBlack">{size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2.5 pt-8 pb-10">
              <p className="text-vividBlack">QUANTITY</p>
              <div className="flex items-center gap-2 px-4 py-3 border border-borderColor rounded-sm justify-between w-fit">
                <img
                  src={MinusIcon}
                  className="w-5 h-5"
                  onClick={handleRemoveProduct}
                />
                <h5 className="text-neutral px-10.5">{quantity}</h5>
                <img
                  src={PlusIcon}
                  className="w-5 h-5"
                  onClick={handleAddProduct}
                />
              </div>
            </div>

            <div className="pr-36.5">
              <button className="w-full">Add to cart</button>
              <p className="text-vividBlack pt-1">
                — Free shipping on orders $100+
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-8 pt-44 pb-36.5">
        <div className="flex justify-center items-center gap-2.5">
          <img src={MoreIcon} className="pl-6" />
          <h5 className="text-neutral pr-32.5">Details</h5>
        </div>

        <div className="pr-64.5 flex flex-col gap-6">
          <h3 className="text-neutral">Detail</h3>
          <h6 className="text-vividBlack">{product?.description}</h6>
        </div>
      </div>

      <RecomendedProducts category={product?.category} />
    </section>
  );
}
