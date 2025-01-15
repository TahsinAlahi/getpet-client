import React from "react";

function CategoryCard({ name, imageUrl }) {
  return (
    <div
      className="bg-cover rounded-lg overflow-hidden bg-center bg-no-repeat h-[200px] text-white text-2xl font-bold font-nunito cursor-pointer"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <h1 className="flex items-center justify-center  bg-black/50 p-2 w-full text-center h-full">
        {name}
      </h1>
    </div>
  );
}

export default CategoryCard;
