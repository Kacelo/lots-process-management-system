"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/app/stores/userStore";
import BasicDetailForm from "@/components/ui/process/form/basic-detail-form";
import StepSCreation from "@/components/ui/process/form/steps-form";
function page() {
  const { user, isLoading } = authStore;
  const router = useRouter();
  useEffect(() => {
    if (!user && !isLoading) {
      void router?.push("/login"); // Redirect to login if not authenticated
    }
  }, [user, isLoading]);
  console.log("isLoading:", isLoading, "user:", user);
  return (
    <div>
      <h1>Protected Content for Authenticated Users</h1>
      <BasicDetailForm />
      <StepSCreation />
    </div>
  );
}

export default page;
