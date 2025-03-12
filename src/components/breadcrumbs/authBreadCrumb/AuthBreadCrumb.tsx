import { useLocation } from "react-router-dom";
import ArrowRightIcon from "../../../assets/icons/arrow-right-icon.png";

export function AuthBreadCrumb() {
  const { pathname } = useLocation();

  let breadCrumb = pathname.split("/");
  breadCrumb.unshift("DripCulture");

  return (
    <section className="px-40 py-8.5 bg-offWhite flex flex-col gap-2">
      <h1>{pathname.slice(1).slice(0, 1).toUpperCase() + pathname.slice(2)}</h1>
      <div className="flex gap-1">
        {breadCrumb.map((crumb, index) => (
          <div key={index}>
            <h5 className={index === 0 ? "text-vividBlack" : "text-neutral"}>
              {crumb.slice(0, 1).toUpperCase() + crumb.slice(1)}
            </h5>
            {index !== breadCrumb.length - 1 && <img src={ArrowRightIcon} alt="arrow" className="mx-1" />}
          </div>
        ))}
      </div>
    </section>
  );
}
