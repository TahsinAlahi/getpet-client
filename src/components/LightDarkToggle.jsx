import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function LightDarkToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleToggle() {
    setIsDarkMode((prevState) => !prevState);
    if (!isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }

  return (
    <div className="flex flex-col w-fit mx-auto items-center justify-center bg-transparent dark:bg-gray-800 rounded-full">
      {/* Toggle Button */}
      <div className="relative">
        <input
          type="checkbox"
          id="checkbox"
          className="opacity-0 absolute"
          checked={isDarkMode}
          onChange={handleToggle}
        />
        <label
          htmlFor="checkbox"
          className="flex items-center justify-center aspect-square h-8 bg-gray-900 rounded-full p-1 cursor-pointer relative"
        >
          {isDarkMode ? (
            <FaMoon
              className={`text-yellow-500 ${!isDarkMode && "opacity-100"}`}
            />
          ) : (
            <FaSun
              className={`text-yellow-400 text-xl  ${
                isDarkMode && "opacity-100"
              }`}
            />
          )}
        </label>
      </div>
    </div>
  );
}

export default LightDarkToggle;
