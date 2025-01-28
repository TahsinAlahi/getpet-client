import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";

export default function DonationsTable({ data = [], refetch }) {
  const [sorting, setSorting] = useState([]);
  const axiosSecure = useAxiosSecure();

  async function onRefund(id) {
    try {
      await axiosSecure.delete(`/donations/refund/${id}`);
      toast.success("Donation refunded successfully");
      refetch();
    } catch (error) {
      console.log(error?.message);
      toast.error("Failed to refund, please try again later.");
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
        accessorKey: "campaignDetails.petImage",
        header: "Pet Image",
        cell: (info) => (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={info?.getValue()}
              alt={info?.row?.original?.campaignDetails?.petName}
              className="w-16 h-16 rounded-md object-cover object-center flex items-center justify-center"
            />
          </div>
        ),
      },
      {
        accessorKey: "campaignDetails.petName",
        header: "Pet Name",
        cell: (info) => (
          <p className="font-semibold text-gray-800">{info?.getValue()}</p>
        ),
      },
      {
        accessorKey: "donationAmount",
        header: "Donated Amount",
        cell: (info) => `$${info?.getValue()?.toFixed(2)}`,
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <button
            onClick={() => onRefund(info.row.original._id)}
            className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
            title="Ask for Refund"
          >
            <FaTrash size={18} />
          </button>
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
    </div>
  );
}
