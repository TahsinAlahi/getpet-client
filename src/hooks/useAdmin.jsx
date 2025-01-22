import useAxiosSecure from "./useAxiosSecure";
import { useAuth } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

function useAdmin() {
  const axiosSecure = useAxiosSecure();
  const { isAuthLoading, user } = useAuth();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    enabled: !isAuthLoading,
    queryKey: ["admin", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`admin/${user?.email}`);
      return res.data?.isAdmin;
    },
  });

  return [isAdmin, isAdminLoading];
}

export default useAdmin;
