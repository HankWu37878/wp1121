import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { cartsTable, productDetailTable } from "@/db/schema";
import type { ProductDetail } from "@/lib/types";
import { eq } from "drizzle-orm";

const addProductDetailSchema = z.object({
  productId: z.string(),
  productQuantity: z.number(),
  productPrice: z.string().min(1).max(20),
  productStyle: z.string().min(1).max(20),
  productImageLink: z.string(),
});

type addProductDetailRequest = z.infer<typeof addProductDetailSchema>;

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    addProductDetailSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const {
    productId,
    productQuantity,
    productPrice,
    productStyle,
    productImageLink,
  } = data as addProductDetailRequest;

  try {
    const [temp] = await db
      .insert(productDetailTable)
      .values({
        productId: productId,
        productQuantity: productQuantity,
        productPrice: productPrice,
        productStyle: productStyle,
        productImageLink: productImageLink,
      })
      .onConflictDoNothing()
      .returning();

    const newProductDetail: ProductDetail = {
      id: temp.displayId,
      productId: temp.productId,
      quantity: temp.productQuantity,
      sold: temp.productSold ?? 0,
      price: temp.productPrice,
      imageLink: temp.productImageLink,
      style: temp.productStyle,
    };

    return NextResponse.json(
        { newProductDetail: newProductDetail },
        { status: 200 },
      );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

const editProductDetailSchema = z.object({
  cartId: z.string(),
  buyQuantity: z.number(),
});

type editProductDetailRequest = z.infer<typeof editProductDetailSchema>;

export async function PUT(request: NextRequest) {
  const data = await request.json();

  try {
    editProductDetailSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const {
    cartId,
    buyQuantity,
  } = data as editProductDetailRequest;

  try {
    const [cart] = await db.select({
      ProductDetailId: cartsTable.productDetailId,
    }).from(cartsTable)
    .where(eq(cartsTable.displayId, cartId))
    .execute();

    const [ProductDetailtarget] = await db.select(
      {
        productQuantity: productDetailTable.productQuantity,
        productSold: productDetailTable.productSold,
      })
      .from(productDetailTable)
      .where(eq(productDetailTable.displayId, cart.ProductDetailId))
      .execute();

    if (!ProductDetailtarget) {
      return NextResponse.json(
        { message: "Something went wrong." },
        { status: 500 },
      );
    }

    if (ProductDetailtarget.productQuantity < buyQuantity) {
      return NextResponse.json(
        { message: "There's not enough quantity of this product!" },
        { status: 500 },
      );
    }

    await db.update(productDetailTable).set({
      productQuantity:  ProductDetailtarget.productQuantity - buyQuantity,
      productSold: (ProductDetailtarget.productSold ?? 0) + buyQuantity,
    })
    .where(eq(productDetailTable.displayId, cart.ProductDetailId))
    .execute();
      


    return NextResponse.json(
        { message: "Product Detail Sucessfully Update." },
        { status: 200 },
      );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
