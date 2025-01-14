import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginWithGoogle from "../components/LoginWithGoogle";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useRef, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import Lottie from "lottie-react";
import loginAnimation from "../assets/login_lottie.json";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef(null);
  const { loginWithEmail, forgotPassword } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <main className="bg-primary dark:bg-dark-primary min-h-screen max-w-screen-xl mx-auto text-black dark:text-white font-openSans py-10">
      <h1 className="text-3xl border-b-2 border-black dark:border-secondary  mx-auto text-center w-fit pb-1 mb-10 lg:mb-2 font-nunito">
        Login
      </h1>

      <div className="grid -mt-10 md:-mt-20 lg:mt-0 grid-cols-1 lg:grid-cols-2 w-full md:w-4/5 mx-auto place-items-center">
        <Lottie
          className="w-4/5 h-3/4 scale-125 lg:scale-100 lg:h-full lg:w-full mx-auto order-1 lg:order-2"
          animationData={loginAnimation}
          loop={true}
        />
        <div className="w-11/12 -mt-12 md:-mt-20 lg:mt-0 mx-auto flex flex-col items-center justify-center order-2 lg:order-1">
          <form className="mt-7 w-full" ref={formRef}>
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-semibold text-lg">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="px-3 py-2 text-black outline-none rounded-md border border-gray-400 shadow-md"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 relative">
                <div
                  className="absolute right-3 bottom-3 cursor-pointer text-black"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoMdEye className="text-xl" />
                  ) : (
                    <IoMdEyeOff className="text-xl" />
                  )}
                </div>
                <label htmlFor="password" className="font-semibold text-lg">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="px-3 py-2 outline-none rounded-md border text-black border-gray-400 shadow-md"
                  required
                />
              </div>
            </div>
            <button
              className="mt-3 text-sm font-semibold border-b-4 border-transparent hover:border-purple-900 transition-all duration-200"
              // onClick={onForgotPassword}
              type="button"
            >
              Forgot Password
            </button>
            <button className="w-full px-3 py-2 rounded-md bg-purple-900 text-inherit font-semibold hover:bg-purple-800 transition-all duration-200 mt-3 text-white">
              Login
            </button>
          </form>
          <div className="flex items-center gap-2 my-4 w-full">
            <div className="flex-1 border-t-2 border-black dark:border-white" />
            <h1 className="font-semibold text-xl">OR</h1>
            <div className="flex-grow border-t-2 border-black dark:border-white" />
          </div>
          <LoginWithGoogle />
          <h3 className="mt-4 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              state={{ from: state?.from || "/" }}
              className="text-purple-900 dark:text-purple-400 border-b-2 border-transparent hover:border-purple-900 dark:hover:border-purple-400 transition-all duration-200 font-semibold"
            >
              Register
            </Link>
          </h3>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
