"use client";
import { useRootStore } from "@/app/stores/RootStateContext";
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

import { useEffect, useState } from "react";
import { firestore } from "../../../../firebase";
import { SkeletonComp } from "../skeleton/skeleton";

interface usersProps {
  name?: string;
  email: string;
  uid: string;
  role?: string;
}
export const UsersTable = observer(() => {
  const [users, setUsers] = useState<usersProps[]>([]);

    const { authStore } = useRootStore();

    const {isLoading} = authStore;
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const usersCollection = collection(firestore, "users"); // Path to the "users" collection
      const querySnapshot = await getDocs(usersCollection);

      // Map Firestore documents to an array of user data
      const usersList:usersProps[] = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Document ID as a unique key
        ...(doc.data() as Omit<usersProps, "id">), // Assert the Firestore data type
      }));
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
    if (isLoading) {
      return (
        <div>
          <SkeletonComp />
        </div>
      );
    }
  return (
    <div>
      <Table>
        <TableCaption>A list of registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-[100px]">Name</TableHead> */}
            <TableHead className="w-[350px]">Email</TableHead>
            <TableHead className="w-[350px]">Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.uid}>
              {/* <TableCell className="font-medium">{user.name || "N/A"}</TableCell> */}
              <TableCell>{user.email || "N/A"}</TableCell>
              <TableCell>{user.role || "User"}</TableCell>
              {/* <TableCell>{user.status || "Active"}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-right">
              Total Users: {users?.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
});
