"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import type { Product, ProductDetail } from "@/lib/types";

export default function useProducts() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const addProduct = async (
    userId: string,
    productName: Product["productName"],
    productDescription: Product["productDescription"],
  ) => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          productName: productName,
          productDescription: productDescription,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      router.refresh();
      // setLoading(false);
      return data.newProductId;
    } catch (error) {
      console.log(error);
    }
  };

  const addProductDetail = async (
    productId: ProductDetail["id"],
    productQuantity: ProductDetail["quantity"],
    productPrice: ProductDetail["price"],
    productStyle: ProductDetail["style"],
    productImageLink: ProductDetail["imageLink"],
  ) => {
    try {
      const res = await fetch("/api/detail", {
        method: "POST",
        body: JSON.stringify({
          productId: productId,
          productQuantity: productQuantity,
          productPrice: productPrice,
          productStyle: productStyle,
          productImageLink: productImageLink,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      router.refresh();
      // setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loading,
    addProduct,
    addProductDetail,
  };
}
