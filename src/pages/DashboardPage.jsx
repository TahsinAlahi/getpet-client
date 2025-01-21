import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

function DashboardPage() {
  return (
    <div className="bg-primary dark:bg-dark-primary min-h-screen max-w-screen-xl mx-auto text-black dark:text-white font-openSans relative lg:flex lg:flex-row">
      <SideBar />
      <Outlet />
    </div>
  );
}

export default DashboardPage;
