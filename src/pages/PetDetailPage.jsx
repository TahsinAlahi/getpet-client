import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";

function PetDetailsPage() {
  const { id } = useParams();
  const AxiosSecure = useAxiosSecure();
  const { data: petData, isLoading } = useQuery({
    queryKey: ["pet", id],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/pets/${id}`);
      return res.data;
    },
    staleTime: 2 * 60 * 1000,
    cacheTime: 2 * 60 * 1000,
  });

  return (
    <div className="bg-[#fdf1ec] dark:bg-dark-primary flex justify-center items-center min-h-[0.5svh] py-10 px-5">
      <div className="rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 place-content-center max-w-screen-md mx-auto overflow-hidden font-openSans">
        <div className="h-full">
          <img
            src={petData?.petImage}
            alt={petData?.petName}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="h-full bg-white dark:bg-dark-secondary dark:text-white  p-6 py-8 text-base">
          <div className="text-[#8d8d8d] dark:text-white">
            <h1 className="text-3xl text-[#474747] dark:text-white font-nunito mb-3">
              {petData?.petName}
            </h1>
            <h2 className="text-sm font-nunito uppercase text-[#3f3f3f] dark:text-white tracking-wide mb-4">
              Category: {petData?.petCategory}
            </h2>
            <p className="leading-7  mb-4">{petData?.shortDescription}</p>
            <p className="leading-7 mb-4">{petData?.longDescription}</p>
            <p className="leading-7 mb-4">
              <IoTimeOutline className="inline mr-1" /> Age: {petData?.petAge}{" "}
              years
            </p>
            <p className="leading-7">
              <FaLocationDot className="inline mr-1" /> Location:{" "}
              {petData?.petLocation}
            </p>
          </div>
          <div className="mt-4">
            <button className="w-[176px] h-[50px] rounded-full bg-blue-800 text-white uppercase font-raleway text-[14px] tracking-[0.2em] font-medium outline-none hover:bg-blue-900">
              Adopt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetDetailsPage;
