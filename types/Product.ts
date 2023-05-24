import { PortableTextBlock } from "sanity";

export type Product = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  image: string;
  name: string;
  slug: string;
  price: number;
  details: PortableTextBlock[];
};
