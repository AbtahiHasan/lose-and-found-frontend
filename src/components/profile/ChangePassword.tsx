"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword, updateProfile } from "@/lib/actions/auth.action";
import Swal from "sweetalert2";
import { updatePasswordSchema } from "@/lib/schema/auth.schema";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    const res: any = await changePassword(values as any);
    console.log({ res, values });
    setLoading(false);
    if (res?.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "password updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 lg:w-[60%] mt-5"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Current Password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="New Password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="Confirm Password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          type="submit"
          className={`${loading && "cursor-not-allowed"}`}
        >
          Change Password
        </Button>
      </form>
    </Form>
  );
};

export default ChangePassword;
