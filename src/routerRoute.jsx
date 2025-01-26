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
          { path: "added-pets", element: <AddedPetsPage /> },
        ],
      },
    ],
  },
]);

export default router;
