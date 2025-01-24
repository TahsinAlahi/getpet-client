import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

function AddedPetsPage() {
  // TODO: change it to secure later
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  async function getAddedPets() {
    try {
      const res = await axiosPublic.get(`/pets/added-pets/${user.email}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  const { data: addedPets, isLoading } = useQuery({
    queryKey: ["addedPets"],
    queryFn: getAddedPets,
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <main className="text-black dark:text-white font-openSans min-h-svh max-w-screen-xl w-full mx-auto ">
      <div className="bg-secondary dark:bg-dark-secondary flex-1 h-full  mx-2 md:mx-3">
        <div className="flex items-center justify-center flex-col py-5 px-3">
          <h1 className="text-4xl font-semibold font-nunito border-b-4 dark:border-white border-dark-primary text-center mb-10">
            Added Pets
          </h1>
        </div>
      </div>
    </main>
  );
}

export default AddedPetsPage;
