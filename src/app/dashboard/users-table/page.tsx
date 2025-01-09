"use client";
import { UsersTable } from "@/components/ui/tables/users-table";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function Page() {

  // get current logged in user and see their role

  
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsersTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
