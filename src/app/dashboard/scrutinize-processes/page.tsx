"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ScrutinyForm } from "@/components/ui/process-review/process-review";

function WithSuspense() {
  const searchParams = useSearchParams();
  const processId = searchParams.get("processId");

  return (
    <div className="flex min-h-svh w-full justify-center p-2 md:p-10">
      <div className="w-full">
        <ScrutinyForm processId={processId as string} />
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
