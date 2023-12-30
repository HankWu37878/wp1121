import * as React from "react";
import { type ChangeEvent, type DragEvent, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import type { Product } from "@/lib/types";

import { editProductDetail, editProductName } from "./actions";

type Props = {
  open: boolean;
  onClose: () => void;
  productId: string;
  productName: Omit<Product, "id" | "sellerDisplayId">;
  productDetail: DetailProps[];
};

type DetailProps = {
  productQuantity: number;
  productPrice: string;
  productImageLink: string;
  productStyle: string;
  displayId: string;
};

export default function EditNameForm({
  open,
  onClose,
  productId,
  productName,
  productDetail,
}: Props) {
  const router = useRouter();
  //edit name part
  const [name, setName] = useState<string>(productName.productName);
  const [description, setDescription] = useState<string>(
    productName.productDescription,
  );
  const [price, setPrice] = useState<string>(productDetail[0].productPrice);
  const [quantity, setQuantity] = useState<number>(
    productDetail[0].productQuantity,
  );
  const [style, setStyle] = useState<string>(productDetail[0].productStyle);
  const [image, setImage] = useState<string>(productDetail[0].productImageLink);
  const [displayId, setDisplayId] = useState<string>(
    productDetail[0].displayId,
  );

  const [nameIsFilled, setNameIsFilled] = useState<boolean>(true);
  const [desciptionIsFilled, setDescriptionIsFilled] = useState<boolean>(true);
  // const [allFilled, setAllFilled] = useState<boolean>(false);
  const [priceIsFilled, setPriceIsFilled] = useState(true);
  const [imageIsFilled, setImageIsFilled] = useState(true);
  const [quantityIsFilled, setQuantityIsFilled] = useState(true);
  const [styleIsFilled, setStyleIsFilled] = useState(true);
  // const [productDetailData, setProductDetailData] =
  //   useState<DetailProps[]>(productDetail);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  //edit detail part

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

  // handle uploading picture
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(
    productDetail[0].productImageLink,
  );

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

  const handleLastProduct = () => {
    if (price === "") {
      setPriceIsFilled(false);
    } else {
      setPriceIsFilled(true);
    }
    if (quantity === 0) {
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
    if (price !== "" && quantity >= 0 && style !== "" && image !== "") {
      productDetail[currentIndex].productPrice = price;
      productDetail[currentIndex].productQuantity = quantity;
      productDetail[currentIndex].productStyle = style;
      productDetail[currentIndex].productImageLink = image;
      productDetail[currentIndex].displayId = displayId;
      setPrice(productDetail[currentIndex - 1].productPrice);
      setQuantity(productDetail[currentIndex - 1].productQuantity);
      setStyle(productDetail[currentIndex - 1].productStyle);
      setImage(productDetail[currentIndex - 1].productImageLink);
      setDisplayId(productDetail[currentIndex - 1].displayId);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextProduct = () => {
    if (price === "") {
      setPriceIsFilled(false);
    } else {
      setPriceIsFilled(true);
    }
    if (quantity === 0) {
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
    if (price !== "" && quantity > 0 && style !== "" && image !== "") {
      console.log("currentIndex: " + currentIndex);
      productDetail[currentIndex].productPrice = price;
      productDetail[currentIndex].productQuantity = quantity;
      productDetail[currentIndex].productStyle = style;
      productDetail[currentIndex].productImageLink = image;
      productDetail[currentIndex].displayId = displayId;
      setPrice(productDetail[currentIndex + 1].productPrice);
      setQuantity(productDetail[currentIndex + 1].productQuantity);
      setStyle(productDetail[currentIndex + 1].productStyle);
      setImage(productDetail[currentIndex + 1].productImageLink);
      setDisplayId(productDetail[currentIndex + 1].displayId);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = async () => {
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

    // console.log(currentIndex);
    console.log(productDetail);
    productDetail[currentIndex].productPrice = price;
    productDetail[currentIndex].productStyle = style;
    productDetail[currentIndex].productImageLink = image;
    productDetail[currentIndex].productQuantity = quantity;
    productDetail[currentIndex].displayId = displayId;
    console.log(productDetail);

    if (
      name !== "" &&
      description !== "" &&
      price !== "" &&
      style !== "" &&
      quantity > 0 &&
      image !== ""
    ) {
      console.log(productDetail);
      try {
        await editProductName(productId, name, description);
        for (let i = 0; i < productDetail.length; i++) {
          await editProductDetail(
            productId,
            productDetail[i].productPrice,
            productDetail[i].productStyle,
            productDetail[i].productImageLink,
            productDetail[i].productQuantity,
            productDetail[i].displayId,
          );
        }
        // console.log(productDetail);
        router.refresh();
        router.push(`/main/warehouse/${productId}`);
        onClose();
      } catch (error) {
        console.log(error);
        alert("Edit name failed");
      }
    }
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle className="flex items-center justify-center">
          Edit Name and Description
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="font-bold">
            Product Info
          </DialogContentText>
          <TextField
            // autoFocus
            margin="dense"
            id="name"
            label="Product Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={handleNameChange}
          ></TextField>
          {nameIsFilled === false && (
            <p className="text-xs text-red-500">*Name can't be empty</p>
          )}
          {/* <DialogContentText className="font-bold">
            Description
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Product Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={handleDescriptionChange}
          ></TextField>
          {desciptionIsFilled === false && (
            <p className="text-xs text-red-500">*Description can't be empty</p>
          )}

          <div className="mt-5 flex items-center justify-between">
            <DialogContentText className="font-bold">
              Styles No. {currentIndex + 1} Info
            </DialogContentText>
            <div>
              <DialogActions className="flex justify-between p-2">
                {currentIndex !== 0 && (
                  <Button
                    onClick={handleLastProduct}
                    className="relative h-8 text-center text-black"
                  >
                    <Image
                      className="max-auto h-6 w-6"
                      // fill
                      src="/last_button.svg"
                      alt="next button"
                      width={6}
                      height={6}
                    />
                    Last
                  </Button>
                )}
                {currentIndex !== productDetail.length - 1 && (
                  <Button
                    onClick={handleNextProduct}
                    className="relative h-8 text-center text-black"
                  >
                    Next
                    <Image
                      className="mx-auto h-6 w-6"
                      // fill
                      src="/next_button2.svg"
                      alt="next button"
                      width={6}
                      height={6}
                    />
                  </Button>
                )}
              </DialogActions>
            </div>
          </div>
          <TextField
            // autoFocus
            margin="dense"
            id="price"
            label="Product Price"
            type="text"
            fullWidth
            variant="standard"
            value={price}
            onChange={handlePriceChange}
          ></TextField>
          {priceIsFilled === false && (
            <p className="text-xs text-red-500">*Price can't be empty</p>
          )}
          {/* <DialogContentText className="font-bold">
            Description
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="style"
            label="Product Style"
            type="text"
            fullWidth
            variant="standard"
            value={style}
            onChange={handleStyleChange}
          ></TextField>
          {styleIsFilled === false && (
            <p className="text-xs text-red-500">*Style can't be empty</p>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Product Quantity"
            type="number"
            fullWidth
            variant="standard"
            value={quantity}
            onChange={handleQuantityChange}
          ></TextField>
          {quantityIsFilled === false && (
            <p className="text-xs text-red-500">*Quantity can't be empty</p>
          )}
          <div className="w-full">
            <p className="font-bold">Picture</p>
            {imageIsFilled === false && (
              <p className="text-xs text-red-500">
                *You haven't fill this column
              </p>
            )}
            <div
              className={`relative h-[250px] w-[200px] rounded-lg border-2 border-dashed border-gray-300 p-6 ${
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
                  src={image}
                  fill
                  className="max-h-100 mx-auto bg-white"
                  alt="Preview"
                />
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
