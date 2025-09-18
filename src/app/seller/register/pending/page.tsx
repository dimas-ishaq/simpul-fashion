import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function StorePending() {
  return (
    <div className="w-full grid grid-cols-3 min-h-screen  ">
      <Button asChild className="w-fit mt-8 ml-8 " variant={"link"}>
        <Link href={"/"}>
          <MoveLeft /> Kembali
        </Link>
      </Button>
      <div className="max-w-md mx-auto flex justify-center items-center ">
        <Card>
          <CardContent>
            <div className="flex flex-col items-center justify-center   ">
              <div className="mb-8">
                <Image
                  src={"/assets/logo/logo.svg"}
                  alt="brand"
                  width={64}
                  height={64}
                />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800">
                  Toko Anda Sedang Diproses
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  Terima kasih telah mendaftar. Toko Anda sekarang sedang dalam
                  proses peninjauan oleh tim kami.
                </p>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-800">
                    Proses ini biasanya membutuhkan waktu{" "}
                    <strong>1-3 hari kerja</strong>. Kami akan mengirimkan
                    notifikasi melalui email setelah toko Anda disetujui.
                  </p>
                </div>
              </div>

              <div className="mt-8 w-full">
                <h2 className="text-lg font-semibold text-gray-700">
                  Yang Bisa Anda Lakukan Sekarang
                </h2>
                <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700">
                  <li>
                    <strong>Lengkapi Profil Toko</strong>: Pastikan semua
                    informasi toko Anda sudah lengkap dan akurat.
                  </li>
                  <li>
                    <strong>Siapkan Produk Anda</strong>: Mulai unggah foto dan
                    deskripsi produk.
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
