import logoImg from "../assets/logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className=" text-gray-600 dark:text-gray-400 py-14 font-openSans">
      <footer>
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse w-fit mx-auto mb-8"
        >
          <div className="h-20 aspect-square overflow-hidden bg-primary rounded-full flex items-center justify-center">
            <img
              src={logoImg}
              className="h-full w-full object-cover object-center scale-125 "
              alt="GetPet"
            />
          </div>
          <span className="self-center text-3xl text-black dark:text-white font-semibold whitespace-nowrap font-coiny">
            GetPet
          </span>
        </Link>
        <div className="flex justify-center space-x-4 pb-6">
          <a
            href="https://www.facebook.com/"
            className="text-2xl w-10 aspect-square flex items-center justify-center rounded-full opacity-75 hover:shadow-lg"
          >
            <FaFacebook className="w-full h-full" color="blue" />
          </a>
          <a
            href="https://www.instagram.com/"
            className="text-2xl w-10 aspect-square flex items-center justify-center rounded-full hover:opacity-75 hover:shadow-lg "
          >
            <FaInstagram className="w-full h-full" color="#fa7e1e" />
          </a>
          <a
            href="https://www.linkedin.com/"
            className="text-2xl w-10 aspect-square flex items-center justify-center rounded-full hover:shadow-lg"
          >
            <FaLinkedinIn className="w-full h-full" color="blue" />
          </a>
          <a
            href="https://www.whatsapp.com/"
            className="text-2xl w-10 aspect-square flex items-center justify-center rounded-full hover:shadow-lg "
          >
            <FaWhatsapp className="w-full h-full" color="green" />
          </a>
        </div>
        <ul className="flex text-inherit justify-center space-x-7 text-xl font-light leading-6">
          <li>
            <Link
              to="/"
              className="hover:opacity-100 hover:border-b-2 border-dark-primary dark:border-primary duration-75 transition-all"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/pet-listing"
              className="hover:opacity-100 hover:border-b-2 border-dark-primary dark:border-primary duration-75 transition-all"
            >
              Pet Lists
            </Link>
          </li>
          <li>
            <Link
              to="/donation-campaigns"
              className="hover:opacity-100 hover:border-b-2 border-dark-primary dark:border-primary duration-75 transition-all"
            >
              Campaigns
            </Link>
          </li>
          <li>
            <Link
              to="/terms"
              className="hover:opacity-100 hover:border-b-2 border-dark-primary dark:border-primary duration-75 transition-all"
            >
              Terms
            </Link>
          </li>
        </ul>
        <p className="mt-6 text-center text-base text-gray-700 dark:text-gray-200">
          <span className="font-bold font-coiny">GetPet</span> ©
          {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default Footer;
