"use client";
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
import { ProcessReviewTable } from "@/components/ui/process-review/process-review-table";
function Page() {
  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Completed Processes</CardTitle>
          <CardDescription>
            <Button asChild>
              <Link href="/dashboard/new-process">Add New Process</Link>
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProcessReviewTable />{" "}
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
