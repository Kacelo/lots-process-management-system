import { ProcessType } from "@/app/models/processes";
import { useRootStore } from "@/app/stores/RootStateContext";
import React, { useEffect, useState } from "react";
import { TaskForm } from "../tasks/task-form";
import { ProcessInterface } from "@/app/interfaces/interfaces";
import { observer } from "mobx-react-lite";

interface TaskProps {
  processId: string;
}
const ProcessTask = observer(({ processId }: TaskProps) => {
  const { processStore } = useRootStore();
  const { isLoading, focusedProcess, setFocusedProcess } = processStore;

  useEffect(() => {
    // Ensure processes are fetched and the focused process is set
    processStore.fetchProcesses().then(() => {
      processStore.setFocusedProcess(processId);
    });
  }, [processStore, processId]);
  console.log(focusedProcess, processId);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TaskForm focusedProcess={focusedProcess} />
    </div>
  );
});

export default ProcessTask;
