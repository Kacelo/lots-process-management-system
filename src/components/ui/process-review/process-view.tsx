import { observer } from "mobx-react-lite";
import { Separator } from "../separator";
import { TaskDisplay } from "./task-display";
import { TaskList } from "./task-list";
import { ProcessInterface } from "@/app/interfaces/interfaces";
import { useRootStore } from "@/app/stores/RootStateContext";
import { useEffect, useState } from "react";
interface ViewTaskSchema {
  focusedProcessId: string;
}
export const TaskView = observer(({ focusedProcessId }: ViewTaskSchema) => {
  const [focusedTask, setFocusedTask] = useState("");
  const { taskStore } = useRootStore();

  const { processTasks } = taskStore;
  const { processStore } = useRootStore();
  const { isLoading, focusedProcess } = processStore;

  useEffect(() => {
    // Ensure processes are fetched and the focused process is set
    processStore.fetchProcesses().then(() => {
      processStore.setFocusedProcess(focusedProcessId);
    });
  }, [processStore, focusedProcessId]);
  console.log(focusedProcessId);
  // if (isLoading && focusedProcess) {
  //   return <div>Loading...</div>;
  // }
  useEffect(() => {
    // if (focusedProcess?.id) {
    initializeTasks();
    // }
  }, [focusedProcessId]); // No need to include `taskStore`, since it’s already reactive

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     taskname: "",
  //   },
  // });
  const initializeTasks = () => {
    taskStore.getProcessTasks(focusedProcessId as string);
  };
  console.log("Tasks have been updated:", processTasks);

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log(values);
  //   setFocusedTask(values.taskname);
  //   form.reset();
  //   // Handle form submission
  // }
  console.log(taskStore.focusedTask);

  return (
    <div>
      <div className="flex flex-col gap-4 p-4">
        {focusedProcessId ? (
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              {focusedProcess?.name}
            </h1>
            <p className="text-xl tracking-tight">
              {focusedProcess?.description}
            </p>
          </div>
        ) : (
          <p>No process found for the given ID.</p>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Column */}
          <div className="w-full md:w-1/3 bg-muted/50 rounded-xl p-4">
            {/* Task List */}
            {taskStore.processTasks.length > 0 ? (
              <>
                <TaskList items={taskStore.processTasks} />
              </>
            ) : (
              <p>No tasks available.</p>
            )}
            <Separator />
          </div>

          {/* Right Column */}
          <div className="w-full md:w-2/3 bg-muted/50 rounded-xl p-4">
            {taskStore.focusedTask && (
              <TaskDisplay
                task={taskStore.focusedTask[0]}
                //   focusedProcess={focusedProcess as ProcessInterface}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
