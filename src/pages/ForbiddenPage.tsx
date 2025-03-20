import Logo from "../assets/logos/Logomark-big.png";
import BackgroundColor from "../assets/heroImages/banner-about-me.jpg";
import { useNavigate } from "react-router-dom";
import ArrowIcon from "../assets/icons/arrowIcon";

export function ForbiddenPage() {
  const navigate = useNavigate();
  return (
    <main className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${BackgroundColor})`,
        }}
      />

      <div className="relative z-10 flex flex-col justify-center items-center h-full">
        <div className="flex flex-col justify-center items-center gap-5 w-1/2 border border-borderColor p-20 pt-5 rounded-md drop-shadow-md shadow-2xl shadow-slateGrey bg-white/80 backdrop-blur-md">
          <div className="flex justify-center items-center gap-4">
            <h1
              className="text-[11rem] "
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              4
            </h1>
            <img
              src={Logo}
              alt="logo"
              className="md:w-35 md:h-35 w-6 h-6 mt-4"
            />
            <h1
              className="text-[11rem] "
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              3
            </h1>
          </div>
          <h1 className="text-4xl font-primary text-center font-normal  px-5 md:px-0">
            You don&apos;t have permission to access this page!
          </h1>
          <button
            className="text-xl flex items-center"
            onClick={() => navigate("/")}
          >
            Go to Home
            <ArrowIcon />
          </button>
        </div>
      </div>
    </main>
  );
}
