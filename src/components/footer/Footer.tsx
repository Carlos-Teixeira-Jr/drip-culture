import Logo from "../../assets/logos/logo-white-background.png";
import gitHubIcon from "../../assets/socialMediaIcons/github-icon.png";
import instagramIcon from "../../assets/socialMediaIcons/instagram-icon.png";
import youtubeIcon from "../../assets/socialMediaIcons/youtube-icon.png";
import masterCardIcon from "../../assets/creditCardIcons/mastercard-icon.png";
import amexIcon from "../../assets/creditCardIcons/amex-icon.png";
import visaIcon from "../../assets/creditCardIcons/visa-icon.png";
import { useState } from "react";
import { validateEmail } from "../../utils/validators/emailValidator/emailValidator";
import { Toast } from "../toasts/toast";
import { Link } from "react-router-dom";

export function Footer() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const year = new Date().getFullYear();

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

  const handleSubscribe = async () => {
    setEmailError("");

    if (!validateEmail(email).isValid) {
      setEmailError(validateEmail(email).errorMsg);
      setShowToast({
        show: true,
        message: validateEmail(email).errorMsg,
        type: "error",
      });
    } else {
      try {
        setShowToast({
          show: true,
          message: "Subscribed successfully",
          type: "success",
        });
        const response = await fetch("http://localhost:3001/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        if (response.ok)
          setShowToast({
            show: true,
            message: "Subscribed successfully",
            type: "success",
          });
        else
          setShowToast({
            show: true,
            message: "Error subscribing",
            type: "error",
          });
        response.json().then((data) => {
          console.log("newsletter list:", data);
        });
      } catch (error) {
        setShowToast({
          show: true,
          message: "Error subscribing",
          type: "error",
        });
      }
    }
  };

  return (
    <footer>
      <section className="w-full bg-offWhite px-[11rem] flex justify-between items-center gap-[16rem]">
        <div className="flex flex-col gap-6 max-w-[29rem] pt-[3rem] pb-[4.5rem]">
          <h1 className="text-neutral">Join Our Newsletter</h1>
          <h6>We love to surprise our subscribers with occasional gifts.</h6>
        </div>
        <div className="flex gap-4 w-[28rem]">
          <div>
            <input
              placeholder="Your email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>

          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
        {showToast && (
          <Toast toastProps={showToast} handleRemoveToast={setShowToast} />
        )}
      </section>

      <section className="flex justify-between px-[11rem] pt-20">
        <div className="flex flex-col py-18 gap-3">
          <div className="flex gap-2 items-center">
            <div className="border border-borderColor rounded-md px-3 py-2">
              <img src={Logo} alt="logo" />
            </div>
            <div className="font-extrabold text-neutral text-xl">
              DripCulture
            </div>
          </div>
          <p className="text-neutral">
            DevCut is a YouTube channel for practical project-based learning.
          </p>
          <div className="flex gap-6 shrink-0">
            {socialMediaIcons.map((icon) => (
              <Link to={icon.link} target="_blank">
                <img
                  src={icon.icon}
                  alt={icon.name}
                  className="w-5 h-5"
                  key={icon.name}
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-between gap-[4.5rem]">
          <div className="flex flex-col gap-7">
            <h5 className="text-slateGrey">SUPPORT</h5>
            <ul className="flex flex-col gap-4 text-vividBlack">
              <Link to={"/page-not-found"}>
                <li>FAQ</li>
              </Link>
              <Link to={"/page-not-found"}>
                <li>Terms of use</li>
              </Link>
              <Link to={"/page-not-found"}>
                <li>Privacy Policy</li>
              </Link>
            </ul>
          </div>

          <div className="flex flex-col gap-7">
            <h5 className="text-slateGrey">COMPANY</h5>
            <ul className="flex flex-col gap-4 text-vividBlack">
              <Link
                to={"/about-me"}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <li>About me</li>
              </Link>
              <Link to={"/page-not-found"}>
                <li>Contact</li>
              </Link>
              <Link to={"/page-not-found"}>
                <li>Carreers</li>
              </Link>
            </ul>
          </div>

          <div className="flex flex-col gap-7">
            <h5 className="text-slateGrey">SHOP</h5>
            <ul className="flex flex-col gap-4 text-vividBlack">
              <Link
                to={"/my-account"}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <li>My Account</li>
              </Link>
              <Link
                to={"/checkout"}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <li>Checkout</li>
              </Link>
              <Link
                to={"/cart"}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <li>Cart</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <h5 className="text-slateGrey">ACCEPTED PAYMENTS</h5>
          <div className="flex gap-6 shrink-0 w-10">
            {creditCardIcons.map((icon) => (
              <img
                key={icon.name}
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
        <h6 className="text-vividBlack">
          © {year} DevCut. All rights reserved.
        </h6>
      </div>
    </footer>
  );
}
