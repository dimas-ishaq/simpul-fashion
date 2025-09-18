/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { BadgeCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

async function handleVerifyStore(id: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/stores/verify-store?storeId=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    const { message } = await response.json();

    if (response.ok) {
      return toast.success(message);
    }
    toast.error(message);
  } catch (error: any) {
    toast.error(error.message);
  }
}

export default function ButtonVerifyStore({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: handleVerifyStore,
    onSuccess: () => {
      setOpen(false);
      router.refresh();
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"sm"}>
          <BadgeCheck /> Verify
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verifikasi Toko</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin memverifikasi toko ini? Tindakan ini akan
            mengubah status toko menjadi <strong>Verified</strong> dan tidak
            dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Batal</Button>
          </DialogClose>
          <Button
            onClick={() => mutation.mutate(id)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="animate-spin" />
                Memverifikasi...
              </>
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
