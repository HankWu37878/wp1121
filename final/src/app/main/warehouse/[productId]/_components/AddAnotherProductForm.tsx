import * as React from "react";
import { type ChangeEvent,  type DragEvent, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import useProducts from "@/hooks/useProduct";

type Props = {
  open: boolean;
  onClose: () => void;
  productId: string;
};

export default function AddAnotherProdcutForm({
  open,
  onClose,
  productId,
}: Props) {
  const router = useRouter();
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [style, setStyle] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const [priceIsFilled, setPriceIsFilled] = useState(true);
  const [imageIsFilled, setImageIsFilled] = useState(true);
  const [quantityIsFilled, setQuantityIsFilled] = useState(true);
  const [styleIsFilled, setStyleIsFilled] = useState(true);
  const { addProductDetail } = useProducts();
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

  const handleSubmit = async () => {
    if (price !== "" && quantity > 0 && style !== "" && image !== "") {
      try {
        await addProductDetail(productId, quantity, price, style, image);
        router.refresh();
        // router.push(`/main/warehouse/${productId}`);
        onClose();
      } catch (error) {
        console.log(error);
        alert("Add new style failed");
      }
    }
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle className="flex items-center justify-center">
          Add Another Style
        </DialogTitle>
        <DialogContent>
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
          <div className="mx-auto mt-3 w-full">
            <p className="font-bold">Picture</p>
            {imageIsFilled === false && (
              <p className="text-xs text-red-500">
                *You haven't fill this column
              </p>
            )}
            <div
              className={`relative h-[540px] w-[540px] rounded-lg border-2 border-dashed border-gray-300 p-6 ${
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
                  width={12}
                  height={12}
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
