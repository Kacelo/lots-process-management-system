"use client";
import React from "react";
// import { redirect } from "next/navigation";
import { useRootStore } from "@/app/stores/RootStateContext";
import { observer } from "mobx-react-lite";
import { AssignedProcessTable } from "@/components/ui/tables/assigned-tasks-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SkeletonCard } from "@/components/ui/skeleton/skeleton";
const page = observer(() => {
  const { authStore } = useRootStore();
  const { user, isLoading } = authStore;
  console.log("isLoading: ", isLoading);
  // if(!user){
  //   redirect(`/login`)
  // }
//   const table = () => {
//     return (
//       <div>
//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle>My Tasks</CardTitle>
//             <CardDescription></CardDescription>
//           </CardHeader>
//           <CardContent>
//             <AssignedProcessTable />
//           </CardContent>
//         </Card>
//       </div>
//     );
//   };
  if (isLoading) {
    return <SkeletonCard />;
  }else{
    return (
        <div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <AssignedProcessTable />
            </CardContent>
          </Card>
        </div>
      );
  }

});

export default page;
