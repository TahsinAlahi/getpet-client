import UserDashBoard from "../components/UserDashBoard";
import SideBarMobile from "../components/SideBarMobile";
import AdminDashBoard from "../components/AdminDashBoard";

function DashboardPage() {
  return (
    <main className="bg-primary dark:bg-dark-primary min-h-screen max-w-screen-xl mx-auto text-black dark:text-white font-openSans py-10 relative">
      <>
        <SideBarMobile />
        <div className="absolute top-0 bottom-0 bg-secondary dark:bg-dark-secondary border-2 border-l-0 border-black dark:border-white py-5 px-4 hidden lg:block">
          <UserDashBoard />
          <AdminDashBoard />
        </div>
      </>
    </main>
  );
}

export default DashboardPage;
