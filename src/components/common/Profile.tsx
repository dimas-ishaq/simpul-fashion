import React from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { splitName } from "@/lib/helper";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { UserTypes } from "@/types/User";
import {
  BadgeDollarSign,
  BadgePercent,
  Bolt,
  Heart,
  MapPinHouse,
  MessageCircle,
  X,
} from "lucide-react";
import ButtonLogout from "./ButtonLogout";

export default function Profile({ user }: { user: UserTypes }) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Avatar>
          <AvatarImage src="https://avatar.iran.liara.run/public/12" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerClose>
            <X />
          </DrawerClose>
          <DrawerTitle content=""></DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col items-center ">
          <div className="flex flex-col mb-4 ">
            <Link href="/user/settings" className="gap-y-2">
              <div className="flex flex-col items-center gap-x-3 p-1.5 rounded-sm hover:bg-stone-100">
                <Avatar>
                  <AvatarImage src="https://avatar.iran.liara.run/public/12" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-stone-600 text-base">
                  {splitName(user.name)}
                </span>
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center px-2">
            <ul className="flex flex-col gap-y-2">
              <li>
                <Link
                  href={"/"}
                  className=" text-stone-600 flex items-center gap-x-3 hover:bg-stone-100 p-1.5"
                >
                  <BadgeDollarSign />
                  Pembelian
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className=" text-stone-600 flex items-center gap-x-3 hover:bg-stone-100 p-1.5"
                >
                  <BadgePercent />
                  Promo
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className=" text-stone-600 flex items-center gap-x-3 hover:bg-stone-100 p-1.5"
                >
                  <MessageCircle />
                  Chat
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className=" text-stone-600 flex items-center gap-x-3 hover:bg-stone-100 p-1.5"
                >
                  <Heart />
                  Whislist
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className=" text-stone-600 flex items-center gap-x-3 hover:bg-stone-100 p-1.5"
                >
                  <MapPinHouse />
                  Alamat
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className=" text-stone-600 flex items-center gap-x-3 hover:bg-stone-100 p-1.5"
                >
                  <Bolt />
                  Pengaturan
                </Link>
              </li>
              <li>
                <ButtonLogout />
              </li>
            </ul>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
