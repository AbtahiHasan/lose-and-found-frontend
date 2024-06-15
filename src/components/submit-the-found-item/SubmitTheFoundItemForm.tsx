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
import axios from "axios";
import Swal from "sweetalert2";
import { loseAndFoundItemSchema } from "@/lib/schema/loseAndFound.schema";
import { Textarea } from "../ui/textarea";
import {
  submitFoundItem,
  submitLoseItem,
} from "@/lib/actions/loseAndFount.action";
import { config } from "@/config";

const SubmitTheFoundItemForm = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const form = useForm({
    resolver: zodResolver(loseAndFoundItemSchema),
    defaultValues: {
      category: "",
      description: "",
      date: "",
      location: "",
      email: "",
      image: "",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      console.log({ values });
      let res = null;
      setLoading(true);
      if (file) {
        const imageFile = {
          image: file,
        };

        console.log({ imageFile });
        const response = await axios.post(config.imageHostingApi, imageFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        console.log({ response: response.data, suc: response.data?.success });
        if (response?.data?.success) {
          console.log({ res: response?.data?.data?.display_url });
          res = await submitFoundItem({
            ...values,
            image: response?.data?.data?.display_url,
          } as any);
          setLoading(false);
        } else {
          res = await submitFoundItem({
            ...values,
            image: "",
          } as any);
          setLoading(false);
        }
        if (res?.success) {
          form.reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Item submitted successfully!",
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
      }
    } catch (error) {
      setLoading(false);
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
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  onChange={(e: any) => {
                    setFile(e.target.files[0]);
                  }}
                  type="file"
                  placeholder="image"
                />
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

export default SubmitTheFoundItemForm;
