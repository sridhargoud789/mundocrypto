import _ from "lodash";
import { useEffect, useState } from "react";

import { Col, Row } from "react-bootstrap";
import CourseThumbnail from "../components/Course/CourseThumbnail";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { getCategories, getCourseList } from "../services/nodeapi";

import Stack from "@mui/material/Stack";
import MUIChip from "../components/Common/MUIChip";

const CourseList = (props: any) => {
  const [clOBJ, setclOBJ] = useState([]);
  const [catOBJ, setCatOBJ] = useState<{ [key: string]: any }>({});

  const [isLoading, setIsLoading] = useState(false);
  const { title } = props;
  useEffect(() => {
    pageLoad();
  }, []);

  const pageLoad = async () => {
    setIsLoading(true);
    const clresp = await getCourseList();

    if (clresp.status === 200) {
      setclOBJ(clresp.data.category);
    }

    const catresp = await getCategories();

    if (catresp.status === 200) {
      setCatOBJ(catresp.data.category);
    }

    setIsLoading(false);
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
              <h1>All Mundocrypto Courses</h1>
            </Col>
          </Row>
          <br />
          {/* <Row>
            <Col>
              <div className="container cl-sub-menu d-flex">
                <header className="d-flex justify-content-center ">
                  <ul className="nav nav-pills cl-sub-menu-ul">
                    <li>
                      <NavLink href="#" className="nav-link px-2">
                        Cryptocurrencies
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="#" className="nav-link px-2">
                        Trading
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="#" className="nav-link px-2">
                        Economy
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="#" className="nav-link px-2">
                        Development
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="#" className="nav-link px-2">
                        Entrepreneurship
                      </NavLink>
                    </li>
                  </ul>
                </header>
              </div>
            </Col>
          </Row> */}
          <Row>
            <Col>
              <Stack direction="row" spacing={1}>
                {!isLoading && !_.isEmpty(catOBJ) && (
                  <>
                    {catOBJ.map((d: Object, i: number) => {
                      return (
                        <MUIChip
                          key={i}
                          d={d}
                          id={i}
                          handleClick={handleClick}
                        />
                      );
                    })}
                  </>
                )}
              </Stack>
            </Col>
          </Row>
          <br />
          {!isLoading && !_.isEmpty(clOBJ) && (
            <Row>
              {clOBJ.map((d: Object, i) => {
                return (
                  <Col md={3} key={i}>
                    <CourseThumbnail {...d} />
                  </Col>
                );
              })}
            </Row>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CourseList;
