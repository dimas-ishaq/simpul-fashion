"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TipTapEditor from "@/components/common/TipTapEditor";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { Loader2, Plus, TrashIcon, UploadIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { CategoryTypes } from "@/types/Category";

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const imageItemSchema = z
  .instanceof(File)
  .refine((file) => file.size >= 10_000, {
    message: "Ukuran gambar minimal 10KB",
  })
  .refine((file) => file.size <= 5_000_000, {
    message: "Ukuran gambar maksimal 5MB",
  })
  .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
    message: "Hanya mendukung PNG atau JPEG",
  });

const formSchema = z.object({
  images: z
    .array(z.union([imageItemSchema, z.null()])) // support File atau null
    .transform((arr) => arr.filter((f): f is File => f instanceof File)) // buang null saat validasi
    .refine((arr) => arr.length >= 1, {
      message: "Minimal 1 gambar produk",
    })
    .refine((arr) => arr.length <= 4, {
      message: "Maksimal 4 gambar",
    }),
  name: z
    .string("Nama produk wajib diisi")
    .trim()
    .min(3, "Nama minimal 3 karakter")
    .max(120, "Nama maksimal 120 karakter"),

  stock: z.coerce
    .number()
    .int("Stok harus bilangan bulat")
    .min(0, "Stok tidak boleh negatif"),

  price: z.coerce
    .number()
    .nonnegative("Harga tidak boleh negatif")
    .refine((val) => Number.isFinite(val), { message: "Harga tidak valid" }),

  status: z.boolean("Status wajib dipilih"),
  description: z
    .string("Deskripsi wajib diisi")
    .trim()
    .min(200, "Deskripsi minimal 200 karakter")
    .max(2000, "Deskripsi maksimal 2000 karakter"),

  categories: z
    .array(z.string().min(1, "ID kategori tidak valid"))
    .min(1, "Minimal pilih 1 kategori")
    .max(10, "Maksimal 10 kategori"),
});

async function postProduct(formData: FormData) {
  try {
    const response = await fetch(`http://localhost:3000/api/products`, {
      credentials: "include",
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Gagal menambah produk.");
    return response.json();
  } catch (error) {
    console.log(`Terjadi kesalahan ${error}`);
    return null;
  }
}

export default function AddProductForm({
  categories,
  onFormSubmit,
}: {
  categories: CategoryTypes[];
  onFormSubmit: () => void;
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [null], // awalnya 1 kotak kosong
      name: "",
      stock: "1",
      price: "1",
      description: "",
      status: false,
      categories: [],
    },
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ formData }: { formData: FormData }) => postProduct(formData),
    onSuccess: (data) => {
      onFormSubmit();
      toast.success(data.message);
      router.refresh();
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    // 🔹 Handle data key-value biasa
    const keyValueFields: (keyof z.infer<typeof formSchema>)[] = [
      "name",
      "stock",
      "price",
      "description",
    ];

    keyValueFields.forEach((field) => {
      const value = data[field];
      if (value !== null && value !== undefined) {
        formData.append(field, String(value));
      }
    });

    // 🔹 Handle data array (contoh: categories)
    formData.append("categories", JSON.stringify(data.categories));

    // Tambahkan file ke FormData
    data.images?.forEach((file) => {
      if (file instanceof File) {
        formData.append("images", file);
      }
    });

    mutation.mutate({ formData });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <Controller
          control={form.control}
          name="images"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Gambar Produk</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 md:grid-cols-4  place-items-start max-w-9/12">
                  {field.value.map((file, index) => (
                    <div
                      key={index}
                      className="relative group w-32 h-32 border-2 border-dashed rounded-xl flex items-center justify-center overflow-hidden"
                    >
                      {/* input hidden */}
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const newFiles = [...field.value];
                          newFiles[index] = e.target.files?.[0] ?? null;
                          field.onChange(newFiles);
                        }}
                      />

                      {/* preview */}
                      {file ? (
                        <Image
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-full h-full object-cover"
                          width={100}
                          height={100}
                        />
                      ) : (
                        <span className="text-gray-400">
                          <Plus />
                        </span>
                      )}

                      {/* hover action */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end justify-center">
                        <div className="flex gap-2 pb-2">
                          <Button
                            variant={"secondary"}
                            onClick={() =>
                              document
                                .querySelectorAll<HTMLInputElement>(
                                  'input[type="file"]'
                                )
                                [index]?.click()
                            }
                            className="rounded-full"
                          >
                            <UploadIcon className="w-5 h-5" />
                          </Button>

                          {file && (
                            <Button
                              variant={"destructive"}
                              onClick={() => {
                                const newFiles = [...field.value];
                                newFiles[index] = null;
                                field.onChange(newFiles);
                              }}
                              className="rounded-full"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* tombol tambah box baru */}
                  {field.value.length < 4 &&
                    field.value[field.value.length - 1] !== null && (
                      <Button
                        type="button"
                        onClick={() => field.onChange([...field.value, null])}
                        className="w-32 h-32 border-2 border-dashed rounded-xl flex items-center justify-center"
                      >
                        <Plus />
                      </Button>
                    )}
                </div>
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Produk</FormLabel>
                <FormControl>
                  <Input placeholder="contoh: Handphone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stok Produk</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    value={field.value ? String(field.value) : ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga Produk</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    value={field.value ? String(field.value) : ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <MultiSelect
                  onValuesChange={field.onChange}
                  values={field.value}
                >
                  <FormControl>
                    <MultiSelectTrigger className="w-full">
                      <MultiSelectValue placeholder="Pilih kategori" />
                    </MultiSelectTrigger>
                  </FormControl>
                  <MultiSelectContent>
                    <MultiSelectGroup>
                      {categories.map((category: CategoryTypes) => {
                        return (
                          <MultiSelectItem
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </MultiSelectItem>
                        );
                      })}
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status Produk</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value ? "true" : "false"}
                    onValueChange={(val) => field.onChange(val === "true")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Status Produk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Published</SelectItem>
                      <SelectItem value="false">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Deskripsi Produk</FormLabel>
              <FormControl>
                <div>
                  <TipTapEditor onChange={field.onChange} />
                </div>
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <>
              <Loader2 className="animate-spin" />
              Menambahkan produk...
            </>
          ) : (
            "Simpan"
          )}
        </Button>
      </form>
    </Form>
  );
}
