"use client";
import React from "react";
import { useRootStore } from "@/app/stores/RootStateContext";
import { observer } from "mobx-react-lite";
import { AssignedProcessTable } from "@/components/ui/tables/assigned-tasks-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SkeletonCard } from "@/components/ui/skeleton/skeleton";
const page = observer(() => {
  const { authStore } = useRootStore();
  const { isLoading } = authStore;
  if (isLoading) {
    return <SkeletonCard />;
  }else{
    return (
        <div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <AssignedProcessTable />
            </CardContent>
          </Card>
        </div>
      );
  }

});

export default page;
