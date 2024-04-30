// import node module libraries

import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { Fragment, useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import i18 from "../next-i18next.config";

// import widget/custom components
import { CourseCard, GeeksSEO, PageHeading } from "widgets";
// import data files
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ScheduleCourse from "components/course/schedulecourse";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { useRecoilValue } from "recoil";
import { getCourseList, getMyCourses, getUserWishList } from "services/nodeapi";
import { userObject } from "../services/states";

const MyLearnings = () => {
  const userObj = useRecoilValue(userObject);
  const { t } = useTranslation();
  const [obj, setOBJ] = useState([]);
  const [clOBJ, setclOBJ] = useState([]);
  const [wlOBJ, setwlOBJ] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const onPhoneNoChange = (status, phoneNumber, country, code) => {
    const number = "+" + country.dialCode + phoneNumber;
    setPhoneNumber(number.trim());
  };

  const dashboardData = {
    avatar: userObj?.avatar || "/images_optimized/avatar/defaultuser.png",
    name: userObj?.name || "",
    username: userObj?.email || "",
    linkname: "Account Setting",
    link: "/privatearea/edit-profile",
    verified: false,
    outlinebutton: false,
    level: "Beginner",
  };
  const { locale: activeLocale, locales, asPath } = useRouter();
  useEffect(() => {
    document.body.style.backgroundColor = "#f5f4f8";
  });

  useEffect(() => {
    pageLoad();
  }, [activeLocale]);

  const pageLoad = async () => {
    const resp = await getCourseList();

    if (resp.status === 200) {
      setOBJ(resp.data.category);
    }
    const clresp = await getMyCourses();

    if (clresp.status === 200) {
      setclOBJ(clresp.data.list);
    } else {
      setIsLoading(false);
    }

    const clwlresp = await getUserWishList();
    setwlOBJ(clwlresp.data.courses);
  };

  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Mi aprendizaje | MundoCrypto" />
      <PageHeading bg="bg-black" pagetitle="Mi aprendizaje" />
      <Tab.Container defaultActiveKey="allcourses">
        <div className={`p-2`} style={{ background: "lightgrey" }}>
          <Container>
            <Card className="ml-tabheadercard">
              <Card.Header className="border-0 p-0 noBorderCard">
                <Nav
                  className="nav-lb-tab mylearningTabs noBorderCard"
                  style={{ background: "lightgrey" }}
                >
                  <Nav.Item className="mt-1">
                    <Nav.Link
                      eventKey="allcourses"
                      className="mb-sm-3 mb-md-0 p-2"
                    >
                      Todos los cursos
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="mt-1">
                    <Nav.Link
                      eventKey="mylists"
                      className="mb-sm-3 mb-md-0 p-2"
                    >
                      Mis cursos
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="mt-1">
                    <Nav.Link
                      eventKey="mywishlist"
                      className="mb-sm-3 mb-md-0 p-2"
                    >
                      Mi lista de deseos
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="mt-1">
                    <Nav.Link
                      eventKey="archived"
                      className="mb-sm-3 mb-md-0 p-2"
                    >
                      Archivado
                    </Nav.Link>
                  </Nav.Item>
                  {/* <Nav.Item className="mt-1">
                    <Nav.Link
                      eventKey="learningtools"
                      className="mb-sm-3 mb-md-0 p-2"
                    >
                      Learning tools
                    </Nav.Link>
                  </Nav.Item> */}
                </Nav>
              </Card.Header>
            </Card>
          </Container>
        </div>
        <Container>
          <Tab.Content className="mt-4">
            <Tab.Pane eventKey="allcourses" className="pb-4 p-4 ps-0 pe-0">
              {false && (
                <Row className="pb-4">
                  <Col>
                    <ScheduleCourse />
                  </Col>
                </Row>
              )}
              <Row>
                {obj &&
                  obj.map((item, index) => (
                    <Col lg={3} md={6} sm={12} key={index}>
                      <CourseCard key={index} viewby="grid" item={item} />
                    </Col>
                  ))}
                {obj && obj.length === 0 && (
                  <Alert variant="info">
                    {t("pages.no_courses_my_learning")}{" "}
                    <Link href="/CourseList">
                      {t("pages.no_courses_cart_2")}
                    </Link>
                  </Alert>
                )}
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="mylists" className="pb-4 p-4 ps-0 pe-0">
              <Row className="pb-4">
                <Col>
                  <Row>
                    {clOBJ &&
                      clOBJ.map((item, index) => (
                        <Col lg={3} md={6} sm={12} key={index}>
                          <CourseCard
                            viewby="grid"
                            showprogressbar={true}
                            progress={item.progress}
                            item={item.courseData}
                            isMyCourse={true}
                          />
                        </Col>
                      ))}
                    {clOBJ && clOBJ.length === 0 && (
                      <Alert variant="info">
                        {t("pages.no_courses_my_learning")}{" "}
                        <Link href="/CourseList">
                          {t("pages.no_courses_cart_2")}
                        </Link>
                      </Alert>
                    )}
                  </Row>
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="mywishlist" className="pb-4 p-4 ps-0 pe-0">
              <Row className="pb-4">
                <Row className="pb-4">
                  <Col>
                    <Row>
                      {wlOBJ &&
                        wlOBJ.map((item, index) => (
                          <Col lg={3} md={6} sm={12} key={index}>
                            <CourseCard
                              viewby="grid"
                              item={item}
                              isMyCourse={true}
                            />
                          </Col>
                        ))}
                      {wlOBJ && wlOBJ.length === 0 && (
                        <Alert variant="info">
                          {t("pages.no_courses_my_learning")}{" "}
                          <Link href="/CourseList">
                            {t("pages.no_courses_cart_2")}
                          </Link>
                        </Alert>
                      )}
                    </Row>
                  </Col>
                </Row>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="archived" className="pb-4 p-4 ps-0 pe-0">
              <Row className="pb-4">
                <Col>
                  <Alert variant="info">
                    {t("pages.no_courses_my_learning")}{" "}
                    <Link href="/CourseList">
                      {t("pages.no_courses_cart_2")}
                    </Link>
                  </Alert>
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="learningtools" className="pb-4 p-4 ps-0 pe-0">
              <Row className="pb-4">
                <Col>
                  <Card
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <Card.Body>
                      <span className="sc-courseTitle ms-8">
                        Learning reminders
                      </span>
                      <Row>
                        <Col md={6} sm={12}>
                          <Card className="noBorderCard">
                            <Card.Body className="ms-6">
                              <Card.Text className="lt-SubTitle">
                                Calendar events
                              </Card.Text>
                              <Card.Text>
                                Learning a little each day adds up. Research
                                shows that students who make learning a habit
                                are more likely to reach their goals. Set time
                                aside to learn and get reminders using your
                                learning scheduler.
                              </Card.Text>
                              <Button className="btn-dark-blue" size="lg">
                                Schedule learning time&nbsp;
                                <Icon path={mdiPlus} size={1} />
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                        {false && (
                          <Col md={6} sm={12}>
                            <Card className="noBorderCard">
                              <Card.Body className="ms-6">
                                <Card.Text className="lt-SubTitle">
                                  Push notifications
                                </Card.Text>
                                <Card.Text>
                                  Don&apos;t want to schedule time blocks? Set a
                                  learning reminder to get push notifications
                                  from the Udemy mobile app.
                                </Card.Text>
                                <Card.Text className="lt-SubTitle">
                                  Text me a link to download the app
                                </Card.Text>
                                <Row>
                                  <Col md={6} sm={12} className="mb-3">
                                    <Form.Group controlId="phone">
                                      <IntlTelInput
                                        required={false}
                                        name="phone"
                                        width={100}
                                        inputClassName="form-control"
                                        preferredCountries={["es", "us", "in"]}
                                        defaultCountry="es"
                                        useMobileFullscreenDropdown={true}
                                        onPhoneNumberChange={onPhoneNoChange}
                                        onPhoneNumberBlur={() => {}}
                                      />
                                      <Form.Control
                                        style={{ display: "none" }}
                                        type="text"
                                        required
                                        value={phoneNumber}
                                        name="phone_number"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col md={4} sm={12} className="mb-3">
                                    <Button className="btn-dark-blue" size="md">
                                      Send
                                    </Button>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        )}
                      </Row>
                      {false && (
                        <Row>
                          <Col>
                            <Card.Text className="ms-8">
                              By providing your phone number, you agree to
                              receive a one-time automated text message with a
                              link to get app. Standard messaging rates may
                              apply.
                            </Card.Text>
                          </Col>
                        </Row>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Container>
      </Tab.Container>
    </Fragment>
  );
};
export default MyLearnings;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
