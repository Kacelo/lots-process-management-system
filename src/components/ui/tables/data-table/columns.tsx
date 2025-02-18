"use client";

import { ProcessType } from "@/app/models/processes";
import { ColumnDef } from "@tanstack/react-table";
import { TableActions, UserTableActions } from "./table-actions";
import { User } from "@/app/models/users";
import { Button } from "../../button";
import { ArrowUpDown } from "lucide-react";
import { ProcessInterface } from "@/app/interfaces/interfaces";

export const processColumns: ColumnDef<ProcessInterface>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    accessorKey: "dueDate",
    header: ({ column }) => {
      console.log(column);
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          dueDate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
      return <TableActions processId={id as string} />;
    },
  },
];

export const userTableColumns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
