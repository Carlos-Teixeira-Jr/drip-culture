import { useSearchParams } from "react-router-dom";
import { VerifiedEmailPage } from "./VerifyEmailPage";
import Logo from "../../assets/logos/Logomark-big.png";
import BackgroundColor from "../../assets/heroImages/banner-about-me.jpg"

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  // const __clerk_status = searchParams.get("__clerk_status");
  const __clerk_status = "verified";


  if (__clerk_status === "verified") {
    return <VerifiedEmailPage />;
  }
  if (__clerk_status === "expired") {
    return <h2>The verification link has expired</h2>;
  }
  if (__clerk_status === "failed") {
    return <h2>There was an error verifying your email</h2>;
  }
  if (__clerk_status) {
    return <h2>There was an error verifying your email</h2>;
  }

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
            An email verification link has been sent to your email. Please check
            your inbox and click on the verification button to access your
            account.
          </h1>
        </div>
      </div>
    </main>
  );
}
