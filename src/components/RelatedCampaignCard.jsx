import { Link } from "react-router-dom";

function RelatedCampaignCard({ campaign }) {
  return (
    <Link
      to={`/campaign-details/${campaign?._id}`}
      className="grid grid-cols-2 gap-2 shadow-md items-center md:border-2 border-transparent rounded-md overflow-hidden hover:border-black cursor-pointer text-black dark:text-white duration-100"
    >
      <div className="bg-white dark:bg-dark-secondary text-base flex items-center justify-center h-28">
        <img
          src={campaign?.petImage}
          alt={campaign?.petName}
          className="w-full h-full object-cover object-center rounded-tl-md rounded-bl-md"
        />
      </div>
      <h3 className="font-nunito text-lg">Help {campaign?.petName}</h3>
    </Link>
  );
}

export default RelatedCampaignCard;
