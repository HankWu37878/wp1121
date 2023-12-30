"use client";

import { useState, type ChangeEvent, type DragEvent } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import type { Product, ProductDetail } from "@/lib/types";

import FinishAdding from "./FinishAdding";

export default function AddProductForm() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const [nameIsFilled, setNameIsFilled] = useState(true);
  //const [detailAllFilled, setDetailAllFilled] = useState(false);
  const [priceIsFilled, setPriceIsFilled] = useState(true);
  const [imageIsFilled, setImageIsFilled] = useState(true);
  const [quantityIsFilled, setQuantityIsFilled] = useState(true);
  const [styleIsFilled, setStyleIsFilled] = useState(true);
  const [desciptionIsFilled, setDescriptionIsFilled] = useState(true);
  const InitProductName: Omit<Product, "id" | "sellerDisplayId"> = {
    productName: "",
    productDescription: "",
  };

  // const [notFinish, setNotFinish] = useState(false);
  const [productNum, setProductNum] = useState<number>(1);
  // const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [productDetail, setProductDetail] = useState<
    Omit<ProductDetail, "id" | "productId" | "sold">[]
  >([]);
  const [productName, setProductName] =
    useState<Omit<Product, "id" | "sellerDisplayId">>(InitProductName);
  const [lastProduct, setLastProduct] = useState(false);
  const [isNext, setIsNext] = useState(true);
  const router = useRouter();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setName(inputValue);
    setNameIsFilled(!!inputValue.trim()); // Will be true if not empty
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDescription(inputValue);
    setDescriptionIsFilled(!!inputValue.trim()); // Will be true if not empty
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPrice(inputValue);
    setPriceIsFilled(!!inputValue.trim()); // Will be true if not empty
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const inputNum = parseInt(inputValue, 10);
    if (inputNum < 0) {
      alert("Quantity can't be empty");
      return;
    }
    setQuantity(inputNum);
    setQuantityIsFilled(!!inputValue.trim()); // Will be true if not empty
  };

  const handleStyleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setStyle(inputValue);
    setStyleIsFilled(!!inputValue.trim()); // Will be true if not empty
  };

  const handleNextStep = () => {
    if (name === "") {
      setNameIsFilled(false);
    } else {
      setNameIsFilled(true);
    }
    if (description === "") {
      setDescriptionIsFilled(false);
    } else {
      setDescriptionIsFilled(true);
    }

    if (nameIsFilled && desciptionIsFilled) {
      const newProductName: Omit<Product, "id" | "sellerDisplayId"> = {
        productName: name,
        productDescription: description,
      };
      setProductName(newProductName);
      setIsNext(false);
    }
  };

  const handleCancel = () => {
    router.push("/main/warehouse");
  };

  const handleNextStyle = () => {
    setPrice(productDetail[productNum].price);
    setQuantity(productDetail[productNum].quantity);
    setStyle(productDetail[productNum].style);
    setImage(productDetail[productNum].imageLink);
    setPreviewSrc(productDetail[productNum].imageLink);
    if (productDetail[productNum + 1] === undefined) {
      setLastProduct(false);
    }
    setProductNum(productNum + 1);
  };

  const handleLastStep = () => {
    if (productDetail[productNum - 1] === undefined) {
      setLastProduct(false);
    } else {
      // if (price === "" || style === "" || quantity === 0 || image === "")
      setLastProduct(true);
    }
    if (productNum === 1) {
      setIsNext(true);
    } else {
      setPrice(productDetail[productNum - 2].price);
      setQuantity(productDetail[productNum - 2].quantity);
      setStyle(productDetail[productNum - 2].style);
      // setSize(productDetail[productNum - 2].size);
      setImage(productDetail[productNum - 2].imageLink);
      setPreviewSrc(productDetail[productNum - 2].imageLink);
      setProductNum(productNum - 1);
    }
  };

  const handleNextProduct = () => {
    if (price === "") {
      setPriceIsFilled(false);
    } else {
      setPriceIsFilled(true);
    }
    if (quantity <= 0) {
      setQuantityIsFilled(false);
    } else {
      setQuantityIsFilled(true);
    }
    if (style === "") {
      setStyleIsFilled(false);
    } else {
      setStyleIsFilled(true);
    }
    if (image === "") {
      setImageIsFilled(false);
    } else {
      setImageIsFilled(true);
    }

    if (
      priceIsFilled &&
      quantityIsFilled &&
      styleIsFilled &&
      imageIsFilled &&
      productDetail[productNum - 1] === undefined
    ) {
      setProductNum(productNum + 1);
      const newProductDetail: Omit<ProductDetail, "id" | "productId" | "sold"> =
        {
          price,
          style,
          quantity,
          imageLink: image,
        };
      setProductDetail((prevProductDetails) => [
        ...prevProductDetails,
        newProductDetail,
      ]);

      //clear all the existing data
      setPrice("");
      setStyle("");
      setQuantity(0);
      setImage("");
      setPreviewSrc(null);
    }
    if (productDetail[productNum - 1] !== undefined) {
      setProductNum(productNum + 1);
      //clear all the existing data
      setPrice("");
      setStyle("");
      setQuantity(0);
      setImage("");
      setPreviewSrc(null);
    }
  };

  // handle uploading picture
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    displayPreview(file);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    displayPreview(file);
  };

  const displayPreview = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewSrc(reader.result as string);
        setImage(reader.result as string);
        setImageIsFilled(true);
      };
    }
  };

  return (
    <>
      {isNext === true && (
        <div className="min-w-[400px] rounded-2xl border-2 border-black bg-white p-4">
          <div className="mt-5 flex flex-col gap-2">
            <div className="flex flex-col gap-4 px-10">
              <div className="w-full">
                <p className="font-semibold">Name</p>
                {nameIsFilled === false && (
                  <p className="text-xs text-red-500">
                    *You haven't fill this column
                  </p>
                )}
                <input
                  id="Name"
                  type="name"
                  value={name}
                  onChange={handleNameChange}
                  className="mt-1 w-full bg-gray-100"
                />
              </div>
              <div className="w-full">
                <p className="font-semibold">Description</p>
                {desciptionIsFilled === false && (
                  <p className="text-xs text-red-500">
                    *You haven't fill this column
                  </p>
                )}
                <input
                  id="description"
                  type="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  className="mt-1 w-full bg-gray-100"
                ></input>
              </div>

              <div className="mb-3 mt-5 flex gap-5">
                <button
                  data-testid="add-submit-button"
                  // type="submit"
                  className="mb-3 w-full rounded-lg border-2 py-1 hover:bg-slate-100"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  data-testid="add-submit-button"
                  // type="submit"
                  className="mb-3 w-full rounded-lg border-2 bg-teal-900 py-1 text-white hover:bg-teal-700"
                  onClick={handleNextStep}
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isNext === false && (
        <div className="min-w-[400px] rounded-2xl border-2 border-black bg-white p-4">
          <div className="flex">
            <p className="text-sm text-gray-500">Style No.</p>
            <p className="text-sm text-gray-500">{productNum}</p>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <div className="flex flex-col gap-4 px-10">
              <div className="w-full">
                <p className="font-bold">Price</p>
                {priceIsFilled === false && (
                  <p className="text-xs text-red-500">
                    *You haven't fill this column
                  </p>
                )}
                <input
                  id="Price"
                  type="price"
                  value={price}
                  onChange={handlePriceChange}
                  className="mt-1 w-full bg-gray-100"
                />
              </div>
              <div className="w-full">
                <p className="font-bold">Style</p>
                {styleIsFilled === false && (
                  <p className="text-xs text-red-500">
                    *You haven't fill this column
                  </p>
                )}
                <div className="flex items-center justify-center gap-5 rounded-md bg-gray-100">
                  <input
                    id="style"
                    type="style_type"
                    value={style}
                    onChange={handleStyleChange}
                    className="mt-1 w-full bg-gray-100"
                  />
                </div>
              </div>
              <div className="w-full">
                <p className="font-bold">Quantity</p>
                {quantityIsFilled === false && (
                  <p className="text-xs text-red-500">
                    *You haven't fill this column
                  </p>
                )}
                <input
                  id="Quantity"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="mt-2 w-full bg-gray-100"
                />
              </div>
              <div className="w-full">
                <p className="font-bold">Picture</p>
                {imageIsFilled === false && (
                  <p className="text-xs text-red-500">
                    *You haven't fill this column
                  </p>
                )}
                <div
                  className={`relative h-[300px] w-[280px] rounded-lg border-2 border-dashed border-gray-300 p-6 ${
                    isDragOver ? "border-indigo-600" : ""
                  }`}
                  id="dropzone"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    className="absolute inset-0 z-50 h-full w-full opacity-0"
                    onChange={handleInputChange}
                  />
                  <div className="text-center">
                    <Image
                      className="mx-auto h-12 w-12"
                      fill
                      src="https://www.svgrepo.com/show/357902/image-upload.svg"
                      alt=""
                    />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer"
                      >
                        <span>Drag and drop</span>
                        <span className="text-indigo-600"> or browse</span>
                        <span> to upload</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  {previewSrc && (
                    <Image
                      src={previewSrc}
                      fill
                      className="max-h-100 mx-auto bg-white"
                      alt="Preview"
                    />
                  )}
                </div>
              </div>
              <div className="mb-3 mt-5 flex gap-5">
                <button
                  data-testid="add-submit-button"
                  // type="submit"
                  className="mb-3 w-full rounded-lg border-2 py-1 text-sm hover:bg-slate-100"
                  onClick={handleLastStep}
                >
                  Last Step
                </button>
                {lastProduct === false && (
                  <button
                    data-testid="add-submit-button"
                    // type="submit"
                    className="mb-3 w-full rounded-lg border-2 py-1 text-sm hover:bg-slate-100"
                    onClick={handleNextProduct}
                  >
                    Add another style
                  </button>
                )}
                {lastProduct === true && (
                  <button
                    data-testid="add-submit-button"
                    // type="submit"
                    className="mb-3 w-full rounded-lg border-2 py-1 text-sm hover:bg-slate-100"
                    onClick={handleNextStyle}
                  >
                    Next style
                  </button>
                )}
              </div>
              {lastProduct === false &&
                price !== "" &&
                style !== "" &&
                quantity > 0 &&
                image !== "" && (
                  <FinishAdding
                    price={price}
                    style={style}
                    quantity={quantity}
                    image={image}
                    productFisrtStep={productName}
                    productDetail={productDetail}
                  />
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
