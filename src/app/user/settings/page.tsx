"use client";

import React, { useRef, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { Header } from "@/components/common/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Aperture, Camera, Pencil, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import SidebarApp from "@/components/common/SidebarApp";

export default function User() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();

  const handleChangeInputPhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileName(file.name);
    }
  };

  const handleCloseDialog = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setFileName("");
    }
  };

  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto">
      <Header role="buyer" />
      <main className="flex items-start px-8 space-x-4">
        <SidebarApp user={user} role="buyer" />
        <div className="flex w-full flex-col">
          <Tabs defaultValue="bio">
            <TabsList>
              <TabsTrigger value="bio">Biodata Diri</TabsTrigger>
              <TabsTrigger value="address">Daftar Alamat</TabsTrigger>
              <TabsTrigger value="payment">Pembayaran</TabsTrigger>
            </TabsList>
            <TabsContent value="bio">
              <Card>
                <CardContent>
                  <div className="w-full flex space-x-8">
                    <div className="flex flex-col space-y-4">
                      <Card>
                        <CardContent>
                          <div className="flex flex-col space-y-4 items-center">
                            <picture>
                              <Image
                                src={"/assets/images/user/profile.png"}
                                width={200}
                                height={344}
                                alt="profile-picture"
                              />
                            </picture>

                            <Dialog
                              open={open}
                              onOpenChange={handleCloseDialog}
                            >
                              <DialogTrigger asChild>
                                <div className="flex space-x-2 w-fit bg-stone-900 px-4 py-1.5 rounded-md text-white text-sm items-center">
                                  <Aperture width={16} />
                                  <span>Ubah Foto</span>
                                </div>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Upload Foto</DialogTitle>
                                  <form
                                    action=""
                                    className="flex flex-col space-y-2"
                                    id="update-profile-pic"
                                  >
                                    <Input
                                      ref={fileInputRef}
                                      type="file"
                                      className="hidden"
                                      onChange={handleFileChange}
                                    />

                                    <Card>
                                      <CardContent className="flex flex-col space-y-4 items-center justify-center">
                                        <Button
                                          type="button"
                                          onClick={handleChangeInputPhoto}
                                          variant={"link"}
                                          className=" w-fit "
                                        >
                                          <Camera /> Pilih Foto
                                        </Button>
                                        {fileName && (
                                          <span className="text-sm text-stone-500">
                                            {fileName}
                                          </span>
                                        )}
                                      </CardContent>
                                    </Card>
                                    {fileName && (
                                      <Button variant={"default"} type="submit">
                                        <Save /> Simpan
                                      </Button>
                                    )}
                                  </form>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </CardContent>
                      </Card>
                      <Button variant="default" asChild>
                        <Link href="/reset-password">Ubah Kata Sandi</Link>
                      </Button>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <div className="flex flex-col mb-4">
                        <h3 className="text-stone-700 font-bold mb-2">
                          Ubah Biodata Diri
                        </h3>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableHead className="w-[100px]">Nama</TableHead>
                              <TableCell className="font-medium">
                                {user?.name}
                              </TableCell>
                              <TableCell>
                                <Dialog>
                                  <DialogTrigger className="cursor-pointer">
                                    <div className="flex space-x-2 items-center">
                                      <Pencil width={16} />
                                      <span className="text-sm">Ubah</span>
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Ubah Nama</DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription>
                                      Kamu hanya dapat mengubah nama 1 kali
                                      lagi. Pastikan nama sudah benar.
                                    </DialogDescription>
                                    <form action="" id="update-name">
                                      <div className="grid gap-3">
                                        <Label htmlFor="name">Nama</Label>
                                        <Input
                                          id="name"
                                          name="name"
                                          defaultValue={user?.name}
                                        />
                                      </div>
                                    </form>
                                    <DialogFooter>
                                      <Button type="submit" variant={"default"}>
                                        Simpan
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableHead className="w-[100px]">
                                Tanggal Lahir
                              </TableHead>
                              <TableCell>
                                {user?.dob
                                  ? user.dob.toLocaleDateString("id-ID")
                                  : "Tanggal lahir tidak tersedia"}
                              </TableCell>
                              <TableCell>
                                <Dialog>
                                  <DialogTrigger className="cursor-pointer">
                                    <div className="flex space-x-2 items-center">
                                      <Pencil width={16} />
                                      <span className="text-sm">Ubah</span>
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>
                                        Are you absolutely sure?
                                      </DialogTitle>
                                      <DialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete your account and
                                        remove your data from our servers.
                                      </DialogDescription>
                                    </DialogHeader>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableHead className="w-[100px]">
                                Jenis Kelamin
                              </TableHead>
                              <TableCell>
                                {user?.gender
                                  ? user.gender
                                  : "Gender tidak tersedia"}
                              </TableCell>
                              <TableCell>
                                <Dialog>
                                  <DialogTrigger className="cursor-pointer">
                                    <div className="flex space-x-2 items-center">
                                      <Pencil width={16} />
                                      <span className="text-sm">Ubah</span>
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>
                                        Are you absolutely sure?
                                      </DialogTitle>
                                      <DialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete your account and
                                        remove your data from our servers.
                                      </DialogDescription>
                                    </DialogHeader>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-stone-700 font-bold mb-4">
                          Ubah Kontak
                        </h3>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableHead className="w-[100px]">Email</TableHead>
                              <TableCell className="font-medium">
                                {user?.email}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableHead className="w-[100px]">
                                Nomor Hp
                              </TableHead>
                              <TableCell>
                                {user?.mobile_number
                                  ? user.mobile_number
                                  : "Nomor hp tidak tersedia"}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="address">
              Change your password here.
            </TabsContent>
            <TabsContent value="payment">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
