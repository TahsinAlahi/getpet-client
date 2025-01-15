function Newsletter() {
  return (
    <div className="max-w-md mx-auto text-center space-y-2 font-poppins text-black dark:text-white font-openSans">
      <h1 className="text-3xl border-b-2 border-black dark:border-secondary mx-auto text-center w-fit pb-1 mb-8 font-nunito">
        Newsletters
      </h1>
      <h1 className="text-2xl font-bold">Stay Connected with Us</h1>
      <p className="text-lg">
        Subscribe to our newsletter and be the first to know about adoption
        events, new furry friends, and exciting updates from{" "}
        <span className="font-bold font-coiny">GetPet</span>.
      </p>
      <form className="mt-4 flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dark-primary dark:focus:ring-primary text-black"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-dark-primary text-white dark:bg-primary dark:text-black rounded-lg font-semibold "
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
