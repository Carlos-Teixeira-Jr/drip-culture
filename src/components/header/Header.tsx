import LogoImage from "../../assets/logos/logomark.png";
import CartImage from "../../assets/icons/cart-icon.png";
import UserImage from "../../assets/icons/user.png";

export function Header() {
  return (
    <header className="flex flex-col justify-center items-center">
      <section className="h-10 bg-neutral text-white flex justify-center items-center gap-2 w-full">
        <h6>Get 25% OFF on your first order.</h6>
        <h5>Order Now</h5>
      </section>
      <nav className="bg-white flex justify-between items-center w-[1116px] h-20">
        <div className="flex gap-2 justify-center items-center">
          <img src={LogoImage} alt="logo" className="w-10 h-10" />
          <h4>Ecommerce</h4>
        </div>
        <div className="flex gap-8">
          <h5 className="text-[#5C5F6A]">Home</h5>
          <h5 className="text-[#5C5F6A]">Shop</h5>
          <h5 className="text-[#5C5F6A]">About</h5>
        </div>
        <div className="flex gap-8">
          <img src={CartImage} alt="logo" className="w-[18px] h-[18px]" />
          <img src={UserImage} alt="logo" className="w-[18px] h-[18px]" />
        </div>
      </nav>
    </header>
  );
}
