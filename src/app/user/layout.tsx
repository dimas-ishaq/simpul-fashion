import "../globals.css";
import { Toaster } from "@/components/ui/sonner";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>{children}</main>
      <Toaster position="top-right" expand={true} />
    </>
  );
}
