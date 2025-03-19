import { useLocation } from "react-router-dom";
import ArrowRightIcon from "../../../assets/icons/arrow-right-icon.png";
import { IProduct } from "../../../interfaces/product.interface";

interface IBreadCRumb {
  product?: IProduct | undefined;
}

export function BreadCrumb({ product }: IBreadCRumb) {
  const { pathname } = useLocation();
  let pageName;

  let breadCrumb = "DripCulture";

  switch (true) {
    case pathname.includes("product"):
      breadCrumb += ` / ${product?.title}`;
      break;
    case pathname.includes("checkout"):
      pageName = "Checkout";
      break;
    case pathname.includes("shop"):
      breadCrumb += " / Search";
      break;
    case pathname.includes("cart"):
      breadCrumb += " / Cart";
      break;
    case pathname.includes("my-account"):
      breadCrumb += " / My Account";
      break;
    case pathname.includes("about-me"):
      breadCrumb += " / About Me";
      break;
    case pathname.includes("login"):
      breadCrumb += " / Login";
      break;
    case pathname.includes("signup"):
      breadCrumb += " / Sign Up";
      break;
    default:
      break;
  }

  return (
    <section className="md:px-40 py-8.5 bg-offWhite flex flex-col gap-2">
      <div className="px-3 py-2">
        {pageName && <h5>{pageName}</h5>}
        <div className="flex gap-1">
          {breadCrumb.split(" / ").map((crumb, index) => (
            <div key={index} className="flex items-center max-w-[250px]">
              <h5
                className={`truncate ${
                  index === 0 ? "text-vividBlack" : "text-neutral"
                }`}
                style={{ maxWidth: "100%" }}
              >
                {crumb}
              </h5>
              {index < breadCrumb.split(" / ").length - 1 && (
                <img src={ArrowRightIcon} className="flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
