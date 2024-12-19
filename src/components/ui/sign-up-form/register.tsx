"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { auth, firestore } from "../../../../firebase"; // Adjust path as needed
import { addDoc, collection } from "firebase/firestore";
// import Link from "next/link";
import { doCreateUsersWithEmailANdPassword } from "@/firebase/auth";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  password: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
}); // Should log the Firebase Auth instance

export const RegistrationForm = observer(function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("Auth:", auth); // Debugging auth object
      const { email, password } = values;
      console.log("VALUES:", values);
      const userData = await doCreateUsersWithEmailANdPassword(email, password);
      console.log("User data:", userData);
      const user = userData.user;
      // Prepare data to store in Firestore
      const data = {
        email: user.email,
        uid: user.uid,
      };

      // Save the user data to Firestore

      // await addDoc(doc(firestore, "users", user.uid), data);
      await addDoc(collection(firestore, "users"), data);
     
        toast({
          title: "Congratulations",
          description: "You have succesfully signed up",
        });
      redirect("/dashboard");
      console.log("User signed up and data saved to Firestore:", user);
    } catch (error) {
      console.error("Error during sign-up:", error);
    }

    console.log("Form submitted with values:", values);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your email and password below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Register
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
              <div className="mt-4 text-center text-sm">
                already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Sign in
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
});

export default RegistrationForm;
