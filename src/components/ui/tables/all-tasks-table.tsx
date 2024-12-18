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
import { collection, getDocs } from "firebase/firestore";
import { observer } from "mobx-react-lite";
import { Trash2, MoreVertical, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { firestore } from "../../../../firebase";
import { useRootStore } from "@/app/stores/RootStateContext";
import { useRouter } from "next/navigation";
import { SkeletonComp } from "../skeleton/skeleton";

// import { query } from "firebase/database";

interface ProcessProps {
  assignee: string;

  createdAt: string;

  createdBy: string;

  description: string;

  name: string;

  status: string;
  id: string;
}
export const AllProcessTable = observer(() => {
  const router = useRouter();

  const [processes, setProcesses] = useState<ProcessProps[]>([]);
  const { authStore, processStore } = useRootStore();
  const { user } = authStore;
  const { isLoading } = processStore;
  //   const { authStore } = useRootStore();
  useEffect(() => {
    if (user?.email) {
      fetchData();
    }
  }, [user?.email]);

  const fetchData = async () => {
    try {
      if (!user?.email) {
        console.error("No user email found.");
        return;
      }

      const processCollection = collection(firestore, "processes");
      // Fetch matching documents
      const querySnapshot = await getDocs(processCollection);

      // Map Firestore documents to an array of process data
      const processList: ProcessProps[] = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Document ID as a unique key
        ...(doc.data() as Omit<ProcessProps, "id">), // Assert the Firestore data type
      }));

      console.log("Filtered processes", processList);
      setProcesses(processList);
    } catch (error) {
      console.error("Error fetching processes:", error);
    }
  };
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
  } else{
    return (
      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of processes.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead className="w-[150px]">Assignee</TableHead>
              <TableHead className="w-[150px]">Description</TableHead>
              <TableHead className="w-[150px]">Status</TableHead>
  
              {/* <TableHead>Description</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {processes?.map((process, index) => (
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
                      {/* <SidebarMenuAction showOnHover> */}
                      <MoreVertical className="text-sidebar-foreground/70" />
                      {/* </SidebarMenuAction> */}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 rounded-lg">
                      <DropdownMenuItem
                        onClick={() => handleEditClick(process.id)}
                      >
                        <Edit className="text-muted-foreground" />
                        <span>Update task</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Project</span>
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
                Total Processes: {processes?.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }

 
});
