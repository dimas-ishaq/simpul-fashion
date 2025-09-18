import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../../../../components/ui/button";
type ButtonBanUserProps = {
  id: string;
};
export default function ButtonBanUser({ id }: ButtonBanUserProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} size={"sm"}>
          Ban
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
