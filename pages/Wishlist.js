// import node module libraries
import { Fragment, useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";

// import widget/custom components
import { GeeksSEO } from "widgets";

// import widget/custom components
import { CourseCard, PageHeadingBriefinfo } from "widgets";
import i18 from "../next-i18next.config";

// import sub components
// import PopularInstructorCard from './PopularInstructorCard';
// import sub components
import { useRouter } from "next/router";

// import data files
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { getUserWishList } from "../services/nodeapi";

import { useTranslation } from "react-i18next";

const WishList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [obj, setOBJ] = useState([]);
  const [catName, setCatName] = useState("");

  useEffect(() => {
    pageLoad();
  }, [router]);

  const pageLoad = async () => {
    setIsLoading(true);
    const resp = await getUserWishList();
    setOBJ(resp.data.courses);
    setIsLoading(false);
  };
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title={`Wishlisted Courses | ${catName} | MundoCrypto`} />

      {/* Page header */}
      <PageHeadingBriefinfo
        pagetitle={t("pages.wishlist_title")}
        briefinfo={``}
      />

      <div className="py-6">
        <Container>
          <Row className="mb-6">
            {!isLoading &&
              obj &&
              obj.map((item, index) => (
                <Col lg={3} md={6} sm={12} key={index}>
                  <CourseCard
                    item={item}
                    showprogressbar={false}
                    viewby="grid"
                  />
                </Col>
              ))}
            {!isLoading && obj && obj.length === 0 && (
              <Alert variant="info">
                {t("pages.no_courses_wishlist")}{" "}
                <Link href="/CourseList">{t("pages.no_courses_cart_2")}</Link>
              </Alert>
            )}
          </Row>
          {/* end of all javaScript courses */}
        </Container>
      </div>
    </Fragment>
  );
};

export default WishList;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
