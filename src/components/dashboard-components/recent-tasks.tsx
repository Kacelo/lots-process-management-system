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
import { ProcessInterface } from "@/app/interfaces/interfaces";
interface completedTasksProps {
  assignee: string
  name: string
}

function CompletedTaskCard(props: completedTasksProps) {
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
  }, [processStore]);
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
            {completedTasks.map((task, index) => (
              <div key={index}>
                <CompletedTaskCard assignee={""} {...task} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
});
export default RecentTasks;
