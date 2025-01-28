import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CampaignTable from "../../components/CampaignTable";

function MyCampaignPage() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  async function getUserDonations() {
    try {
      const res = await axiosSecure.get(
        `/campaigns/users-campaigns/${user.email}`
      );
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  const {
    data: donations,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userDonations"],
    queryFn: getUserDonations,
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <main className="text-black dark:text-white font-openSans min-h-svh w-full mx-auto flex-1">
      <div className="bg-secondary dark:bg-dark-secondary h-full mx-2">
        <div className="flex items-center justify-center flex-col py-5">
          <h1 className="text-4xl font-semibold font-nunito border-b-4 dark:border-white border-dark-primary text-center mb-10">
            My Donations
          </h1>
          {donations?.length === 0 ? (
            <h1 className="text-2xl font-semibold font-nunito">
              No Donations Requested
            </h1>
          ) : (
            <CampaignTable data={donations} refetch={refetch} />
          )}
        </div>
      </div>
    </main>
  );
}

export default MyCampaignPage;
