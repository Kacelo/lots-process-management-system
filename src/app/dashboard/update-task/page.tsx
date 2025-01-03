"use client"
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { StatusUpdateForm } from "@/components/ui/task-update/update-task-form";

function WithSuspense() {
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

function Page() {
  return (
    <div className="flex min-h-svh w-full justify-center p-2 md:p-10">
      <div className="w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <WithSuspense />
        </Suspense>
      </div>
    </div>
  );
}


export default Page;
