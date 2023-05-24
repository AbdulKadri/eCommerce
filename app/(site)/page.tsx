import { getProducts } from "@/sanity/lib/client-product";
import { getBanners } from "@/sanity/lib/client-banner";
import FooterBanner from "@/components/FooterBanner";
import HeroBanner from "@/components/HeroBanner";
import Image from "next/image";

const Home = async () => {
  const products = await getProducts();
  const banners = await getBanners();

  return (
    <>
      <HeroBanner heroBanner={banners.length > 0 ? banners : null} />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <div className="product-card" key={product._id}>
            <div className="product-image">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                />
              )}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      <FooterBanner />
    </>
  );
};

export default Home;
