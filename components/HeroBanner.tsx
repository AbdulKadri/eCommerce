import Image from "next/image";
import Link from "next/link";

type HeroBannerType = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  image: string;
  buttonText: string;
  product: string;
  desc: string;
  smallText: string;
  midText: string;
  largeText1: string;
  largeText2: string;
  discount: string;
  saleTime: string;
};

type Props = {
  heroBanner: HeroBannerType[] | null;
};

const HeroBanner = ({ heroBanner }: Props) => {
  if (!heroBanner) {
    return null;
  }

  return (
    <>
      {heroBanner.map((banner, index) => (
        <div key={index} className="hero-banner-container">
          <div>
            <p className="beats-solo">{banner.smallText}</p>
            <h3>{banner.midText}</h3>
            <h1>{banner.largeText1}</h1>
            <Image
              src={banner.image}
              alt="headphones"
              width={500}
              height={500}
              className="hero-banner-image"
            />

            <div>
              <Link href={`/product/${banner.product}}`}>
                <button type="button">{banner.buttonText}</button>
              </Link>

              <div className="desc">
                <h5>Description</h5>
                <p>{banner.desc}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HeroBanner;
