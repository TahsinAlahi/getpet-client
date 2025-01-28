import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function RequestTable({ data = [], refetch }) {
  const [sorting, setSorting] = useState([]);
  const axiosSecure = useAxiosSecure();

  async function handleDecision(id, decision) {
    try {
      await axiosSecure.patch(`/requests/delete-request/${id}`, {
        isAccepted: decision,
      });
      toast.success("Request deleted successfully");
      refetch();
    } catch (error) {
      console.error(error?.message);
      toast.error(
        "Failed to update the request status. Please try again later."
      );
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
        accessorKey: "petImage",
        header: "Image",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="Image"
            className="w-16 h-16 rounded-lg border border-gray-300 object-cover shadow-sm flex items-center justify-center overflow-hidden flex-wrap"
          />
        ),
      },
      {
        accessorKey: "userName",
        header: "Name",
        cell: (info) => (
          <p className="font-semibold text-gray-800">{info.getValue()}</p>
        ),
      },
      {
        accessorKey: "userEmail",
        header: "Email",
        cell: (info) => <p className="text-gray-600">{info.getValue()}</p>,
      },
      {
        accessorKey: "userPhone",
        header: "Phone",
        cell: (info) => <p className="text-gray-600">{info.getValue()}</p>,
      },
      {
        accessorKey: "userAddress",
        header: "Location",
        cell: (info) => <p className="text-gray-600">{info.getValue()}</p>,
      },
      {
        accessorKey: "isAccepted",
        header: "Status",
        cell: (info) => (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              info?.getValue()
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {info?.getValue() ? "Accepted" : "Rejected"}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <div className="flex gap-2 items-center justify-center">
            <button
              onClick={() => handleDecision(info.row.original._id, true)}
              className="p-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
              title="Accept"
            >
              Accept
            </button>
            <button
              onClick={() => handleDecision(info.row.original._id, false)}
              className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              title="Reject"
            >
              Reject
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
