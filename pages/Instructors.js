// import node module libraries

import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";

// import MDI icons
import i18 from "../next-i18next.config";

// import widget/custom components
import { GeeksSEO } from "widgets";
// import data files
import { mdiFileDocument, mdiLifebuoy, mdiStar } from "@mdi/js";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import InstructorHeader from "components/instructor/header";
import InstructorStep1Form from "components/instructor/step1";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const Instructors = ({ pagedata }) => {
  useEffect(() => {
    document.body.style.backgroundColor = "#f5f4f8";
  });
  const { t } = useTranslation();

  const steps = ["1", "2", "3"];
  const [activeStep, setActiveStep] = useState(1);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const features = [
    {
      id: 1,
      icon: mdiStar,
      title: "Recompensas",
      description:
        "Empieza a ganar recompensas de forma online desde cualquier parte del mundo.",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="47" height="64" viewBox="0 0 47 64" fill="none"><path d="M10.5083 21.1079L16.6305 25.5379L14.2815 32.7202C14.0117 33.5451 14.3047 34.4499 15.0068 34.96C15.7086 35.4699 16.6598 35.4691 17.3611 34.9576L23.466 30.5042L29.571 34.9577C29.9222 35.214 30.3358 35.342 30.7497 35.342C31.1622 35.342 31.5748 35.2146 31.9252 34.96C32.6273 34.4499 32.9203 33.5451 32.6506 32.7202L30.3016 25.5379L36.4237 21.1079C37.1267 20.5991 37.4215 19.695 37.1533 18.8696C36.8855 18.0454 36.1176 17.4876 35.2512 17.4876C35.25 17.4876 35.2486 17.4876 35.2475 17.4876L27.6907 17.5021L25.3695 10.3109C25.1028 9.485 24.334 8.92525 23.4661 8.92525C22.5982 8.92525 21.8293 9.485 21.5627 10.3109L19.2415 17.5021L11.6847 17.4876C11.6835 17.4876 11.6822 17.4876 11.681 17.4876C10.8147 17.4876 10.0467 18.0455 9.77884 18.8696C9.51047 19.6951 9.80534 20.5991 10.5083 21.1079V21.1079ZM20.6926 21.505H20.6963C21.564 21.505 22.333 20.9452 22.5997 20.1194L23.466 17.4357L24.3322 20.1194C24.599 20.9454 25.3677 21.505 26.2356 21.505H26.2393L29.0593 21.4995L26.7748 23.1527C26.0706 23.6622 25.7762 24.5685 26.0465 25.3947L26.923 28.0749L24.6448 26.413C24.2936 26.1567 23.88 26.0287 23.4661 26.0287C23.0522 26.0287 22.6386 26.1567 22.2873 26.413L20.0092 28.0749L20.8857 25.3947C21.156 24.5686 20.8616 23.6624 20.1573 23.1527L17.8728 21.4995L20.6926 21.505ZM46.514 23.048C46.514 10.3392 36.1747 0 23.466 0C10.7572 0 0.417969 10.3392 0.417969 23.048C0.417969 30.2255 3.71647 36.6467 8.87659 40.8769V62C8.87659 62.711 9.25409 63.3685 9.86809 63.727C10.482 64.0856 11.2405 64.0914 11.8595 63.7417L23.466 57.1927L35.0726 63.7419C35.3777 63.9141 35.7165 64 36.0553 64C36.404 64 36.7525 63.9089 37.0638 63.727C37.6778 63.3685 38.0553 62.711 38.0553 62V40.8769C43.2155 36.6466 46.514 30.2255 46.514 23.048V23.048ZM4.41797 23.048C4.41797 12.5449 12.963 4 23.466 4C33.969 4 42.514 12.5449 42.514 23.048C42.514 33.5511 33.969 42.0959 23.466 42.0959C12.963 42.0959 4.41797 33.551 4.41797 23.048V23.048ZM34.0553 58.5751L24.4487 53.1546C23.8388 52.8104 23.093 52.8104 22.4831 53.1546L12.8765 58.5751V43.5147C16.0491 45.1629 19.6503 46.0957 23.4658 46.0957C27.2813 46.0957 30.8826 45.1629 34.0552 43.5147V58.5751H34.0553Z" fill="#1d93c9"></path></svg>',
    },
    {
      id: 2,
      icon: mdiLifebuoy,
      title: "Soporte personalizado para ti",
      description:
        "Utiliza nuestro equipo de soporte para resolver todas tus dudas.  ",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none"><path d="M64 61.1811C63.9995 58.9223 62.6562 56.8911 60.5776 56.0068L44.6341 49.2235V45.2484C46.3221 43.1292 47.3895 40.6053 47.7469 37.8953H51.0062C54.1078 37.8953 56.6313 35.3719 56.6313 32.2703V24.2062C56.6313 21.3703 54.5209 19.0192 51.7885 18.6369C51.3832 6.43706 44.5623 0 32.0002 0C19.4381 0 12.6173 6.43706 12.212 18.6369C9.47956 19.0192 7.3692 21.3703 7.3692 24.2062V32.2703C7.3692 35.3719 9.89265 37.8953 12.9942 37.8953H16.2535C16.611 40.6058 17.6784 43.1297 19.3664 45.2484V49.2235L3.42337 56.0068C1.34425 56.8911 0.00097657 58.9223 0 61.1816V62.1245C0 62.6221 0.197267 63.0991 0.54932 63.4507C0.900886 63.8022 1.37794 64 1.87501 64H62.1255C62.623 64 63.1001 63.8022 63.4516 63.4507C63.8032 63.0986 64.0005 62.6216 64.0005 62.1245L64 61.1811ZM40.886 50.539C40.8875 50.5839 40.9925 55.1347 38.3045 57.934C36.8284 59.4707 34.7073 60.2495 32.0002 60.2495C29.303 60.2495 27.1872 59.476 25.7121 57.9506C22.9919 55.1367 23.1135 50.5785 23.1144 50.539C23.1159 50.5136 23.1164 50.4887 23.1164 50.4633V48.6068C25.6838 50.2313 28.7463 51.1039 32.0002 51.1039C35.2542 51.1039 38.3167 50.2313 40.8841 48.6068V50.4633C40.8841 50.4887 40.8846 50.5136 40.886 50.539V50.539ZM44.1312 35.0169L40.5643 37.3953C39.4314 38.1507 38.1126 38.5501 36.7503 38.5501H33.5789C32.5437 38.5501 31.7039 39.3895 31.7039 40.4251C31.7039 41.4608 32.5437 42.3001 33.5789 42.3001H36.7503C38.8553 42.3001 40.8939 41.6829 42.6449 40.515L43.3626 40.0364C41.6707 44.4022 37.3435 47.3539 32.0002 47.3539C25.0847 47.3539 19.8693 42.41 19.8693 35.8538V20.653C20.6086 17.2164 21.6794 15.0323 22.9704 14.3321C24.256 13.6339 26.1242 14.36 27.9309 15.0616C29.3386 15.608 30.6682 16.1246 32.0002 16.1246C33.3445 16.1246 34.658 15.6027 36.0491 15.0504C37.8577 14.3317 39.5662 13.6529 40.8318 14.3131C41.7542 14.7941 43.0692 16.2916 44.1312 20.6769V35.0169ZM52.8813 24.2062V32.2703C52.8813 33.304 52.0399 34.1453 51.0062 34.1453H47.8812V22.3312H51.0062C52.0399 22.3312 52.8813 23.1725 52.8813 24.2062V24.2062ZM19.3048 8.34333C21.9015 5.29545 26.1726 3.75003 32.0002 3.75003C37.8279 3.75003 42.0989 5.29545 44.6956 8.34333C46.7401 10.7432 47.8602 14.1842 48.0336 18.5812H47.4584C46.326 14.5597 44.7547 12.1295 42.5657 10.9879C39.7772 9.53376 36.9422 10.6597 34.6643 11.565C33.6624 11.963 32.6262 12.3746 31.9998 12.3746C31.3704 12.3746 30.3118 11.9635 29.2883 11.566C26.9299 10.6495 23.9943 9.50935 21.1813 11.0357C19.0602 12.1871 17.5245 14.6632 16.5074 18.5812H15.9669C16.1398 14.1842 17.2604 10.7432 19.3048 8.34333ZM11.1192 32.2703V24.2062C11.1192 23.1725 11.9605 22.3312 12.9942 22.3312H16.1193V34.1453H12.9942C11.9605 34.1453 11.1192 33.304 11.1192 32.2703ZM4.89115 59.4575L19.5812 53.2074C19.9103 55.2421 20.7277 58.0107 22.7316 60.25H3.99808C4.19681 59.9028 4.50638 59.6211 4.89115 59.4575V59.4575ZM41.2689 60.25C43.2728 58.0107 44.0902 55.2421 44.4193 53.2074L59.1093 59.4575C59.4941 59.6211 59.8032 59.9028 60.0024 60.25H41.2689Z" fill="#1d93c9"></path></svg>',
    },
    {
      id: 3,
      icon: mdiFileDocument,
      title: `Fácil y seguro`,
      description:
        "Disfruta de nuestras herramientas automatizadas para subir tu curso de forma fácil y segura. ",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="60" viewBox="0 0 48 60" fill="none"><path d="M23.7624 0L0 8.64158V29.5446C0.00569663 33.6243 0.973562 37.6451 2.82499 41.2805C4.67642 44.9159 7.3592 48.0634 10.6554 50.4673L23.7624 60L36.8693 50.4673C40.1656 48.0634 42.8483 44.9159 44.6998 41.2805C46.5512 37.6451 47.5191 33.6243 47.5248 29.5446V8.64158L23.7624 0ZM43.5644 29.5446C43.5589 32.9997 42.739 36.4049 41.1711 39.4838C39.6033 42.5627 37.3317 45.2287 34.5406 47.2653L23.7624 55.1049L12.9842 47.2653C10.1931 45.2287 7.92149 42.5627 6.35364 39.4838C4.78579 36.4049 3.96586 32.9997 3.9604 29.5446V11.4139L23.7624 4.21386L43.5644 11.4139V29.5446Z" fill="#1d93c9"></path><path d="M15.2624 24.9644L12.4624 27.7644L21.2881 36.5902L35.0644 22.8139L32.2644 20.0139L21.2881 30.9902L15.2624 24.9644Z" fill="#1d93c9"></path></svg>',
    },
  ];
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Instructores | MundoCrypto" />

      <div className="py-md-20 py-12 instructorBG">
        <Container>
          <Row>
            <Col xl={6} lg={6} md={12}>
              <InstructorHeader />
            </Col>
            <Col xl={{ span: 5, offset: 1 }} lg={6} md={12}>
              {/*  Card  */}
              <Card style={{ zIndex: 1 }}>
                {/*  Card body  */}
                <Card.Body className="p-6">
                  <Box sx={{ width: "100%" }}>
                    <Stepper activeStep={0} nonLinear>
                      <Step key="1">
                        <StepLabel>{}</StepLabel>
                      </Step>
                      <Step key="2">
                        <StepLabel>{}</StepLabel>
                      </Step>
                      <Step key="3">
                        <StepLabel>{}</StepLabel>
                      </Step>
                    </Stepper>
                    {activeStep === 1 && <InstructorStep1Form />}
                    {activeStep === 2 && (
                      <Row>
                        <Col className="mt-4">
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>{t("signup.full_name")}</Form.Label>
                              <Form.Control
                                type="text"
                                name="fullName"
                                id="username"
                                placeholder={t("signup.full_name_place_holder")}
                                required
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>{t("signup.email")} </Form.Label>
                              <Form.Control
                                type="email"
                                id="email"
                                name="email"
                                placeholder={t("signup.email_Place_holder")}
                                required
                              />
                            </Form.Group>

                            <div className="d-grid">
                              <Button
                                variant="primary"
                                type="submit"
                                className="btn_homeBanner"
                              >
                                Start Courses for Free
                              </Button>
                            </div>
                          </Form>
                        </Col>
                      </Row>
                    )}
                  </Box>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="py-md-2 py-12 bg-white">
        <Container className=" ">
          <Row className="mb-4 mt-10 justify-content-center">
            <Col lg={12} md={12} sm={12} className="text-center">
              <h2 className="mb-2 display-4 fw-bold ">
                Descubre los beneficios de ser profesor online
              </h2>
              <p className="lead">
                Disfruta de los beneficios de ser instructor online en nuestra
                comunidad de profesores
              </p>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col lg={6} md={12} xs={12}>
              {/* content */}
              <div className="pe-lg-6 ps-lg-6">
                <div>
                  {/* icon with para */}
                  {features.map((item, index) => {
                    return (
                      <div className="d-flex mb-4" key={index}>
                        <Row>
                          <Col md={2} className="iconsInstructors">
                            <div
                              className="text-primary mt-1"
                              dangerouslySetInnerHTML={{ __html: item.svg }}
                            ></div>
                          </Col>
                          <Col md={10}>
                            <h3
                              className="mb-2"
                              dangerouslySetInnerHTML={{ __html: item.title }}
                            ></h3>
                            <p
                              className="mb-0 fs-4"
                              style={{ color: "#71A0C2" }}
                            >
                              {item.description}
                            </p>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
            <Col lg={6} md={12} xs={12}>
              {/* image */}
              <div className="mt-2 mt-lg-0">
                <Image
                  src="/images_optimized/upload_video_instructor.png"
                  alt="..."
                  className="img-fluid w-100"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="py-md-2 py-12 instructor_onlineteacher">
        <Container className="pb-10">
          <Row className="mb-4 mt-10 justify-content-center">
            <Col lg={12} md={12} sm={12} className="text-center">
              <h2 className="mb-2 display-4 fw-bold ">
                Pasos a seguir para ser profesor online
              </h2>
              <p className="lead">Como empezar en nuestra plataforma</p>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col
              xl={{ offset: 1, span: 10 }}
              lg={{ offset: 1, span: 10 }}
              md={12}
              xs={12}
            >
              {/* content */}
              <div className="pe-lg-6 ps-lg-6">
                <Card className="text-center cardinstructor_onlineteacher">
                  <Card.Body>
                    <Card.Title>
                      <div className="pb-4">
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="42"
                          height="42"
                          viewBox="0 0 64 65"
                          fill="none"
                        >
                          <path
                            d="M45.9462 32.2603C44.7163 31.673 43.4614 31.167 42.1846 30.7432C46.32 27.6251 49 22.6599 49 17.0776C49 7.66107 41.3738 0 32 0C22.6261 0 15 7.66107 15 17.0776C15 22.666 17.686 27.6361 21.8291 30.7537C18.0331 32.0091 14.4712 33.9626 11.3537 36.5386C5.6372 41.2622 1.66258 47.8507 0.162202 55.0908C-0.308048 57.3593 0.255327 59.6894 1.70758 61.4833C3.1527 63.2685 5.29558 64.2922 7.58658 64.2922H38.375C39.7557 64.2922 40.875 63.1679 40.875 61.7808C40.875 60.3938 39.7557 59.2694 38.375 59.2694H7.58658C6.51933 59.2694 5.87545 58.6709 5.5867 58.3143C5.08808 57.6984 4.89508 56.8966 5.0572 56.1144C7.65158 43.5957 18.6436 34.4508 31.3372 34.1424C31.5571 34.151 31.778 34.1553 32 34.1553C32.2241 34.1553 32.4472 34.1509 32.6692 34.1422C36.5592 34.2339 40.3005 35.1257 43.7997 36.7968C45.0468 37.392 46.5381 36.8594 47.1308 35.6066C47.7236 34.3539 47.1933 32.8557 45.9462 32.2603ZM32.6097 29.117C32.4068 29.1133 32.2036 29.1114 32 29.1114C31.7982 29.1114 31.5965 29.1135 31.395 29.1172C25.0581 28.7997 20 23.5209 20 17.0776C20 10.4305 25.3831 5.02283 32 5.02283C38.6168 5.02283 44 10.4305 44 17.0776C44 23.5193 38.9443 28.797 32.6097 29.117Z"
                            fill="#1d93c9"
                          ></path>
                          <path
                            d="M61.5 49.8516H54.625V42.9453C54.625 41.5582 53.5057 40.4338 52.125 40.4338C50.7443 40.4338 49.625 41.5582 49.625 42.9453V49.8516H42.75C41.3693 49.8516 40.25 50.976 40.25 52.3631C40.25 53.7501 41.3693 54.8745 42.75 54.8745H49.625V61.7809C49.625 63.1679 50.7443 64.2923 52.125 64.2923C53.5057 64.2923 54.625 63.1679 54.625 61.7809V54.8745H61.5C62.8808 54.8745 64 53.7501 64 52.3631C64 50.976 62.8808 49.8516 61.5 49.8516Z"
                            fill="#1d93c9"
                          ></path>
                        </svg>
                      </div>
                      <h2>Crea tu cuenta</h2>
                    </Card.Title>
                    <Card.Text className="fw-bold">
                      Tienes que tener una cuenta creada con nosotros como
                      profesor
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="pe-lg-6 ps-lg-6 mt-6">
                <Card className="text-center cardinstructor_onlineteacher">
                  <Card.Body>
                    <Card.Title>
                      <div className="pb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="42"
                          height="42"
                          viewBox="0 0 64 38"
                          fill="none"
                        >
                          <path
                            d="M32.9375 17.1262L21.6875 10.6311C20.4404 9.91097 18.875 10.812 18.875 12.2548V25.2452C18.875 26.6831 20.4354 27.592 21.6875 26.869L32.9375 20.3738C34.183 19.6548 34.1892 17.8488 32.9375 17.1262ZM22.625 21.9975V15.5025L28.25 18.75L22.625 21.9975Z"
                            fill="#1d93c9"
                          ></path>
                          <path
                            d="M61.2923 3.94513L48.875 10.0999V1.875C48.875 0.8395 48.0355 0 47 0H1.875C0.8395 0 0 0.8395 0 1.875V35.625C0 36.6605 0.8395 37.5 1.875 37.5H47C48.0355 37.5 48.875 36.6605 48.875 35.625V27.5028L61.3035 33.5605C62.5471 34.1665 64 33.2601 64 31.875V5.625C64 4.23837 62.5401 3.32663 61.2923 3.94513ZM3.75 33.75V3.75H45.125V33.75H3.75ZM60.25 28.8753L48.875 23.331V14.2851L60.25 8.647V28.8753Z"
                            fill="#1d93c9"
                          ></path>
                        </svg>
                      </div>
                      <h2>Graba tu video</h2>
                    </Card.Title>
                    <Card.Text className="fw-bold">
                      Utiliza herramientas como un smartphone o una cámara
                      réflex digital, un buen micrófono y podrás empezar de
                      inmediato.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="pe-lg-6 ps-lg-6 mt-6">
                <Card className="text-center cardinstructor_onlineteacher">
                  <Card.Body>
                    <Card.Title>
                      <div className="pb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="42"
                          height="42"
                          viewBox="0 0 64 54"
                          fill="none"
                        >
                          <path
                            d="M48.6704 12.9436C47.7459 9.248 45.6132 5.96718 42.611 3.62212C39.6088 1.27707 35.9092 0.00221486 32.0997 2.88332e-06C28.2902 -0.00220909 24.5891 1.26835 21.5842 3.60991C18.5793 5.95148 16.4428 9.22983 15.514 12.9244C11.1327 13.3356 7.0782 15.4187 4.19266 18.7411C1.30713 22.0635 -0.187631 26.3699 0.0188688 30.7655C0.225369 35.1612 2.11726 39.3084 5.30156 42.3457C8.48585 45.383 12.7178 47.0769 17.1183 47.0755H23.5357C24.103 47.0755 24.6471 46.8501 25.0483 46.449C25.4495 46.0478 25.6748 45.5037 25.6748 44.9364C25.6748 44.369 25.4495 43.8249 25.0483 43.4238C24.6471 43.0226 24.103 42.7972 23.5357 42.7972H17.1183C15.4329 42.8022 13.7629 42.4751 12.2038 41.8346C10.6448 41.1941 9.22713 40.2528 8.03184 39.0645C5.61784 36.6645 4.25609 33.4039 4.24616 29.9999C4.23623 26.596 5.57894 23.3274 7.9789 20.9134C10.3789 18.4994 13.6395 17.1377 17.0435 17.1278C17.5924 17.1691 18.137 17.005 18.5718 16.6675C19.0066 16.3299 19.3005 15.8429 19.3965 15.3009C19.8321 12.2464 21.3551 9.45156 23.6857 7.42968C26.0164 5.40781 28.9982 4.29465 32.0837 4.29465C35.1691 4.29465 38.151 5.40781 40.4816 7.42968C42.8123 9.45156 44.3352 12.2464 44.7708 15.3009C44.8827 15.8241 45.1727 16.2922 45.5913 16.6254C46.0099 16.9586 46.5311 17.1361 47.0661 17.1278C50.4701 17.1278 53.7346 18.48 56.1416 20.887C58.5486 23.2939 59.9008 26.5585 59.9008 29.9625C59.9008 33.3665 58.5486 36.6311 56.1416 39.038C53.7346 41.445 50.4701 42.7972 47.0661 42.7972H40.6487C40.0814 42.7972 39.5373 43.0226 39.1361 43.4238C38.735 43.8249 38.5096 44.369 38.5096 44.9364C38.5096 45.5037 38.735 46.0478 39.1361 46.449C39.5373 46.8501 40.0814 47.0755 40.6487 47.0755H47.0661C51.4344 47.0298 55.6199 45.3152 58.7648 42.283C61.9098 39.2508 63.776 35.1307 63.9811 30.7669C64.1862 26.4032 62.7147 22.1262 59.8681 18.8124C57.0214 15.4986 53.0152 13.3989 48.6704 12.9436Z"
                            fill="#1d93c9"
                          ></path>
                          <path
                            d="M41.2764 31.4748C41.6798 31.8645 42.2202 32.0801 42.781 32.0752C43.3419 32.0703 43.8784 31.8454 44.2751 31.4488C44.6717 31.0522 44.8966 30.5156 44.9015 29.9548C44.9064 29.3939 44.6908 28.8535 44.3011 28.4501L33.6055 17.7545C33.2043 17.3535 32.6603 17.1282 32.0931 17.1282C31.5259 17.1282 30.9819 17.3535 30.5808 17.7545L19.8851 28.4501C19.4955 28.8535 19.2799 29.3939 19.2847 29.9548C19.2896 30.5156 19.5146 31.0522 19.9112 31.4488C20.3078 31.8454 20.8443 32.0703 21.4052 32.0752C21.9661 32.0801 22.5064 31.8645 22.9099 31.4748L29.954 24.4307V51.3537C29.954 51.921 30.1794 52.4651 30.5805 52.8663C30.9817 53.2675 31.5258 53.4928 32.0931 53.4928C32.6605 53.4928 33.2046 53.2675 33.6057 52.8663C34.0069 52.4651 34.2323 51.921 34.2323 51.3537V24.4307L41.2764 31.4748Z"
                            fill="#1d93c9"
                          ></path>
                        </svg>
                      </div>
                      <h2>
                        Sube el curso a nuestra plataforma y empieza a ganar
                        recompensas
                      </h2>
                    </Card.Title>
                    <Card.Text className="fw-bold">
                      Nosotros nos encargamos de alojar tu curso online y de
                      darle toda la visibilidad necesaria para que inspires con
                      tus conocimientos.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};
export default Instructors;

export async function getStaticProps({ locale }) {
  const language = locale.toUpperCase();

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
