"use client";

//import type { Product, ProductDetail } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function useCart() {
  // const [loading, setLoading] = useState(false);
  const router = useRouter();
  const deleteCart = async (
    cartId: string,
  ) => {
    //setLoading(true);
    try {
      await fetch("/api/cart", {
        method: "DELETE",
        body: JSON.stringify({
          cartId
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.refresh();
      // setLoading(false);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const updateProductDetail = async (
    cartId: string,
    buyQuantity: number,
  ) => {
    try {
      const res = await fetch("/api/detail", {
        method: "PUT",
        body: JSON.stringify({
          cartId,
          buyQuantity,
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
    // loading,
    deleteCart,
    updateProductDetail,
  };
}
