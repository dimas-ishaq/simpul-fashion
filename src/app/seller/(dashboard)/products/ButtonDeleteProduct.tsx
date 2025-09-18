"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

async function deleteProductById(productId: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/products`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        productId,
      }),
    });

    const { message } = await response.json();
    if (response.ok) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  } catch (error) {
    console.error(`Terjadi kesalahan ${error}`);
    return null;
  }
}

export default function ButtonDeleteProduct({
  productId,
}: {
  productId: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: deleteProductById,
    onSuccess: () => {
      setOpen(false);
      router.refresh();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"} size={"sm"}>
          <Trash />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Batal</Button>
          </DialogClose>
          <Button
            variant={"destructive"}
            onClick={() => mutation.mutate(productId)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="animate-spin" />
                Menghapus produk ...
              </>
            ) : (
              "Hapus"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
