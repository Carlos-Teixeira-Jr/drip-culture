import { Link, useSearchParams } from "react-router-dom";
import ArrowIcon from "../../assets/icons/arrowIcon";


export function VerifiedEmailPage() {
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-5">
      <h1 className="text-xl font-primary font-normal text-gray-500 w-100">
        Thank's for verifying your email. Click on the button below to access
        Home Page.
      </h1>

      <Link to="/">
        <button className="font-primary text-2xl font-semibold bg-emerald-900 hover:bg-emerald-700 hover:shadow-2xl transition-all duration-200 text-white rounded-[8px] cursor-pointer my-5 duration-00 ease-in-out px-20 py-3">
          Home
        </button>
      </Link>

      <ArrowIcon />
    </main>
  );
}