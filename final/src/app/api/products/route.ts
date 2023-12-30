import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { productTable } from "@/db/schema";

const addProductSchema = z.object({
  userId: z.string(),
  productName: z.string().min(1).max(100),
  productDescription: z.string().min(1).max(300),
});

type addProductRequest = z.infer<typeof addProductSchema>;

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    addProductSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { userId, productName, productDescription } = data as addProductRequest;

  try {
    const [temp] = await db
      .insert(productTable)
      .values({
        productName: productName,
        productDescription: productDescription,
        sellerdisplayId: userId,
      })
      .onConflictDoNothing()
      .returning({ newProductId: productTable.displayId })
      .execute();

    return NextResponse.json(
      { newProductId: temp.newProductId },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
