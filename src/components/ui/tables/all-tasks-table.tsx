
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useRootStore } from "@/app/stores/RootStateContext";
import { SkeletonComp } from "../skeleton/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./data-table/data-table";
import { processColumns } from "./data-table/columns";

export const AllProcessTable = observer(() => {

  const { processStore } = useRootStore();
  const { isLoading } = processStore;
  useEffect(() => {
    processStore.fetchProcesses();
  }, [processStore]);

  if (isLoading) {
    return (
      <div>
        <SkeletonComp />
      </div>
    );
  } else {
    return (
      <div className="rounded-md border p-5">
        <div className="m-[15px]">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
            All Processes
          </h1>
        </div>
        <div className="m-[15px]">
          <Button asChild>
            <Link href="/dashboard/new-process">Add New Process</Link>
          </Button>
        </div>
        <div className="container mx-auto">
          <DataTable columns={processColumns} data={processStore.processes} />
        </div>
      </div>
    );
  }
});
