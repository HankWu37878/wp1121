import { redirect } from "next/navigation";

import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarRateIcon from "@mui/icons-material/StarRate";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { commentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
// import DeleteButton from "./_components/DeleteButton";
// import EditButton from "./_components/EditButton";
import type { Product } from "@/lib/types";

import EditButton from "./_components/EditButton";
import ProductDescription from "./_components/ProductDescription";
import ProductDetail from "./_components/ProductDetail";
import ReviewInput from "./_components/ReviewInput";
import {
  getProductDetail,
  getProductDetail_1,
  getProductDetail_2,
  getProductPhotos,
} from "./_components/actions";

type Props = {
  params: { productId: string };
};

async function ProductPage({ params }: Props) {
  const images = await getProductPhotos(params.productId);
  const detail_1 = await getProductDetail_1(params.productId);
  const detail_2 = await getProductDetail_2(params.productId);

  const comments = await db.query.commentsTable.findMany({
    where: eq(commentsTable.productId, params.productId),
    with: {
      user: {
        columns: {
          name: true,
        },
      },
    },
    columns: {
      content: true,
      userId: true,
      rate: true,
    },
  });

  let rate: GLfloat = 0;
  comments.forEach((comment) => {
    rate += comment.rate;
  });

  rate = rate / comments.length;
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  // const stylesId = await getAllStyleId(params.productId);
  const productName: Omit<Product, "id" | "sellerDisplayId"> = {
    productName: detail_1?.productName ?? "",
    productDescription: detail_1?.productDescription ?? "",
  };
  const detail = await getProductDetail(params.productId);
  return (
    <div className="flex h-full w-full grow flex-wrap justify-center overflow-y-scroll rounded-b-xl border-2 px-10">
      <div className="flex flex-row">
        <div className="flex w-full flex-row flex-wrap bg-white">
          <ProductDetail
            detail_1={detail_1}
            detail_2={detail_2}
            rate={rate.toString().substring(0, 3)}
            commentQuantity={comments.length ?? 0}
            images={images}
          />
        </div>
        <div className="ml-[95px] mt-[85px]">
          <EditButton
            productId={params.productId}
            productName={productName}
            productDetail={detail}
          />
        </div>
      </div>
      <div className="mt-16 flex justify-between px-8 gap-10 w-full min-h-screen">
        <ProductDescription productId={params.productId} />
        <div className="min-h-screen grow overflow-y-scroll rounded-md border-2 bg-white">
          <p className="p-5 text-2xl font-normal">評論</p>
          {userId !== detail_1?.sellerdisplayId && (
            <ReviewInput userId={userId} productId={params.productId} />
          )}
          {comments.length === 0 && (
            <p className="mt-10 w-full text-center text-gray-500">
              There's still no comment for this product.
            </p>
          )}
          <div className="mt-5 w-full flex-col gap-2">
            {comments.map((comment, index) => (
              <div key={index} className="w-full border px-10 py-16">
                <div className="flex gap-1 text-xs">
                    {comment.rate === 1 && (
                      <>
                        <StarRateIcon className="text-yellow-500" />
                        <StarOutlineIcon />
                        <StarOutlineIcon />
                        <StarOutlineIcon />
                        <StarOutlineIcon />
                      </>
                    )}
                    {comment.rate === 2 && (
                      <>
                        <StarRateIcon className="text-yellow-500" />
                        <StarRateIcon className="text-yellow-500" />
                        <StarOutlineIcon />
                        <StarOutlineIcon />
                        <StarOutlineIcon />
                      </>
                    )}
                    {comment.rate === 3 && (
                      <>
                        <StarRateIcon className="text-yellow-500" />
                        <StarRateIcon className="text-yellow-500" />
                        <StarRateIcon className="text-yellow-500" />
                        <StarOutlineIcon />
                        <StarOutlineIcon />
                      </>
                    )}
                    {comment.rate === 4 && (
                      <>
                        <StarRateIcon className="text-yellow-500" />
                        <StarRateIcon className="text-yellow-500" />
                        <StarRateIcon className="text-yellow-500" />
                        <StarRateIcon className="text-yellow-500" />
                        <StarOutlineIcon />
                      </>
                    )}
                    {comment.rate === 5 && (
                      <>
                        <StarRateIcon className="text-yellow-500" />
                        <StarRateIcon className="text-yellow-500" />
                        <StarRateIcon className="text-yellow-500" />
                        <StarRateIcon className="text-yellow-500" />
                        <StarRateIcon className="text-yellow-500" />
                      </>
                    )}
                  </div>
                  <div className="flex justify-between mt-2">
                      <p className="font-medium">{comment.user.name}:</p>
                      <p className="w-4/5">{comment.content}</p>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
