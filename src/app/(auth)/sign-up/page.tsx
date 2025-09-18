"use client";

import React, { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2Icon } from "lucide-react";

const passwordComplexity = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])/;
const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, { message: "Nama harus lebih dari 5 karakter" })
    .refine((val) => !/\d/.test(val), {
      message: "Nama tidak boleh mengandung angka",
    })
    .refine((val) => /^[\p{L}\s.'-]+$/u.test(val), {
      message: "Nama mengandung karakter tidak valid",
    }),
  email: z.email({
    message: "Email anda tidak valid.",
  }),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter." })
    .refine((pw) => passwordComplexity.test(pw), {
      message:
        "Password harus mengandung huruf besar, huruf kecil, angka, dan simbol.",
    }),
});

export default function SignUp() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const { setUser } = useAuthStore();

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      (async () => {
        try {
          const response = await fetch("/api/auth/sign-up", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          if (response.ok) {
            toast.success("Account created successfully");
            const data = await response.json();
            const { id, name, email } = data;
            setUser({ id, name, email });
            router.push("/");
          }
        } catch (e: any) {
          console.error(e.message);
        }
      })();
    });
  }

  return (
    <div className="flex flex-col h-dvh w-full bg-stone-50 items-center justify-center">
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
            src="/assets/images/auth/sign-up.png"
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
              Sudah memiliki akun ?
              <Button asChild variant="link">
                <Link href="/sign-in">Masuk di sini</Link>
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
              atau daftar dengan
            </span>
            <hr className="flex-1 border-t border-stone-300" />
          </div>

          <div className="w-full">
            <Form {...form}>
              <form action="" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: johndoe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                    <Label htmlFor="terms">Terima syarat dan ketentuan</Label>
                    <p className="text-muted-foreground text-sm">
                      Dengan mengeklik kotak centang ini, Anda menyetujui syarat
                      dan ketentuan .
                    </p>
                  </div>
                </div>
                <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2Icon className="animate-spin mr-2" />
                      Mohon tunggu
                    </>
                  ) : (
                    "Daftar"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
