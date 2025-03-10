import Banner from "../../../assets/heroImages/logo-banner.png"
import Logo from "../../../assets/logos/logomark-big.png"

export function LogoBanner() {
  return (
    <div className="relative h-[30rem]">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-fixed grayscale"
        style={{ backgroundImage: `url(${Banner})` }}
      />
      
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-gray-200 to-white opacity-60" />

      <div
        className="absolute top-[35%] left-[45%] bg-cover bg-no-repeat bg-fixed scale-125 z-50"
      >
        <img src={Logo} alt="logo" className="w-40 h-40"/>
      </div>
    </div>
  );
}
