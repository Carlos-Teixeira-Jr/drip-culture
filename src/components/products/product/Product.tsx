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
import { Toast } from "../../toasts/toast";
import { AppDispatch, RootState } from "../../../slices/store";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../../slices/productsSlice";
import { CartProductType, ICart } from "../../../interfaces/cart.interface";

type Image = {
  image: string;
  index: number;
};

interface IProductProps {
  onProductFetched: (product: IProduct) => void;
}

export function Product({ onProductFetched }: IProductProps) {
  const { pathname } = useLocation();

  const [product, setProduct] = useState<IProduct>();
  const productId = pathname.split("/")[2];
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const [actualImage, setActualImage] = useState<Image>({
    image: "",
    index: 0,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    const fetchProductById = async (id: string) => {
      try {
        const response = await fetch(`http://localhost:3001/products?id=${id}`);
        const products: IProduct[] = await response.json();

        if (products.length === 0) {
          throw new Error(`Product with id ${id} not found`);
        }

        const product = products[0];
        setProduct(product);

        setSelectedColor(product.colors[0]);

        if (product.sizes.length === 1) {
          setSelectedSize(product.sizes[0]);
        }

        onProductFetched(product);

        setActualImage({
          image: product.images[0].images[0],
          index: 0,
        });
      } catch (error) {
        setShowToast({
          show: true,
          message: "Error fetching product",
          type: "error",
        });
      }
    };

    fetchProductById(productId);
  }, [productId]);

  const handleAddProduct = () => {
    setQuantity(quantity + 1);
  };

  const handleRemoveProduct = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    setErrorMessage("");
    if (!selectedColor || !selectedSize) {
      const errorMessage =
        !selectedColor && !selectedSize
          ? "Select the color and size of your product"
          : !selectedColor
          ? "Select the color of your product"
          : "Select the size of your product";

      setErrorMessage(errorMessage);
      return;
    }

    try {
      const productIndex = cart.products.findIndex(
        (item: CartProductType) => item.id === Number(productId)
      );

      if (productIndex !== -1) {
        const updatedProducts = [...cart.products];

        //Verificar se já há o mesmo produto no carrinho, se houver e a cor ou o tamanho for diferente, inserir novamente;
        const cartProductIndex = cart.products.findIndex(
          (item: CartProductType) => item.id === Number(productId)
        );

        if (cartProductIndex !== -1) {

          updatedProducts[cartProductIndex].color !== selectedColor ||
          updatedProducts[cartProductIndex].size !== selectedSize
            ? updatedProducts.push({
                id: Number(productId),
                title: product?.title,
                price: product?.price,
                quantity,
                orderDate: new Date().toISOString(),
                image: product?.images.find(
                  (img) => img.color === selectedColor
                )?.images[0] as unknown as string,
                color: selectedColor,
                size: selectedSize,
              })
            : (
              updatedProducts[cartProductIndex] = {
                ...updatedProducts[cartProductIndex],
                quantity: updatedProducts[cartProductIndex].quantity + quantity,
              }
            );
        } else {
          updatedProducts[productIndex] = {
            ...updatedProducts[productIndex],
            quantity: quantity,
          };
        }

        const updatedCart = {
          ...cart,
          products: updatedProducts,
        };

        dispatch(setCart(updatedCart));
        setShowToast({
          show: true,
          message: "Product added to cart",
          type: "success",
        });
        window.scrollTo({
          top: 50,
          behavior: "smooth",
        })
      } else {
        const updatedCart: ICart = {
          id: cart.id,
          userEmail: cart.userEmail,
          products: [
            ...cart.products,
            {
              id: Number(productId),
              title: product?.title,
              price: product?.price,
              quantity,
              orderDate: new Date().toISOString(),
              image: product?.images.find((img) => img.color === selectedColor)
                ?.images[0] as unknown as string,
              color: selectedColor,
              size: selectedSize,
            },
          ],
        };

        dispatch(setCart(updatedCart));
        setShowToast({
          show: true,
          message: "Product added to cart",
          type: "success",
        });
        window.scrollTo({
          top: 50,
          behavior: "smooth",
        })
      }
    } catch (error) {
      console.error(error);
      setShowToast({
        show: true,
        message: "An error ocurred on get cart data",
        type: "error",
      });
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
        if (product && index > 0) {
          const nextIndex = index - 1;
          setActualImage({
            image: product?.images[colorImageIndex].images[nextIndex],
            index: nextIndex,
          });
        }
      }
    }
  };

  const handleSelectColor = (color: string) => {
    if (product) {
      setSelectedColor(color);
      const colorImageIndex = product?.images.findIndex(
        (img) => img.color === color
      );

      if (colorImageIndex !== -1) {
        setActualImage({
          image: product.images[colorImageIndex].images[0],
          index: 0,
        });
      }
    }
  };

  const handleSelectedSize = (size: string) => {
    setSelectedSize(size);
  };

  const handleShareProduct = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast({
      show: true,
      message: "Link copied to the clipboard!",
      type: "success",
    });
  };

  return (
    <section className="md:px-44 mt-4">
      <div className="flex flex-col md:flex-row md:gap-28.5 gap-5">
        <div className="flex flex-col md:gap-24.5 pt-7 md:px-28.5 bg-offWhite relative">
          <img
            src={actualImage.image}
            alt="product image"
            className="w-72 h-[404px] mx-auto object-cover"
          />
          <div className="absolute w-[80%] md:w-full flex md:gap-90 left-10 top-[40%] justify-between">
            <img
              src={ArrowRightIcon}
              className="w-10 h-10 rotate-180 cursor-pointer hover:scale-120 transition duration-300 ease-in-out"
              onClick={() => handlePreviousImage(actualImage.index)}
            />
            <img
              src={ArrowRightIcon}
              className="w-10 h-10 cursor-pointer hover:scale-120 transition duration-300 ease-in-out"
              onClick={() => handleNextImage(actualImage.index)}
            />
          </div>
          <div className="flex justify-center items-center pb-8">
            {product?.images[0].images.map((_, index) => (
              <h1
                key={index}
                className={`text-5xl ${
                  index === actualImage.index ? "" : "text-slateGrey"
                }`}
              >
                •
              </h1>
            ))}
          </div>
        </div>

        <div className="md:w-[27.5rem] px-5 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-center pb-3">
            <h1>{product?.title}</h1>
            <img
              src={ShareIcon}
              alt="product image"
              className="w-6 h-6 cursor-pointer mt-2 md:mt-0"
              onClick={handleShareProduct}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="bg-offWhite flex justify-between items-center gap-2 md:px-4 py-0.5 rounded-full w-fit">
                <img src={StarIcon} alt="product image" className="w-4 h-4" />
                <p className="">
                  {product?.rating} — {product?.reviews.length === 0} reviews
                </p>
              </div>

              <div className="border border-borderColor rounded-full px-4 py-0.5">
                <p className="">
                  {product && product?.stock > 0 ? "IN STOCK" : "NO STOCK"}
                </p>
              </div>
            </div>

            <p className="font-semibold pt-6 pb-8 text-3xl md:text-lg">
              ${product?.price}.00
            </p>

            {product && product.stock > 0 && (
              <>
                <div className="flex flex-col gap-2.5 mb-6.5">
                  <p className="">AVAILABLE COLORS</p>
                  <div className="flex items-center gap-2.5">
                    {product?.colors.map((color, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectColor(color)}
                        className={`flex items-center justify-center gap-2 border cursor-pointer ${
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
                  <p className="">SELECT SIZE</p>
                  <div className="flex items-center gap-2">
                    {product?.sizes.map((size, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectedSize(size)}
                        className={`flex items-center justify-center gap-2 border cursor-pointer ${
                          size === selectedSize
                            ? "border-neutral"
                            : "border-borderColor"
                        } rounded-sm w-10 h-10`}
                      >
                        <div className="w-7 h-7 border border-white flex items-center justify-center">
                          <p className="text-center ">{size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 pt-8 pb-10">
                  <p className="">QUANTITY</p>
                  <div className="flex items-center gap-2 px-4 py-3 border border-borderColor rounded-sm justify-between w-fit">
                    <img
                      src={MinusIcon}
                      className="w-5 h-5 cursor-pointer"
                      onClick={handleRemoveProduct}
                    />
                    <h5 className=" px-10.5">{quantity}</h5>
                    <img
                      src={PlusIcon}
                      className="w-5 h-5 cursor-pointer"
                      onClick={handleAddProduct}
                    />
                  </div>
                </div>

                <div className="md:pr-36.5">
                  <button
                    className="w-full hover:bg-slate-700 duration-200 transition ease-in-out"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </button>
                  {errorMessage && (
                    <span className="text-sm text-red-500">{errorMessage}</span>
                  )}
                  <p className=" pt-1 text-center md:text-start">
                    — Free shipping on orders $100+
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center md:flex-row gap-8 md:pt-44 pt-15 pb-15 md:pb-36.5">
        <div className="flex md:justify-center justify-start items-center gap-2.5 bg-offWhite rounded mt-10 py-1.5 h-fit">
          <img src={MoreIcon} className="pl-6" />
          <h5 className="text-neutral md:pr-32.5">Details</h5>
        </div>

        <div className="md:pr-64.5 pl-5 flex flex-col gap-6">
          <h3 className="text-neutral">Detail</h3>
          <h6 className="text-vividBlack">{product?.description}</h6>
        </div>
      </div>

      <RecomendedProducts category={product?.category} />

      <Toast toastProps={showToast} handleRemoveToast={setShowToast} />
    </section>
  );
}
