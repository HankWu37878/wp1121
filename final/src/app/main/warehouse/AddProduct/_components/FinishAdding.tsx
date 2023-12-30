import { useState, type FormEvent } from "react";

import { useSession } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

// Import FormEvent type from React
import useProducts from "@/hooks/useProduct";
import { publicEnv } from "@/lib/env/public";
import type { Product, ProductDetail } from "@/lib/types";

type FinishProps = {
  price: string;
  style: string;
  quantity: number;
  image: string;
  productFisrtStep: Omit<Product, "id" | "sellerDisplayId">;
  productDetail: Omit<ProductDetail, "id" | "productId" | "sold">[];
};

export default function FinishAdding({
  price,
  style,
  quantity,
  image,
  productFisrtStep,
  productDetail,
}: FinishProps) {
  const [productDetailTemp, setProductDetailTemp] =
    useState<Omit<ProductDetail, "id" | "productId" | "sold">[]>(productDetail);
  const { loading, addProduct, addProductDetail } = useProducts();
  const router = useRouter();
  const session = useSession();
  const searchParams = useSearchParams();
  const userId = session?.data?.user?.id;

  // const productName = "wine";
  // const productDescription = "good";
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  if (price === "" || style === "" || quantity <= 0 || image === "") {
    alert("Please finish all the column or go to last step to finish addig");
    return;
  }
  const handleFinish = async (e: FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (productDetailTemp[productDetailTemp.length] === undefined) {
      const temp: Omit<ProductDetail, "id" | "productId" | "sold">[] =
        productDetail;
      temp.push({ price, style, quantity, imageLink: image });
      setProductDetailTemp(temp);
    }

    // console.log(productFisrtStep);
    try {
      console.log("start trying");
      const newProductId = await addProduct(
        userId,
        productFisrtStep.productName,
        productFisrtStep.productDescription,
      );
      for (let i = 0; i < productDetailTemp.length; i++) {
        await addProductDetail(
          newProductId,
          productDetailTemp[i].quantity,
          productDetailTemp[i].price,
          productDetailTemp[i].style,
          productDetailTemp[i].imageLink,
        );
      }
      if (loading) {
        return (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        );
      }
      router.refresh();
      const params = new URLSearchParams(searchParams);
      params.set("mode", "seller"!);
      router.push(`/main/warehouse/${newProductId}?${params.toString()}`);
      // Additional logic or redirection can be added here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleFinish} // Attach the handler to the onSubmit event
      className="mb-3 w-full rounded-lg border-2 bg-teal-900 py-1 text-center text-sm text-white hover:bg-teal-700"
    >
      <button data-testid="add-submit-button" type="submit" className="w-full">
        Finish
      </button>
    </form>
  );
}
