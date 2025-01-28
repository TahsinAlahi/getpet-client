import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../providers/AuthProvider";
import DonationsTable from "../../components/DonationsTable";

function DonationsPage() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  async function getDonations() {
    try {
      const res = await axiosSecure.get(
        `/donations/donated-campaigns/${user.email}`
      );
      return res.data;
    } catch (error) {
      console.log(error?.message);
    }
  }

  const {
    data: usersDonations,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["usersDonations"],
    queryFn: getDonations,
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <main className="text-black dark:text-white font-openSans min-h-svh w-full mx-auto flex-1">
      <div className="bg-secondary dark:bg-dark-secondary h-full mx-2">
        <div className="flex items-center justify-center flex-col py-5">
          <h1 className="text-4xl font-semibold font-nunito border-b-4 dark:border-white border-dark-primary text-center mb-10">
            Given Donations
          </h1>
          {usersDonations?.length === 0 ? (
            <h1 className="text-2xl font-semibold font-nunito">
              No Pets Added
            </h1>
          ) : (
            <DonationsTable data={usersDonations} refetch={refetch} />
          )}
        </div>
      </div>
    </main>
  );
}

export default DonationsPage;
