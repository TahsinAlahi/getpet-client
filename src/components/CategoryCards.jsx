import catCategory from "../assets/cat-category.jpg";
import dogCategory from "../assets/dog-category.jpg";
import fishCategory from "../assets/fish-category.jpg";
import birdCategory from "../assets/bird-category.jpg";
import moreCategory from "../assets/more-category.jpg";
import CategoryCard from "./CategoryCard";

function CategoryCards() {
  return (
    <section className="px-5">
      <h1 className="text-3xl border-b-2 border-black dark:border-secondary mx-auto text-center w-fit pb-1 mb-10 font-nunito text-black dark:text-white">
        Categories
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2 lg:gap-4 mx-4 lg:mx-10">
        <CategoryCard name="Cats" imageUrl={catCategory} />
        <CategoryCard name="Dogs" imageUrl={dogCategory} />
        <CategoryCard name="Fishes" imageUrl={fishCategory} />
        <CategoryCard name="Birds" imageUrl={birdCategory} />
        <CategoryCard name="Many more" imageUrl={moreCategory} />
      </div>
    </section>
  );
}

export default CategoryCards;
