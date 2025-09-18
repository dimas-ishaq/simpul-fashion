"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
  email: z.email({
    message: "Email anda tidak valid.",
  }),
  password: z.string().min(8, { message: "Password minimal 8 karakter." }),
});
export default function SignIn() {
  const [isLoading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setUser } = useAuthStore();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setLoading(false);
        const { data, message } = await response.json();
        toast.success(message);
        setUser({ ...data });
        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.warning(e.message);
      setLoading(false);
      console.error(e.message);
    }
  }

  return (
    <div className="flex flex-col h-dvh w-full bg-stone-50 dark:bg-stone-900 items-center justify-center">
      <div className="grid grid-cols-2 items-center overflow-hidden ">
        <div className="relative">
          <Link href="/" className="absolute top-10 left-10 p-3 rounded-full">
            <Image
              src="/assets/logo/logo.svg"
              alt="brand"
              width={32}
              height={32}
            />
          </Link>
          <Image
            src="/assets/images/auth/sign-in.png"
            alt="fashion"
            width={740}
            height={400}
            priority
          />
        </div>
        <div className="flex flex-col justify-center items-center h-full w-9/12 mx-auto p-8">
          <div className="mb-4 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold">Halo, Selamat Datang 👋</h2>
            <p className="text-sm text-stone-400">
              Belum punya akun ?
              <Button asChild variant="link">
                <Link href="/sign-up">Daftar di sini</Link>
              </Button>
            </p>
          </div>

          <div className="flex items-center justify-around mb-4 w-full">
            <Button variant="secondary">
              <Image
                src="/assets/logo/google.png"
                alt="brand"
                width={32}
                height={32}
              />
              <span>Google</span>
            </Button>
            <Button variant="secondary">
              <Image
                src="/assets/logo/facebook.png"
                alt="brand"
                width={32}
                height={32}
              />
              <span>Facebook</span>
            </Button>
          </div>
          <div className="flex w-full items-center justify-center gap-2 mb-4">
            <hr className="flex-1 border-t border-stone-300" />
            <span className="text-sm text-stone-500 whitespace-nowrap">
              atau masuk dengan
            </span>
            <hr className="flex-1 border-t border-stone-300" />
          </div>
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
                          <Input
                            placeholder="ex: johndoe@gmail.com"
                            {...field}
                          />
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
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <Checkbox id="terms" defaultChecked />
                  <div className="grid gap-2">
                    <Label htmlFor="terms">Saya ingin tetap login.</Label>
                  </div>
                </div>
                <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
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
          <div className="text-sm text-center text-muted-foreground w-8/12">
            Dengan membuat atau mendaftar akun, Anda menyetujui isi Persyaratan
            dan Ketentuan & Kebijakan Privasi kami.
          </div>
        </div>
      </div>
    </div>
  );
}
