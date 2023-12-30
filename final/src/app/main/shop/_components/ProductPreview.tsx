import Image from "next/image";
import Link from "next/link";
import { getProductDetails } from "../../warehouse/_components/action";


type ProductPreviewProps = {
  productId: string;
  productName: string;
  mode: string;
};

export default async function ProductPreview({
  productId,
  productName,
  mode,
}: ProductPreviewProps) {
  const productDetails = await getProductDetails(productId);
  let minPrice = Infinity;
  let totalQuantity = 0;
  let totalSold = 0;

  for (let i = 0; i < productDetails.length; i++) {
    if (parseInt(productDetails[i].price) < minPrice) {
      minPrice = parseInt(productDetails[i].price);
    }
    totalQuantity += productDetails[i].quantity;
    totalSold += productDetails[i].sold ?? 0;
  }
  return (
    <Link
      href={{
        pathname: `/main/shop/${productId}`,
        query: {mode}
      }}
    >
      <div className="max-h-full flex-col items-center gap-2 rounded-md border-2 p-6 shadow-sm">
        <Image
          src={`${productDetails[0].imageLink}`}
          alt="product_pic"
          width={250}
          height={50}
          className="max-h-56 min-h-56"
        ></Image>
        <div className="mt-2 flex justify-between">
          {productName.length < 11 ? (
            <p>{productName}</p>
          ) : (
            <p>{productName.substring(0, 10)}...</p>
          )}
          <p className="text-lg font-semibold">{"NTD " + minPrice}</p>
        </div>

        <div className="mt-2 flex justify-between">
          <p className="text-sm text-gray-500">Quantity: {totalQuantity}</p>
          <p className="text-sm text-gray-500">Sold: {totalSold}</p>
        </div>
      </div>
    </Link>
  );
}
