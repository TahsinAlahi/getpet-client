import { useQuery } from "@tanstack/react-query";
import PetListCard from "../components/PetListCard";
import useAxiosPublic from "../hooks/useAxiosPublic";

function PetListingPage() {
  const axiosPublic = useAxiosPublic();

  const { data: pets, isLoading } = useQuery({
    queryKey: ["listed-pets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/pets/listed-pets");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  return (
    <main className="bg-primary dark:bg-dark-primary min-h-screen max-w-screen-xl mx-auto text-black dark:text-white font-openSans py-8">
      <h1 className="text-3xl border-b-2 border-black dark:border-secondary mx-auto text-center w-fit pb-1 mb-10 font-nunito font-bold">
        Pet List
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:w-4/5 w-full px-5 md:px-0  mx-auto">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <PetListCard key={index} isLoading />
            ))
          : pets?.map((pet) => <PetListCard key={pet._id} pet={pet} />)}
      </div>
    </main>
  );
}

export default PetListingPage;
