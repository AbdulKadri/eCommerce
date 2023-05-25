import { PortableTextBlock } from "sanity";

export type Product = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  images: string[];
  name: string;
  slug: string;
  price: number;
  details: PortableTextBlock[];
};
