"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProcessTask from "@/components/ui/process/form/new-process/process-tasks";
function WithSuspense() {
  const searchParams = useSearchParams();
  const processId = searchParams.get("processId");

  return (
    <div className="flex min-h-svh w-full justify-center p-2 md:p-10">
      <div className="w-full">
        <ProcessTask processId={processId as string} />
      </div>
    </div>
  );
}

function Page() {
  return (
    <div style={{ alignContent: "center" }}>
      <Suspense fallback={<div>Loading...</div>}>
        <WithSuspense />
      </Suspense>
    </div>
  );
}

export default Page;
