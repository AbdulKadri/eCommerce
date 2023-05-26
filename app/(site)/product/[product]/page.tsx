"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getProduct } from "@/sanity/lib/client-product";
import { getProducts } from "@/sanity/lib/client-product";
import { PortableText } from "@portabletext/react";
import { Product } from "@/types/Product";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { ProductItem } from "@/components/ProductItem";
import { useStateContext } from "@/context/StateContext";

type Props = {
  params: { product: string };
};

const ProductDetails = ({ params }: Props) => {
  const [index, setIndex] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { qty, incQty, decQty, onAdd, resetQty } = useStateContext();

  useEffect(() => {
    const fetchProductData = async () => {
      const slug = params.product;
      const [productData, productsData] = await Promise.all([
        getProduct(slug),
        getProducts(),
      ]);

      setProduct(productData);
      setProducts(productsData);
    };

    fetchProductData();
    resetQty();
  }, [params.product]);

  if (!product || products.length === 0) {
    return <div>Loading...</div>;
  }

  const { name, price, images, details } = product;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
              src={images[index]}
              alt={name}
              width={600}
              height={600}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {images?.map((image, i) => (
              <Image
                key={i}
                src={image}
                alt={name}
                width={100}
                height={100}
                onMouseEnter={() => setIndex(i)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <PortableText value={details} />
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              onClick={() => onAdd(product, qty)}
              className="add-to-cart"
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map((item) => (
              <ProductItem key={item._id} productItem={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
