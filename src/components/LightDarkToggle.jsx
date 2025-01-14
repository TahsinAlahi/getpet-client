import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function LightDarkToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.body.classList.contains("dark")
  );

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  function handleToggle() {
    setIsDarkMode((prevState) => !prevState);
  }

  return (
    <div className="flex flex-col w-fit mx-auto items-center justify-center bg-transparent dark:bg-gray-800 rounded-full">
      <div className="relative">
        <div
          className="flex items-center justify-center aspect-square h-9 bg-gray-900 rounded-full p-1 cursor-pointer relative"
          onClick={handleToggle}
        >
          {isDarkMode ? (
            <FaMoon className="text-yellow-500 text-xl" />
          ) : (
            <FaSun className="text-yellow-400 text-xl" />
          )}
        </div>
      </div>
    </div>
  );
}

export default LightDarkToggle;
