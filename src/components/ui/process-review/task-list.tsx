import { ComponentProps, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
// import { Badge } from "@/registry/new-york/ui/badge";
// import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
// import { Separator } from "@/registry/new-york/ui/separator";
import { TaskSchema } from "@/app/interfaces/interfaces";
import { ScrollArea } from "../scroll-area";
import { useRootStore } from "@/app/stores/RootStateContext";
import { formatDistanceToNow } from "date-fns";

interface TaskListProps {
  items: TaskSchema[];
}

export function TaskList({ items }: TaskListProps) {
  const { taskStore, userStore } = useRootStore();

  const [selectedTask, setSelectedTask] = useState<TaskSchema>(items[0]);
  const handleSelectTask = (taskId?: string) => {
    if (taskId !== null) {
      const selected = items.filter((item) => item.id === taskId);
      setSelectedTask(selected[0]);
      if(selected){
        taskStore.setFocusedTask(selected[0].id as string);
      }
    }
  };
  console.log(items);
  //   useEffect(() => {
  //     first;

  //     return () => {
  //       second;
  //     };
  //   }, [taskStore]);

  // const [task, setTask] = use
  return (
    <ScrollArea className="h-[30rem] w-108">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              selectedTask.id === item.id && "bg-muted"
            )}
            onClick={() => handleSelectTask(item?.id)}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.taskname}</div>
                  {/* {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )} */}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    selectedTask.id === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  Due:{" "}
                  {formatDistanceToNow(new Date(item?.dueDate.seconds * 1000), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{item.description}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {/* {item.description.substring(0, 300)} */}
            </div>
            {/* {item.labels.length ? (
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null} */}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
