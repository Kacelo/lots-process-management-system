"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ScrutinyForm } from "@/components/ui/process-review/process-review";
import { TaskView } from "@/components/ui/process-review/process-view";

function WithSuspense() {
  const searchParams = useSearchParams();
  const processId = searchParams.get("processId");

  return (
    <div className="flex min-h-svh w-full justify-center p-2 md:p-10">
      <div className="w-full">
        <TaskView focusedProcessId={processId as string} />
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