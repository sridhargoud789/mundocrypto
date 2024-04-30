// import node module libraries
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Alert, Card, Col, Nav, Row, Tab } from "react-bootstrap";
import { CourseCard } from "widgets";
// import widget/custom components
//import CourseCard from "../CourseInit/CourseCard";
// import data files
import Swal from "sweetalert2";
import { getMyCourses } from "../../services/nodeapi";

import { useTranslation } from "react-i18next";

const Learnings = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const [clOBJ, setclOBJ] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    pageLoad();
  }, []);

  const pageLoad = async () => {
    setIsLoading(true);
    try {
      const clresp = await getMyCourses();

      if (clresp.status === 200) {
        setclOBJ(clresp.data.list);
      } else {
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error occured",
        text: "Please try again after sometime.",
      }).then((result) => {
        router.push("/");
      });
    }
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#f5f4f8";
  });

  return (
    <Fragment>
      <Row className="mt-0 mt-md-4">
        <Col lg={12} md={12} sm={12}>
          <Row className="mb-6">
            <Col md={12}>
              <Tab.Container defaultActiveKey="learning">
                <Card className="bg-transparent shadow-none ">
                  <Card.Header className="border-0 p-0 bg-transparent">
                    <Nav className="nav-lb-tab">
                      <Nav.Item>
                        <Nav.Link
                          eventKey="learning"
                          className="mb-sm-3 mb-md-0"
                        >
                          {t("pages.my_learnings")}
                        </Nav.Link>
                      </Nav.Item>
                      {/* <Nav.Item className="ms-0">
                        <Nav.Link
                          eventKey="bookmarked"
                          className="mb-sm-3 mb-md-0"
                        >
                          My Wishlist
                        </Nav.Link>
                      </Nav.Item> */}
                    </Nav>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <Tab.Content>
                      <Tab.Pane
                        eventKey="learning"
                        className="pb-4 p-4 ps-0 pe-0"
                      >
                        {/* learning courses started */}
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
                        {/* end of learning courses */}
                      </Tab.Pane>
                      <Tab.Pane
                        eventKey="bookmarked"
                        className="pb-4 p-4 ps-0 pe-0"
                      >
                        {/* bookmarked started */}
                        <Row>
                          <Alert variant="info">
                            No courses added to wishlist.
                          </Alert>
                          {/* {clOBJ &&
                                clOBJ.map((item, index) => (
                                  <Col lg={3} md={6} sm={12} key={index}>
                                    <CourseCard item={item} viewby="grid" />
                                  </Col>
                                ))} */}
                        </Row>
                        {/* end of bookmarked */}
                      </Tab.Pane>
                    </Tab.Content>
                  </Card.Body>
                </Card>
              </Tab.Container>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};
export default Learnings;
