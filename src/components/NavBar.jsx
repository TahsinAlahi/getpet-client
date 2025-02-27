import { useState } from "react";
import { Link, NavLink } from "react-router";
import logoImg from "../assets/logo.png";
import { useAuth } from "../providers/AuthProvider";
import LightDarkToggle from "./LightDarkToggle";
import ProfileImage from "./ProfileImage";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function activeClass({ isActive }) {
    return `block md:py-1 py-2 px-3 border-b-2 border-transparent hover:border-black hover:dark:border-white text-inherit font-semibold  ${
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
          <div className="h-10 aspect-square overflow-hidden bg-primary rounded-full flex items-center justify-center">
            <img
              src={logoImg}
              className="h-full w-full object-cover object-center scale-150 "
              alt="GetPet"
            />
          </div>
          <span className="self-center text-3xl font-semibold whitespace-nowrap font-coiny">
            GetPet
          </span>
        </Link>

        <div className="flex-1 flex gap-4 items-center justify-end lg:hidden mr-3">
          <div>
            <LightDarkToggle />
          </div>
          <ProfileImage />
        </div>
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
          } w-full lg:w-auto lg:flex lg:justify-end absolute lg:static top-full z-50 bg-nav dark:bg-nav-dark p-4 lg:border-0 border-nav right-0 left-0 lg:py-0 lg:px-0 lg:bg-transparent bg-secondary dark:bg-dark-secondary lg:flex-1 `}
        >
          <ul
            className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-white rounded-lg bg-nav-bg lg:flex-row md:space-x-2 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-nav-bg text-center"
            onClick={toggleMenu}
          >
            <li className="hidden lg:block">
              <LightDarkToggle />
            </li>

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

            <li className="lg:hidden block">
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
            </li>

            {!user && (
              <li className="lg:hidden block">
                <NavLink to="/register" className={activeClass}>
                  Register
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="lg:flex items-center justify-center gap-2 ml-3 hidden">
          {user ? (
            <ProfileImage />
          ) : (
            <>
              <Link
                to="/login"
                className="duration-75 transition-all  px-2 py-1 font-semibold cursor-pointer border-b-2 border-transparent hover:border-black hover:dark:border-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="duration-75 transition-all  px-2 py-1 font-semibold cursor-pointer border-b-2 border-transparent hover:border-black hover:dark:border-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
