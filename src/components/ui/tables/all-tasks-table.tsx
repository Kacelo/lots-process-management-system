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

export const AllProcessTable = observer(() => {
  const router = useRouter();

  const { processStore, userStore } = useRootStore();
  const { isLoading } = processStore;
  useEffect(() => {
    processStore.fetchProcesses()
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
      <div className="rounded-md border">
        <Button asChild>
          <Link href="/dashboard/new-process">Add New Process</Link>
        </Button>
        <Table>
          <TableCaption>A list of processes.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead className="w-[150px]">Assignee</TableHead>
              <TableHead className="w-[150px]">Description</TableHead>
              <TableHead className="w-[150px]">Status</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processStore.processes?.map((process, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {process.name || "N/A"}
                </TableCell>
                <TableCell>{process.assignee || "N/A"}</TableCell>
                <TableCell>{process.description || "User"}</TableCell>
                <TableCell>{process.status || "N/A"}</TableCell>

                <TableCell>
                  {" "}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreVertical className="text-sidebar-foreground/70" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 rounded-lg">
                      <DropdownMenuItem
                        onClick={() => handleEditClick(process.id)}
                      >
                        <Edit className="text-muted-foreground" />
                        <span>Update task</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-right">
                Total Processes: {processStore.processes?.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
});
