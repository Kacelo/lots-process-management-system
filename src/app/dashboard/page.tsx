"use client";
import React, { useEffect } from "react";
import { useRootStore } from "@/app/stores/RootStateContext";
import { observer } from "mobx-react-lite";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChartComponent } from "@/components/ui/pie-chart/pie-chart";
import { SkeletonComp } from "@/components/ui/skeleton/skeleton";
const page = observer(() => {
  const { authStore, processStore, sessionStore } = useRootStore();
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
  const notStartedTasks = processes.filter(
    (process) => process.status === "not-started"
  );
  const rejected = processes.filter((process) => process.isApproved === true);

  console.log(sessionStore.currentUser);
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
      visitors: notStartedTasks.length,
      fill: "var(--color-notStarted)",
    },
  ];
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
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notStartedTasks.length}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Not Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejected.length}</div>
            <p className="text-xs text-muted-foreground"></p>
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
