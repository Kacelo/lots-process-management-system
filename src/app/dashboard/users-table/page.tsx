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
import { DataTable } from "@/components/ui/tables/data-table/data-table";
import { processColumns } from "@/components/ui/tables/data-table/columns";
function Page() {

  // get current logged in user and see their role

  
  return (
    <div>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
          <h2 className="text-2xl font-bold tracking-tight">Registered Users</h2>
          </CardTitle>
          <CardDescription>
            View and manage users
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
