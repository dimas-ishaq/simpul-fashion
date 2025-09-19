import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center max-w-xl min-h-screen  mx-auto">
      <h2>404 - Halaman Tidak Ditemukan</h2>
      <p>Maaf, halaman yang Anda cari tidak ada.</p>
      <Button asChild variant={"link"}>
        <Link href="/" className="">
          Kembali ke Halaman Utama
        </Link>
      </Button>
    </div>
  );
}
