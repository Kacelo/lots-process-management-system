"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { StatusUpdateForm } from "@/components/ui/task-update/update-task-form";

function Page() {
  const searchParams = useSearchParams();
  const processId = searchParams.get("processId");
  return (
    <div className="flex min-h-svh w-full justify-center p-2 md:p-10">
      <div className="w-full">
        <StatusUpdateForm processId={processId as string} />
      </div>
    </div>
  );
}
export default Page;
