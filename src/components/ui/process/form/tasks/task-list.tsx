import { useRootStore } from "@/app/stores/RootStateContext";
import { Button } from "@/components/ui/button";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaskSchema } from "@/app/interfaces/interfaces";
export const ProcessTaskList = observer(
  ({ processTasks }: { processTasks: TaskSchema[] }) => {

    const { taskStore } = useRootStore();
    console.log(taskStore.processTasks.length)
    return (
      <>
        {/* <Button onClick={fetchMyTasks}>fetch data</Button> */}
        <Table>
          <TableCaption>A list of your recent Tasks.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Tasks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {processTasks.length > 0 ? ( */}
            {taskStore.processTasks?.map((task) => (
              // <div key={task.id}>{task.taskname}</div>
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.taskname}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </>
    );
  }
);
