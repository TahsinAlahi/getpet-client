import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import useAdmin from "./hooks/useAdmin";
import ProtectAdmin from "./components/ProtectAdmin";

const Homepage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const PetListingPage = lazy(() => import("./pages/PetListingPage"));
const PetDetailPage = lazy(() => import("./pages/PetDetailPage"));
const CampaignsPage = lazy(() => import("./pages/CampaignsPage"));
const CampaignDetailsPage = lazy(() => import("./pages/CampaignDetailsPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const AddPetPage = lazy(() => import("./pages/DashboardPages/AddPetPage"));
const AddedPetsPage = lazy(() =>
  import("./pages/DashboardPages/AddedPetsPage")
);
const EditPetsPage = lazy(() => import("./pages/DashboardPages/EditPetsPage"));
const CreateCampaignPage = lazy(() =>
  import("./pages/DashboardPages/CreateCampaignPage")
);
const MyCampaignPage = lazy(() =>
  import("./pages/DashboardPages/MyCampaignPage")
);
const EditCampaignPage = lazy(() =>
  import("./pages/DashboardPages/EditCampaignPage")
);
const DonationsPage = lazy(() =>
  import("./pages/DashboardPages/DonationsPage")
);
const UsersPage = lazy(() => import("./pages/DashboardPages/UsersPage"));
const AllPetsPage = lazy(() => import("./pages/DashboardPages/AllPetsPage"));
const AllCampaignsPage = lazy(() =>
  import("./pages/DashboardPages/AllCampaignsPage")
);
const RequestPage = lazy(() => import("./pages/DashboardPages/RequestPage"));

function SuspenseWrapper(Component) {
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: SuspenseWrapper(Homepage),
      },
      {
        path: "/pet-listing",
        element: SuspenseWrapper(PetListingPage),
      },
      {
        path: "/pet-details/:id",
        element: SuspenseWrapper(PetDetailPage),
      },
      {
        path: "/donation-campaigns",
        element: SuspenseWrapper(CampaignsPage),
      },
      {
        path: "/campaign-details/:id",
        element: SuspenseWrapper(CampaignDetailsPage),
      },
      {
        path: "/login",
        element: SuspenseWrapper(LoginPage),
      },
      {
        path: "/register",
        element: SuspenseWrapper(RegisterPage),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>{SuspenseWrapper(DashboardPage)}</ProtectedRoute>
        ),
        children: [
          {
            path: "add-pet",
            element: SuspenseWrapper(AddPetPage),
          },
          {
            path: "edit-pet/:id",
            element: SuspenseWrapper(EditPetsPage),
          },
          {
            path: "added-pets",
            element: SuspenseWrapper(AddedPetsPage),
          },
          {
            path: "edit-campaign/:id",
            element: SuspenseWrapper(EditCampaignPage),
          },
          {
            path: "create-donation-campaign",
            element: SuspenseWrapper(CreateCampaignPage),
          },
          {
            path: "my-campaigns",
            element: SuspenseWrapper(MyCampaignPage),
          },
          {
            path: "adoption-request",
            element: SuspenseWrapper(RequestPage),
          },
          {
            path: "my-donations",
            element: SuspenseWrapper(DonationsPage),
          },
          {
            path: "users",
            element: <ProtectAdmin>{SuspenseWrapper(UsersPage)}</ProtectAdmin>,
          },
          {
            path: "all-pets",
            element: (
              <ProtectAdmin>{SuspenseWrapper(AllPetsPage)}</ProtectAdmin>
            ),
          },
          {
            path: "all-campaigns",
            element: (
              <ProtectAdmin>{SuspenseWrapper(AllCampaignsPage)}</ProtectAdmin>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
