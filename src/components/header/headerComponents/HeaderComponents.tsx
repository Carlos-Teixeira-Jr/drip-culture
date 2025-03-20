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

  const [userProfileImg, setUserProfileImg] = useState<string>(UserImage);

  useEffect(() => {
    if (user && isLoaded) {
      setUserProfileImg(user.imageUrl as string);
    }
  }, [user, isLoaded]);

  return (
    <div className="flex gap-8 items-center">
      <Link to={"/cart"}>
        <div className="relative flex justify-center items-center">
          <img
            src={CartImage}
            alt="logo"
            className="md:w-[18px] md:h-[18px] w-6 h-6"
          />
          {isSignedIn && (
            <span className="absolute top-[10px] right-[-5px] bg-[#BE1313] text-white font-bold text-[10px] rounded-full w-3.5 h-3.5 flex justify-center items-center leading-24 pr-0.5 md:pr-0">
              {cart?.products?.length}
            </span>
          )}
        </div>
      </Link>

      {isSignedIn && !user.imageUrl ? (
        <Link to={"/my-account"}>
          <div className="bg-offWhite rounded-full p-3.5 shrink-0 w-9 h-9 flex justify-center items-center">
            <h5 className="text-blue-400 text-lg">{`${
              (user?.firstName as string)[0].toUpperCase() +
              (user?.lastName as string)[0].toUpperCase()
            }`}</h5>
          </div>
        </Link>
      ) : (
        <Link to={"/my-account"}>
          {isLoaded && (
            <img
              src={userProfileImg}
              alt="logo"
              className="md:w-6 md:h-w-6 w-6 h-6 rounded-full"
            />
          )}
        </Link>
      )}
    </div>
  );
}
