import { Link } from "react-router-dom";

const menuItems = [
  { title: "Add pet", link: "add-pet" },
  { title: "Added pets", link: "added-pets" },
  { title: "Adoption Request", link: "adoption-request" },
  { title: "Create Campaign", link: "create-donation-campaign" },
  { title: "My Campaigns", link: "my-donation-campaigns" },
  { title: "My Donations", link: "my-donations" },
];

function UserDashBoard({ onClick }) {
  return (
    <div className="lg:w-44 w-64">
      <h1 className="text-center lg:text-left font-bold text-lg font-nunito mb-2">
        Dashboard
      </h1>
      <ul className="text-center lg:text-left divide-y divide-black">
        {menuItems.map((item) => (
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

export default UserDashBoard;
