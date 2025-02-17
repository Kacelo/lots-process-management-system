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
import { Timestamp} from "firebase/firestore";
import { useRootStore } from "@/app/stores/RootStateContext";
import { toast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { usePathname, useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  dueDate: z.date({
    required_error: "A due date is required.",
  }),
});
interface NewProcessProps {
  userId: string;
}
interface ProcessInterface {
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  dueDate: Date;
  status: "not-started" | "in-progress" | "completed";
}

const NewProcess = ({ userId }: NewProcessProps) => {
  const { processStore } = useRootStore();
  const [processId, setProcessId] = React.useState<any>();
  const pathname = usePathname();
  const router = useRouter();

  const defaultProcessDetails: ProcessInterface = {
    name: "",
    description: "",
    createdBy: userId,
    createdAt: "",
    dueDate: new Date(),
    status: "not-started",
  };
  function switchLocale(locale: string) {
    // e.g. '/en/about' or '/fr/contact'
    const newPath = `/${locale}${pathname}`;
    window.history.replaceState(null, "", newPath);
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultProcessDetails.name,
      description: defaultProcessDetails.description,
      dueDate: defaultProcessDetails.dueDate,
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      // Show toast notification
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
  
      // Prepare process details
      const newProcessDetails = {
        ...defaultProcessDetails,
        name: data.name,
        description: data.description,
        dueDate: Timestamp.fromDate(data.dueDate),
      };
  
      // Call async function to create a new process
      const newProcess = await processStore.newProcess(newProcessDetails);
  
      if (newProcess) {
        setProcessId(newProcess);
        console.log("New process created:", newProcess);
      } else {
        console.error("Failed to create a new process.");
      }
    } catch (error) {
      console.error("Error while submitting form:", error);
      toast({
        title: "Error",
        description: "There was an issue creating the process.",
        // status: "error",
      });
    }
  }
  const handleTaskAdd = (processId: any) => {
    if (processId) {
      router.push(`/dashboard/new-tasks?processId=${processId}`);
    }
  };
  return (
    <Card className="lg:w-[600px] md:w-[400px] xl:w-[800px]">
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
                    <Textarea
                      placeholder="What will this process be used for?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Assignee Email Field */}

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: any) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="space-x-2">
              {!processId && <Button type="submit">Submit</Button>}
              {processId && (
                <Button onClick={()=>handleTaskAdd(processId)}>Next</Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewProcess;
