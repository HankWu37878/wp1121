"use client";

import { useRouter, useSearchParams } from "next/navigation";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";

export default function CartButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.set("mode", "buyer"!);
  const handleOnClick = () => {
    router.push(`/main/shop/cart?${params.toString()}`);
  };
  return (
    <IconButton onClick={handleOnClick} className="hover:text-lime-700">
      <ShoppingCartIcon />
    </IconButton>
  );
}
