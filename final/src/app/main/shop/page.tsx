import { redirect } from "next/navigation";

import GetSerachName from "../warehouse/_components/GetSearchName";
import ProductPreview from "../shop/_components/ProductPreview";
import { like } from "drizzle-orm";

import { db } from "@/db";
import { productTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import CartButton from "./_components/CartButton";

type Pageprops = {
  searchParams: {
    searchName: string;
    mode: string;
  }
};

export default async function ShopPage({
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
    })
    .from(productTable)
    .where(like(productTable.productName, `${searchName ?? ""}%`))
    .execute();

  return (
    <main className="flex min-h-screen items-start rounded-b-xl border-2">
      <div className="w-full flex-col justify-between">
        <div className="mt-5 flex justify-between px-10 ">
          <p className="text-2xl font-semibold">Products</p>
          <div className="flex items-center justify-center gap-10 text-2xl">
            <GetSerachName />
            <CartButton />
          </div>
        </div>
        <div className="mt-5 grid w-full grid-cols-4 gap-10 overflow-scroll px-10 py-5">
          {products.map((product) => (
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
