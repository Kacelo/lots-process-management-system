"use client"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase"; // Adjust path as needed
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/app/stores/RootStateContext";
import { redirect } from "next/navigation";

const formSchema = z.object({
  password: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
});
export const LoginForm = observer(function LoginForm({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter();
    const { authStore } = useRootStore();
    const { user, isLoading } = authStore;
    const pathname = usePathname();
  
    useEffect(() => {
      if (!isLoading && !user && pathname !== "/login") {
        redirect("/login");
      } else if (user) {
        redirect("/dashboard");
      }
    }, [user, isLoading, router, pathname]);
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {},
    });
  
    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log("Auth:", auth); // Debugging auth object
      const { email, password } = values;
  
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed in:", user);
          router.push("/dashboard");
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
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
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
                  Login
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/register" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  });
