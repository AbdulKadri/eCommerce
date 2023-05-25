import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/Product";

type Props = {
  productItem: Product;
};

export const ProductItem = ({ productItem }: Props) => {
  const { name, price, images, slug } = productItem;

  return (
    <Link href={`/product/${slug}`}>
      <div className="product-card">
        <Image
          src={images[0]}
          alt={`${name} image`}
          width={250}
          height={250}
          className="product-image"
        />
        <p className="product-name">{name}</p>
        <p className="product-price">${price}</p>
      </div>
    </Link>
  );
};
