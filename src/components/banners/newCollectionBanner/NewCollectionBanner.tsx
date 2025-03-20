import { useNavigate } from "react-router-dom";
import heroImage from "../../../assets/heroImages/hero-image.png";

export function NewCollectionBanner() {
  const navigate = useNavigate();
  return (
    <main className="w-full md:h-[27.5rem] off-white-div px-5 md:px-[11rem] flex flex-col-reverse md:flex-row justify-between">
      <div>
        <div className="flex flex-col gap-3 pt-5 md:pt-[8.5rem] pb-12">
          <h2>Fresh Arrivals Online</h2>
          <h6>
            Discover Our Newest Collection Today.
          </h6>
        </div>
        <button onClick={() => navigate("/shop")}>View Collection</button>
      </div>
      <div className="mt-20 md:mt-auto relative">
        <div className="rounded-full w-[21rem] h-[21rem] lightBlue-div" />
        <img
          src={heroImage}
          alt="hero"
          className="w-3xs h-96 absolute bottom-0 right-0 "
        />
      </div>
    </main>
  );
}
