import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!user) navigate("/login", { state: { from: pathname } });
  });

  if (!user) return;

  return <>{children}</>;
}

export default ProtectedRoute;
