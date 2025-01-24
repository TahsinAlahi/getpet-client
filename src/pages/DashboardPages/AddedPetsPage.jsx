import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PetTable from "../../components/PetTable";

function AddedPetsPage() {
  // TODO: change it to secure later
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  async function getAddedPets() {
    try {
      // const res = await axiosPublic.get(`/pets/added-pets/${user.email}`);
      const res = await axiosPublic.get(`/admins/all-pets`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  function handleDelete(id) {
    console.log(id);
  }

  function handleAdopt(id) {
    console.log(id);
  }

  function handleEdit(id) {
    console.log(id);
  }

  const { data: addedPets, isLoading } = useQuery({
    queryKey: ["addedPets"],
    queryFn: getAddedPets,
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <main className="text-black dark:text-white font-openSans min-h-svh w-full mx-auto flex-1">
      <div className="bg-secondary dark:bg-dark-secondary h-full mx-2">
        <div className="flex items-center justify-center flex-col py-5">
          <h1 className="text-4xl font-semibold font-nunito border-b-4 dark:border-white border-dark-primary text-center mb-10">
            Added Pets
          </h1>

          <PetTable
            data={addedPets}
            onDelete={handleDelete}
            onAdopt={handleAdopt}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </main>
  );
}

export default AddedPetsPage;
