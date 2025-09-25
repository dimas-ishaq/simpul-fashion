"use client";

import React from "react";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import Image from "next/image";
import { Button } from "../ui/button";
import { LogIn, ShoppingCart, Store, UserRoundPen } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import Profile from "./Profile";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggle";
import { Badge } from "../ui/badge";
import ButtonCart from "./ButtonCart";

function ButtonStore({ roles }: { roles: string[] }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">
          <Store />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-4.5 w-fit" align="center">
        {roles.includes("seller") ? (
          <Button asChild>
            <Link href={"/seller/dashboard"}>
              <Store /> Dashboard Toko
            </Link>
          </Button>
        ) : (
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-stone-500 text-center">
              Anda belum memiliki toko
            </p>
            <Button asChild>
              <Link href={"/seller/register"}>
                <Store /> Buka Toko Gratis
              </Link>
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export const Navbar = () => {
  const { user } = useAuthStore();

  return (
    <nav className="flex items-center w-full gap-x-4 justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex shrink-0 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/logo/logo.svg"
              alt="brand-logo"
              width={32}
              height={32}
            />
            <span className="text-xl font-bold">SIMPUL FASHION</span>
          </Link>
        </div>
        <ul className="flex gap-x-4">
          <li>
            <Link href="/categories" className="">
              Categories
            </Link>
          </li>
          <li>
            <Link href="/promo" className="">
              Promo
            </Link>
          </li>
        </ul>
      </div>

      <div className="w-6/12 justify-center">
        <SearchBar />
      </div>
      <div className="flex items-center space-x-4 justify-center ">
        {user && user.roles && <ButtonStore roles={user.roles} />}

        <ButtonCart />

        {user ? (
          <Profile user={user} />
        ) : (
          <div className="flex items-center justify-end gap-x-2">
            <Button variant="secondary" asChild>
              <Link href="/sign-up">
                <UserRoundPen />
                Daftar
              </Link>
            </Button>
            <Button variant="default" asChild>
              <Link href="/sign-in">
                <LogIn />
                Masuk
              </Link>
            </Button>
          </div>
        )}
      </div>
      <ModeToggle />
    </nav>
  );
};
