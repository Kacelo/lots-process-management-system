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
function Page() {
  return (
    <div style={{ alignContent: "center" }}>
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Create New User</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <UserCreationForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
