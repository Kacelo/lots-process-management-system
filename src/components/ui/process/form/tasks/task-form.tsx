"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useRootStore } from "@/app/stores/RootStateContext";
import { cn } from "@/lib/utils";
import { CalendarIcon, Check, ChevronsUpDown, User2Icon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { ProcessType } from "@/app/models/processes";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  taskname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
const taskFormSchema = z.object({
  assigneeId: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  dueDate: z.date(),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

interface TaskSchema {
  taskname: string;
  description: string;
  processId: string;
  status: string;
  assigneeId: string;
  createdBy: string;
  dueDate: string;
  completedAt: string;
  isArchived: string;
  taskIndex: number;
}
interface TaskFormSchema {
  focusedProcess: ProcessType | undefined;
}
interface TaskUpdateSchema {
  focusedTask: string;
}
export function TaskForm({ focusedProcess }: TaskFormSchema) {
  const [focusedTask, setFocusedTask] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskname: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setFocusedTask(values.taskname);
    // set taskname, createdBy, taskIndex, processId
  }

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {focusedProcess ? (
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {focusedProcess.name}
          </h1>
        ) : (
          <p>No process found for the given ID.</p>
        )}
        <div className="flex gap-4 md:grid-cols-2">
          <div className="aspect-video rounded-xl bg-muted/50 w-1/4">
            <div className="p-[25px]">
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Task List
              </h2>
              <Separator />

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="taskname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Task</FormLabel>
                        <FormControl>
                          <Input placeholder="Type task name here" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                  <Button>Add new task</Button>
                </form>
              </Form>
            </div>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 w-3/4">
            <TaskEditForm focusedTask={focusedTask} />
          </div>
        </div>
      </div>
    </div>
  );
}

const TaskEditForm = ({ focusedTask }: TaskUpdateSchema) => {
  const { userStore } = useRootStore();

  useEffect(() => {
    userStore.fetchUsers();
  }, [userStore]);

  const { users } = userStore;
  const userOptions =
    users?.map((user) => ({
      label: user.email,
      value: user.uid,
    })) ?? [];
  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      taskname: "",
      assigneeId: "",
      dueDate: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof taskFormSchema>) {
    console.log("submitted values:", values);
    // set assigneeId, dueDate, description,status
  }

  return (
    <div className="p-[25px]">
      <div>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {focusedTask}
        </h2>
        <Separator />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="assigneeId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Assignee</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? userOptions.find(
                                (user) => user.value === field.value
                              )?.label
                            : "Select user email"}
                          <User2Icon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search email..." />
                        <CommandList>
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {userOptions.map((user) => (
                              <CommandItem
                                value={user.label}
                                key={user.value}
                                onSelect={() => {
                                  form.setValue("assigneeId", user.value);
                                }}
                              >
                                {user.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    user.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe task" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Save Task</Button>
        </form>
      </Form>
    </div>
  );
};

const SavedTaskView = ({savedTask}: TaskSchema) =>{
  
}
