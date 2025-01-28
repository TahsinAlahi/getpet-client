import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function UsersTable({ data = [], refetch }) {
  const [sorting, setSorting] = useState([]);
  const axiosSecure = useAxiosSecure();

  async function onMakeAdmin(newAdminData) {
    try {
      await axiosSecure.post(`/admins/create-admin/${newAdminData?._id}`, {
        email: newAdminData?.email,
        username: newAdminData?.name,
      });
      toast.success("User promoted to admin successfully");
      refetch();
    } catch (error) {
      console.error(error?.message);
      toast.error("Failed to promote user. Please try again later.");
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
        accessorKey: "profilePicture",
        header: "Profile Picture",
        cell: (info) => (
          <div className="flex justify-center items-center">
            <img
              src={info?.getValue()}
              alt="PFP"
              className="w-12 h-12 rounded-full object-cover border flex items-center justify-center"
            />
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => (
          <p className="font-semibold text-gray-800 text-center">
            {info?.getValue()}
          </p>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => (
          <p className="text-gray-600 text-center">{info?.getValue()}</p>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <>
            {info.row.original.isAdmin ? (
              <button className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition">
                Admin
              </button>
            ) : (
              <button
                onClick={() => onMakeAdmin(info.row.original)}
                className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                title="Make Admin"
              >
                Make Admin
              </button>
            )}
          </>
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
  });

  return (
    <div className="w-full mx-auto flex-1">
      <div className="overflow-x-auto w-full max-w-screen-lg mx-auto">
        <div className="rounded-lg border border-gray-300 shadow-lg">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-700 w-full">
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
    </div>
  );
}
