import { Link } from "react-router-dom";
import headerBg from "../assets/header-bg.jpg";

function Header() {
  return (
    <header
      className="min-h-[calc(100vh-72px)] max-w-screen-xl mx-auto bg-primary dark:bg-dark-primary bg-cover bg-center bg-no-repeat font-openSans"
      style={{
        backgroundImage: `url(${headerBg})`,
      }}
    >
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] bg-black/50 backdrop-blur-sm text-white space-y-5 text-center px-5">
        <h1 className="text-5xl lg:text-7xl font-bold font-coiny border-b-4 border-white mb-1">
          GetPet
        </h1>
        <h3 className="text-lg lg:text-xl font-semibold font-nunito">
          Find Your Perfect <br className="lg:hidden" />
          Companion With Us
        </h3>
        <p className="text-sm lg:text-base">
          Connecting Pets with Loving Homes, <br />
          <i>&quot;One Paw at a Time&quot;.</i>
        </p>
        <p className="lg:w-1/2 ">
          At <span className="font-bold font-coiny font-lg">GetPet</span>, we
          believe that every pet deserves a warm and loving home, and every
          individual deserves the unmatched joy that comes with a loyal
          companion.
        </p>
        <Link
          to="/pet-listing"
          className="px-6 py-2 text-xl bg-btn-primary hover:bg-btn-secondary hover:text-white duration-75 transition-all text-black rounded-lg mt-3"
        >
          Find your best friend
        </Link>
      </div>
    </header>
  );
}

export default Header;
