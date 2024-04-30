// Section : Hero Header
// Style : Welcome Text on left and image on right

// import node module libraries
import Link from "next/link";
import { useState } from "react";
import { Carousel, Col, Container, Row, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

const HeroHeader = ({ data }) => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return (
    <div className=" divHomeHeader">
      <Container>
        {/*  Hero Section  */}
        <Carousel>
          <Carousel.Item>
            <Row className="align-items-center g-0 p-2">
              <Col
                xl={5}
                lg={5}
                md={5}
                className={`pt-${isDesktop || isLaptop ? "2" : 2}`}
              >
                <div className="py-3 py-lg-0">
                  <h1 className="text-black display-5 fw-bold h1homebanner">
                    {t("header.banner_title")}
                  </h1>
                  <p className="text-black-50 mb-4 lead phomebanner">
                    {t("header.banner_sub_title")}
                  </p>
                  <Link href="#div-package">
                    <a className="btn btn-primary btn-sm rounded-0 btn_homeBanner text  mb-5 mt-5 px-10 fs-3">
                      {t("header.banner_btn_text")}
                    </a>
                  </Link>{" "}
                </div>
              </Col>
              <Col xl={5} lg={5} md={5} className="text-lg-end text-center">
                <div className="p-1">
                  <div
                    className="d-flex img-fluid justify-content-center position-relative rounded py-12 border-white border rounded-3 bg-cover banner_image"
                    style={{
                      backgroundImage: `url('/images_optimized/bannerimage.png')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "top center",
                      borderRadius: "256.5px 256.5px 0px 0px !important",
                      width: "313px",
                      height: "394px",
                      marginBottom: "-5%",
                    }}
                  ></div>
                </div>
              </Col>
              <Col xl={2} lg={2} md={2}>
                <Stack direction="vertical" gap={1}>
                  <div>
                    <span className="bannerCounts_title">+55.000</span>
                    <br />
                    <span className="bannerCounts_sub_title">Alumnos</span>
                  </div>
                  <hr />
                  <div>
                    <span className="bannerCounts_title">+250.000</span>
                    <br />
                    <span className="bannerCounts_sub_title">Seguidores </span>
                  </div>
                  <hr />
                  <div>
                    <span className="bannerCounts_title">4.8/5</span>
                    <br />
                    <span className="bannerCounts_sub_title">
                      Valoración en Trustpilot
                    </span>
                  </div>
                </Stack>
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row className="align-items-center g-0 p-2">
              <Col
                xl={5}
                lg={5}
                md={5}
                className={`pt-${isDesktop || isLaptop ? "2" : 2}`}
              >
                <div className="py-3 py-lg-0">
                  <h1 className="text-black display-5 fw-bold h1homebanner">
                    B2B Services
                  </h1>
                  <p className="text-black-50 mb-4 lead phomebanner">
                    creamos academias y programas de capacitación para otras
                    empresas también, así que cree algo con esto en mente.
                  </p>
                  <Link href="#div-package">
                    <a className="btn btn-primary btn-sm rounded-0 btn_homeBanner text  mb-5 mt-5 px-10 fs-3">
                      {t("header.banner_btn_text")}
                    </a>
                  </Link>{" "}
                </div>
              </Col>
              <Col xl={5} lg={5} md={5} className="text-lg-end text-center">
                <div className="p-1">
                  <div
                    className="d-flex img-fluid justify-content-center position-relative rounded py-12 border-white border rounded-3 bg-cover banner_image"
                    style={{
                      backgroundImage: `url('/images_optimized/handshake.png')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "top center",
                      borderRadius: "256.5px 256.5px 0px 0px !important",
                      width: "313px",
                      height: "394px",
                      marginBottom: "-5%",
                    }}
                  ></div>
                </div>
              </Col>
              <Col xl={2} lg={2} md={2}>
                <Stack direction="vertical" gap={1}>
                  <div>
                    <span className="bannerCounts_title">+55.000</span>
                    <br />
                    <span className="bannerCounts_sub_title">Alumnos</span>
                  </div>
                  <hr />
                  <div>
                    <span className="bannerCounts_title">+250K</span>
                    <br />
                    <span className="bannerCounts_sub_title">Followers</span>
                  </div>
                  <hr />
                  <div>
                    <span className="bannerCounts_title">4.8/5</span>
                    <br />
                    <span className="bannerCounts_sub_title">
                      Valoración en Trustpilot
                    </span>
                  </div>
                </Stack>
              </Col>
            </Row>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
};
export default HeroHeader;
