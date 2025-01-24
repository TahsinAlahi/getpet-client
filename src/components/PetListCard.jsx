import { Link } from "react-router-dom";

function PetListCard() {
  return (
    <div className="w-full h-full mx-auto flex items-start flex-col bg-secondary border-gray-400/15 border-2 rounded-lg overflow-hidden shadow-lg hover:shadow-xl">
      <div className="relative w-full h-60 overflow-hidden">
        <img
          className="w-full h-full object-cover object-center transform transition-all duration-1000 ease-linear rounded-t-lg"
          src="https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="Pet Image"
        />
      </div>
      <div className="px-5 py-4 flex-1">
        <h1 className="font-nunito text-3xl font-medium leading-none mb-2">
          Fluffy
        </h1>
        <div className="w-1/4 h-1 bg-black mb-2"></div>
        <div className="font-roboto mt-3">
          <p className="text-lg">
            <span className="font-semibold">Age:</span> 2 years
          </p>
          <p className="text-lg">
            <span className="font-semibold">Location:</span> New York
          </p>
        </div>
      </div>
      <div className="px-5 py-2 block mb-3">
        <Link
          to={`/pet-details/`}
          className="inline-block px-4 py-2 text-sm font-bold text-white bg-yellow-600 rounded-xl hover:bg-yellow-700 transition-all duration-200 ease-linear"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default PetListCard;
