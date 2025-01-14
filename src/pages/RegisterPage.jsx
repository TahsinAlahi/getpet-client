import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginWithGoogle from "../components/LoginWithGoogle";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useRef, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import Lottie from "lottie-react";
import signupAnimation from "../assets/signup_lottie.json";
import passwordValidator from "../utils/passwordValidator";
import { toast } from "react-toastify";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef(null);
  const { registerWithEmail } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  async function handleRegister(e) {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const { email, username, password, imageUrl } =
      Object.fromEntries(formData);

    if (!passwordValidator(password)) {
      toast.error("Try a stronger password!");
      return;
    }

    const res = await registerWithEmail(username, email, password, imageUrl);

    if (res.status === "success") navigate(state.from || "/");
  }

  return (
    <main className="bg-primary dark:bg-dark-primary min-h-screen max-w-screen-xl mx-auto text-black dark:text-white font-openSans py-10">
      <h1 className="text-3xl border-b-2 border-black dark:border-secondary  mx-auto text-center w-fit pb-1 mb-10 lg:mb-2 font-nunito">
        Register
      </h1>

      <div className="grid -mt-6 lg:mt-0 grid-cols-1 lg:grid-cols-2 w-full md:w-4/5 mx-auto place-items-center">
        <Lottie
          className="w-4/5 h-3/4 scale-125 lg:scale-100 lg:h-full lg:w-full mx-auto order-1 lg:order-2"
          animationData={signupAnimation}
          loop={true}
        />
        <div className="w-11/12 -mt-6 lg:mt-0 mx-auto flex flex-col items-center justify-center order-2 lg:order-1">
          <form className="mt-7 w-full" ref={formRef} onSubmit={handleRegister}>
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
              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="font-semibold text-lg">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="px-3 py-2 text-black dark:border-white outline-none rounded-md border border-gray-400 shadow-md"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="imageUrl" className="font-semibold text-lg">
                  Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  className="px-3 py-2 outline-none rounded-md border text-black  border-gray-400 shadow-md"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 relative">
                <div
                  className="absolute right-3 bottom-3 text-black cursor-pointer"
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
                  name="password"
                  id="password"
                  className="px-3 py-2 text-black outline-none rounded-md border border-gray-400 shadow-md"
                  required
                />
              </div>
            </div>

            <button className="w-full px-3 py-2 rounded-md bg-purple-900 text-white font-semibold hover:bg-purple-800 transition-all duration-200 mt-5 ">
              Register
            </button>
          </form>
          <div className="flex items-center gap-2 my-4 w-full">
            <div className="flex-1 border-t-2 border-black dark:border-white" />
            <h1 className="font-semibold text-xl">OR</h1>
            <div className="flex-grow border-t-2 border-black dark:border-white" />
          </div>
          <LoginWithGoogle />
          <h3 className="mt-4 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-900 dark:text-purple-400 border-b-2 border-transparent hover:border-purple-900 dark:hover:border-purple-400 transition-all duration-200 font-semibold"
            >
              Login
            </Link>
          </h3>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
