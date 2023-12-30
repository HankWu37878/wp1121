"use client";

import { useRouter, useSearchParams, redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import useCart from "@/hooks/useCart";
import { publicEnv } from "@/lib/env/public";

type Props = {
  carts: {
    displayId: string;
    buyQuantity: number;
  }[];
};

function YesButton({ carts }: Props) {
  const session = useSession();
  const userId = session?.data?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
  const router = useRouter();
  const searchParams = useSearchParams();
  
   
  const { deleteCart, updateProductDetail } = useCart();

  const handleDelete = async () => {
    try {
      for (let i = 0; i < carts.length; i++) {
        await updateProductDetail(carts[i].displayId, carts[i].buyQuantity);
        await deleteCart(carts[i].displayId);
      }

      const params = new URLSearchParams(searchParams);
      params.set("mode", "buyer"!);
      router.push(`/main/shop/cart/confirm/success?${params.toString()}`);
    } catch (error) {
      console.error("Error deleting carts:", error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleDelete();
      }}
    >
      <button
        type={"submit"}
        className="h-12 rounded-md border-2 bg-teal-900 px-4 text-white hover:bg-teal-800 "
      >
        Confirm
      </button>
    </form>
  );
}

export default YesButton;
