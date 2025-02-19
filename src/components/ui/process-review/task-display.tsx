import { TaskSchema } from "@/app/interfaces/interfaces";
import { Separator } from "../separator";
import AssigneeAvatar from "./display-assignees";
import { assignees } from "./mock-data";
import { Button } from "../button";

interface TaskDisplayProps {
  task: TaskSchema | null;
}

export function TaskDisplay({ task }: TaskDisplayProps) {
  console.log(task);
  return (
    <div className="flex h-full flex-col">
      {task ? (
        <>
          <div className="">
            <h3 className="font-bold text-3xl">{task.taskname}</h3>
          </div>
          <Separator />
          <div className="mb-[10px]"> 
          <AssigneeAvatar assignees={assignees} />

          </div>
          <Separator />

          <div className="">
            <p>{task.description}</p>
          </div>
          <Separator></Separator>
          <div className="mt-[5px]">
            <Button>
              Update task
            </Button>
          </div>
        </>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}
