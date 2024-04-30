// import node module libraries
import { Fragment, useEffect, useState } from "react";
import i18 from "../next-i18next.config";

// import widget/custom components
import { GeeksSEO } from "widgets";

// import widget/custom components

// import sub components
// import PopularInstructorCard from './PopularInstructorCard';
// import sub components
import { useRouter } from "next/router";

// import data files
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Metaverse = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [obj, setOBJ] = useState([]);
  const [catName, setCatName] = useState("");

  useEffect(() => {
    setIsLoading(true);
    pageLoad();
  }, [router]);

  const pageLoad = async () => {
    const { category } = router.query;
  };
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title={`Metaverse | MundoCrypto`} />

      {/* Page header */}
      <Container fluid>
        <div className="metaverse_main">
          <video
            className="metaverse_video"
            src="https://mundocrypto.com//wp-content//uploads//2022//10//Landing_Web6seg.mp4"
            autoPlay
            loop
            muted
          />
        </div>
      </Container>
    </Fragment>
  );
};

export default Metaverse;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
