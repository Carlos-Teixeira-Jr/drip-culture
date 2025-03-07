import Logo from "../../assets/logos/logo-white-background.png";
import gitHubIcon from "../../assets/socialMediaIcons/github-icon.png";
import instagramIcon from "../../assets/socialMediaIcons/instagram-icon.png";
import youtubeIcon from "../../assets/socialMediaIcons/youtube-icon.png";
import masterCardIcon from "../../assets/creditCardIcons/mastercard-icon.png";
import amexIcon from "../../assets/creditCardIcons/amex-icon.png";
import visaIcon from "../../assets/creditCardIcons/visa-icon.png";

export function Footer() {
  const socialMediaIcons = [
    {
      name: "github",
      link: "https://www.github.com/",
      icons: gitHubIcon,
    },
    {
      name: "instagram",
      link: "https://www.instagram.com/",
      icon: instagramIcon,
    },
    {
      name: "youtube",
      link: "https://youtube.com/",
      icon: youtubeIcon,
    },
  ];

  const creditCardIcons = [
    {
      name: "mastercard",
      icon: masterCardIcon,
    },
    {
      name: "amex",
      icon: amexIcon,
    },
    {
      name: "visa",
      icon: visaIcon,
    },
  ];

  return (
    <footer>
      <section className="w-full bg-offWhite px-[11rem] flex justify-between items-center gap-[16rem]">
        <div className="flex flex-col gap-6 max-w-[29rem] pt-[3rem] pb-[4.5rem]">
          <h1 className="text-neutral">Join Our Newsletter</h1>
          <h6>We love to surprise our subscribers with occasional gifts.</h6>
        </div>
        <div className="flex gap-4 w-[28rem]">
          <input placeholder="Your email address" />
          <button>Subscribe</button>
        </div>
      </section>

      <section className="flex justify-between px-[11rem] pt-20">
        <div className="flex flex-col py-18 gap-3">
          <div className="flex gap-2 items-center">
            <div className="border border-borderColor rounded-md px-3 py-2">
              <img src={Logo} alt="logo" />
            </div>
            <div className="font-extrabold text-neutral text-xl">Ecommerce</div>
          </div>
          <p className="text-neutral">
            DevCut is a YouTube channel for practical project-based learning.
          </p>
          <div className="flex gap-6 shrink-0">
            {socialMediaIcons.map((icon) => (
              <img src={icon.icon} alt={icon.name} className="w-5 h-5" />
            ))}
          </div>
        </div>
        <div className="flex justify-between gap-[4.5rem]">
          <div className="flex flex-col gap-7">
            <h5 className="text-slateGrey">SUPPORT</h5>
            <ul className="flex flex-col gap-4 text-vividBlack">
              <li>Home</li>
              <li>Shop</li>
              <li>About</li>
            </ul>
          </div>

          <div className="flex flex-col gap-7">
            <h5 className="text-slateGrey">COMPANY</h5>
            <ul className="flex flex-col gap-4 text-vividBlack">
              <li>About us</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>

          <div className="flex flex-col gap-7">
            <h5 className="text-slateGrey">SHOP</h5>
            <ul className="flex flex-col gap-4 text-vividBlack">
              <li>My Account</li>
              <li>Checkout</li>
              <li>Cart</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <h5 className="text-slateGrey">ACCEPTED PAYMENTS</h5>
          <div className="flex gap-6 shrink-0 w-10">
            {creditCardIcons.map((icon) => (
              <img
                src={icon.icon}
                alt={icon.name}
                className={`${
                  icon.name === "mastercard" ? "w-7.5" : "w-10"
                } grayscale`}
              />
            ))}
          </div>
        </div>
      </section>
      <div className="flex justify-center items-center py-6">
        <h6 className="text-vividBlack">© 2023 DevCut. All rights reserved.</h6>
      </div>
    </footer>
  );
}
