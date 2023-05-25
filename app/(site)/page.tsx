import { getProducts } from "@/sanity/lib/client-product";
import { getBanners } from "@/sanity/lib/client-banner";
import FooterBanner from "@/components/FooterBanner";
import HeroBanner from "@/components/HeroBanner";
import { ProductItem } from "@/components/ProductItem";

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
          <ProductItem key={product._id} productItem={product} />
        ))}
      </div>

      <FooterBanner />
    </>
  );
};

export default Home;
