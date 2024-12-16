"use client";

import { NavBar } from "@/components/ui/navbar/navbar";
import RegistrationForm from "@/components/ui/sign-up-form/register";
import React from "react";

function page() {
  return (
         <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                  <NavBar />

            <div className="w-full max-w-sm">
            <RegistrationForm />
            </div>
          </div>
  );
}

export default page;
