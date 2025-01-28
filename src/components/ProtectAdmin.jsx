import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAdmin from "../hooks/useAdmin";
import { useEffect } from "react";

function ProtectAdmin({ children }) {
  const { isAdmin, isAdminLoading } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAdmin);
    if (!isAdminLoading) {
      if (!isAdmin) {
        navigate("/");
        toast.error("You are not authorized to access this page.");
      }
    }
  }, [isAdmin, isAdminLoading]);

  return <>{children}</>;
}

export default ProtectAdmin;
