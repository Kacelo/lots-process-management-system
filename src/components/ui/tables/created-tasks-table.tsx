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
import {
  MoreVertical
} from "lucide-react";
import { useEffect, useState } from "react";
import { firestore } from "../../../../firebase";

interface ProcessProps {
  assignee: string;

  createdAt: string;

  createdBy: string;

  description: string;

  name: string;

  status: string;
}
export const ProcessTable = observer(() => {
  const [processes, setProcesses] = useState<ProcessProps[]>([]);

  //   const { authStore } = useRootStore();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const processCollection = collection(firestore, "processes"); // Path to the "users" collection
      const querySnapshot = await getDocs(processCollection);

      // Map Firestore documents to an array of user data
      const processList:ProcessProps[] = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Document ID as a unique key
        ...(doc.data() as Omit<ProcessProps, "id">), // Assert the Firestore data type
      }));
      setProcesses(processList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  return (
    <Table>
      <TableCaption>A list of processes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead>Description</TableHead>
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
            <TableCell>
              {" "}
              <MoreVertical className="text-sidebar-foreground/70" />
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
  );
});
