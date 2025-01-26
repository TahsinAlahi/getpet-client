import { MdCancel } from "react-icons/md";
import ReactModal from "react-modal";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

function DonatorsModal({ isModalOpen, setIsModalOpen, campaignData }) {
  const axiosSecure = useAxiosSecure();

  const { data: donators, isLoading } = useQuery({
    queryKey: ["donators", campaignData?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donations/donators/${campaignData?._id}`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      contentLabel="Donate Modal"
      className="bg-white rounded-lg shadow-lg max-w-md mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="flex justify-center items-center flex-col relative p-8">
        <div className="">
          <h2 className="text-2xl font-bold mb-4">
            People who helped{" "}
            <span className="title capitalize">{campaignData?.petName}</span>
          </h2>
          <ul className="list-outside list-decimal">
            {donators?.map((donator, index) => (
              <li
                key={donator?._id}
                className="flex items-center justify-between mb-1"
              >
                {index + 1}. {donator?.donatorName} - ${donator?.donationAmount}
              </li>
            ))}
          </ul>
        </div>
        <MdCancel
          className="text-red-500 underline absolute top-2 right-2 z-10 text-4xl cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        />
      </div>
    </ReactModal>
  );
}

export default DonatorsModal;
