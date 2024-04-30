/********************************
Component : Logo with Top Heading
*********************************

Availalble Parameters

logos        : Required, list of the logos in JSON format
title        : Optional, title to show logo section title
limit        : Optional, default -1 i.e. show all logo, if you want to limit N number of logos you can specific with thisparameter

*/

// import node module libraries
import Link from "next/link";
import PropTypes from "prop-types";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const LogosTopHeading = ({ logos, title, limit }) => {
  const { t } = useTranslation("common");

  const LogoImage = ({ logo }) => {
    return (
      <Col lg={2} md={4} sm={6} xs={6}>
        <div className="mb-4 text-center align-middle">
          <Image src={logo} alt="" />
        </div>
      </Col>
    );
  };
  const LogosList = () => {
    if (limit > 0) {
      return logos
        .slice(0, limit)
        .map((logo, index) => <LogoImage key={index} logo={logo.logoimage} />);
    } else {
      return logos.map((logo, index) => (
        <LogoImage key={index} logo={logo.logoimage} />
      ));
    }
  };
  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col lg={4} md={4} sm={12} className="mb-3 text-center ">
            {/* text */}
            <h3 className="fw-semi-bold mb-2 fs-2">+55.000</h3>
            <p className="fs-4">{t("pages.students")}</p>
          </Col>
          <Col lg={4} md={4} sm={12} className="mb-3 text-center ">
            {/* text */}
            <h3 className="fw-semi-bold mb-2 fs-2">+250k</h3>
            <p className="fs-4">{t("pages.followers")}</p>
          </Col>
          <Col lg={4} md={4} sm={12} className="mb-3 text-center ">
            {/* text */}
            <h3 className="fw-semi-bold mb-2 fs-2">4.8/5</h3>
            <Row>
              <Link href="https://www.trustpilot.com/review/mundocrypto.es">
                <a className="nav-link fs-4" target="_blank">
                  {t("pages.average")} Trustpilot
                </a>
              </Link>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

LogosTopHeading.propTypes = {
  title: PropTypes.string,
  limit: PropTypes.number,
};

LogosTopHeading.defaultProps = {
  limit: -1,
};

export default LogosTopHeading;
