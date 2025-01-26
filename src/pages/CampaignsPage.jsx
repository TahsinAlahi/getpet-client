import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import CampaignCard from "../components/CampaignCard";

function CampaignsPage() {
  const axiosPublic = useAxiosPublic();
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await axiosPublic.get("/campaigns/all-campaigns");
      console.log(res.data);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <main className="bg-primary dark:bg-dark-primary min-h-screen max-w-screen-xl mx-auto text-black dark:text-white font-openSans py-8">
      <h1 className="text-3xl border-b-2 border-black dark:border-secondary mx-auto text-center w-fit pb-1 mb-10 font-nunito font-bold">
        Donation Campaigns
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:w-4/5 w-full px-5 md:px-0  mx-auto">
        {campaigns?.map((campaign) => (
          <CampaignCard key={campaign._id} campaign={campaign} />
        ))}
      </div>
    </main>
  );
}

export default CampaignsPage;
