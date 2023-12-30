import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { cartsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import NoButton from "./_components/NoButton";
import YesButton from "./_components/YesButton";

async function ConfirmPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  const carts = await db
    .select({
      displayId: cartsTable.displayId,
      buyQuantity: cartsTable.buyQuantity,
    })
    .from(cartsTable)
    .where(eq(cartsTable.userId, userId))
    .execute();

  return (
    <div className="flex h-full w-full flex-wrap justify-center gap-8 rounded-b-xl border-2 px-10">
      <div className="flex h-40 w-full items-end justify-center py-4 text-3xl font-semibold">
        <span>你確定要結帳嗎？</span>
      </div>
      <div className="flex h-40 w-full items-start justify-center gap-4">
        <NoButton />
        <YesButton carts={carts} />
      </div>
    </div>
  );
}

export default ConfirmPage;
