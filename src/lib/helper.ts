export function splitName(name: string): string {
  return name.split(" ")[0];
}

export function getDateMonthYear({
  date,
}: {
  date: Date | string | null | undefined;
}) {
  if (date) {
    const dateObject = typeof date === "string" ? new Date(date) : date;

    // Now, call toLocaleDateString() on the valid Date object.
    const formattedIndoDate = dateObject.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formattedIndoDate;
  }
  return null; // or an empty string, or a placeholder like "N/A"
}

export function generateSlug(param: string): string {
  return param.toLocaleLowerCase().split(" ").join("-");
}

export function formatRupiah(amount: string | number) {
  // 1. Konversi input ke tipe data number
  const numericAmount = Number(amount);

  // 2. Periksa apakah hasil konversi adalah angka valid
  if (isNaN(numericAmount)) {
    return "Invalid number";
  }

  // 3. Gunakan Intl.NumberFormat untuk format yang lebih andal
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount);
}
