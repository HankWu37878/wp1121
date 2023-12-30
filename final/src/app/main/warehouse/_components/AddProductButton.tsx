"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function AddProductButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const handleOnClick = () => {
    params.set("mode", "seller"!);
    router.push(`/main/warehouse/AddProduct?${params.toString()}`);
  };
  return (
    <button
      onClick={handleOnClick}
      className="rounded-full px-2 text-4xl hover:bg-slate-100"
    >
      +
    </button>
  );
}
