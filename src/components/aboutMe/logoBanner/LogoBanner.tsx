import Banner from "../../../assets/heroImages/logo-banner.png";
import Logo from "../../../assets/logos/logomark-big.png";

export function LogoBanner() {
  return (
    <div className="relative h-[30rem]">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-fixed grayscale"
        style={{ backgroundImage: `url(${Banner})` }}
      />

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-gray-200 to-white opacity-60" />

      <div className="absolute top-[35%] left-[25%] bg-cover bg-no-repeat bg-fixed scale-125 z-50">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <h1 className="md:text-5xl font-normal text-neutral">C A R L O S <p className="hidden md:block">•</p></h1>
          <img src={Logo} alt="logo" className="md:w-40 md:h-40 w-10 h-10" />
          <h1 className="md:text-5xl font-normal text-neutral"><p className="hidden md:block">•</p> T E I X E I R A</h1>
        </div>
      </div>
    </div>
  );
}
