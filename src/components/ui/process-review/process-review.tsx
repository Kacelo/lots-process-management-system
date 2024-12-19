import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
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
import { useToast } from "@/hooks/use-toast";
import { firestore } from "../../../../firebase";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  verdict: z.string().refine((value) => value === "true" || value === "false", {
    message: "Invalid status value.",
  }),
});

type ProcessInterface = {
  id?: string;
  name: string;
  description: string;
  verdict?: boolean;

};

const verdictOptions = [
  { value: "true", label: "Approve" },
  { value: "false", label: "Reject" },
];

export function ScrutinyForm({ processId }: { processId: string }) {
  const { toast } = useToast();
  const [process, setProcess] = useState<ProcessInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { verdict: "false" },
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
  }, [processId]);

  const updateProcess = async (id: string, updates: Partial<ProcessInterface>) => {
    try {
      const processRef = doc(firestore, "processes", id);
      await updateDoc(processRef, updates);
      toast({
        title: "Status updated!",
        description: "The process status was updated successfully.",
      });
      router.push("/dashboard/review-processes");
    } catch (error) {
      console.error("Error updating document:", error);
      toast({
        title: "Error updating status",
        description: "There was an error updating the status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    if (!processId) return;

    const isApproved = values.verdict === "true";
    const updateData: Partial<ProcessInterface> = {
      verdict: isApproved,
    //   updatedAt: new Date(),
      ...(isApproved ? { isReadyForScrutiny: true } : {}),
    };

    updateProcess(processId, updateData);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!process) {
    return <p>Process not found.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{process.name}</CardTitle>
        <CardDescription>{process.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="verdict"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {verdictOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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
        <Button variant="outline" onClick={() => router.push("/all-processes")}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
