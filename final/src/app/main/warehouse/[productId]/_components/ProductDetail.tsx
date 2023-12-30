"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import StarRateIcon from "@mui/icons-material/StarRate";

import { deleteStyle } from "./actions";

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
  const [isLast, setIsLast] = useState<boolean>(false);
  const router = useRouter();
  const changePhoto = (increment: number) => {
    let newIndex: number = (currentIndex + increment) % images.length;
    if (newIndex < 0) {
      newIndex = images.length - 1;
    }
    setCurrentIndex(newIndex);
  };
  useEffect(() => {
    if (detail_2.length === 1) {
      setIsLast(true);
    } else {
      setIsLast(false);
    }
  }, [detail_2]);
  // const handleDeleteStyle = async (e: MouseEvent) => {
  //   e.preventDefault();
  // };

  return (
    <div className="mt-20 flex gap-16">
      <div className="flex">
        <button onClick={() => changePhoto(-1)}>
          <Image src="/prev.png" alt="previous arrow" width={30} height={30} />
        </button>
        <Image
          src={images[currentIndex]?.productImageLink}
          alt="Product photo"
          width={350}
          height={350}
        />
        <button onClick={() => changePhoto(1)}>
          <Image src="/next.png" alt="next arrow" width={30} height={30} />
        </button>
      </div>

      <div className="flex-col">
        <div className="flex h-14 w-full items-center justify-start gap-2 text-3xl font-medium">
          {detail_1?.productName ?? ""}
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
        </div>
        <div className="flex h-24 w-full items-center justify-start gap-4">
          {detail_2.map((detail, index) => (
            <div className="relative flex items-start" key={index}>
              <button
                className={`h-12 rounded-md border-2 px-4 hover:bg-slate-200
                 ${currentIndex === index && "bg-slate-300"}`}
                onClick={() => setCurrentIndex(index)}
              >
                {detail.productStyle}
              </button>
              {isLast === false && (
                <button
                  key={index}
                  onClick={async () => {
                    if (index === currentIndex) {
                      if(index === 0 ){
                        setCurrentIndex(index);
                      }else{
                        setCurrentIndex(index - 1);
                      }             
                    }
                    try {
                      await deleteStyle(detail_2[index].displayId);
                      router.refresh();
                    } catch (error) {
                      console.log(error);
                      alert("Delete style failed");
                    }
                  }}
                >
                  <Image
                    src="/deleteStyle.svg"
                    alt="next arrow"
                    width={15}
                    height={15}
                    style={{
                      position: "absolute",
                      top: -5,
                      right: -5,
                    }}
                    className="fill-red-500"
                  />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
