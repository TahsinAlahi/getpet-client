import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { FaPause, FaPlay, FaPencilAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import DonatorsModal from "./DonatorsModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function CampaignTable({ data = [], refetch }) {
  const [sorting, setSorting] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  async function handlePause(id, isPaused) {
    try {
      await axiosSecure.patch(`/campaigns/${id}`, { isPaused: !isPaused });
      toast.success(
        `Campaign ${isPaused ? "unpaused" : "paused"} successfully`
      );
      refetch();
    } catch (error) {
      console.error(error?.message);
      toast.error("Failed to pause campaign. Please try again later.");
    }
  }

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "index",
        cell: (info) => info.row.index + 1,
      },
      {
        accessorKey: "petName",
        header: "Name",
        cell: (info) => (
          <p className="font-semibold text-gray-800">
            {info.row.original.petName}
          </p>
        ),
      },
      {
        accessorKey: "maxDonationAmount",
        header: "Max Amount",
        cell: (info) => `$${info.getValue().toFixed(2)}`,
      },
      {
        accessorKey: "donationAmount",
        header: "Donation Progress",
        cell: (info) => {
          const progress =
            (info.row.original.donatedAmount /
              info.row.original.maxDonationAmount) *
            100;
          return (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{ width: `${progress}%`, backgroundColor: "#4caf50" }}
              ></div>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              info.getValue() === "paused"
                ? "bg-red-200 text-red-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {info.getValue() === "paused" ? "Paused" : "Active"}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <div className="flex gap-2 items-center justify-center">
            <button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedCampaign(info.row.original);
              }}
              className="p-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
              title="Donators"
            >
              <FaEye size={18} />
            </button>
            <button
              onClick={() =>
                navigate(`/dashboard/edit-campaign/${info.row.original._id}`)
              }
              className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
              title="Edit"
            >
              <FaPencilAlt size={18} />
            </button>
            <button
              onClick={() =>
                handlePause(info.row.original._id, info.row.original.isPaused)
              }
              className={`p-2 rounded-md ${
                info.row.original.isPaused ? "bg-green-500" : "bg-red-500"
              } text-white hover:bg-opacity-80 transition`}
              title={info.row.original.isPaused ? "Unpause" : "Pause"}
            >
              {info.row.original.isPaused ? (
                <FaPlay size={18} />
              ) : (
                <FaPause size={18} />
              )}
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full mx-auto flex-1">
      <div className="overflow-x-auto w-full max-w-screen-lg mx-auto">
        <div className="rounded-lg border border-gray-300 shadow-lg overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="text-left text-sm uppercase"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="px-4 py-4 font-medium cursor-pointer hover:bg-gray-200 transition"
                    >
                      <div className="flex items-center justify-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc"
                          ? "↑"
                          : header.column.getIsSorted() === "desc"
                          ? "↓"
                          : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="text-gray-800 divide-y divide-gray-200 text-center">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <span className="mt-3 sm:mt-0 text-sm text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
      </div>
      <DonatorsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        campaignData={selectedCampaign}
      />
    </div>
  );
}
