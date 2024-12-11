"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, firestore } from "../../../../firebase"; // Adjust path as needed
import { ref, set } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";

const formSchema = z.object({
  password: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
}); // Should log the Firebase Auth instance
function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(email);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("Auth:", auth); // Debugging auth object
      const { email, password } = values;
      console.log("VALUES:", values);

      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Prepare data to store in Firestore
      const data = {
        email: user.email,
        uid: user.uid,
      };

      // Save the user data to Firestore
      await setDoc(doc(firestore, "users", user.uid), data);

      console.log("User signed up and data saved to Firestore:", user);
    } catch (error) {
      console.error("Error during sign-up:", error);
    }

    console.log("Form submitted with values:", values);
  }

  return (
    <div>
      <h1 className="font-semibold">
        Register
      </h1>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    type="email"
                    style={{ width: "100%" }}
                    value={field.value}
                    onChange={(event) => {
                      field.onChange(event.target.value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Password"
                    {...field}
                    type="password"
                    style={{ width: "100%" }}
                    value={field.value}
                    onChange={(event) => {
                      field.onChange(event.target.value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex">
            <p>Already have account?</p>
            <Link href="/login" style={{color: "blue"}}>Sign In</Link>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default RegistrationForm;
