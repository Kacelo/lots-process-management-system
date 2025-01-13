import { ProcessType } from "@/app/models/processes";
import { useRootStore } from "@/app/stores/RootStateContext";
import React, { useEffect, useState } from "react";

interface TaskProps {
  processId: string;
}

function ProcessTask({ processId }: TaskProps) {
  const [focusedProcess, setFocusedProcess] = useState<
    ProcessType | undefined
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
  }, [processId, processes, processStore]);

  const handleFocusedProcess = (processId: string) => {
    const foundProcess = processes.find((process) => process.id === processId);
    setFocusedProcess(foundProcess);
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div>
      {focusedProcess ? (
        <p>{focusedProcess.name}</p>
      ) : (
        <p>No process found for the given ID.</p>
      )}

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex gap-4 md:grid-cols-2">
          <div className="aspect-video rounded-xl bg-muted/50 w-1/4">
            <h1>Task List</h1>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 w-3/4">
            <h1>Task Details</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessTask;
