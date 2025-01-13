import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/app/stores/RootStateContext";
import { ProcessType } from "@/app/models/processes";

function CompletedTaskCard(props: ProcessType) {
  const { assignee, name } = props;
  return (
    <div>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Completed by: {assignee}</CardTitle>
          <CardDescription>{name}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

const RecentTasks = observer(() => {
  const { processStore } = useRootStore();
  useEffect(() => {
    processStore.fetchProcesses();
  }, []);
  const { processes, isLoading } = processStore;

  const completedTasks = processes.filter(
    (process) => process.status === "completed"
  );
  console.log("completed tasks:", processes);
  
  return (
    <div>
      <div className="col-span-3">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recently Completed Tasks</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            {completedTasks.map((task) => (
              <CompletedTaskCard {...task} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
});
export default RecentTasks;
