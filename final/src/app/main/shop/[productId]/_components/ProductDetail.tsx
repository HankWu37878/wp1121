"use client";

import { useState } from "react";
import StarRateIcon from '@mui/icons-material/StarRate';
import AddToCartButton from "./AddToCartButton";
import Image from "next/image";

type Props = {
  detail_1: {
    displayId: string;
    productName: string;
    productDescription: string;
    sellerdisplayId: string;
  };

  detail_2: {
    displayId: string;
    productQuantity: number;
    productSold: number | null;
    productPrice: string;
    productStyle: string;
  }[];
  
  rate: string;
  commentQuantity: number;

  images: {
    productStyle: string;
    productImageLink: string;
  }[];
};

function ProductDetail({ detail_1, detail_2, rate, images, commentQuantity }: Props) {

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const changePhoto = (increment: number) => {
    let newIndex: number = (currentIndex + increment) % images.length;
    if (newIndex < 0) {
      newIndex = images.length - 1;
    }
    setCurrentIndex(newIndex);
  };

  return (
    <div className="flex mt-20 gap-16">
      <div className="flex">
        <button onClick={() => changePhoto(-1)}>
          <Image src="/prev.png" alt="previous arrow" width={30} height={30} />
        </button>
        <Image
          src={images[currentIndex].productImageLink}
          alt="Product photo"
          width={350}
          height={350}
        />
        <button onClick={() => changePhoto(1)}>
          <Image src="/next.png" alt="next arrow" width={30} height={30} />
        </button>
      </div>
      
      <div className="flex-col">
        <div className="flex h-14 w-full items-center justify-start text-3xl font-medium gap-2">
          {detail_1.productName}
          <div className="flex text-lg items-center ml-10">
            <p className="text-sm ml-1">{rate}</p>
            <StarRateIcon className="text-yellow-500 text-lg"/>
            <p className="text-sm ml-2">({commentQuantity})</p>
          </div>
        </div>
        <div className="flex h-14 w-full items-center justify-start text-4xl font-semibold  text-teal-900">
          NT$ {detail_2[currentIndex].productPrice}
        </div>
        <div className="flex h-14 w-full items-center justify-start gap-10 text-xl">
          <span>庫存尚有：{detail_2[currentIndex].productQuantity}</span>
          <span>已售出：{detail_2[currentIndex].productSold}</span>
          <AddToCartButton productId={detail_1.displayId} productDetailId={detail_2[currentIndex].displayId} quantityLeft={detail_2[currentIndex].productQuantity}/>
        </div>
        <div className="flex h-24 w-full items-center justify-start gap-4">
          {detail_2.map((detail, index) => (
            <button
              key={index}
              className={`h-12 rounded-md border-2 px-4 hover:bg-slate-200
                 ${
                currentIndex === index
                  && "bg-slate-200"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              {detail.productStyle}
            </button>
          ))}
        </div>

      </div>
      
    </div>
  );
}

export default ProductDetail;
