"use client";
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase"; // Adjust path as needed
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authStore } from "@/app/stores/userStore";
import { observer } from "mobx-react-lite";

// import {  } from "firebase/database";
const formSchema = z.object({
  password: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
}); // Should log the Firebase Auth instance
const LoginForm = observer(() => {
  const router = useRouter();
  const { user, isLoading } = authStore;
  const pathname = usePathname()

 useEffect(() => {
  if (!isLoading && !user && pathname !== "/login") {
    void router.push("/login");
  } else if (user) {
    void router.push("/dashboard");
  }
}, [user, isLoading, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  console.log("Auth Object:", auth);
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Auth:", auth); // Debugging auth object
    const { email, password } = values;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          console.error("Incorrect password");
        } else if (error.code === "auth/user-not-found") {
          console.error("User does not exist");
        } else {
          console.error("Error during sign-in:", error.message);
        }
      });

    console.log("Form submitted with values:", values);
  }

  return (
    <div>
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign In</Button>
        </form>
      </Form>
    </div>
  );
});

export default LoginForm;
