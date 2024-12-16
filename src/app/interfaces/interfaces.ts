export interface ProcessInterface {
    name: string;
    description: string;
    createdBy: string;
    createdAt?: string;
    status?: "not-started" | "in-progress" | "completed";
    assignee?: string;
    isApproved?: boolean;
  }