import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default AppLayout;
