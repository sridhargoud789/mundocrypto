// import node module libraries
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

const GeeksSEO = (props) => {
  const router = useRouter();
  const pageURL = process.env.baseURL + router.pathname;
  const { title, description } = props;
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={pageURL}
      openGraph={{
        url: pageURL,
        title: title,
        description: description,
        site_name: process.env.siteName,
        images: [
          {
            url: "/images_optimized/og/mclogo_price.jpg",
            width: 650,
            height: 650,
            alt: "MundoCrypto",
          },
        ],
      }}
    />
  );
};
export default GeeksSEO;
