// import node module libraries
import { Fragment, useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import i18 from "../next-i18next.config";

// import widget/custom components
import { GeeksSEO } from "widgets";

// import widget/custom components
import { CourseCard, PageHeadingBriefinfo } from "widgets";

// import sub components
// import PopularInstructorCard from './PopularInstructorCard';
// import sub components
import { useRouter } from "next/router";

// import data files
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getCourseList } from "../services/nodeapi";

import { useTranslation } from "react-i18next";

const CourseList = () => {
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

    setIsLoading(true);
    const resp = await getCourseList();
    if (category !== undefined) {
      try {
        setCatName(category);

        if (resp.status === 200) {
          const obj = resp.data.category;
          const d = [];
          obj.map((c) => {
            c.courseCategories.map((cc) => {
              if (cc.category.name === category) {
                d.push(c);
              }
            });
          });

          setOBJ(d);
        }

        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);

      setOBJ(resp.data.category);
    }
  };
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title={`Courses | ${catName} | MundoCrypto`} />

      {/* Page header */}
      {catName && (
        <PageHeadingBriefinfo pagetitle={`${catName}`} briefinfo={``} />
      )}
      {!catName && (
        <PageHeadingBriefinfo
          pagetitle={t("pages.all_courses")}
          briefinfo={``}
        />
      )}

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
                No courses available for {`${catName}`}.
              </Alert>
            )}
          </Row>
          {/* end of all javaScript courses */}
        </Container>
      </div>
    </Fragment>
  );
};

export default CourseList;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
