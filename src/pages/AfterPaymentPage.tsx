import { BreadCrumb } from "../components/breadcrumbs/breadCrumb/BreadCrumb";
import PackageIcon from "../assets/icons/package-icon.png";
import ArrowIcon from "../assets/icons/arrow-icon.png";
import { useNavigate } from "react-router-dom";

export function AfterPaymentPage() {
  const navigate = useNavigate()
  return (
    <main>
      <BreadCrumb />

      <div className="flex flex-col justify-center px-5 md:px-0 items-center min-h-screen">
        <img
          src={PackageIcon}
          alt="package-icon"
          className="w-35.5 h-30.5 mb-5"
        />
        <h1 className="pb-4 text-neutral text-center">Thank you for shopping</h1>
        <h6 className="max-w-95 flex justify-center text-center text-vividBlack">
          Your order has been successfully placed and is now being processed.
        </h6>
        <button className="flex my-12 gap-1.5 w-fit items-center" onClick={() => navigate("/my-account")}>
          Go to my account <img src={ArrowIcon} className="w-3 h-3" />
        </button>
      </div>
    </main>
  );
}
