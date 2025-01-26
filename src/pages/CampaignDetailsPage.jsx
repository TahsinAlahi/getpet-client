import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { IoTimeOutline } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { GrStatusGood } from "react-icons/gr";
import RelatedCampaignCard from "../components/RelatedCampaignCard";

function CampaignDetailsPage() {
  const { id } = useParams();
  const AxiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["campaign", id],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/campaigns/${id}`);
      console.log(res.data);
      return res.data;
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 2 * 60 * 1000,
  });

  const { campaign: campaignData, relatedCampaigns } = data || {};

  return (
    <div className="bg-[#fdf1ec] dark:bg-dark-primary flex justify-center items-center flex-col min-h-[0.5svh] py-10 px-5">
      <section className="rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 place-content-center max-w-screen-md mx-auto overflow-hidden font-openSans">
        <div className="h-full">
          <img
            src={campaignData?.petImage}
            alt={campaignData?.petName}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="h-full bg-white dark:bg-dark-secondary dark:text-white p-6 py-8 text-base">
          <div className="text-[#8d8d8d] dark:text-white">
            <h1 className="text-3xl text-[#474747] dark:text-white font-nunito mb-3">
              {campaignData?.petName}
            </h1>
            <h2 className="text-sm font-nunito uppercase text-[#3f3f3f] dark:text-white tracking-wide mb-4">
              Donation Goal: ${campaignData?.maxDonationAmount}
            </h2>
            <p className="leading-7 mb-4">{campaignData?.shortDescription}</p>
            <p className="leading-7 mb-4">{campaignData?.longDescription}</p>
            <p className="leading-7 mb-4">
              <IoTimeOutline className="inline mr-1" /> Date Added:{" "}
              {campaignData?.dateAdded}
            </p>
            <p className="leading-7 mb-4">
              <MdDateRange className="inline mr-1" /> Last Date to Donate:{" "}
              {campaignData?.lastDateToDonate}
            </p>
            <p className="leading-7 mb-4">
              <BiDonateHeart className="inline mr-1" /> Total Donations: $
              {campaignData?.totalDonations}
            </p>
            <p className="leading-7">
              <GrStatusGood className="inline mr-1" /> Status:{" "}
              {campaignData?.isPaused ? "Paused" : "Active"}
            </p>
          </div>
          <div className="mt-4">
            <button className="w-[176px] h-[50px] rounded-full bg-green-800 text-white uppercase font-raleway text-[14px] tracking-[0.2em] font-medium outline-none hover:bg-green-900">
              Donate
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#fdf1ec] w-full md:w-4/5 mx-auto dark:bg-dark-primary flex justify-center items-center flex-col min-h-[0.5svh] py-10 px-5 mt-5">
        <h1 className="text-xl mx-auto text-center w-fit pb-1 mb-5 font-nunito font-bold">
          Check these Campaigns
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full px-5 md:px-0  mx-auto">
          {relatedCampaigns?.map((campaign) => (
            <RelatedCampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default CampaignDetailsPage;
