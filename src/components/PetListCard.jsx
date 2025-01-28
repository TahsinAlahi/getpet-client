import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PetListCard({ pet = null, isLoading = false }) {
  return (
    <div className="w-full h-full mx-auto flex items-start flex-col bg-secondary dark:bg-dark-secondary border-gray-400/15 border-2 rounded-lg overflow-hidden shadow-lg hover:shadow-xl">
      <div className="w-full h-60 overflow-hidden">
        {isLoading ? (
          <Skeleton height="100%" width="100%" />
        ) : (
          <img
            className="w-full h-full object-cover object-center transform transition-all duration-1000 ease-linear rounded-t-lg"
            src={pet?.petImage}
            alt={pet?.petName}
          />
        )}
      </div>
      <div className="px-5 py-4 flex-1">
        <h1 className="font-nunito text-3xl font-medium leading-none mb-2">
          {isLoading ? <Skeleton width={200} /> : pet?.petName}
        </h1>
        <div className="w-1/4 h-1 bg-black dark:bg-white mb-2"></div>
        <div className="font-roboto mt-3">
          <p className="text-lg">
            <span className="font-semibold">Age:</span>{" "}
            {isLoading ? <Skeleton width={50} /> : `${pet?.petAge} years`}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Location:</span>{" "}
            {isLoading ? <Skeleton width={150} /> : pet?.petLocation}
          </p>
        </div>
      </div>
      <div className="px-5 py-2 block mb-3">
        <Link
          to={`/pet-details/${pet?._id}`}
          className="inline-block px-4 py-2 text-sm font-bold text-white bg-yellow-600 rounded-xl hover:bg-yellow-700 transition-all duration-200 ease-linear"
        >
          {isLoading ? <Skeleton width={120} height={30} /> : "View Details"}
        </Link>
      </div>
    </div>
  );
}

export default PetListCard;
