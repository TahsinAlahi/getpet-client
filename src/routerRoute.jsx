import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AddPetPage from "./pages/DashboardPages/AddPetPage";
import AddedPetsPage from "./pages/DashboardPages/AddedPetsPage";
import PetListingPage from "./pages/PetListingPage";
import PetDetailPage from "./pages/PetDetailPage";
import CampaignsPage from "./pages/CampaignsPage";
import CampaignDetailsPage from "./pages/CampaignDetailsPage";
import CreateCampaignPage from "./pages/DashboardPages/CreateCampaignPage";
import MyCampaignPage from "./pages/DashboardPages/MyCampaignPage";
import EditCampaignPage from "./pages/DashboardPages/EditCampaignPage";
import DonationsPage from "./pages/DashboardPages/DonationsPage";
import UsersPage from "./pages/DashboardPages/UsersPage";
import EditPetsPage from "./pages/DashboardPages/EditPetsPage";
import AllPetsPage from "./pages/DashboardPages/AllPetsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/pet-listing", element: <PetListingPage /> },
      { path: "/pet-details/:id", element: <PetDetailPage /> },
      { path: "/donation-campaigns", element: <CampaignsPage /> },
      {
        path: "/campaign-details/:id",
        element: <CampaignDetailsPage />,
      },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      {
        path: "/dashboard",
        element: <DashboardPage />,
        children: [
          { path: "add-pet", element: <AddPetPage /> },
          { path: "edit-pet/:id", element: <EditPetsPage /> },
          { path: "added-pets", element: <AddedPetsPage /> },
          { path: "edit-campaign/:id", element: <EditCampaignPage /> },
          { path: "create-donation-campaign", element: <CreateCampaignPage /> },
          { path: "my-donation-campaigns", element: <MyCampaignPage /> },
          { path: "my-donations", element: <DonationsPage /> },
          { path: "users", element: <UsersPage /> },
          { path: "all-pets", element: <AllPetsPage /> },
        ],
      },
    ],
  },
]);

export default router;
