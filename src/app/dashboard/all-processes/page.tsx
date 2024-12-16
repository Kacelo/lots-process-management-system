"use client";
import { AllProcessTable } from "@/components/ui/tables/all-tasks-table";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
function Page() {
  return (
    <div>
      <Card className="w-[700px]">
        <CardHeader>
          <CardTitle>All Processes</CardTitle>
          <CardDescription>
          <Button asChild>
              <Link href="/dashboard/new-process">Add New Process</Link>
            </Button>{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AllProcessTable />{" "}
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
