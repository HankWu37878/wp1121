export type User = {
  id: string;
  name: string;
  email: string;
  provider: "google" | "credentials";
};

export type Product = {
  id: string;
  productName: string;
  productDescription: string;
  sellerDisplayId: string;
};

export type ProductDetail = {
  id: string;
  productId: string;
  price: string;
  style: string;
  quantity: number;
  sold: number;
  imageLink: string;
};
