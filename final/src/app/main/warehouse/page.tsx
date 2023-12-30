import { redirect } from "next/navigation";

import { eq, and, like } from "drizzle-orm";

import { db } from "@/db";
import { productTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import AddProductButton from "./_components/AddProductButton";
import GetSerachName from "./_components/GetSearchName";
import ProductPreview from "./_components/ProductPreview";

type Pageprops = {
  searchParams: {
    searchName: string;
    mode: string;
  };
};

export default async function WarehousePage({
  searchParams: { searchName, mode },
}: Pageprops) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
  console.log(searchName);
  const products = await db
    .select({
      id: productTable.displayId,
      productName: productTable.productName,
      sellerDisplayId: productTable.sellerdisplayId,
    })
    .from(productTable)
    .where(and(eq(productTable.sellerdisplayId, userId),like(productTable.productName, `${searchName ?? ""}%`)))
    .execute();

  return (
    <main className="flex min-h-screen items-start rounded-b-xl border-2">
      <div className="w-full flex-col justify-between">
        <div className="flex justify-between px-10 mt-5 ">
          <p className="text-2xl font-semibold">My Products</p>
          <div className="flex items-center justify-center gap-10 text-2xl">
            <GetSerachName />
            <AddProductButton />
          </div>
        </div>
        <div className="grid w-full grid-cols-4 gap-10 overflow-scroll px-10 py-5 mt-5">
          {
            products.map((product) => (
              <ProductPreview
                productId={product.id}
                productName={product.productName}
                mode={mode}
                key={product.id}
              />
            ))}
        </div>
      </div>
    </main>
  );
}
