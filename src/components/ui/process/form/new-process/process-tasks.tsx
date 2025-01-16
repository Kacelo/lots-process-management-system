import { ProcessType } from "@/app/models/processes";
import { useRootStore } from "@/app/stores/RootStateContext";
import React, { useEffect, useState } from "react";
import { TaskForm } from "../tasks/task-form";
import { ProcessInterface } from "@/app/interfaces/interfaces";

interface TaskProps {
  processId: string;
}

function ProcessTask({ processId }: TaskProps) {
  const [focusedProcess, setFocusedProcess] = useState<
    ProcessInterface | undefined
  >();
  const { processStore } = useRootStore();
  const { isLoading, processes } = processStore;

  useEffect(() => {
    // Fetch processes only if they are not already fetched
    if (processes.length === 0) {
      processStore.fetchProcesses().then(() => {
        handleFocusedProcess(processId);
      });
    } else {
      handleFocusedProcess(processId);
    }
  }, [processes, processStore]);

  const handleFocusedProcess = (processId: string) => {
    console.log("Running", processes);
    const foundProcess = processes.find((process) => process.id === processId);
    console.log(focusedProcess)
    setFocusedProcess(foundProcess);
  };

  // if (isLoading) {
  //   return <>Loading...</>;
  // }

  return (
    <div>
      <TaskForm focusedProcess={focusedProcess} />
    </div>
  );
}

export default ProcessTask;
