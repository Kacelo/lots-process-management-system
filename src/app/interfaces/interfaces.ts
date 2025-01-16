import { Timestamp } from "firebase/firestore";

export interface ProcessInterface {
    name: string;
    description: string;
    createdBy: string;
    createdAt?: string;
    status?: "not-started" | "in-progress" | "completed";
    assignee?: string;
    isApproved?: boolean;
  }
  
  export interface TaskSchema {
    taskname: string;
    description: string;
    processId: string;
    status: string;
    assigneeId: string;
    createdBy: string;
    dueDate: Timestamp;
    completedAt?: Timestamp; // Optional field
    isArchived: boolean;
    taskIndex: number;
  }