"use client";
import React from "react";
import { useRootStore } from "@/app/stores/RootStateContext";
import { observer } from "mobx-react-lite";
import ProcessForm from "@/components/ui/process/form/process-form";
import { SkeletonCard } from "@/components/ui/skeleton/skeleton";

const Page = observer(()=> {
    const { authStore } = useRootStore();
    const { user,isLoading } = authStore;
    if (isLoading && !user) {
      return <SkeletonCard />;
    }else if(!isLoading && user){
      return (
        <div>
          <ProcessForm user ={user}/>
        </div>
      );
    }

})

export default Page;
