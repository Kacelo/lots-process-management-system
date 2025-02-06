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
import { Timestamp } from "firebase/firestore";
import { ProcessInterface, TaskSchema } from "@/app/interfaces/interfaces";
import { ProcessTaskList } from "./task-list";
import { useToast } from "@/hooks/use-toast";
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

interface TaskFormSchema {
  focusedProcess: ProcessInterface | undefined;
}
interface TaskUpdateSchema {
  focusedTask: string;
  focusedProcess: ProcessInterface;
}

export const TaskForm = observer(({ focusedProcess }: TaskFormSchema) => {
  const [focusedTask, setFocusedTask] = useState("");
  const { taskStore } = useRootStore();

  const { processTasks } = taskStore;

  useEffect(() => {
    // if (focusedProcess?.id) {
    initializeTasks();
    // }
  }, [focusedProcess]); // No need to include `taskStore`, since it’s already reactive

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskname: "",
    },
  });
  const initializeTasks = () => {
    taskStore.getProcessTasks(focusedProcess?.id as string);
  };
  console.log("Tasks have been updated:", processTasks);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setFocusedTask(values.taskname);
    // Handle form submission
  }

  return (
    <div>
      <div className="flex flex-col gap-4 p-4">
        {focusedProcess ? (
          <h1 className="text-4xl font-extrabold tracking-tight">
            {focusedProcess.name}
          </h1>
        ) : (
          <p>No process found for the given ID.</p>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Column */}
          <div className="w-full md:w-1/3 bg-muted/50 rounded-xl p-4">
            {/* Task List */}
            {taskStore.processTasks.length > 0 ? (
              <ProcessTaskList processTasks={taskStore.processTasks} />
            ) : (
              <p>No tasks available.</p>
            )}
            <Separator />

            {/* Task Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="taskname"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Type task name here" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button type="submit">Save</Button>
                  <Button>Add new task</Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-2/3 bg-muted/50 rounded-xl p-4">
            {focusedTask && (
              <TaskEditForm
                focusedTask={focusedTask}
                focusedProcess={focusedProcess as ProcessInterface}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

const TaskEditForm = observer(
  ({ focusedTask, focusedProcess }: TaskUpdateSchema) => {
    const { userStore, taskStore } = useRootStore();
    const { addNewTask, tasks } = taskStore;
    const { toast } = useToast();
    const handleToast = (message: string, description: string) => {
      toast({
        title: message,
        description: description,
      });
      // authStore.logOut()
    };
    // console.log("tasks:", tasks);
    useEffect(() => {
      userStore.fetchUsers();
      // taskStore.loadTasks("d4qNatMSpwEa9mVxJJbP");
    }, [userStore]);
    // console.log(tasks);
    const { users } = userStore;
    const userOptions =
      users?.map((user) => ({
        label: user.email,
        value: user.uid,
      })) ?? [];
    const form = useForm<z.infer<typeof taskFormSchema>>({
      resolver: zodResolver(taskFormSchema),
      defaultValues: {
        assigneeId: "",
        dueDate: new Date(),
      },
    });
    const defaultTaskDetails: TaskSchema = {
      taskname: focusedTask,
      description: "",
      status: "not-started",
      processId: focusedProcess?.id as string,
      createdBy: focusedProcess?.createdBy,
    };
    async function onSubmit(values: z.infer<typeof taskFormSchema>) {
      console.log("submitted values:", values);
      try {
        // Show toast notification
        // toast({
        //   title: "You submitted the following values:",
        //   description: (
        //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //     </pre>
        //   ),
        // });

        // Prepare process details
        const newTaskDetails = {
          ...defaultTaskDetails,
          assigneeId: values.assigneeId,
          description: values.description,
          dueDate: Timestamp.fromDate(values.dueDate),
        };

        // Call async function to create a new process
        const newProcess = await taskStore
          .addNewTask(newTaskDetails)
          .then((userCredential) => {
            handleToast("New Task Created!", userCredential.taskname);
          });
      } catch (error) {
        console.error("Error while submitting form:", error);
      }
      // set assigneeId, dueDate, description,status
      // Timestamp.fromDate(new Date("2025-01-15T15:00:00Z"))
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
                            <CommandEmpty>No emails found.</CommandEmpty>
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
  }
);

// const SavedTaskView = ({ savedTask }: TaskSchema) => {};
