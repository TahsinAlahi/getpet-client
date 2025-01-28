import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const IMAGE_BB_API_KEY = import.meta.env.VITE_IMAGE_BB_API_KEY;

function EditCampaignPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchCampaignData() {
      try {
        const response = await axiosSecure.get(`/campaigns/${id}`);
        const campaign = response.data?.campaign;
        setValue("petName", campaign.petName);
        setValue("maxDonationAmount", campaign.maxDonationAmount);
        const formattedDate = campaign.lastDateToDonate.split("T")[0];
        setValue("lastDateToDonate", formattedDate);
        setValue("shortDescription", campaign.shortDescription);
        setValue("longDescription", campaign.longDescription);
        setImageUrl(campaign.petImage);
      } catch (error) {
        console.error(error?.message);
      }
    }
    fetchCampaignData();
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
      console.error(error);
      toast.error("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(data) {
    const updatedCampaignData = {
      ...data,
      lastDateToDonate: new Date(data.lastDateToDonate).toISOString(),
      petImage: imageUrl,
      maxDonationAmount: Number(data.maxDonationAmount),
    };

    try {
      await axiosSecure.patch(`/campaigns/${id}`, updatedCampaignData);
      toast.success("Campaign updated successfully");
      navigate("/dashboard/my-donation-campaigns");
    } catch (error) {
      toast.error("Failed to update campaign, please try again later.");
      console.error(error.message);
    }
  }

  return (
    <main className="min-h-screen w-full max-w-screen-md mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-6">
        Edit Donation Campaign
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            {...register("petName", {
              required: "Pet name is required",
            })}
            className="border rounded-md px-3 py-2 w-full"
          />
          {errors.petName && (
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
          {loading ? "Submitting..." : "Update Campaign"}
        </button>
      </form>
    </main>
  );
}

export default EditCampaignPage;
