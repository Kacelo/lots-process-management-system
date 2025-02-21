import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { User } from "@/app/models/users";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface AssigneeAvaterProps {
  assignees: User[];
}
function AssigneeAvatar({ assignees }: AssigneeAvaterProps) {
  return (
    <div className="flex pt-3">
        <div>
        <p className="mt-[10px] mr-[10px]">Assigned to:</p>
        </div>
      {assignees.map((assignee, index) => (
        <div className="cursor-pointer" key={index}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar>
                  <AvatarImage alt={assignee.email} />
                  <AvatarFallback>
                    {assignee.email
                      .split(" ")
                      .map((chunk) => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{assignee.email}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ))}
    </div>
  );
}

export default AssigneeAvatar;
