import { TaskSchema } from "@/app/interfaces/interfaces";
import { Separator } from "../separator";
import AssigneeAvatar from "./display-assignees";

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
          <AssigneeAvatar assignees={} />
          <div className="">
            <p>{task.description}</p>
          </div>
          <Separator></Separator>
          <div>

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
