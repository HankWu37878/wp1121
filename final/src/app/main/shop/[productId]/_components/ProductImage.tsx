"use client";

import { useState } from "react";

import Image from "next/image";

type Props = {
  images: {
    productStyle: string;
    productImageLink: string;
  }[];
};

function ProductImage({ images }: Props) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const changePhoto = (increment: number) => {
    let newIndex: number = (currentPhotoIndex + increment) % images.length;
    if (newIndex < 0) {
      newIndex = images.length - 1;
    }
    setCurrentPhotoIndex(newIndex);
  };

  return (
    <>
      <button onClick={() => changePhoto(-1)}>
        <Image src="/prev.png" alt="previous arrow" width={30} height={30} />
      </button>
      <Image
        src={images[currentPhotoIndex].productImageLink}
        alt="Product photo"
        width={350}
        height={350}
        className="max-h-[350px] max-w-[350px]"
      />
      <button onClick={() => changePhoto(1)}>
        <Image src="/next.png" alt="next arrow" width={30} height={30} />
      </button>
    </>
  );
}

export default ProductImage;
