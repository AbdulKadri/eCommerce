import Image from "next/image";
import { getProduct } from "@/sanity/lib/client-product";
import { getProducts } from "@/sanity/lib/client-product";
import { PortableText } from "@portabletext/react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { ProductItem } from "@/components/ProductItem";

type Props = {
  params: { product: string };
};

const ProductDetails = async ({ params }: Props) => {
  const slug = params.product;
  const product = await getProduct(slug);
  const products = await getProducts();
  const { name, price, images, details } = product;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
              src={images[0]}
              alt={name}
              width={600}
              height={600}
              className="product-detail-image"
            />
          </div>
          {/* <div className="small-images-container">
            {images?.map((image, index) => (
              <Image key={index} src={image} alt={name} width={100} height={100} />
            ))}
          </div> */}
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
              <span className="minus">
                <AiOutlineMinus />
              </span>
              <span className="num">0</span>
              <span className="plus">
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart">
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
