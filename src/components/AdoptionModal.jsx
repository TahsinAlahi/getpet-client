import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import { useAuth } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

ReactModal.setAppElement("#root");

function AdoptionModal({ petData, isModalOpen, setIsModalOpen }) {
  const { user } = useAuth();
  const AxiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    console.log("Form submitted:", data);
    const requestData = {
      petId: petData?._id,
      userName: user?.displayName,
      userEmail: user?.email,
      userPhone: data.phoneNumber,
      userAddress: data.address,
    };

    try {
      await AxiosSecure.post("/requests/create-request", requestData);
      setIsModalOpen(false);
      navigate("/pet-listing");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      contentLabel="Adopt Pet Modal"
      className="bg-white rounded-lg shadow-lg max-w-md mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="flex justify-center items-center flex-col relative p-8">
        <h2 className="text-2xl font-bold mb-4">Adopt {petData?.petName}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            value={petData?.petName}
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
            type="tel"
            placeholder="Your Phone Number"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            className="border p-2 w-full mb-2 rounded-md"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mb-4">
              {errors.phoneNumber.message}
            </p>
          )}
          <input
            type="text"
            placeholder="Your Address"
            {...register("address", { required: "Address is required" })}
            className="border p-2 w-full mb-2 rounded-md"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mb-4">
              {errors.address.message}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-800 text-white p-2 rounded-md hover:bg-blue-900"
          >
            Submit Adoption Request
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

export default AdoptionModal;
