import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const IMAGE_BB_API_KEY = import.meta.env.VITE_IMAGE_BB_API_KEY;

const petCategories = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "bird", label: "Bird" },
  { value: "rabbit", label: "Rabbit" },
  { value: "fish", label: "Fish" },
  { value: "other", label: "Other" },
];

function EditPetsPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchPetData() {
      try {
        const response = await axiosSecure.get(`/pets/${id}`);
        const pet = response.data;
        setValue("petName", pet.petName);
        setValue("petAge", pet.petAge);
        setValue("petLocation", pet.petLocation);
        setValue("shortDescription", pet.shortDescription);
        setValue("longDescription", pet.longDescription);
        setImageUrl(pet.petImage);
        const categoryOption = petCategories.find(
          (category) => category.value === pet.petCategory.toLowerCase()
        );
        setValue("petCategory", categoryOption);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch pet data.");
      }
    }
    fetchPetData();
  }, []);

  async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMAGE_BB_API_KEY}`,
        formData
      );
      setImageUrl(response.data.data.url);
    } catch (error) {
      toast.error("Failed to upload image.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(data) {
    try {
      const updatedPetData = {
        ...data,
        petAge: Number(data.petAge),
        petCategory: data?.petCategory?.value,
        petImage: imageUrl,
      };

      await axiosSecure.patch(`/pets/${id}`, updatedPetData);
      toast.success("Pet updated successfully!");
      navigate("/dashboard/added-pets");
    } catch (error) {
      toast.error("Failed to update pet. Try again later.");
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen w-full max-w-screen-xl mx-auto flex items-center justify-center py-5">
      <div className="w-full md:mx-4 bg-secondary dark:bg-dark-secondary backdrop-filter backdrop-blur-sm mx-3 py-5">
        <div className="flex flex-col items-center justify-center w-5/6 lg:w-1/2 mx-auto">
          <h1 className="text-4xl font-semibold font-nunito border-b-4 dark:border-white border-dark-primary">
            Edit Pet Details
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
                        field.onChange(selectedOption ? selectedOption : "")
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

              <div>
                <label className="block font-semibold">Pet Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  className="border rounded-md px-3 py-2 w-full"
                  onChange={handleImageUpload}
                />
                {loading && <p className="text-blue-500">Uploading...</p>}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={"Pet Picture"}
                    className="mt-2 max-w-full h-32"
                  />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-all"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Update Campaign"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default EditPetsPage;
