"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function NoButton() {
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
      className="h-12 rounded-md border-2 bg-white px-4 hover:bg-slate-200 hover:shadow-2xl"
    >
      Cancel
    </button>
  );
}
