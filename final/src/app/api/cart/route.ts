import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { cartsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const deleteCartSchema = z.object({
  cartId: z.string(),
});

type deleteCartRequest = z.infer<typeof deleteCartSchema>;

export async function DELETE(request: NextRequest) {
  const data = await request.json();
  try {
    deleteCartSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { cartId } = data as deleteCartRequest;

  try {
    await db.delete(cartsTable).where(eq(cartsTable.displayId, cartId)).execute();

    return NextResponse.json(
      { message: "Cart successfully deleted."},
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
