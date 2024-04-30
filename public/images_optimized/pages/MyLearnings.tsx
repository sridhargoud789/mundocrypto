import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Alert, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import Courses from "../components/Course/Courses";
import MyCourseThumbnail from "../components/Course/MyCourseThumbnail";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { getMyCourses } from "../services/nodeapi";

const MyLearnings = (props: any) => {
  const router = useRouter();

  const [clOBJ, setclOBJ] = useState([]);
  const [catOBJ, setCatOBJ] = useState<{ [key: string]: any }>({});

  const [isLoading, setIsLoading] = useState(false);
  const { title } = props;
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
  return (
    <>
      <Header />
      <section className="container h-auto  d-flex align-items-center justify-content-center">
        <div className="container">
          <Row>
            <Col>
              <h1>My Courses</h1>
            </Col>
          </Row>
          <br />
          {!isLoading && !_.isEmpty(clOBJ) && (
            <Row>
              {clOBJ.map((d: Object, i) => {
                return (
                  <Col md={3} key={i}>
                    <MyCourseThumbnail {...d} />
                  </Col>
                );
              })}
            </Row>
          )}
          {!isLoading && _.isEmpty(clOBJ) && (
            <>
              <Row>
                <Col>
                  <Alert variant="info">
                    No courses available for learning.
                  </Alert>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Courses title="Let´s start learning today" />
                </Col>
              </Row>
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MyLearnings;
