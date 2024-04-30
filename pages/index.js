// import node module libraries
import Link from "next/link";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import { FAQsection, YourInstructor } from "sub-components";

import i18 from "../next-i18next.config";

// import widget/custom components
import {
  CourseCard,
  CourseSlider,
  FeaturesList,
  HeroHeader,
  TestimonialsSlider,
} from "widgets";

//import { AllCoursesData } from "data/slider/AllCoursesData";
import _ from "lodash";
import {
  checkSession,
  getCategories,
  getCourseList,
  getPackageDetails,
} from "../services/nodeapi";

import ArticleList from "components/articles/list";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useRecoilState } from "recoil";
import InstructorHOY from "sub-components/landings/course-lead/InstructorHOY";
import RegisterNow from "sub-components/landings/course-lead/RegisterNow";
import Support from "sub-components/landings/course-lead/Support";
import SpecialPackCard from "widgets/courses/SpecialPackCard";
import HeroHeaderMobile from "widgets/home/HeroHeaderMobile";
import { userObject } from "../services/states";
const Home = ({ pagedata }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [obj, setOBJ] = useState([]);
  const [catOBJ, setCatOBJ] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userObj, setuserObject] = useRecoilState(userObject);
  const [packageList, setPackageDetails] = useState([]);
  const [freeCourseCount, setfreeCourseCount] = useState(0);
  const { locale: activeLocale, locales, asPath } = useRouter();

  useEffect(() => {
    pageLoad();
  }, [activeLocale]);

  const pageLoad = async () => {
    const ln = localStorage.getItem("language_code");

    if (localStorage.getItem("language_code") === null) {
      localStorage.setItem("language_code", activeLocale);
    }

    try {
      const sessionResp = await checkSession();
      if (!sessionResp.data.isSuccess) {
        setuserObject(null);
        localStorage.removeItem("access_token");
      }
    } catch (e) {
      setuserObject(null);
      localStorage.removeItem("access_token");
    }

    setIsLoading(true);
    await setCatagories();
    const presp = await getPackageDetails(1);
    setPackageDetails(presp.data.data);
    const resp = await getCourseList();

    if (resp.status === 200) {
      setOBJ(resp.data.category);
      const _freecourses = _.filter(resp.data.category, { is_public: 1 });
      setfreeCourseCount(_freecourses.length);
    }

    setIsLoading(false);
  };

  const setCatagories = async () => {
    const catresp = await getCategories();

    if (catresp.status === 200) {
      setCatOBJ(catresp.data.category);
    }
  };
  const getFilteredCourses = (id) => {
    const d = [];
    obj.map((c) => {
      c.courseCategories.map((cc) => {
        if (cc.category_id === id) {
          d.push(c);
        }
      });
    });
    return d;
  };
  return (
    <Fragment>
      {/*  Page Content  */}
      {/* <Carousel>
        <Carousel.Item>
          <HeroHeader data={homepage} />
        </Carousel.Item>
        <Carousel.Item>
          <FeaturesList />
        </Carousel.Item>
      </Carousel> */}
      {isMobile ? <HeroHeaderMobile data={[]} /> : <HeroHeader data={[]} />}

      <FeaturesList />
      {/*  Launching Pack  */}
      <div className="divPackage" id="div-package">
        <Container
          className="d-flex flex-column align-items-center justify-content-center pt-5"
          style={{ height: "100%" }}
        >
          <Link href="/master-inteligencia-artificial">
            <div
              className={activeLocale === "es" ? "AICourseBg" : "AICourseBg_en"}
            ></div>
          </Link>
          <Button
            onClick={() => router.push("/master-inteligencia-artificial")}
            className="btn btn-primary btn-sm mb-5 mt-5 px-10 fs-3"
            style={{ backgroundColor: "#00629B", borderColor: "transparent" }}
          >
            {t("pages.view_offer")}
          </Button>
        </Container>
      </div>
      {/*  Content */}
      <div className="pt-lg-6 pb-lg-3 pt-6 pb-6">
        <Container className="">
          <Row>
            <Col md={{ span: 10, offset: 1 }} sm={12}>
              <div className="mb-5">
                <h1 className="mb-1 text-center h1titles">
                  {t("home_page.homepagebccourses.bcCoursesTitle")}
                </h1>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <Tab.Container defaultActiveKey="tab0">
                <Nav className="nav-lb-tab">
                  <Nav.Item className="ms-0">
                    <Nav.Link
                      eventKey="tab0"
                      className="mb-sm-3 mb-md-0 tabTitle"
                    >
                      {t("categories.all")}
                    </Nav.Link>
                  </Nav.Item>
                  {!isLoading && !_.isEmpty(catOBJ) && (
                    <>
                      {catOBJ.map((d, i) => {
                        return (
                          <Nav.Item key={i}>
                            <Nav.Link
                              eventKey={`tab${++i}`}
                              className="mb-sm-3 mb-md-0"
                            >
                              {d.name}
                            </Nav.Link>
                          </Nav.Item>
                        );
                      })}
                    </>
                  )}
                  {freeCourseCount > 0 && (
                    <Nav.Item>
                      <Nav.Link
                        eventKey={`tabfreecourse`}
                        className="mb-sm-3 mb-md-0"
                      >
                        Gratis
                      </Nav.Link>
                    </Nav.Item>
                  )}
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="tab0" className="pb-4 p-4 ps-0 pe-0">
                    {/* most popular started */}
                    <Row>
                      <Col lg={3} md={6} sm={12} style={{ display: "none" }}>
                        <SpecialPackCard />
                      </Col>
                      {obj &&
                        obj.map((item, index) => (
                          <>
                            {" "}
                            {item.is_public === 0 && (
                              <>
                                {index === "1" && (
                                  <Col lg={3} md={6} sm={12}>
                                    <SpecialPackCard />
                                  </Col>
                                )}
                                <Col lg={3} md={6} sm={12} key={index}>
                                  <CourseCard
                                    item={item}
                                    key={index}
                                    viewby="grid"
                                  />
                                </Col>
                              </>
                            )}
                          </>
                        ))}
                    </Row>
                    {/* end of most popular */}
                  </Tab.Pane>
                  {!isLoading && !_.isEmpty(catOBJ) && (
                    <>
                      {catOBJ.map((d, i) => {
                        return (
                          <>
                            <Tab.Pane
                              key={i}
                              eventKey={`tab${++i}`}
                              className="pb-4 p-4 ps-0 pe-0"
                            >
                              <Row>
                                {obj &&
                                  getFilteredCourses(d.id) &&
                                  getFilteredCourses(d.id).map(
                                    (item, index) => (
                                      <>
                                        {" "}
                                        {item.is_public === 0 && (
                                          <Col
                                            lg={3}
                                            md={6}
                                            sm={12}
                                            key={index}
                                          >
                                            <CourseCard
                                              item={item}
                                              viewby="grid"
                                            />
                                          </Col>
                                        )}
                                      </>
                                    )
                                  )}
                              </Row>
                              {!isLoading &&
                                obj &&
                                getFilteredCourses(d.id) &&
                                getFilteredCourses(d.id).length === 0 && (
                                  <Alert variant="info">
                                    No courses available for {`${d.name}`}.
                                  </Alert>
                                )}
                            </Tab.Pane>
                          </>
                        );
                      })}
                    </>
                  )}
                  {freeCourseCount > 0 && (
                    <Tab.Pane
                      eventKey="tabfreecourse"
                      className="pb-4 p-4 ps-0 pe-0"
                    >
                      {/* most popular started */}
                      <Row>
                        {obj &&
                          obj.map((item, index) => (
                            <>
                              {" "}
                              {item.is_public === 1 && (
                                <Col lg={3} md={6} sm={12} key={index}>
                                  <CourseCard
                                    item={item}
                                    key={index}
                                    viewby="grid"
                                  />
                                </Col>
                              )}
                            </>
                          ))}
                      </Row>
                      {/* end of most popular */}
                    </Tab.Pane>
                  )}
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
          {freeCourseCount > 0 && (
            <>
              {" "}
              <Row>
                <Col md={{ span: 10, offset: 1 }} sm={12}>
                  <div className="mb-5">
                    <h1 className="mb-1 text-center h1titles">
                      Cursos gratuitos
                    </h1>{" "}
                  </div>
                  k
                </Col>
              </Row>
              <Row className="mb-3">
                {obj &&
                  obj.map((item, index) => (
                    <>
                      {" "}
                      {item.is_public === 1 && (
                        <Col lg={3} md={6} sm={12} key={index}>
                          <CourseCard item={item} key={index} viewby="grid" />
                        </Col>
                      )}
                    </>
                  ))}
              </Row>
            </>
          )}

          <Row>
            <Col md={{ span: 10, offset: 1 }} sm={12}>
              <div className="mb-2">
                <h1 className="mb-1 text-center h1titles">Artículos</h1>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12} sm={12} className="text-center">
              <Link href="/articles" className="text-center">
                <a href="#" className="text-center text-decoration-underline">
                  <b>Todos los artículos</b>
                </a>
              </Link>
            </Col>
          </Row>
          <ArticleList />
          {/*  Launching Pack  */}
          <div style={{ display: "none" }}>
            <Container
              className="d-flex flex-column align-items-center justify-content-center py-2"
              style={{ height: "100%" }}
            >
              <Link href="/PackageDetail/1">
                <div className="xmasPackImg"></div>
              </Link>
              <Button
                onClick={() => router.push("/PackageDetail/1")}
                className="btn btn-primary mb-5 mt-5 px-10 fs-3"
                style={{ backgroundColor: "red", borderColor: "transparent" }}
              >
                {t("pages.view_offer")}
              </Button>
            </Container>
          </div>
          {/* <Row>
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex align-items-center justify-content-center pb-5"
            >
              <p className="fw-bold" style={{ fontSize: "16px" }}>
                {t("footer.disclaimer")}
                <Link href="https://mundocrypto.com/NoInvitationToInvest">
                  https://mundocrypto.com/NoInvitationToInvest
                </Link>
              </p>
            </Col>
          </Row> */}
          <RegisterNow />

          <Container className="justify-content-center pt-5 pb-8">
            <Row className="mb-4">
              <Col md={{ span: 10, offset: 1 }} sm={12}>
                <div className="mb-5">
                  <h2 className="mb-1 h1titles text-center">
                    {t("pages.why_l2e")}
                  </h2>
                </div>
              </Col>
            </Row>
            <Row className="pb-5">
              {false && (
                <Col
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  className="justify-content-center"
                >
                  <Card
                    text={"dark"}
                    style={{
                      width: isMobile ? "" : "18rem",
                      minHeight: "16rem",
                    }}
                    className="mb-2"
                  >
                    <Card.Body>
                      <img src="/images_optimized/cup.svg" width={"35px"} />

                      <Card.Title className="l2eTitle pt-4">
                        {" "}
                        {t("pages.card_1_title")}{" "}
                      </Card.Title>
                      <Card.Text>{t("pages.card_1_subtitle")}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )}
              <Col
                lg={4}
                md={4}
                sm={12}
                xs={12}
                className="d-flex justify-content-center"
              >
                <Card
                  text={"dark"}
                  style={{
                    width: isMobile ? "" : "18rem",
                    minHeight: "16rem",
                  }}
                  className="mb-2"
                >
                  <Card.Body>
                    <img src="/images_optimized/network.svg" width={"35px"} />

                    <Card.Title
                      className={`pt-2 ${
                        isMobile ? "l2eTitle_mobile" : "l2eTitle"
                      }`}
                    >
                      {" "}
                      {t("pages.card_2_title")}{" "}
                    </Card.Title>
                    <Card.Text>{t("pages.card_2_subtitle")}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col
                lg={4}
                md={4}
                sm={12}
                xs={12}
                className="d-flex justify-content-center"
              >
                <Card
                  text={"dark"}
                  style={{
                    width: isMobile ? "" : "18rem",
                    minHeight: "16rem",
                  }}
                  className="mb-2"
                >
                  <Card.Body>
                    <img src="/images_optimized/bag.svg" width={"35px"} />

                    <Card.Title className="l2eTitle pt-2">
                      {" "}
                      {t("pages.card_3_title")}{" "}
                    </Card.Title>
                    <Card.Text>{t("pages.card_3_subtitle")}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <Support />
          <br />
          <br />
        </Container>
      </div>
      <InstructorHOY />

      {/* Testimonials Section */}

      <Row className="mb-4 pt-8">
        <Col md={{ span: 10, offset: 1 }} sm={12}>
          <div className="mb-5">
            <h1 className="mb-1 h1titles">
              {t("home_page.homepagetestimonial.testimonialTitle")}
            </h1>
            <p className="mb-0 h1SubTitles">
              {t("home_page.homepagetestimonial.testimonialSubTitle")}
            </p>
          </div>
        </Col>
      </Row>
      <Row className="mb-8">
        <Col md={{ span: 6, offset: 3 }}>
          <TestimonialsSlider />
        </Col>
      </Row>

      {/*  B2B section */}
      <YourInstructor data={[]} />
      {/*  Outstanding Courses */}
      {false && (
        <div className="pt-lg-12 pb-lg-3 pt-8 pb-6">
          <Container>
            <Row className="mb-4">
              <Col md={{ span: 10, offset: 1 }} sm={12}>
                <div className="mb-5">
                  <h2 className="mb-1 h1titles">
                    {t("home_page.homepageoutstanding.outstandingTitle")}
                  </h2>
                  <p className="mb-0 h1SubTitles">
                    {t("home_page.homepageoutstanding.outstandingSubTitle")}
                  </p>
                </div>
              </Col>
            </Row>

            <div className="position-relative">
              <CourseSlider recommended={true} />
            </div>
          </Container>
        </div>
      )}

      <div className="pb-lg-3 pb-6">
        <Container>
          <Row className="mb-4">
            <Col md={12}>
              <FAQsection data={[]} />
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default Home;

export async function getStaticProps({ locale }) {
  const language = locale.toUpperCase();

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
