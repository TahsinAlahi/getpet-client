import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useAuth } from "../../providers/AuthProvider";

const petCategories = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "bird", label: "Bird" },
  { value: "rabbit", label: "Rabbit" },
  { value: "fish", label: "Fish" },
  { value: "other", label: "Other" },
];

function AddPet() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const petData = {
        ...data,
        petAge: Number(data.petAge),
        advertiserEmail: user.email,
        advertiserName: user.displayName,
      };

      console.log(petData);
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  function handleImageUpload() {
    console.log("uploaded");
  }

  return (
    <main className="min-h-screen w-full max-w-screen-xl mx-auto flex items-center justify-center py-5">
      <div className="w-full md:mx-4 bg-secondary dark:bg-dark-secondary backdrop-filter backdrop-blur-sm mx-3  py-5">
        <div className="flex flex-col items-center justify-center w-5/6 lg:w-1/2 mx-auto">
          <h1 className="text-4xl font-semibold font-nunito border-b-4 dark:border-white border-dark-primary">
            Add Your Pet
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-7 w-full">
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="petName" className="font-semibold text-lg">
                  Pet Name
                </label>
                <input
                  type="text"
                  id="petName"
                  name="petName"
                  placeholder="Enter pet name"
                  className="px-3 py-2 text-black outline-none rounded-md border border-gray-400 shadow-md"
                  {...register("petName", { required: "Pet name is required" })}
                />
                {errors.petName && (
                  <p className="text-red-500 text-sm">
                    {errors.petName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="petAge" className="font-semibold text-lg">
                  Pet Age
                </label>
                <input
                  type="number"
                  step={0.1}
                  id="petAge"
                  name="petAge"
                  placeholder="Enter pet age"
                  className="px-3 py-2 text-black outline-none rounded-md border border-gray-400 shadow-md"
                  {...register("petAge", {
                    required: "Pet age is required",
                    min: 0.1,
                  })}
                />
                {errors.petAge && (
                  <p className="text-red-500 text-sm">
                    {errors.petAge.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="petCategory" className="font-semibold text-lg">
                  Pet Category
                </label>
                <Controller
                  name="petCategory"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={petCategories}
                      onChange={(selectedOption) =>
                        field.onChange(
                          selectedOption ? selectedOption.value : ""
                        )
                      }
                      className="text-black border border-gray-400 shadow-md"
                      placeholder="Select pet category"
                    />
                  )}
                />
                {errors.petCategory && (
                  <span className="text-red-500 text-sm">
                    {errors.petCategory.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="petLocation" className="font-semibold text-lg">
                  Pet Location
                </label>
                <input
                  type="text"
                  id="petLocation"
                  name="petLocation"
                  placeholder="Enter pet location"
                  className="px-3 py-2 text-black outline-none rounded-md border border-gray-400 shadow-md"
                  {...register("petLocation", {
                    required: "Pet location is required",
                  })}
                />
                {errors.petLocation && (
                  <p className="text-red-500 text-sm">
                    {errors.petLocation.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="shortDescription"
                  className="font-semibold text-lg"
                >
                  Short Description
                </label>
                <input
                  type="text"
                  id="shortDescription"
                  name="shortDescription"
                  placeholder="Enter short description"
                  className="px-3 py-2 text-black outline-none rounded-md border border-gray-400 shadow-md"
                  {...register("shortDescription", {
                    required: "Short description is required",
                  })}
                />
                {errors.shortDescription && (
                  <p className="text-red-500 text-sm">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="longDescription"
                  className="font-semibold text-lg"
                >
                  Long Description
                </label>
                <textarea
                  id="longDescription"
                  name="longDescription"
                  placeholder="Enter long description"
                  className="px-3 py-2 text-black outline-none rounded-md border border-gray-400 shadow-md"
                  {...register("longDescription", {
                    required: "Long description is required",
                  })}
                />
                {errors.longDescription && (
                  <p className="text-red-500 text-sm">
                    {errors.longDescription.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="petImage" className="font-semibold text-lg">
                  Pet Image
                </label>
                <input
                  type="file"
                  id="petImage"
                  name="petImage"
                  className="px-3 py-2 text-black dark:text-white outline-none rounded-md border border-gray-400 shadow-md"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                />
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Pet"
                    className="mt-2 max-w-full h-auto"
                  />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 rounded-md bg-blue-400 hover:bg-blue-700 text-white font-semibold transition-all duration-200 mt-3"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Add Pet"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default AddPet;
