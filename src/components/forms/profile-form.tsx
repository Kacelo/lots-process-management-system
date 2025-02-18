"use client";
import { EditUserProfileSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRootStore } from "@/app/stores/RootStateContext";
import { observer } from "mobx-react-lite";
type Props = {
  userName?: string
};

const ProfileForm = observer((props: Props) => {
  const { authStore } = useRootStore();

  const form = useForm<z.infer<typeof EditUserProfileSchema>>({
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      name: "", // Default role
      email: "", // Default password
    },
  });
  const handleProfileUpdate = () => {
    authStore.updateCurrentUserData();
  };
  async function onSubmit(values: z.infer<typeof EditUserProfileSchema>) {
    try {
      authStore.updateCurrentUserData();
      console.log("Process added with ID:", values);
    } catch (error) {
      console.error("Error adding process:", error);
    }
  }
  return (
    <div>
      {" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Process Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Assignee Email Field */}

          {/* Submit Button */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
});
export default ProfileForm;
