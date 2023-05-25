import { createClient, groq } from "next-sanity";
import { Banner } from "@/types/Banner";
import config from "../config/client-config";

export async function getBanners(): Promise<Banner[]> {
  return createClient(config).fetch(
    groq`*[_type == "banner"]{
                _id,
                _createdAt,
                _updatedAt,
                "images": images[].asset->url,
                buttonText,
                product,
                desc,
                smallText,
                midText,
                largeText1,
                largeText2,
                discount,
                saleTime
            }`
  );
}
