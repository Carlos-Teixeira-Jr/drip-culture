import { useNavigate } from "react-router-dom";
import productImage from "../../../assets/heroImages/product-image.png";

export function BrowsingProductsBanner() {
  const navigate = useNavigate();
  return (
    <main className="w-full bg-gradient-to-r from-offWhite to-white px-[11rem] flex justify-between">
      <div className="flex flex-col gap-6 max-w-[29rem] pt-[3rem] pb-[4.5rem]">
        <h1>Browse Our Fashion Paradise!</h1>
        <h6>Step into a world of style and explore our diverse collection of clothing categories.</h6>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            navigate("/shop");
          }}
        >
          Start Browsing
        </button>
      </div>
      <div>
        <img src={productImage} alt="hero" className="w-56 h-80" />
      </div>
    </main>
  );
}