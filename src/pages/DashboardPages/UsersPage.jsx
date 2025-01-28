import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import UsersTable from "../../components/UsersTable";

function UsersPage() {
  const axiosSecure = useAxiosSecure();

  async function getUsers() {
    try {
      const res = await axiosSecure.get("/admins/users");
      return res.data;
    } catch (error) {
      console.log(error?.message);
      toast.error("Failed to fetch users. Please try again later.");
    }
  }

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  return (
    <main className="text-black dark:text-white font-openSans min-h-svh w-full mx-auto flex-1">
      <div className="bg-secondary dark:bg-dark-secondary h-full mx-2">
        <div className="flex items-center justify-center flex-col py-5">
          <h1 className="text-4xl font-semibold font-nunito border-b-4 dark:border-white border-dark-primary text-center mb-10">
            Users
          </h1>

          <UsersTable data={users} refetch={refetch} />
        </div>
      </div>
    </main>
  );
}

export default UsersPage;
