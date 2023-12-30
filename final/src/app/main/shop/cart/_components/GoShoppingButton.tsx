"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function GoShoppingButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.set("mode", "buyer"!);
  const handleOnClick = () => {
    router.push(`/main/shop?${params.toString()}`);
  };
  return (
    <button
      onClick={handleOnClick}
      className="h-12 rounded-md border-2 bg-teal-900 px-4 text-white hover:bg-teal-800 "
    >
      Go Shopping
    </button>
  );
}
