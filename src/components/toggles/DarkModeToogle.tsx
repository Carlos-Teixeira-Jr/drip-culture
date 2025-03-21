import { useState, useEffect } from "react";
import LightModeIcon from "../../assets/icons/lightModeIcon";
import DarkModeIcon from "../../assets/icons/darkModeIcon";

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      className={`md:p-2 p-1 border-2 w-fit h-fit rounded-lg border-neutral cursor-pointer ${isDark ? "border-white bg-neutral" : "bg-white border-neutral"}`}
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? (
        <LightModeIcon className={` w-4 h-4 ${isDark && "fill-white"}`} />
      ) : (
        <DarkModeIcon className={`w-4 h-4 ${!isDark && "fill-neutral"}`} />
      )}
    </button>
  )
}