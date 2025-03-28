import LogoImage from "../../assets/logos/logomark.png";
import MenuIcon from "../../assets/icons/menu-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HeaderComponents } from "./headerComponents/HeaderComponents";
import { useIsMobile } from "../../utils/hooks/useIsMobile";
import { DarkModeToggle } from "../toggles/DarkModeToogle";
import { useUser } from "@clerk/clerk-react";

export function Header() {
  const isMobile = useIsMobile();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [userCheckouts, setUserCheckouts] = useState([]);
  const [isFetchingCheckouts, setIsFetchingCheckouts] = useState(true);
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();

  useEffect(() => {
    const fetchUserCheckouts = async () => {
      if (!user) return;
      setIsFetchingCheckouts(true);
      try {
        const response = await fetch(
          `http://localhost:3001/checkout?userEmail=${user?.emailAddresses[0].emailAddress}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        setUserCheckouts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetchingCheckouts(false);
      }
    };
    fetchUserCheckouts();
  }, [user]);

  return (
    <header className="flex flex-col justify-center items-center min-h-30">
      {isLoaded && !isFetchingCheckouts && (
        <>
          {!isFetchingCheckouts && userCheckouts.length === 0 && (
            <section className="h-10 black-div text-white flex justify-center items-center gap-2 w-full">
              <div className="flex gap-2" onClick={() => navigate("/shop")}>
                <h6 className="text-lg md:text-sm">
                  Get 25% OFF on your first order.
                </h6>
                <h5 className="text-xl md:text-sm">Order Now</h5>
              </div>
            </section>
          )}

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
              {isMobile && (
                <>
                  <div className="flex items-center justify-center px-0 md:px-5">
                    <DarkModeToggle />
                  </div>
                  <HeaderComponents />
                </>
              )}
              <div
                className="flex justify-center items-center md:hidden"
                onClick={() => setMenuIsOpen(!menuIsOpen)}
              >
                <img src={MenuIcon} className="w-10 h-10" />
              </div>
            </Link>

            <div className="flex items-center justify-center px-0 md:px-5">
              <DarkModeToggle />
            </div>

            <div
              className={`md:flex gap-8 ${
                menuIsOpen ? "flex-col pr-5 pb-5" : "hidden"
              }`}
            >
              <h5 className="text-[#5C5F6A] hover-style">
                <a href="/" className="hover-style">
                  Home
                </a>
              </h5>
              <h5 className="text-[#5C5F6A] hover-style">
                <a href="/shop">Shop</a>
              </h5>
              <h5 className="text-[#5C5F6A] hover-style">
                <a href="/about-me">About Me</a>
              </h5>
            </div>
            {!isMobile && (
              <>
                <HeaderComponents />
              </>
            )}
          </nav>
        </>
      )}
    </header>
  );
}