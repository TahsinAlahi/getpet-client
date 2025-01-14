import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function AppLayout() {
  return (
    <div className="bg-primary dark:bg-dark-primary">
      <NavBar />
      <Outlet />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition:Bounce
      />
    </div>
  );
}

export default AppLayout;
