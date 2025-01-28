import { Link } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const adminMenuItems = [
  { title: "Users", link: "users" },
  { title: "All Pets", link: "all-pets" },
  { title: "All Campaigns", link: "all-campaigns" },
];

function AdminDashBoard({ onClick }) {
  const { isAdmin } = useAdmin();

  return (
    isAdmin && (
      <div className="lg:w-44 w-64 text-black dark:text-white mt-4">
        <h1 className="text-center lg:text-left font-nunito text-lg font-bold mb-1">
          Admin DashBoard
        </h1>
        <ul className="text-center lg:text-left divide-y divide-black">
          {adminMenuItems.map((item) => (
            <li key={item.link} onClick={onClick}>
              <Link className="py-2 block" to={item.link}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default AdminDashBoard;
