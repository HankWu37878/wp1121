"use server";
import { redirect } from "next/navigation";


import { db } from "@/db";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import { eq } from "drizzle-orm";
import { productDetailTable } from "@/db/schema";

export async function getProductDetails(productId: string) {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
    }
    
    const productDetails = await db.select({
        price: productDetailTable.productPrice,
        quantity: productDetailTable.productQuantity,
        sold: productDetailTable.productSold,
        imageLink: productDetailTable.productImageLink,
    })
    .from(productDetailTable)
    .where(eq(productDetailTable.productId, productId))
    .execute();

  
    return productDetails;
  }

