import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import MultiEmailInput from "./LTS_MULTI_EMAIL_INPUT.";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  processName: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "category must be at least 2 characters.",
  }),
  tags: z.string().array().min(1),
});

interface StepsInterface {
  name: string;
  description: string;
  assignee: string[];
  deadline: string;
}

function StepSCreation() {
  const [steps, setSteps] = useState<StepsInterface[]>([]);
  const [assigneeEmails, setAssigneeEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState("");

  const [newStep, setNewStep] = useState({
    name: "",
    description: "",
    assignee: [...assigneeEmails],
    deadline: "",
  });

  useEffect(() => {
    return () => {};
  }, [newStep]);
  console.log(newEmail, assigneeEmails);
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    setNewStep((prevStep) => ({ ...prevStep, [name]: value }));
  };
  console.log("Steps", steps);
  const addStep = () => {
    if (newStep.name.trim() && newStep.description.trim()) {
      setSteps([...steps, newStep]);
      setNewStep({
        name: "",
        description: "",
        assignee: [],
        deadline: "",
      });
    } else {
      alert("Please fill out the name and description fields.");
    }
  };
  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };
  const handleSubmit = () => {
    // Logic to handle the submission of the steps form
    console.log("Steps Submitted: ", steps);
  };
  return (
    <Card className="w-[550px]">
      <CardHeader>
        <CardTitle>Create Process</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 p-4">
          <h2 className="text-lg font-semibold">Create Steps</h2>
          <div className="flex flex-col gap-4 p-4 border rounded-md bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={newStep.name}
                onChange={handleInputChange}
                placeholder="Step Name"
                className="p-2 border rounded-md"
              />
            </div>
            <textarea
              name="description"
              value={newStep.description}
              onChange={handleInputChange}
              placeholder="Step Description"
              className="p-2 border rounded-md"
            />
            <input
              type="date"
              name="deadline"
              value={newStep.deadline}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
            />
            <MultiEmailInput
              emails={assigneeEmails}
              setEmails={setAssigneeEmails}
              handleInputChange={handleInputChange}
              placeholder={"Assignee"}
              newEmail={newEmail}
              setNewEmail={setNewEmail}
            />
            <button
              onClick={addStep}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Add Step
            </button>
          </div>

          <div>
            <h3 className="text-md font-semibold">Steps List</h3>
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-md bg-white my-2"
              >
                <div>
                  <p>
                    <strong>Name:</strong> {step.name}
                  </p>
                  <p>
                    <strong>Description:</strong> {step.description}
                  </p>
                  <p>
                    <strong>Assignee:</strong> {step.assignee[0]}
                  </p>
                  <p>
                    <strong>Deadline:</strong> {step.deadline}
                  </p>
                </div>
                <button
                  onClick={() => removeStep(index)}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Submit Steps
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default StepSCreation;
