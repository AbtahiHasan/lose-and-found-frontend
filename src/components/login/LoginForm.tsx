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

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
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
        <Button
          disabled={loading}
          type="submit"
          className={`${loading && "cursor-not-allowed"} w-full`}
        >
          Login
        </Button>
        <p>
          If you are new user?{" "}
          <Link className="text-sky-500 mt-5 inline-block" href="/sign-up">
            sign up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
