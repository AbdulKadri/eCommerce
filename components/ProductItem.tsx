import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/Product";

type Props = {
  productItem: Product;
};

export const ProductItem = ({ productItem }: Props) => {
  return (
    <div>
      <Link href={`/product/${productItem.slug}`}>
        <div className="product-card">
          <Image
            src={productItem.images[0]}
            alt={`${productItem.name} image`}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{productItem.name}</p>
          <p className="product-price">${productItem.price}</p>
        </div>
      </Link>
    </div>
  );
};
