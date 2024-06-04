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
import { login, updateProfile } from "@/lib/actions/auth.action";
import Swal from "sweetalert2";
import { updateProfileSchema } from "@/lib/schema/auth.schema";

const EditProfile = ({ user }: { user: any }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    const res: any = await updateProfile(values as any);
    console.log({ res, values });
    setLoading(false);
    if (res?.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "profile updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 lg:w-[60%]"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="username" {...field} />
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
                <Input placeholder="email" {...field} />
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
          Save
        </Button>
      </form>
    </Form>
  );
};

export default EditProfile;
