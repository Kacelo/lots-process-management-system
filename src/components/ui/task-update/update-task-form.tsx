import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
// import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
// import { firestore } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { firestore } from "../../../../firebase";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  status: z.string().nonempty({ message: "Please select a status." }),
});

type StatusUpdateType = {
  status: string;
  updatedAt: Date;
};

type ProcessInterface = {
  id?: string;
  name: string;
  description: string;
  status: string;
};

const statuses = [
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "on-hold", label: "On Hold" },
];

export function StatusUpdateForm({ processId }: { processId: string }) {
  const { toast } = useToast();
  const [process, setProcess] = useState<ProcessInterface | null>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { status: "" },
  });

  // Fetch process data
  useEffect(() => {
    if (!processId) return;

    const processRef = doc(firestore, "processes", processId);

    const unsubscribe = onSnapshot(processRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as ProcessInterface;
        setProcess({ ...data, id: docSnap.id });
      } else {
        console.error("Document not found!");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [processId, form]);

  // Update process status
  const updateProcess = async (id: string, updates: StatusUpdateType) => {
    console.log("submited updates:", updates);
    try {
      const processRef = doc(firestore, "processes", id);
      await updateDoc(processRef, updates);
      toast({
        title: "Status updated!",
        description: `The status has been updated successfully to "${updates.status}".`,
      });
      redirect("/all-processes");
    } catch (error) {
      console.error("Error updating document:", error);
      toast({
        title: "Error updating status",
        description:
          "There was an error updating the status. Please try again.",
        variant: "destructive",
      });
    }
  };

  // const onSubmit = (data: z.infer<typeof FormSchema>) => {
  //   if (!processId) return;
  //   console.log("data from from:", data);
  //   const updateData = {
  //     status: data.status,
  //     updatedAt: new Date(),
  //   };
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    if (!processId) return;
    console.log("data from from:", values);
    if (values.status === "completed") {
      const updateData = {
        status: values.status,
        updatedAt: new Date(),
        isReadyForScrutiny: true,
      };
      updateProcess(processId, updateData);
    } else {
      const updateData = {
        status: values.status,
        updatedAt: new Date(),
      };
      updateProcess(processId, updateData);
    }
  }

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{process?.name}</CardTitle>
        <CardDescription>{process?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Update the status of the process.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update Status</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
      </CardFooter>
    </Card>
  );
}
