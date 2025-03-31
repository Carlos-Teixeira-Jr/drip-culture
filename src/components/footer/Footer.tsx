import Logo from "../../assets/logos/logo-white-background.png";
import gitHubIcon from "../../assets/socialMediaIcons/github-icon.svg";
import instagramIcon from "../../assets/socialMediaIcons/instagram-icon.svg";
import youtubeIcon from "../../assets/socialMediaIcons/youtube-icon.svg";
import masterCardIcon from "../../assets/creditCardIcons/mastercard-icon.png";
import amexIcon from "../../assets/creditCardIcons/amex-icon.png";
import visaIcon from "../../assets/creditCardIcons/visa-icon.png";
import { useState } from "react";
import { validateEmail } from "../../utils/validators/emailValidator/emailValidator";
import { Toast } from "../toasts/toast";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { API_URL } from "../../api/api";

export function Footer() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { isLoaded } = useUser();
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
      icon: gitHubIcon,
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
        const response = await fetch(`${API_URL}/newsletter`, {
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
    <>
      {isLoaded && (
        <footer>
          <section className="w-full offWhite-div px-5 md:px-[11rem] flex flex-col md:flex-row justify-between items-center md:gap-[15.9rem]">
            <div className="flex flex-col gap-6 pt-[3rem] pb-[4.5rem] md:min-w-sm">
              <h1 className="">Join Our Newsletter</h1>
              <h6 className="text-vividBlack">
                We love to surprise our subscribers with occasional gifts.
              </h6>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-[28rem] px-5 md:px-0">
              <div className="w-full">
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

          <section className="flex flex-col md:flex-row justify-between px-5 md:px-[11rem] md:pt-20">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <div className="border border-borderColor rounded-md px-3 py-2">
                  <img src={Logo} alt="logo" />
                </div>
                <h1 className="font-extrabold text-xl">DripCulture</h1>
              </div>
              <p className="text-vividBlack max-w-68 pt-3">
                DevCut is a YouTube channel for practical project-based
                learning.
              </p>
              <div className="flex gap-6 pt-8">
                {socialMediaIcons.map((icon, idx) => (
                  <Link to={icon.link} target="_blank" key={idx}>
                    <div className="w-11 h-11 md:w-6 md:h-6">
                      <img
                        src={icon.icon}
                        alt={icon.name}
                        className="w-10 h-10 md:w-5 md:h-5"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-[4.5rem]">
              <div className="flex flex-col gap-7">
                <h5 className="text-slateGrey">SUPPORT</h5>
                <ul className="flex flex-col gap-4 ">
                  <Link to={"/faq"}>
                    <li>FAQ</li>
                  </Link>
                  <Link to={"/terms-of-use"}>
                    <li>Terms of use</li>
                  </Link>
                  <Link to={"/policy"}>
                    <li>Privacy Policy</li>
                  </Link>
                </ul>
              </div>

              <div className="flex flex-col gap-7">
                <h5 className="text-slateGrey">COMPANY</h5>
                <ul className="flex flex-col gap-4 ">
                  <Link to={"/about-me"}>
                    <li>About me</li>
                  </Link>
                  <Link to={"/contact"}>
                    <li>Contact</li>
                  </Link>
                  <Link to={"/carreers"}>
                    <li>Carreers</li>
                  </Link>
                </ul>
              </div>

              <div className="flex flex-col gap-7">
                <h5 className="text-slateGrey">SHOP</h5>
                <ul className="flex flex-col gap-4 ">
                  <Link
                    to={"/my-account"}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    <li className="text-normal">My Account</li>
                  </Link>
                  <Link
                    to={"/checkout"}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    <li>Checkout</li>
                  </Link>
                  <Link
                    to={"/cart"}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    <li>Cart</li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-10 py-20 md:py-0">
              <h5 className="text-slateGrey">ACCEPTED PAYMENTS</h5>
              <div className="flex gap-6 shrink-0 w-10">
                {creditCardIcons.map((icon, idx) => (
                  <img
                    key={idx}
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
          <div className="flex justify-center items-center p-5 md:py-6">
            <h6 className="text-vividBlack">
              © {year} DevCut. All rights reserved.
            </h6>
          </div>
        </footer>
      )}
    </>
  );
}
