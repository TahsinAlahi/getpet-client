import { Link } from "react-router-dom";

const adminMenuItems = [
  { title: "Users", link: "users" },
  { title: "All pets", link: "all-pets" },
  { title: "All donations", link: "all-donations" },
];

function AdminDashBoard({ onClick }) {
  return (
    <div className="w-64 text-black dark:text-white mt-4">
      <h1 className="text-center font-nunito text-lg font-bold mb-1">
        Admin DashBoard
      </h1>
      <ul className="text-center divide-y divide-black">
        {adminMenuItems.map((item) => (
          <li key={item.link} onClick={onClick}>
            <Link className="py-2 block" to={item.link}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashBoard;
