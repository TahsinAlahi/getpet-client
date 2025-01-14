import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Homepage from "./pages/Homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/", element: <Homepage /> }],
  },
]);

export default router;
