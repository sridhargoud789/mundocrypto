// import node module libraries
import { Fragment, useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import i18 from "../next-i18next.config";

// import widget/custom components
import { GeeksSEO } from "widgets";

// import widget/custom components
import { PageHeadingBriefinfo } from "widgets";

// import sub components
// import PopularInstructorCard from './PopularInstructorCard';
// import sub components
import { useRouter } from "next/router";

// import data files
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useTranslation } from "react-i18next";

const News = () => {
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
      <GeeksSEO title={`News | MundoCrypto`} />

      {/* Page header */}

      <PageHeadingBriefinfo pagetitle={t("pages.news")} briefinfo={``} />

      <div className="bg-white">
        <Container className="d-flex flex-column">
          <Row className="align-items-center justify-content-center g-0 py-lg-10 py-10">
            {/* Docs */}
            <Col
              xl={{ span: 5, offset: 1 }}
              lg={6}
              md={12}
              sm={12}
              className="text-center text-lg-start"
            >
              <h1 className="display-3 mb-2 fw-bold">
                We&apos;re coming soon.
              </h1>
              <p className="mb-4 fs-4">
                Our website is under construction. We&apos;ll be here soon with
                our new awesome site, subscribe to be notified.
              </p>
            </Col>
            {/* img */}
            <Col
              xl={{ span: 5, offset: 1 }}
              lg={6}
              md={12}
              sm={12}
              className="mt-8 mt-lg-0"
            >
              <Image
                src="/images_optimized/background/comingsoon.svg"
                alt=""
                className="w-100"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default News;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
