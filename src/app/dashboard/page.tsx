"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/app/stores/userStore";
function page() {
  const { user, isLoading } = authStore;
  const router = useRouter();
  useEffect(() => {
    if (!user && !isLoading) {
      void router?.push("/login"); // Redirect to login if not authenticated
    }
  }, [user, isLoading]);
  console.log("isLoading:", isLoading, "user:", user);
  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while checking auth state
  } else
    <div>
      <h1>Protected Content for Authenticated Users</h1>
    </div>;
}

export default page;
