import ArrowIcon from "../../assets/icons/arrowIcon";
import Logo from "../../assets/logos/Logomark-big.png";
import BackgroundColor from "../../assets/heroImages/banner-about-me.jpg"
import { useNavigate } from "react-router-dom";

export function VerifiedEmailPage() {
  const navigate = useNavigate()
  return (
    <main className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${BackgroundColor})`,
        }}
      />

      <div className="relative z-10 flex flex-col justify-center items-center h-full gap-5">
        <div className="flex flex-col justify-center items-center gap-10 w-1/2 border border-borderColor p-20 rounded-md drop-shadow-md shadow-2xl shadow-slateGrey bg-white/80 backdrop-blur-md">
          <div>
            <img
              src={Logo}
              alt="logo"
              className="md:w-35 md:h-35 w-6 h-6 animate-pulse"
            />
          </div>
          <h1 className="text-2xl font-primary text-center font-normal  px-5 md:px-0">
            Your email has been verified!
          </h1>
          <button className="text-xl flex items-center" onClick={() => navigate("/")}>Go to Home<ArrowIcon/></button>
        </div>
      </div>
    </main>
  );
}