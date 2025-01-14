import { useState } from "react";
import { Link, NavLink } from "react-router";
import logoImg from "../assets/logo.png";
// import { useAuth } from "../providers/AuthProvider";
import LightDarkToggle from "./LightDarkToggle";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { user, logout } = useAuth();

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function activeClass({ isActive }) {
    return `block md:py-1 py-2 px-3  rounded text-inherit font-semibold  ${
      isActive ? "" : "md:bg-transparent"
    }`;
  }

  return (
    <nav className="bg-nav/70 text-black w-full font-nunito dark:bg-dark-secondary dark:text-white relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:px-7">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logoImg} className="h-10 aspect-square" alt="EarthBound" />
          <span className="self-center text-3xl font-semibold whitespace-nowrap font-coiny">
            GetPet
          </span>
        </Link>

        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full lg:w-auto lg:flex lg:justify-end absolute lg:static top-full z-50 bg-nav dark:bg-nav-dark border-4 lg:border-0 border-nav right-0 left-0 py-4 lg:py-0 lg:px-0 lg:bg-transparent`}
        >
          <ul
            className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-white rounded-lg bg-nav-bg lg:flex-row md:space-x-2 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-nav-bg text-center"
            onClick={toggleMenu}
          >
            <li>
              <NavLink to="/" className={activeClass}>
                Home
              </NavLink>
            </li>

            <li className="lg:block">
              <NavLink to="/pet-listing" className={activeClass}>
                Pet Listing
              </NavLink>
            </li>

            <li className="lg:block">
              <NavLink to="/donation-campaigns" className={activeClass}>
                Donation Campaigns
              </NavLink>
            </li>

            {/* {user && (
              <li className="lg:block">
                <NavLink to="/add-movie" className={activeClass}>
                  Add Movie
                </NavLink>
              </li>
            )} */}

            {/* {user && (
              <li className="lg:block">
                <NavLink to="/favorite-movies" className={activeClass}>
                  My Favorites
                </NavLink>
              </li>
            )} */}

            {/* <li className="lg:hidden block">
              {user ? (
                <button className="block md:py-1 py-2 px-3 mx-auto  rounded text-inherit font-semibold cursor-pointer">
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block md:py-1 py-2 px-3  rounded text-inherit font-semibold cursor-pointer"
                >
                  Login
                </Link>
              )}
            </li> */}

            {/* {!user && (
              <li className="lg:hidden block">
                <NavLink to="/register" className={activeClass}>
                  Register
                </NavLink>
              </li>
            )} */}

            <li>
              <LightDarkToggle />
            </li>
          </ul>
        </div>

        {/* <div className="lg:flex items-center justify-center gap-2 ml-10 hidden">
          {user ? (
            <>
              <button className="p-1 w-10 aspect-square rounded-full overflow-hidden  bg-gray-600 cursor-pointer">
                <img
                  src={user?.photoURL}
                  alt={user?.name}
                  className="w-full h-full object-cover object-center"
                />
              </button>

              <button
                className="duration-100 transition-all  px-2 py-1 rounded font-semibold cursor-pointer"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <div>
              <Link
                to="/login"
                className="duration-100 transition-all  px-2 py-1 rounded font-semibold cursor-pointer"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="duration-100 transition-all  px-2 py-1 rounded font-semibold cursor-pointer"
              >
                Register
              </Link>
            </div>
          )}
        </div> */}
      </div>
    </nav>
  );
}

export default NavBar;
