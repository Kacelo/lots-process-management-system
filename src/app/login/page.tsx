// import LoginForm from "@/components/ui/sign-in-form/login-form";
import { NavBar } from "@/components/ui/navbar/navbar";
import { LoginForm } from "@/components/ui/sign-in-form/login-form";
import React from "react";

function page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
              <NavBar />

      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
export default page;
