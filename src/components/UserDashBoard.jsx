import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const menuItems = [
  { title: "Add pet", link: "add-pet" },
  { title: "Added pets", link: "added-pets" },
  { title: "Adoption Request", link: "adoption-request" },
  { title: "Create Donation Campaign", link: "create-donation-campaign" },
  { title: "My Donation Campaigns", link: "my-donation-campaigns" },
  { title: "My Donations", link: "my-donations" },
];

function UserDashBoard() {
  return (
    <div className="h-full w-72">
      <ul className="text-center divide-y divide-black">
        {menuItems.map((item) => (
          <Link key={item.link} className="py-2 block" to={item.link}>
            {item.title}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default UserDashBoard;
