"use client";

import * as React from "react";
import { useState } from "react";

import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { publicEnv } from "@/lib/env/public";
import type { Product } from "@/lib/types";

import AddAnotherProdcutForm from "./AddAnotherProductForm";
import EditNameForm from "./EditNameForm";
import { deleteProduct } from "./actions";

type EditProps = {
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

function EditButton({ productId, productName, productDetail }: EditProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editName, setEditName] = useState(false);
  // const [editDetail, setEditDetail] = useState(false);
  const [addAnother, setAddAnother] = useState(false);
  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setEditName(false);
    // setEditDetail(false);
    setAddAnother(false);
  };
  const handleEditName = () => {
    setEditName(true);
    // setAnchorEl(null);
    // handleClose();
  };
  const handleDelete = async () => {
    const proId = productId;
    await deleteProduct(proId);
    router.refresh();
    router.push(`${publicEnv.NEXT_PUBLIC_BASE_URL}/main/warehouse`);
  };

  const handleAddAnother = () => {
    // handleClose();
    setAddAnother(true);
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        className="rounded-lg text-black border-black items-center hover:border-black  hover:bg-gray-200 flex"
      >
        Edit
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem style={{ borderRadius: "5px" }} onClick={handleEditName}>
          Edit Product Info
        </MenuItem>
        <MenuItem style={{ borderRadius: "5px" }} onClick={handleAddAnother}>
          Add Another Style
        </MenuItem>
        <MenuItem
          style={{ borderRadius: "5px" }}
          onClick={handleDelete}
          className="text-red-500 font-semibold"
        >
          Delete Whole Product
        </MenuItem>
      </Menu>
      {editName && (
        <EditNameForm
          open={editName}
          onClose={() => setEditName(false)}
          productId={productId}
          productName={productName}
          productDetail={productDetail}
        />
      )}
      {/* {editDetail && (
        <EditDetailForm
          open={editDetail}
          onClose={() => setEditDetail(false)}
        />
      )} */}
      {addAnother && (
        <AddAnotherProdcutForm
          open={addAnother}
          onClose={() => setAddAnother(false)}
          productId={productId}
        />
      )}
    </div>
  );
}

export default EditButton;
