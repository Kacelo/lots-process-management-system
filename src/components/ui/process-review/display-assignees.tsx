import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { User } from "@/app/models/users";

interface AssigneeAvaterProps {
  assignees:User [];
}
function AssigneeAvatar({ assignees }: AssigneeAvaterProps) {
  return (
    <div>
      {assignees.map((assignee) => (
        <>
          <Avatar>
            <AvatarImage alt={assignee.email} />
            <AvatarFallback>
              {assignee.email
                .split(" ")
                .map((chunk) => chunk[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </>
      ))}
    </div>
  );
}

export default AssigneeAvatar;
