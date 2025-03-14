import { useLocation } from "react-router-dom";
import ArrowRightIcon from "../../../assets/icons/arrow-right-icon.png";
import { IProduct } from "../../../interfaces/product.interface";

interface IBreadCRumb {
  product?: IProduct | undefined;
}

export function AuthBreadCrumb({ product }: IBreadCRumb) {
  const { pathname } = useLocation();
  let pageName;

  let breadCrumb = "DripCulture";

  if (pathname.includes("product")) {
    breadCrumb = breadCrumb + " / " + product?.title;
  }

  if (pathname.includes("checkout")) {
    pageName = "Checkout";
  }

  if (pathname.includes("shop")){
    breadCrumb = breadCrumb + " / Search";
  }

  if (pathname.includes("cart")){
    breadCrumb = breadCrumb + " / Cart";
  }

  return (
    <section className="px-40 py-8.5 bg-offWhite flex flex-col gap-2">
      <div className="px-3 py-2">
        {pageName && <h5>{pageName}</h5>}
        <div className="flex gap-1">
          <h5 className="flex">
            {breadCrumb.split(" / ").map((crumb, index) => (
              <div key={index} className="flex items-center">
                <h5
                  className={`${
                    index === 0 ? "text-vividBlack" : "text-neutral"
                  }`}
                >
                  {crumb}
                </h5>
                {index < breadCrumb.split(" / ").length - 1 && (
                  <img src={ArrowRightIcon} />
                )}
              </div>
            ))}
          </h5>
        </div>
      </div>
    </section>
  );
}
