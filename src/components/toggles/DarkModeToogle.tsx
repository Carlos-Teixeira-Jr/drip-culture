import { useState, useEffect } from "react";
import LightModeIcon from "../../assets/icons/lightModeIcon";
import DarkModeIcon from "../../assets/icons/darkModeIcon";

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
  );
  console.log("🚀 ~ DarkModeToggle ~ isDark:", isDark)

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
      className={`p-2 border-2 rounded-lg border-neutral cursor-pointer ${isDark ? "border-white bg-neutral" : "bg-white border-neutral"}`}
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? (
        <LightModeIcon className={`${isDark && "fill-white"}`} />
      ) : (
        <DarkModeIcon className={`${!isDark && "fill-neutral"}`} />
      )}
    </button>
  )
}