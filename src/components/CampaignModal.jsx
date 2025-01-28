import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import { useAuth } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

ReactModal.setAppElement("#root");

function CampaignModal({ campaignData, isModalOpen, setIsModalOpen }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    try {
      const { clientSecret } = await axiosSecure
        .post("/donations/create-payment-intent", {
          amount: Number(data?.donationAmount),
        })
        .then((res) => res.data);

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        });

      if (confirmError) throw new Error(confirmError.message);

      const donationData = {
        donatorName: user?.displayName || "anonymous",
        donatorEmail: user?.email || "anonymous",
        donationAmount: Number(data?.donationAmount),
        campaignId: campaignData?._id,
        transitionId: paymentIntent.id,
      };

      if (paymentIntent?.status === "succeeded") {
        await axiosSecure.post("/donations/create-donation", donationData);
      }

      setIsModalOpen(false);
      navigate("/donation-campaigns");
    } catch (error) {
      console.error(error?.message);
    }
  }

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      contentLabel="Donate Modal"
      className="bg-white rounded-lg shadow-lg max-w-md mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="flex justify-center items-center flex-col relative p-8">
        <h2 className="text-2xl font-bold mb-4">
          Donate to {campaignData?.campaignName}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            value={user?.displayName}
            disabled
            className="border p-2 w-full mb-4 rounded-md bg-gray-200"
          />
          <input
            type="email"
            value={user.email}
            disabled
            className="border p-2 w-full mb-4 rounded-md bg-gray-200"
          />
          <input
            type="number"
            placeholder="Donation Amount"
            {...register("donationAmount", {
              required: "Donation amount is required",
              min: { value: 1, message: "Donation must be at least $1" },
            })}
            className="border p-2 w-full mb-2 rounded-md"
          />
          {errors.donationAmount && (
            <p className="text-red-500 text-sm mb-4">
              {errors.donationAmount.message}
            </p>
          )}
          <div className="border p-2 w-full mb-4 rounded-md">
            <CardElement />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white p-2 rounded-md hover:bg-blue-900"
          >
            Submit Donation
          </button>
        </form>

        <MdCancel
          className="text-red-500 underline absolute top-2 right-2 z-10 text-4xl cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        />
      </div>
    </ReactModal>
  );
}

export default CampaignModal;
