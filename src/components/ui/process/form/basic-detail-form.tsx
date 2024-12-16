/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { setDoc, doc, addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../../../firebase"; // Adjust path as needed
import { useRootStore } from "@/app/stores/RootStateContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select";

// Validation schema
const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  assignee: z.string().min(2).max(50),
});

interface ProcessInterface {
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  status: "not-started" | "in-progress" | "completed";
  assignee: string;
}

interface BasicDetailProps {
  userId: string;
  updateView: (view: string) => void;
  setFocusedProcessId: React.Dispatch<React.SetStateAction<string>>;
}
interface usersProps {
  name?: string;
  email: string;
  uid: string;
  role?: string;
}
const BasicDetailForm = ({
  userId,
}: BasicDetailProps) => {
  const [users, setUsers] = useState<usersProps[]>([]);

  //   const { authStore } = useRootStore();
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const usersCollection = collection(firestore, "users"); // Path to the "users" collection
      const querySnapshot = await getDocs(usersCollection);

      // Map Firestore documents to an array of user data
      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Document ID as a unique key
        ...doc.data(), // Spread other user fields
      }));
      console.log("users", usersList);
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  console.log("User: ", users);
  const defaultProcessDetails: ProcessInterface = {
    name: "",
    description: "",
    createdBy: userId,
    createdAt: new Date().toISOString(),
    status: "not-started",
    assignee: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultProcessDetails.name,
      description: defaultProcessDetails.description,
      assignee: defaultProcessDetails.assignee,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newProcessDetails = {
      ...defaultProcessDetails,
      name: values.name,
      description: values.description,
      assignee: values.assignee,
    };

    try {
      const docRef = await addDoc(
        collection(firestore, "processes"),
        newProcessDetails
      );
      console.log("Process added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding process:", error);
    }
  }

  return (
    <Card className="w-[550px]">
      <CardHeader>
        <CardTitle>Create a new process</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Process Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Process Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter process name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Assignee Email Field */}
            <FormField
              control={form.control}
              name="assignee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users
                        .filter((user) => user.email) // Ensure valid emails
                        .map((user) => (
                          <SelectItem key={user.id} value={user.email}>
                            {user.email}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BasicDetailForm;
