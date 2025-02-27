import { useState } from "react";
import { motion } from "motion/react";
import { IoClose } from "react-icons/io5";
import UserDashBoard from "./UserDashBoard";
import AdminDashBoard from "./AdminDashBoard";
import { FaArrowRight } from "react-icons/fa";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  function onSelect() {
    setIsOpen(false);
  }

  return (
    <>
      <aside className="lg:hidden">
        <button
          className="text-dark-primary border border-dark-primary rounded-tl-none rounded-bl-none dark:text-white bg-secondary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mb-2 dark:bg-blue-600 focus:outline-none dark:focus:ring-blue-800 absolute top-2 z-30"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaArrowRight />
        </button>
        <motion.div
          className="absolute top-0 left-0 z-40 h-screen p-4 overflow-y-auto duration-200 w-80 text-black dark:text-white border-dark-primary dark:border-primary border-2 bg-secondary dark:bg-dark-secondary"
          initial={{ x: "-100%" }}
          animate={{ x: isOpen ? "0px" : "-100%" }}
        >
          <div className="w-full">
            <IoClose
              className="text-4xl ml-auto cursor-pointer"
              onClick={() => setIsOpen(false)}
              aria-label="Close sidebar"
            />
          </div>
          <UserDashBoard onClick={onSelect} />
          <AdminDashBoard onClick={onSelect} />
        </motion.div>
      </aside>

      <aside className="hidden lg:block bg-secondary dark:bg-dark-secondary border-2 border-l-0 border-black dark:border-white py-5 px-4">
        <UserDashBoard />
        <AdminDashBoard />
      </aside>
    </>
  );
}

export default SideBar;
