"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { useRootStore } from "@/app/stores/RootStateContext";
import { observer } from "mobx-react-lite";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChartComponent } from "@/components/ui/pie-chart/pie-chart";
import { SkeletonComp } from "@/components/ui/skeleton/skeleton";
const page = observer(() => {
  const { authStore, processStore } = useRootStore();
  const { isLoading } = authStore;
  useEffect(() => {
    processStore.fetchProcesses();
  }, []);
  const { processes } = processStore;
  const completedTasks = processes.filter(
    (process) => process.status === "completed"
  );
  const inProgressTasks = processes.filter(
    (process) => process.status === "in-progress"
  );
  const notStatedTasks = processes.filter(
    (process) => process.status === "not-started"
  );

  const chartData = [
    {
      browser: "completed",
      visitors: completedTasks.length,
      fill: "var(--color-completed)",
    },
    {
      browser: "inProgress",
      visitors: inProgressTasks.length,
      fill: "var(--color-inProgress)",
    },
    {
      browser: "notStarted",
      visitors: notStatedTasks.length,
      fill: "var(--color-notStarted)",
    },
  ];
  console.log("isLoading", isLoading);
  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
        <SkeletonComp />
      </div>
    );
  }
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Processes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {processStore.processes.length}
            </div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Processe Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {/* +180.1% from last month */}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PieChartComponent chartData={chartData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

export default page;
