"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { publicEnv } from "@/lib/env/public";
import useCart from "@/hooks/useCart";

type Props = {
  cartId: string;
};

function TrashButton({ cartId }: Props) {
  const router = useRouter();
  const { deleteCart } = useCart();
  return (
    <form
      action={async () => {
        await deleteCart(cartId);
        router.refresh();
        router.push(`${publicEnv.NEXT_PUBLIC_BASE_URL}/main/shop/cart`);
      }}
    >
      <button type={"submit"}>
        <Image src="/delete.png" alt="delete photo" width={20} height={20} />
      </button>
    </form>
  );
}

export default TrashButton;
