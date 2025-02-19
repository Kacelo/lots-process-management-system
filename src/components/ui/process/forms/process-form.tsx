"use client";
import React from "react";
import BasicDetailForm from "./basic-detail-form";
import { User as FirebaseUser } from "firebase/auth";
import NewProcess from "./new-process/new-process-form";

interface ProcessFormProps {
  user: FirebaseUser;
}

function ProcessForm(props: ProcessFormProps) {
  const { user } = props;

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      {/* <BasicDetailForm userId={user?.uid} /> */}
      <NewProcess userId={user?.uid} />
    </div>
  );
}

export default ProcessForm;
