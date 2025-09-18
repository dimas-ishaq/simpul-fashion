import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export default function ButtonLogout() {
  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    localStorage.removeItem("auth-storage");
    toast.success("Berhasil logout");
    setTimeout(() => window.location.reload(), 3000);
  }

  return (
    <Button onClick={handleLogout} variant={"ghost"}>
      <LogOut /> Keluar
    </Button>
  );
}
