import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

function CampaignCard({ campaign = null, isLoading = false }) {
  return (
    <div className="w-full h-full flex flex-col bg-secondary dark:bg-dark-secondary border-gray-400/15 border-2 rounded-lg overflow-hidden shadow-lg hover:shadow-xl">
      <div className="w-full h-60 overflow-hidden">
        {isLoading ? (
          <Skeleton height="100%" width="100%" />
        ) : (
          <img
            className="w-full h-full object-cover object-center transform transition-all duration-1000 ease-linear rounded-t-lg"
            src={campaign?.petImage}
            alt={campaign?.petName}
          />
        )}
      </div>
      <div className="px-5 py-4 flex-1">
        <h1 className="font-nunito text-3xl font-medium leading-none mb-2">
          {isLoading ? <Skeleton width={200} /> : campaign?.petName}
        </h1>
        <div className="w-1/4 h-1 bg-black dark:bg-white mb-2"></div>
        <p className="text-lg">
          <span className="font-semibold">Max Donation:</span>{" "}
          {isLoading ? (
            <Skeleton width={80} />
          ) : (
            `$${campaign?.maxDonationAmount}`
          )}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Donated:</span>{" "}
          {isLoading ? <Skeleton width={80} /> : `$${campaign?.totalDonations}`}
        </p>
      </div>
      <div className="px-5 py-2 block mb-3">
        {isLoading ? (
          <Skeleton width={120} height={30} />
        ) : (
          <Link
            to={`/campaign-details/${campaign?._id}`}
            className="inline-block px-4 py-2 text-sm font-bold text-white bg-yellow-600 rounded-xl hover:bg-yellow-700 transition-all duration-200 ease-linear"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}

export default CampaignCard;
