"use client";
import { useRootStore } from "@/app/stores/RootStateContext";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { SkeletonComp } from "../skeleton/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./data-table/data-table";
import { userTableColumns } from "./data-table/columns";

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
      <div className="rounded-md border p-5">
        <div className="m-[15px]">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
          Registered Users
          </h1>
        </div>
        <div className="m-[15px]">
          <Button asChild>
            <Link href="/dashboard/new-process">Add New User</Link>
          </Button>
        </div>
        <div className="container mx-auto">
          <DataTable columns={userTableColumns} data={userStore.users} />
        </div>
      </div>
    </div>
  );
});
