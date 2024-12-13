"use client";

import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

interface EmailInputProps {
  emails: string[];
  setEmails: Dispatch<SetStateAction<string[]>>;
  placeholder?: string;
  newEmail: string;
  setNewEmail: Dispatch<SetStateAction<string>>;
  errorMessage?: string; // Optional custom error message
  handleInputChange: (e: any) => void;

}

export default function MultiEmailInput(props: EmailInputProps) {
  const {
    emails,
    setEmails,
    placeholder = "Enter an email...",
    newEmail,
    setNewEmail,
    errorMessage,
    handleInputChange
  } = props;

  const isValidEmail = (email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim());
  };

  const handleAddEmail = () => {
    if (!isValidEmail(newEmail)) {
      console.warn(errorMessage || "Invalid email address. Please try again.");
    } else if (emails.includes(newEmail.trim())) {
      console.warn("This email is already added.");
    } else {
      setEmails([...emails, newEmail.trim()]);
    }
    setNewEmail("");
  };

  const handleRemoveEmail = (email: string) => {
    setEmails(emails.filter((e) => e !== email));
  };

  const handleKeyDown = (e: any) => {
    if (["Enter", " ", "Tab"].includes(e.key)) {
      e.preventDefault();
      handleAddEmail();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
    handleInputChange(e);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-center flex-wrap gap-2 p-3 rounded-md border bg-white shadow-sm">
        {emails.map((email) => (
          <button
            key={email}
            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold shadow ${
              isValidEmail(email)
                ? "bg-primary text-primary-foreground hover:bg-primary/80"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            onClick={() => handleRemoveEmail(email)}
          >
            {email}
            <XIcon className="ml-2 h-3 w-3" />
          </button>
        ))}
        <input
          type="text"
          value={newEmail}
          onChange={handleChange}
          onBlur={handleAddEmail}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-grow bg-transparent outline-none"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Press Enter or Tab to add an email. Click an email to remove it.
      </p>
    </div>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
