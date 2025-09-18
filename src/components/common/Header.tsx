"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";

export const Header = ({ role }: { role: string | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Periksa posisi scroll
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Tambahkan event listener saat komponen dipasang
    window.addEventListener("scroll", handleScroll);

    // Bersihkan event listener saat komponen dilepas
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (role == "buyer" || role == null) {
    return (
      <header
        className={`flex h-20 items-center w-full transition-shadow duration-300 ${
          isScrolled ? "shadow-lg" : "shadow-xs"
        } bg-white dark:bg-neutral-950/90  mb-8 px-8 sticky top-0 z-10 `}
      >
        <Navbar />
      </header>
    );
  }
  if (role == "seller") {
    return <header>Header Seller</header>;
  }
  if (role == "admin") {
    return <header>Header Admin</header>;
  }
};
