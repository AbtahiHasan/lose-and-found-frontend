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
import { signUpSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState("password");
  const form = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (values: any) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword}
                    placeholder="password"
                    {...field}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {showPassword === "text" ? (
                      <FaEyeLowVision
                        className="cursor-pointer"
                        onClick={() => setShowPassword("password")}
                      />
                    ) : (
                      <FaEye
                        className="cursor-pointer"
                        onClick={() => setShowPassword("text")}
                      />
                    )}
                  </div>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
        <p>
          If you have account?{" "}
          <Link className="text-sky-500 mt-5 inline-block" href="/login">
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignUpForm;
