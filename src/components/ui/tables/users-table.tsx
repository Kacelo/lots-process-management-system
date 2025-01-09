"use client";
import { useRootStore } from "@/app/stores/RootStateContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { SkeletonComp } from "../skeleton/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const UsersTable = observer(() => {
  const { userStore } = useRootStore();

  useEffect(() => {
    userStore.fetchUsers();
  }, [userStore]);

  if (userStore.isLoading) {
    return (
      <div>
        <SkeletonComp />
      </div>
    );
  }
  return (
    <div>
      <Button asChild>
        <Link href="/dashboard/new-user">Add New User</Link>
      </Button>{" "}
      <Table>
        <TableCaption>A list of registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[350px]">Email</TableHead>
            <TableHead className="w-[350px]">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userStore.users?.map((user, index) => (
            <TableRow key={user.uid || `user-${index}`}>
              <TableCell>{user.email || "N/A"}</TableCell>
              <TableCell>{user.role || "User"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-right">
              Total Users: {userStore.users?.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
});
