import LogoImage from "../../assets/logos/logomark.png";
import CartImage from "../../assets/icons/cart-icon.png";
import UserImage from "../../assets/icons/user.png";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import { RootState } from "../../slices/store";

export function Header() {
  const { isSignedIn, user } = useUser();
  const cart = useSelector((state: RootState) => state?.cart);

  // Todo: criar a feature desta oferta
  const handleOfferClick = () => {
    console.log("clicou na oferta");
  };

  return (
    <header className="flex flex-col justify-center items-center">
      <section className="h-10 bg-neutral text-white flex justify-center items-center gap-2 w-full">
        <div className="flex gap-2" onClick={handleOfferClick}>
          <h6>Get 25% OFF on your first order.</h6>
          <h5>Order Now</h5>
        </div>
      </section>
      <nav className="bg-white flex justify-between items-center w-[1116px] h-20">
        <Link to={"/"}>
          <div className="flex gap-2 justify-center items-center">
            <img src={LogoImage} alt="logo" className="w-10 h-10" />
            <h4>DripCulture</h4>
          </div>
        </Link>

        <div className="flex gap-8">
          <h5 className="text-[#5C5F6A]">
            <a href="/">Home</a>
          </h5>
          <h5 className="text-[#5C5F6A]">
            <a href="/shop">Shop</a>
          </h5>
          <h5 className="text-[#5C5F6A]">
            <a href="/about-me">About Me</a>
          </h5>
        </div>
        <div className="flex gap-8 items-center">
          <Link to={"/cart"}>
            <div className="relative flex justify-center items-center">
              <img src={CartImage} alt="logo" className="w-[18px] h-[18px]" />
              <span className="absolute top-[10px] right-[-5px] bg-[#BE1313] text-white font-bold text-[10px] rounded-full w-3.5 h-3.5 flex justify-center items-center">
                {cart?.products?.length}
              </span>
            </div>
          </Link>

          {isSignedIn && user ? (
            <Link to={"/my-account"}>
              <div className="bg-offWhite rounded-full p-3.5 shrink-0">
                <h5 className="text-blue-400">{`${
                  (user?.firstName as string)[0].toUpperCase() +
                  (user?.lastName as string)[0].toUpperCase()
                }`}</h5>
              </div>
            </Link>
          ) : (
            <Link to={"/login"}>
              <img src={UserImage} alt="logo" className="w-[18px] h-[18px]" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
