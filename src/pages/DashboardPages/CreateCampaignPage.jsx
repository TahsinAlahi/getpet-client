import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const IMAGE_BB_API_KEY = import.meta.env.VITE_IMAGE_BB_API_KEY;

function CreateCampaignPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(data) {
    if (!imageUrl) {
      alert("Please upload a pet image.");
      return;
    }

    const campaignData = {
      ...data,
      advertiserEmail: user?.email,
      petImage: imageUrl,
      maxDonationAmount: Number(data.maxDonationAmount),
    };

    try {
      const res = await axiosSecure.post(
        "/campaigns/create-campaign",
        campaignData
      );
      navigate("/campaigns");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <main className="min-h-screen w-full max-w-screen-md mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-6">
        Create Donation Campaign
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            {...register("petName", {
              required: "Pet name is required",
            })}
            placeholder="Enter pet name"
            className="border rounded-md px-3 py-2 w-full"
          />
          {errors.shortDescription && (
            <p className="text-red-500">{errors.petName.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Maximum Donation Amount</label>
          <input
            type="number"
            {...register("maxDonationAmount", {
              required: "Maximum donation amount is required",
              min: 0,
            })}
            step={0.1}
            placeholder="Enter max donation amount"
            className="border rounded-md px-3 py-2 w-full"
          />
          {errors.maxDonationAmount && (
            <p className="text-red-500">{errors.maxDonationAmount.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Last Date of Donation</label>
          <input
            type="date"
            {...register("lastDateToDonate", {
              required: "Last date is required",
              validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Ensure time is ignored in comparison
                return (
                  selectedDate >= today || "Last date cannot be in the past"
                );
              },
            })}
            className="border rounded-md px-3 py-2 w-full"
          />
          {errors.lastDateToDonate && (
            <p className="text-red-500">{errors.lastDateToDonate.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Short Description</label>
          <input
            type="text"
            {...register("shortDescription", {
              required: "Short description is required",
            })}
            placeholder="Enter short description"
            className="border rounded-md px-3 py-2 w-full"
          />
          {errors.shortDescription && (
            <p className="text-red-500">{errors.shortDescription.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Long Description</label>
          <textarea
            {...register("longDescription", {
              required: "Long description is required",
            })}
            placeholder="Enter long description"
            className="border rounded-md px-3 py-2 w-full"
          />
          {errors.longDescription && (
            <p className="text-red-500">{errors.longDescription.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Pet Picture</label>
          <input
            type="file"
            accept="image/*"
            className="border rounded-md px-3 py-2 w-full"
            onChange={handleImageUpload}
            placeholder="Upload Pet Picture"
            required
          />
          {loading && <p className="text-blue-500">Uploading...</p>}
          {imageUrl && (
            <img src={imageUrl} alt="Pet" className="mt-2 max-w-full h-32" />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-all"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create Campaign"}
        </button>
      </form>
    </main>
  );
}

export default CreateCampaignPage;
