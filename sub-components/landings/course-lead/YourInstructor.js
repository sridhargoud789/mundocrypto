// import node module libraries
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

const YourInstructor = ({ data }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div>
      <Container
        className="p-2"
        style={{
          backgroundColor: "rgba(29, 147, 201, 0.2)",
          color: "black",
        }}
      >
        <Row className="align-items-center ">
          <Col
            xl={8}
            md={8}
            sm={12}
            lg={8}
            className={`text-center text-lg-start ${isMobile ? "" : "order-1"}`}
          >
            <h2 className="mb-2 b2bTitle mb-3">
              {t("home_page.homePageB2b.b2bTitle")}
            </h2>
            <p className={`b2bText ${isMobile ? "text-center" : "pe-6"}`}>
              {t("home_page.homePageB2b.b2bSubTitle")}
            </p>
            {isMobile && <br />}
            <Button variant="primary" type="submit" href="/Business">
              {t("home_page.homePageB2b.b2bCtaText")}
            </Button>
          </Col>
          {/*  Img  */}
          <Col
            xl={4}
            md={12}
            sm={12}
            lg={{ span: 5, order: 2 }}
            className={`mb-6 mb-lg-0 text-center ${isMobile ? "mt-6" : ""}`}
          >
            <Image
              src={"/images_optimized/b2bbusiness.png"}
              alt=""
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default YourInstructor;
