import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { doCreateUsersWithEmailANdPassword } from "@/firebase/auth";
import { firestore } from "../../../../firebase";
import { observer } from "mobx-react-lite";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";
import { Button } from "../button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
const formSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "validator", "contributor"], {
    required_error: "Role is required",
  }),
});

export const UserCreationForm = observer(function CreateUserForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "default123", // Default password
      role: "contributor", // Default role
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Form values:", values);

      const { email, password, role } = values;
      console.log('values:', values)

      // Create user using the provided function
      const userData = await doCreateUsersWithEmailANdPassword(email, password);
      console.log("User data:", userData);

      const user = userData.user;

      // Prepare data to store in Firestore
      const data = {
        email: user.email,
        uid: user.uid,
        role,
      };

      // Save the user data to Firestore
      await addDoc(collection(firestore, "users"), data);

      console.log("User created and saved to Firestore:", data);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[400px] ">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input
            type="email"
            id="email"
            {...form.register("email")}
            placeholder="Enter user email"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password (Default)
          </label>
          <Input
            type="text"
            id="password"
            {...form.register("password")}
            readOnly
          />
        </div>

        <div>
        <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="admin">Admin
                        </SelectItem>
                        <SelectItem value="validator">
                        Validator
                        </SelectItem>
                        <SelectItem value="contributor">Contributor
                        </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Update the status of the process.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <Button type="submit" className="w-full">
          Create User
        </Button>
      </form>
    </Form>
  );
});
