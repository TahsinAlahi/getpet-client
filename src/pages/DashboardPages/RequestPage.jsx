import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PetTable from "../../components/PetTable";
import RequestTable from "../../components/RequestTable";

function RequestPage() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  async function getUsersRequest() {
    try {
      const res = await axiosSecure.get(
        `requests/requests-users-pets/${user.email}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  const {
    data: usersPetsRequests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["usersPetsRequests"],
    queryFn: getUsersRequest,
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  return (
    <main className="text-black dark:text-white font-openSans min-h-svh w-full mx-auto flex-1">
      <div className="bg-secondary dark:bg-dark-secondary h-full mx-2">
        <div className="flex items-center justify-center flex-col py-5">
          <h1 className="text-4xl font-semibold font-nunito border-b-4 dark:border-white border-dark-primary text-center mb-10">
            Added Pets
          </h1>
          {usersPetsRequests?.length === 0 ? (
            <h1 className="text-2xl font-semibold font-nunito">
              No Pets Added
            </h1>
          ) : (
            <RequestTable data={usersPetsRequests} refetch={refetch} />
          )}
        </div>
      </div>
    </main>
  );
}

export default RequestPage;
