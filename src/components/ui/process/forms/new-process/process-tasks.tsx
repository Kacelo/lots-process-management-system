import { useRootStore } from "@/app/stores/RootStateContext";
import React, { useEffect } from "react";
import { TaskForm } from "../tasks/task-form";
import { observer } from "mobx-react-lite";

interface TaskProps {
  processId: string;
}
const ProcessTask = observer(({ processId }: TaskProps) => {
  const { processStore } = useRootStore();
  const { isLoading, focusedProcess } = processStore;

  useEffect(() => {
    // Ensure processes are fetched and the focused process is set
    processStore.fetchProcesses().then(() => {
      processStore.setFocusedProcess(processId);
    });
  }, [processStore, processId]);
  console.log(processId);
  if (isLoading && focusedProcess) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TaskForm focusedProcess={focusedProcess} />
    </div>
  );
});

export default ProcessTask;
