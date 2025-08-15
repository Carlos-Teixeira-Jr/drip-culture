import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import CartImage from "../../../assets/icons/cart-icon.png";
import UserImage from "../../../assets/icons/user.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../slices/store";
import { useEffect, useState } from "react";

export function HeaderComponents() {
  const { isSignedIn, user, isLoaded } = useUser();

  const cart = useSelector((state: RootState) => state?.cart);

  const productsCount = () => {
    let count = cart.products.length;

    for (let product of cart.products) {
      if (product.quantity > 1) {
        count += product.quantity - 1;
      }
    }

    return count
  }

  const [userProfileImg, setUserProfileImg] = useState<string>(UserImage);

  useEffect(() => {
    if (user && isLoaded) {
      setUserProfileImg(user.imageUrl as string);
    }
  }, [user, isLoaded]);

  return (
    <div className="flex gap-5 md:gap-8 items-center">
      <Link to={"/cart"}>
        <div className="relative flex justify-center items-center hover-style">
          <img
            src={CartImage}
            alt="logo"
            className="md:w-[18px] md:h-[18px] w-6 h-6"
          />
          <span className="absolute top-[10px] right-[-5px] bg-[#BE1313] text-white font-bold text-[10px] rounded-full w-3.5 h-3.5 flex justify-center items-center leading-24 pr-0.5 md:pr-0">
            {productsCount()}
          </span>
        </div>
      </Link>

      {isSignedIn && !user.hasImage ? (
        <Link to={"/my-account"}>
          <div className="bg-offWhite rounded-full p-3.5 shrink-0 w-9 h-9 flex justify-center items-center hover-style">
            <h5 className="text-blue-400 text-sm font-normal">{`${
              (user?.firstName as string)[0].toUpperCase() +
              (user?.lastName as string)[0].toUpperCase()
            }`}</h5>
          </div>
        </Link>
      ) : (
        <Link to={isSignedIn ? "/my-account" : "/login"}>
          {isLoaded && (
            <img
              src={userProfileImg}
              alt="logo"
              className={`w-6 h-6 rounded-full hover-style ${isSignedIn ? "md:w-12 md:h-12" : ""}`}
            />
          )}
        </Link>
      )}
    </div>
  );
}
