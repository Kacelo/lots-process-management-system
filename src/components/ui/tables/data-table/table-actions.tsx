"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
interface ActionProps {
  processId: string;
}
interface UserActionProps {
  userId: string;
}
export const TableActions = ({ processId }: ActionProps) => {
  //   const { processId } = props;
  const router = useRouter();
  const handleEditClick = (processId: string) => {
    console.log("clicked", processId);
    router.push(`/dashboard/update-task?processId=${processId}`);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => handleEditClick(processId)}
          className="cursor: pointer"
        >
          Update Task
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleEditClick(processId)}
          className="cursor: pointer"
        >
          Delete Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const UserTableActions = ({ userId }: UserActionProps) => {
    const router = useRouter();
  const handleEditClick = (userId: string) => {
    console.log("clicked", userId);
    router.push(`/dashboard/update-task?processId=${userId}`);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => handleEditClick(userId)}
          className="cursor: pointer"
        >
          Update User
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleEditClick(userId)}
          className="cursor: pointer"
        >
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
