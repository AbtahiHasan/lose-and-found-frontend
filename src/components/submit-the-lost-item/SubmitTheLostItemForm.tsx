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
import { FaEyeLowVision } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { loginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/lib/actions/auth.action";
import Swal from "sweetalert2";
import { loseItemSchema } from "@/lib/schema/loseAndFound.schema";
import { Textarea } from "../ui/textarea";

const SubmitTheLostItemForm = () => {
  const [showPassword, setShowPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(loseItemSchema),
    defaultValues: {
      category: "",
      description: "",
      date: "",
      location: "",
      email: "",
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    const res: any = await login(values as any);

    setLoading(false);
    if (res?.success) {
      form.reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Category" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none h-[150px]"
                  placeholder="Description"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="lg:grid lg:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lose Date</FormLabel>
                <FormControl>
                  <Input
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="date"
                    placeholder="Lose Date"
                    {...field}
                  />
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
        </div>

        <Button
          disabled={loading}
          type="submit"
          className={`${loading && "cursor-not-allowed"} w-full`}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SubmitTheLostItemForm;
