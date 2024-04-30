// import node module libraries
import Link from "next/link";
import { Fragment } from "react";
import { Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
// import MDI icons
import {
  mdiFacebook,
  mdiInstagram,
  mdiLinkedin,
  mdiTwitter,
  mdiYoutube,
} from "@mdi/js";
import Icon from "@mdi/react";
import Script from "next/script";
import { useMediaQuery } from "react-responsive";
const FooterWithLinks = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Fragment>
      {/*  footer */}
      <div
        className="pt-5 footer  text-white"
        style={{ backgroundColor: "rgba(28, 29, 31, 1)" }}
      >
        <Container>
          <Row>
            <Col
              lg={4}
              md={6}
              sm={12}
              className={isMobile ? "text-center" : ""}
            >
              {/* about company  */}
              <div className="mb-4">
                <Image
                  src="/images_optimized/white_alpha_twolines.png"
                  alt=""
                  width={200}
                />
                <div className="mt-2">
                  {/* social media */}

                  <div className="fs-4 mt-2">
                    <Link href="https://www.youtube.com/channel/UCCcdO0Dn_6sG_C8bGsweLOQ">
                      <a
                        className="text-white text-primary-hover me-3"
                        target="_blank"
                      >
                        <Icon path={mdiYoutube} size={1} />
                      </a>
                    </Link>
                    <Link href="https://www.facebook.com/mundocryptooficial/">
                      <a
                        className="text-white text-primary-hover me-3"
                        target="_blank"
                      >
                        <Icon path={mdiFacebook} size={1} />
                      </a>
                    </Link>
                    <Link href="https://twitter.com/MundoCrypto_ES">
                      <a
                        className="text-white text-primary-hover me-3"
                        target="_blank"
                      >
                        <Icon path={mdiTwitter} size={1} />
                      </a>
                    </Link>

                    <Link href="https://www.linkedin.com/school/mundocryptoacademy/">
                      <a
                        className="text-white text-primary-hover me-3"
                        target="_blank"
                      >
                        <Icon path={mdiLinkedin} size={1} />
                      </a>
                    </Link>

                    <Link href="https://www.instagram.com/mundocryptooficial/">
                      <a
                        className="text-white text-primary-hover me-3"
                        target="_blank"
                      >
                        <Icon path={mdiInstagram} size={1} />
                      </a>
                    </Link>

                    {/* <Link href="https://discord.gg/mundocryptocommunity">
                      <a
                        className="text-white text-primary-hover me-3"
                        style={{ marginTop: "-0.8rem", marginLeft: "-0.5rem" }}
                        target="_blank"
                      >
                        <img
                          className="text-white text-primary-hover "
                          src="/images_optimized/discord.svg"
                          width={50}
                        />
                      </a>
                    </Link> */}
                  </div>
                </div>
              </div>
            </Col>
            <Col
              lg={{ span: 2, offset: 1 }}
              md={3}
              sm={6}
              className={isMobile ? "text-center" : ""}
            >
              <div className="mb-4">
                {/* list */}
                <h3 className="fw-bold mb-3 text-white">
                  {t("footer.company")}
                </h3>
                <ListGroup
                  as="ul"
                  bsPrefix="list-unstyled"
                  className="nav nav-footer flex-column nav-x-0"
                >
                  {/*<ListGroup.Item as="li" bsPrefix=" ">
                    <Link href="#" className="nav-link text-white">
                      <a className="nav-link text-white">About</a>
                    </Link>
                     </ListGroup.Item> */}
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link href="/Jobs" className="nav-link text-white">
                      <a className="nav-link text-white">
                        {t("footer.careers")}
                      </a>
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link href="/Business" className="nav-link text-white">
                      <a className="nav-link text-white">
                        {t("footer.business")}
                      </a>
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link href="/Instructors" className="nav-link text-white">
                      <a className="nav-link text-white">
                        {t("footer.instructors")}
                      </a>
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Col>
            <Col lg={2} md={3} sm={6} className={isMobile ? "text-center" : ""}>
              <div className="mb-4">
                {/* list  */}
                <h3 className="fw-bold mb-3 text-white">
                  {t("footer.resources")}
                </h3>
                <ListGroup
                  as="ul"
                  bsPrefix="list-unstyled"
                  className="nav nav-footer flex-column nav-x-0"
                >
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link href="https://mundocrypto.gitbook.io/mundocrypto/">
                      <a className="nav-link text-white" target="_blank">
                        {t("footer.whitepaper")}
                      </a>
                    </Link>
                  </ListGroup.Item>
                  {/* <ListGroup.Item as="li" bsPrefix=" ">
                    <Link
                      href="https://mundocrypto.com/lightpaper.pdf"
                      target="_blank"
                    >
                      <a className="nav-link text-white" target="_blank">
                        {t("footer.lightpaper")}
                      </a>
                    </Link>
                  </ListGroup.Item> */}
                  {/* <ListGroup.Item as="li" bsPrefix=" ">
                    <Link href="#">
                      <a className="nav-link text-white">Get the app</a>
                    </Link>
                  </ListGroup.Item> */}
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link href="https://coinmarketcap.com/currencies/mundocrypto/">
                      <a className="nav-link text-white" target="_blank">
                        {t("footer.governance_tokens")}
                      </a>
                    </Link>
                  </ListGroup.Item>
                  {/* <ListGroup.Item as="li" bsPrefix=" ">
                    <Link href="#">
                      <a className="nav-link text-white">Tutorial</a>
                    </Link>
                  </ListGroup.Item> */}
                </ListGroup>
              </div>
            </Col>
            <Col
              lg={3}
              md={12}
              sm={12}
              className={isMobile ? "text-center" : ""}
            >
              {/* contact info */}
              <div className="mb-4">
                <h3 className="fw-bold mb-3 text-white">
                  {t("footer.get_in_touch")}
                </h3>
                {/* <p>U Bora Towers, Business Bay, Dubai UAE</p> */}
                <p className="mb-1">
                  {t("footer.email")}:{" "}
                  <Link href="mailto:info@mundocrypto.com">
                    info@mundocrypto.com
                  </Link>
                </p>

                {/*
                <p>
                  Phone:{" "}
                  <span className="text-dark fw-semi-bold">
                    (000) 123 456 789
                  </span>
                </p> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Script type="text/javascript" src="/activecampaign.js" />
    </Fragment>
  );
};

export default FooterWithLinks;
