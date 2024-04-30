// import node module libraries
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

// import custom components
import { Avatar, AvatarGroup } from "components/bootstrap/Avatar";

const BecomeInstructor = ({ data }) => {
  return (
    <Container>
      <Row className="mb-4 justify-content-center">
        <Col lg={11} md={12}>
          <Row className="align-items-center">
            <Col md={12} sm={12} className="mb-4">
              <AvatarGroup className="me-5">
                <Avatar
                  size="lg"
                  src="/images_optimized/avatar/defaultuser.png"
                  type="image"
                  className="rounded-circle"
                />
                <Avatar
                  size="lg"
                  src="/images_optimized/avatar/avatar-2.jpg"
                  type="image"
                  className="rounded-circle"
                />
                <Avatar
                  size="lg"
                  src="/images_optimized/avatar/avatar-3.jpg"
                  type="image"
                  className="rounded-circle"
                />
                <Avatar
                  size="lg"
                  src="/images_optimized/avatar/avatar-4.jpg"
                  type="image"
                  className="rounded-circle"
                />
                <Avatar
                  size="lg"
                  type="initial"
                  name="55K+"
                  variant="danger"
                  className="rounded-circle fs-5 fw-bold"
                  showExact
                />
              </AvatarGroup>
            </Col>
            {/* heading */}
            <Col lg={4} md={5} sm={12} className="mb-6">
              <h1 className="display-3 fw-bold">{data.instructorTitle}</h1>
            </Col>
            <Col lg={{ span: 6, offset: 1 }} md={7} sm={12} className="mb-6">
              {/* para */}
              <p className="lead">{data.instructorSubTitle}</p>
            </Col>
          </Row>
          {/* row */}
          <Row>
            <Col lg={4} md={4} sm={12} className="mb-3">
              {/* text */}
              <h3 className="fw-semi-bold mb-2">{data.subSection1.title}</h3>
              <p className="fs-4">{data.subSection1.description}</p>
            </Col>
            <Col lg={4} md={4} sm={12} className="mb-3">
              {/* text */}
              <h3 className="fw-semi-bold mb-2">{data.subSection2.title}</h3>
              <p className="fs-4">{data.subSection2.description}</p>
            </Col>
            <Col lg={4} md={4} sm={12} className="mb-3">
              {/* text */}
              <h3 className="fw-semi-bold mb-2">{data.subSection3.title}</h3>
              <p className="fs-4">{data.subSection3.description}</p>
            </Col>
            {/* btn */}
            <Col md={12} className="mt-3">
              <Link href="https://mundocrypto.com/profesor/" target="_blank">
                <a className="btn btn-primary" target="_blank">
                  {data.ctaText}
                </a>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default BecomeInstructor;
