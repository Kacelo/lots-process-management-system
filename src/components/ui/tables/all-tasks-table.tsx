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
import { MoreVertical, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { useRootStore } from "@/app/stores/RootStateContext";
import { useRouter } from "next/navigation";
import { SkeletonComp } from "../skeleton/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./data-table/data-table";
import { processColumns } from "./data-table/columns";

export const AllProcessTable = observer(() => {
  const router = useRouter();

  const { processStore, userStore } = useRootStore();
  const { isLoading } = processStore;
  useEffect(() => {
    processStore.fetchProcesses();
  }, [processStore]);
  const handleEditClick = (processId: string) => {
    // Navigate to the /dashboard/update-tasks route with process.id as a query param
    router.push(`/dashboard/update-task?processId=${processId}`);
  };
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
