import { useRootStore } from "@/app/stores/RootStateContext";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
interface TaskProps {
  processId: string;
}
export const ProcessTaskList = observer(({ processId }: TaskProps) => {
  const { taskStore } = useRootStore();
  useEffect(() => {
    taskStore.setProcessTasks(processId);
  }, [taskStore, processId]);

  // Log when processTasks updates
  useEffect(() => {
    console.log("processTasks updated:", taskStore.processTasks);
  }, [taskStore.processTasks]);
  console.log("processTasks:", taskStore.processTasks);
  return (
    <>
      Hello
      {processId}
      {/* {taskStore?.processTasks.length > 0 ? (
        taskStore?.processTasks.map((task) => (
          <div key={task.id}>{task.taskname}</div>
        ))
      ) : (
        <p>No tasks available</p>
      )} */}
    </>
  );
});
