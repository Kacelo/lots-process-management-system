"use client"
import React, { useState } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import BasicDetailForm from "./basic-detail-form";
import { User as FirebaseUser } from "firebase/auth";
import StepSCreation from "./steps-form";

interface ProcessFormProps {
  user: FirebaseUser;
}

function ProcessForm(props: ProcessFormProps) {
  const [currentView, setCurrentView] = useState('details');
  const [focusedProccessId, setFocusedProcessId] = useState<string>('')
  const { user } = props;
  console.log("user:", currentView);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <BasicDetailForm userId={user?.uid}/>
    </div>
  );
}

export default ProcessForm;
