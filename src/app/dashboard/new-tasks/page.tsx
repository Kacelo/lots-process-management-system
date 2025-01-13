"use client";
import { UserCreationForm } from "@/components/ui/create-users/create-users";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProcessTask from "@/components/ui/process/form/new-process/process-tasks";
function Page() {
  return (
    <div style={{ alignContent: "center" }}>
      <ProcessTask processId="14r4DWux6TMcTunZotf7" />
    </div>
  );
}

export default Page;