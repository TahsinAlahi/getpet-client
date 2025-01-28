import { useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useAuth } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

function useAdmin() {
  const axiosSecure = useAxiosSecure();
  const { isAuthLoading, user } = useAuth();
  const [hasFetched, setHasFetched] = useState(false);

  const { data: isAdmin, isLoading: isAdminLoading = false } = useQuery({
    enabled: !isAuthLoading && !hasFetched,
    queryKey: ["admin", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`admins/${user?.email}`);
      return res.data?.isAdmin;
    },
    refetchOnWindowFocus: false,
    onSuccess: () => {
      setHasFetched(true);
    },
  });

  // console.log(isAdmin);

  return { isAdmin, isAdminLoading };
}

export default useAdmin;
