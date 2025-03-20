import LogoImage from "../../assets/logos/logomark.png";
import MenuIcon from "../../assets/icons/menu-icon.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HeaderComponents } from "./headerComponents/HeaderComponents";
import { useIsMobile } from "../../utils/hooks/useIsMobile";
import { DarkModeToggle } from "../toggles/DarkModeToogle";

export function Header() {
  const isMobile = useIsMobile();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  // Todo: criar a feature desta oferta
  const handleOfferClick = () => {
    console.log("clicou na oferta");
  };

  return (
    <header className="flex flex-col justify-center items-center">
      <section className="h-10 black-div text-white flex justify-center items-center gap-2 w-full">
        <div className="flex gap-2" onClick={handleOfferClick}>
          <h6 className="text-lg md:text-sm">
            Get 25% OFF on your first order.
          </h6>
          <h5 className="text-xl md:text-sm">Order Now</h5>
        </div>
      </section>
      <nav
        className={`flex justify-between md:items-center w-full md:px-41 ${
          menuIsOpen ? "flex-col h-fit items-end" : "h-20"
        }`}
      >
        <Link
          to={"/"}
          className="flex w-full md:w-fit justify-between px-5 md:px-0 h-20"
        >
          <div className="flex gap-2 justify-between md:justify-center items-center">
            <img src={LogoImage} alt="logo" className="w-10 h-10" />
            <h4>DripCulture</h4>
          </div>
          {isMobile && <HeaderComponents />}
          <div
            className="flex justify-center items-center md:hidden"
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          >
            <img src={MenuIcon} className="w-10 h-10" />
          </div>
        </Link>

        <DarkModeToggle />


        <div
          className={`md:flex gap-8 ${
            menuIsOpen ? "flex-col pr-5 pb-5" : "hidden"
          }`}
        >
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
        {!isMobile && <HeaderComponents />}
      </nav>
    </header>
  );
}
