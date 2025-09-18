/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Store } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "description must be at least 10 characters.",
  }),
  address: z.string().min(10, {
    message: "address must be at least 10 characters",
  }),
});

export default function FormSellerRegister() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
    },
  });

  const router = useRouter();
  // 2. Define a submit handler.

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/seller/register", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(values),
      });

      const { message } = await response.json();
      if (!response.ok) {
        throw new Error(message);
      }
      toast.success("Toko berhasil dibuat");
      setTimeout(() => router.push("/"), 3000);
    } catch (error: any) {
      console.log(`Terjadi kesalahan ${error}`);
      toast.error(error.message || "Terjadi kesalahan, silahkan coba kembali");
    }
  }

  return (
    <div className="w-full ">
      <Card>
        <CardContent>
          <div className="flex items-center justify-center mb-4">
            <Image
              src={"/assets/logo/logo.svg"}
              alt="brand"
              width={64}
              height={64}
            />
          </div>
          <h2 className="mb-8 text-center text-2xl font-semibold">
            Registrasi Seller
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Toko</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nama yang menarik untuk merek toko online Anda

"
                        {...field}
                      />
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
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Jelaskan jenis produk atau niche toko online Anda."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Isi dengan alamat lengkap toko Anda (termasuk nomor, RT/RW, dan kode pos)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                <Store />
                Buat Toko
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
