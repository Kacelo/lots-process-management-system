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

function Page() {
  return (
    <div className="w-full">
      <AllProcessTable />{" "}
    </div>
  );
}

export default Page;
