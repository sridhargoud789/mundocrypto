// import node module libraries

import { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

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
import BusinessHeader from "components/business/header";
import InstructorStep1Form from "components/instructor/step1";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const Business = ({ pagedata }) => {
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
      title: "Rewards",
      description: "Start earning rewards online from anywhere in the world.",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="47" height="64" viewBox="0 0 47 64" fill="none"><path d="M10.5083 21.1079L16.6305 25.5379L14.2815 32.7202C14.0117 33.5451 14.3047 34.4499 15.0068 34.96C15.7086 35.4699 16.6598 35.4691 17.3611 34.9576L23.466 30.5042L29.571 34.9577C29.9222 35.214 30.3358 35.342 30.7497 35.342C31.1622 35.342 31.5748 35.2146 31.9252 34.96C32.6273 34.4499 32.9203 33.5451 32.6506 32.7202L30.3016 25.5379L36.4237 21.1079C37.1267 20.5991 37.4215 19.695 37.1533 18.8696C36.8855 18.0454 36.1176 17.4876 35.2512 17.4876C35.25 17.4876 35.2486 17.4876 35.2475 17.4876L27.6907 17.5021L25.3695 10.3109C25.1028 9.485 24.334 8.92525 23.4661 8.92525C22.5982 8.92525 21.8293 9.485 21.5627 10.3109L19.2415 17.5021L11.6847 17.4876C11.6835 17.4876 11.6822 17.4876 11.681 17.4876C10.8147 17.4876 10.0467 18.0455 9.77884 18.8696C9.51047 19.6951 9.80534 20.5991 10.5083 21.1079V21.1079ZM20.6926 21.505H20.6963C21.564 21.505 22.333 20.9452 22.5997 20.1194L23.466 17.4357L24.3322 20.1194C24.599 20.9454 25.3677 21.505 26.2356 21.505H26.2393L29.0593 21.4995L26.7748 23.1527C26.0706 23.6622 25.7762 24.5685 26.0465 25.3947L26.923 28.0749L24.6448 26.413C24.2936 26.1567 23.88 26.0287 23.4661 26.0287C23.0522 26.0287 22.6386 26.1567 22.2873 26.413L20.0092 28.0749L20.8857 25.3947C21.156 24.5686 20.8616 23.6624 20.1573 23.1527L17.8728 21.4995L20.6926 21.505ZM46.514 23.048C46.514 10.3392 36.1747 0 23.466 0C10.7572 0 0.417969 10.3392 0.417969 23.048C0.417969 30.2255 3.71647 36.6467 8.87659 40.8769V62C8.87659 62.711 9.25409 63.3685 9.86809 63.727C10.482 64.0856 11.2405 64.0914 11.8595 63.7417L23.466 57.1927L35.0726 63.7419C35.3777 63.9141 35.7165 64 36.0553 64C36.404 64 36.7525 63.9089 37.0638 63.727C37.6778 63.3685 38.0553 62.711 38.0553 62V40.8769C43.2155 36.6466 46.514 30.2255 46.514 23.048V23.048ZM4.41797 23.048C4.41797 12.5449 12.963 4 23.466 4C33.969 4 42.514 12.5449 42.514 23.048C42.514 33.5511 33.969 42.0959 23.466 42.0959C12.963 42.0959 4.41797 33.551 4.41797 23.048V23.048ZM34.0553 58.5751L24.4487 53.1546C23.8388 52.8104 23.093 52.8104 22.4831 53.1546L12.8765 58.5751V43.5147C16.0491 45.1629 19.6503 46.0957 23.4658 46.0957C27.2813 46.0957 30.8826 45.1629 34.0552 43.5147V58.5751H34.0553Z" fill="#593CC1"></path></svg>',
    },
    {
      id: 2,
      icon: mdiLifebuoy,
      title: "Personalized support for you",
      description: "Use our support team to solve all your doubts.",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none"><path d="M64 61.1811C63.9995 58.9223 62.6562 56.8911 60.5776 56.0068L44.6341 49.2235V45.2484C46.3221 43.1292 47.3895 40.6053 47.7469 37.8953H51.0062C54.1078 37.8953 56.6313 35.3719 56.6313 32.2703V24.2062C56.6313 21.3703 54.5209 19.0192 51.7885 18.6369C51.3832 6.43706 44.5623 0 32.0002 0C19.4381 0 12.6173 6.43706 12.212 18.6369C9.47956 19.0192 7.3692 21.3703 7.3692 24.2062V32.2703C7.3692 35.3719 9.89265 37.8953 12.9942 37.8953H16.2535C16.611 40.6058 17.6784 43.1297 19.3664 45.2484V49.2235L3.42337 56.0068C1.34425 56.8911 0.00097657 58.9223 0 61.1816V62.1245C0 62.6221 0.197267 63.0991 0.54932 63.4507C0.900886 63.8022 1.37794 64 1.87501 64H62.1255C62.623 64 63.1001 63.8022 63.4516 63.4507C63.8032 63.0986 64.0005 62.6216 64.0005 62.1245L64 61.1811ZM40.886 50.539C40.8875 50.5839 40.9925 55.1347 38.3045 57.934C36.8284 59.4707 34.7073 60.2495 32.0002 60.2495C29.303 60.2495 27.1872 59.476 25.7121 57.9506C22.9919 55.1367 23.1135 50.5785 23.1144 50.539C23.1159 50.5136 23.1164 50.4887 23.1164 50.4633V48.6068C25.6838 50.2313 28.7463 51.1039 32.0002 51.1039C35.2542 51.1039 38.3167 50.2313 40.8841 48.6068V50.4633C40.8841 50.4887 40.8846 50.5136 40.886 50.539V50.539ZM44.1312 35.0169L40.5643 37.3953C39.4314 38.1507 38.1126 38.5501 36.7503 38.5501H33.5789C32.5437 38.5501 31.7039 39.3895 31.7039 40.4251C31.7039 41.4608 32.5437 42.3001 33.5789 42.3001H36.7503C38.8553 42.3001 40.8939 41.6829 42.6449 40.515L43.3626 40.0364C41.6707 44.4022 37.3435 47.3539 32.0002 47.3539C25.0847 47.3539 19.8693 42.41 19.8693 35.8538V20.653C20.6086 17.2164 21.6794 15.0323 22.9704 14.3321C24.256 13.6339 26.1242 14.36 27.9309 15.0616C29.3386 15.608 30.6682 16.1246 32.0002 16.1246C33.3445 16.1246 34.658 15.6027 36.0491 15.0504C37.8577 14.3317 39.5662 13.6529 40.8318 14.3131C41.7542 14.7941 43.0692 16.2916 44.1312 20.6769V35.0169ZM52.8813 24.2062V32.2703C52.8813 33.304 52.0399 34.1453 51.0062 34.1453H47.8812V22.3312H51.0062C52.0399 22.3312 52.8813 23.1725 52.8813 24.2062V24.2062ZM19.3048 8.34333C21.9015 5.29545 26.1726 3.75003 32.0002 3.75003C37.8279 3.75003 42.0989 5.29545 44.6956 8.34333C46.7401 10.7432 47.8602 14.1842 48.0336 18.5812H47.4584C46.326 14.5597 44.7547 12.1295 42.5657 10.9879C39.7772 9.53376 36.9422 10.6597 34.6643 11.565C33.6624 11.963 32.6262 12.3746 31.9998 12.3746C31.3704 12.3746 30.3118 11.9635 29.2883 11.566C26.9299 10.6495 23.9943 9.50935 21.1813 11.0357C19.0602 12.1871 17.5245 14.6632 16.5074 18.5812H15.9669C16.1398 14.1842 17.2604 10.7432 19.3048 8.34333ZM11.1192 32.2703V24.2062C11.1192 23.1725 11.9605 22.3312 12.9942 22.3312H16.1193V34.1453H12.9942C11.9605 34.1453 11.1192 33.304 11.1192 32.2703ZM4.89115 59.4575L19.5812 53.2074C19.9103 55.2421 20.7277 58.0107 22.7316 60.25H3.99808C4.19681 59.9028 4.50638 59.6211 4.89115 59.4575V59.4575ZM41.2689 60.25C43.2728 58.0107 44.0902 55.2421 44.4193 53.2074L59.1093 59.4575C59.4941 59.6211 59.8032 59.9028 60.0024 60.25H41.2689Z" fill="#593CC1"></path></svg>',
    },
    {
      id: 3,
      icon: mdiFileDocument,
      title: `Easy and safe`,
      description:
        "Take advantage of our automated tools to upload your course easily and securely.",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="60" viewBox="0 0 48 60" fill="none"><path d="M23.7624 0L0 8.64158V29.5446C0.00569663 33.6243 0.973562 37.6451 2.82499 41.2805C4.67642 44.9159 7.3592 48.0634 10.6554 50.4673L23.7624 60L36.8693 50.4673C40.1656 48.0634 42.8483 44.9159 44.6998 41.2805C46.5512 37.6451 47.5191 33.6243 47.5248 29.5446V8.64158L23.7624 0ZM43.5644 29.5446C43.5589 32.9997 42.739 36.4049 41.1711 39.4838C39.6033 42.5627 37.3317 45.2287 34.5406 47.2653L23.7624 55.1049L12.9842 47.2653C10.1931 45.2287 7.92149 42.5627 6.35364 39.4838C4.78579 36.4049 3.96586 32.9997 3.9604 29.5446V11.4139L23.7624 4.21386L43.5644 11.4139V29.5446Z" fill="#593CC1"></path><path d="M15.2624 24.9644L12.4624 27.7644L21.2881 36.5902L35.0644 22.8139L32.2644 20.0139L21.2881 30.9902L15.2624 24.9644Z" fill="#593CC1"></path></svg>',
    },
  ];
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Business | MundoCrypto" />

      <div className="py-md-6 py-12 businessHeaderBG">
        <Container>
          <Row>
            <Col xl={6} lg={6} md={12}>
              <BusinessHeader />
            </Col>
            <Col xl={{ span: 5, offset: 1 }} lg={6} md={12}>
              {/*  Card  */}
              <Card style={{ zIndex: 1 }} className="">
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
    </Fragment>
  );
};
export default Business;

export async function getStaticProps({ locale }) {
  const language = locale.toUpperCase();

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
