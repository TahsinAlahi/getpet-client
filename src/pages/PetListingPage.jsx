import PetListCard from "../components/PetListCard";

function PetListingPage() {
  return (
    <main className="bg-primary dark:bg-dark-primary min-h-screen max-w-screen-xl mx-auto text-black dark:text-white font-openSans py-10">
      <h1 className="text-3xl border-b-2 border-black dark:border-secondary  mx-auto text-center w-fit pb-1 mb-10 lg:mb-2 font-nunito font-bold">
        Pet List
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:w-4/5 w-full px-5 md:px-0  mx-auto">
        <PetListCard />
        <PetListCard />
        <PetListCard />
      </div>
    </main>
  );
}

export default PetListingPage;
