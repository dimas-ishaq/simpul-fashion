import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { BadgePercent, Handbag } from "lucide-react";

export const Hero = () => {
  return (
    <div className="w-full h-96 flex flex-row items-center gap-x-16 mb-8 justify-center bg-stone-100 dark:bg-stone-900 rounded-sm">
      <div className="w-[520px] ">
        <div className="flex flex-col mb-4">
          <h1 className="text-5xl font-bold font-poppins">
            <span className="text-red-500">Simpul Fashion</span>
          </h1>
          <h2 className="text-3xl font-bold mb-2">
            Fashion Simple, Gaya Maksimal
          </h2>
          <p className="text-stone-500 ">
            Dari kasual hingga formal, semua gaya ada di sini untuk lengkapi
            penampilanmu setiap hari.
          </p>
        </div>
        <div className="flex gap-x-4">
          <Button variant="default">
            <Handbag /> Mulai Belanja
          </Button>
          <Button variant="outline">
            <BadgePercent /> Promo Hari Ini
          </Button>
        </div>
      </div>
      <div className="">
        <Image
          src="/assets/images/home/fashion-1.png"
          alt="fashion"
          width="560"
          height="384"
        />
      </div>
    </div>
  );
};
