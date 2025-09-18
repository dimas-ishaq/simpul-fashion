"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import CategoryForm from "../../../../../components/common/CategoryForm";

export default function ButtonAddCategory() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <CirclePlus /> <span>Add Category</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Tambah kategori dan deskripsi baru
          </DialogDescription>
        </DialogHeader>
        <CategoryForm handleCloseDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
