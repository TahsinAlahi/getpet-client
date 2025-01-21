import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

function ProfileImage() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="relative">
      <button
        className="p-1 w-10 aspect-square rounded-full overflow-hidden  bg-gray-600 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={user?.photoURL}
          alt={user?.name}
          className="w-full h-full object-cover object-center"
        />
      </button>

      <div
        className={`z-50 ${
          isOpen ? "block" : "hidden"
        } absolute top-12 right-full translate-x-1/2 rounded-lg shadow dark:bg-dark-primary bg-primary border-dark-primary dark:border-primary border-2`}
      >
        <ul className="text-base text-gray-700 dark:text-gray-200">
          <li>
            <Link
              to="/dashboard"
              className="block px-4 w-full py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-md"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <button
              className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-md"
              onClick={logout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileImage;
