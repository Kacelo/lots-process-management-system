"use client";

import { ProcessType } from "@/app/models/processes";
import { ColumnDef } from "@tanstack/react-table";
import { TableActions, UserTableActions } from "./table-actions";
import { User } from "@/app/models/users";

export const processColumns: ColumnDef<ProcessType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
  },
  // {
  //   accessorKey: "assignee",
  //   header: "Created By",
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const process = row.original;
      const { id } = process;
      //   const router = useRouter();
      if (!process.id) {
        console.error("Missing process ID", process);
        return null;
      }
      return <TableActions processId={id} />;
    },
  },
];

export const userTableColumns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  // {
  //   accessorKey: "assignee",
  //   header: "Created By",
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const { uid } = user;
      //   const router = useRouter();
      if (!uid) {
        console.error("Missing process ID", user);
        return null;
      }
      return <UserTableActions userId={uid} />;
    },
  },
];
