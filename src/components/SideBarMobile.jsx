import { useState } from "react";
import { motion } from "motion/react";

function SideBarMobile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="text-center">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          Show drawer
        </button>
      </div>

      <motion.div
        className="absolute top-0 left-0 z-40 h-screen p-4 overflow-y-auto duration-200 bg-red-500 dark:bg-dark-secondary w-80 text-black dark:text-white border-dark-primary dark:border-primary border-2"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0px" : "-100%" }}
      ></motion.div>
    </div>
  );
}

export default SideBarMobile;
