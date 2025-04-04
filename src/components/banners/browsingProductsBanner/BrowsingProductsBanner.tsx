import { useNavigate } from "react-router-dom";
import productImage from "../../../assets/heroImages/product-image.png";

export function BrowsingProductsBanner() {
  const navigate = useNavigate();
  return (
    <main className="w-full gradient-div px-5 md:px-[11rem] flex flex-col md:flex-row justify-between">
      <div className="flex flex-col gap-6 max-w-[28.9rem] pt-[3rem] pb-[4.5rem]">
        <h1>Browse Our Fashion Paradise!</h1>
        <h6 className="text-vividBlack">Step into a world of style and explore our diverse collection of clothing categories.</h6>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            navigate("/shop");
          }}
        >
          Start Browsing
        </button>
      </div>
      <div className="mx-auto md:mx-0">
        <img src={productImage} alt="hero" className="w-56 h-80" />
      </div>
    </main>
  );
}