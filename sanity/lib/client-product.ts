import { createClient, groq } from "next-sanity";
import { Product } from "@/types/Product";
import config from "../config/client-config";

export async function getProducts(): Promise<Product[]> {
  return createClient(config).fetch(
    groq`*[_type == "product"]{
            _id,
            _createdAt,
            _updatedAt,
            "images": images[].asset->url,
            name,
            "slug": slug.current,
            price,
            details
        }`
  );
}

export async function getProduct(slug: string): Promise<Product> {
  return createClient(config).fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
            _id,
            _createdAt,
            _updatedAt,
            "images": images[].asset->url,
            name,
            "slug": slug.current,
            price,
            details
        }`,
    { slug }
  );
}
