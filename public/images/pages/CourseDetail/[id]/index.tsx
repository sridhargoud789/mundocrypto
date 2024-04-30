import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Image,
  Row,
  Stack,
} from "react-bootstrap";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import "../../../styles/coursedetail.module.css";

import _ from "lodash";
import { useEffect, useState } from "react";
import CourseDetails from "../../../components/Course/CourseDetails";
import { getCourseDetails } from "../../../services/nodeapi";
const CourseDetail = (props: any) => {
  const router = useRouter();

  const [cdOBJ, setcdOBJ] = useState<{ [key: string]: any }>({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (router.query.id) {
      pageLoad();
    }
  }, [router]);
  const ckbCheckedBlack = (txt: string) => {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#1E1E1E"
          className="w-5 h-5"
          stroke="white"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
        &nbsp;
        <small>{txt}</small>
      </>
    );
  };
  const ckbChecked = (txt: string) => {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#186CB0"
          className="w-5 h-5"
          stroke="white"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
        &nbsp;
        <small>{txt}</small>
      </>
    );
  };

  const pageLoad = async () => {
    setIsLoading(true);

    const courseId = router.query.id;
    const cdresp = await getCourseDetails(courseId);

    if (cdresp.status === 200) {
      setcdOBJ(cdresp.data.courseData);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      {!isLoading && !_.isEmpty(cdOBJ) && (
        <>
          <div className="container course-sub-menu">
            <header className="d-flex justify-content-center ">
              <div className="jumbotron p-4 p-md-2 text-white rounded  w-50">
                <div className="col-md-8 px-0">
                  <Breadcrumb className="lead my-3">
                    <Breadcrumb.Item href="/CourseList" className="text-white">
                      All Courses
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/CourseList" className="text-white">
                      Curso Experto Juegos Nft
                    </Breadcrumb.Item>
                  </Breadcrumb>

                  <h3>{cdOBJ.name}</h3>
                  <p
                    className="lead my-3 "
                    dangerouslySetInnerHTML={{ __html: cdOBJ.description }}
                  ></p>
                  <Stack direction="horizontal" gap={5} className="lead mb-0">
                    <div>{ckbChecked("Accesso Grupo Privado")}</div>
                    <div>{ckbChecked(`${cdOBJ.duration}hr`)}</div>
                    {!_.isNull(cdOBJ.language) && (
                      <div>{ckbChecked(`${cdOBJ.language}`)}</div>
                    )}
                    <div className="d-grid gap-2">
                      <Button
                        variant="outline-primary text-white"
                        size="sm"
                        className="full-width"
                        style={{ borderColor: "white" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                          />
                        </svg>
                        Register
                      </Button>
                    </div>
                  </Stack>
                </div>
              </div>
            </header>
          </div>
          <div className="container ">
            <Row className="jumbotron py-5 p-md-2">
              <Col md="8">
                <CourseDetails {...cdOBJ} />
              </Col>
              <Col md="4">
                <Card
                  className="card-p  position-relative cdPriceDetails"
                  style={{ background: "unset" }}
                >
                  <Card.Img
                    variant="top"
                    src={`${
                      process.env.NEXT_PUBLIC_MEDIA_BASE_URL + cdOBJ.url_image
                    }?100px180`}
                    onError={(e) => {
                      e.currentTarget.src = "./noimage.png";
                    }}
                    style={{ maxHeight: "11rem" }}
                  />
                  <Card.Body>
                    <Row>
                      <Col>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="divPrice_Coin">
                              <img
                                src="/coin_blue.png"
                                className="imgPrice_Coin"
                                width="25px"
                              />
                              1497 /{" "}
                              <small className="grayedTxt">
                                ${cdOBJ.price}
                              </small>
                            </div>
                          </div>

                          <div>
                            <Button
                              size="sm"
                              className="rounded-0"
                              style={{ backgroundColor: "#287828" }}
                            >
                              Reward 125%
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="py-3">
                      <Col>
                        <div className="d-grid gap-2">
                          <Button
                            variant="primary"
                            size="lg"
                            className="btnBlack full-width rounded-0"
                          >
                            Comprar ahora
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    <Row className="py-3">
                      <Col>
                        <small>Pago Seguro</small>
                        <Image src="/payusing.png" width={"50%"} />
                      </Col>
                    </Row>
                    <h3 className="border-bottom"></h3>
                    <Row>
                      <Col>
                        <Card
                          className=" noBorderCard"
                          style={{ background: "unset" }}
                        >
                          <Card.Body className="py-3">
                            <Row>
                              <Col>
                                <small style={{ color: "#186CB0" }}>
                                  Este curso incluye
                                </small>
                                <ul className="nav flex-column py-2">
                                  <li className="nav-item mb-1">
                                    {ckbCheckedBlack("Comunidad privada")}
                                  </li>
                                  <li className="nav-item mb-1">
                                    {ckbCheckedBlack("Red de networking")}
                                  </li>
                                  <li className="nav-item mb-1">
                                    {ckbCheckedBlack("25 horas")}
                                  </li>
                                  <li className="nav-item mb-1">
                                    {ckbCheckedBlack("Examenes de nivel")}
                                  </li>
                                  <li className="nav-item mb-1">
                                    {ckbCheckedBlack(
                                      "Recompensas en Tokens MCT"
                                    )}
                                  </li>
                                  <li className="nav-item mb-1">
                                    {ckbCheckedBlack("Bolsa de trabajo")}
                                  </li>
                                </ul>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <h3 className="border-bottom"></h3>
                    <Row>
                      <Col>
                        <Card
                          className=" noBorderCard"
                          style={{ background: "unset" }}
                        >
                          <Card.Body className="py-3">
                            <Row>
                              <Col>
                                <small style={{ color: "#186CB0" }}>
                                  Este curso incluye
                                </small>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: cdOBJ.description,
                                  }}
                                ></p>
                              </Col>
                            </Row>
                            <Row className="py-3">
                              <Col>
                                <div className="d-grid gap-2">
                                  <Button
                                    variant="outline-primary"
                                    size="lg"
                                    className="full-width rounded-0"
                                  >
                                    Solicitar información
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Card.Text>
                                  o habla con nuestros expertos
                                </Card.Text>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                  />
                                </svg>
                                &nbsp;{" "}
                                <Link href="#">
                                  <a className="cdLink">Iniciar conversacion</a>
                                </Link>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <h3 className="border-bottom"></h3>
                    <Row>
                      <Col>
                        <Card
                          className="noBorderCard"
                          style={{ background: "unset" }}
                        >
                          <Card.Body>
                            <Row>
                              <Col>
                                &nbsp;{" "}
                                <Link href="#">
                                  <a className="cdLink">Iniciar conversacion</a>
                                </Link>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <h3 className="border-bottom"></h3>
                    <Row>
                      <Col>
                        <Card
                          className=" noBorderCard"
                          style={{ background: "unset" }}
                        >
                          {" "}
                          <Card.Body>
                            <Row>
                              <Col>
                                <Link href="#">
                                  <a className="cdLink">Iniciar conversacion</a>
                                </Link>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <h3 className="border-bottom"></h3>
                    <Row>
                      <Col>
                        <Card
                          className=" noBorderCard"
                          style={{ background: "unset" }}
                        >
                          <Card.Body className="py-3">
                            <Row>
                              <Col>
                                <Link href="#">
                                  <a className="cdLink">
                                    Compartir con un amigo
                                  </a>
                                </Link>
                              </Col>
                            </Row>

                            <Row>
                              <Col>
                                <Link href="#">
                                  <a className="cdLink">
                                    Compartir en redes sociales
                                  </a>
                                </Link>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default CourseDetail;
