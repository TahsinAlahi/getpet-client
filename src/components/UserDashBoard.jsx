import { Link } from "react-router-dom";

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
    <div className="w-72">
      <h1 className="text-center font-bold text-lg font-nunito mb-2">
        Dashboard
      </h1>
      <ul className="text-center divide-y divide-black">
        {menuItems.map((item) => (
          <li key={item.link}>
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
