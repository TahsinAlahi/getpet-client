import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";

export default function PetTable({ data = [], onDelete, onAdopt, onEdit }) {
  const [sorting, setSorting] = useState([]);

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
            alt={info.row.original.petName}
            className="w-16 h-16 rounded-lg border border-gray-300 object-cover shadow-sm"
          />
        ),
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
        accessorKey: "petCategory",
        header: "Category",
        cell: (info) => (
          <p className="text-sm text-gray-600">{info.getValue()}</p>
        ),
      },
      {
        accessorKey: "petAge",
        header: "Age",
        cell: (info) => `${info.row.original.petAge} years`,
      },
      {
        accessorKey: "petLocation",
        header: "Location",
      },
      {
        accessorKey: "shortDescription",
        header: "Description",
      },
      {
        accessorKey: "isAdopted",
        header: "Status",
        cell: (info) => (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              info.getValue()
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {info.getValue() ? "Adopted" : "Available"}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(info.row.original._id.$oid)}
              className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
              title="Edit"
            >
              <IoPencil size={18} />
            </button>
            <button
              onClick={() => onDelete(info.row.original._id.$oid)}
              className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              title="Delete"
            >
              <FaTrash size={18} />
            </button>
            {!info.row.original.isAdopted && (
              <button
                onClick={() => onAdopt(info.row.original._id.$oid)}
                className="p-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
                title="Adopt"
              >
                <FaHeart size={18} />
              </button>
            )}
          </div>
        ),
      },
    ],
    [onEdit, onDelete, onAdopt]
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
                      className="px-4 py-4 w-full font-medium cursor-pointer hover:bg-gray-200 transition"
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
            <tbody className="text-gray-800 divide-y divide-gray-200">
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
