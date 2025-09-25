import { StoreTypes } from "@/types/Store";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { MapPin } from "lucide-react";

export default function StoreInfo({ store }: { store: StoreTypes }) {
  return (
    <div className="px-16">
      <Card>
        <CardContent>
          <div className="flex space-x-4 ">
            <Image
              src={"/assets/images/user/profile.png"}
              height={64}
              width={64}
              alt="store-logo"
              className="rounded-full object-cover aspect-1/1"
            />
            <div>
              <div className="font-bold capitalize">{store.name}</div>
              <div className="flex space-x-2 items-center text-sm">
                <MapPin size={16} />
                <span>{store.address}</span>
              </div>
              <div>rating + jumlah review</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
