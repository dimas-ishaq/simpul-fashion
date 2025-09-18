"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

const formSchema = z.object({
  email: z.email({
    message: "Email anda tidak valid.",
  }),
  password: z.string().min(8, { message: "Password minimal 8 karakter." }),
});

export default function LoginAdmin() {
  const [isLoading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const { setUser } = useAuthStore();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/cms/admin/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setLoading(false);
        const { data, message } = await response.json();
        setUser({ ...data });
        toast.success(message);
        router.push("/cms/admin/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e.message);
    }
  }

  return (
    <div className="grid grid-cols-2">
      <div className="relative">
        <Image
          src="/assets/images/auth/sign-in.png"
          alt="sign-in"
          width={700}
          height={420}
        />
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-full  animate-bounce shadow-lg">
          <Image
            src="/assets/logo/logo.svg"
            alt="brand-logo"
            width={120}
            height={120}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-full w-9/12 mx-auto p-8">
        <div className="w-full mb-4">
          <Form {...form}>
            <form action="" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                variant="default"
                size="lg"
                className="w-full"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? (
                  <>
                    <Loader2Icon className="animate-spin mr-2" />
                    Mohon tunggu
                  </>
                ) : (
                  "Masuk"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
