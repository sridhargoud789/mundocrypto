// import node module libraries
import { Col, Container, Row } from "react-bootstrap";

const PageHeading = ({ pagetitle, bg = "bg-primary" }) => {
  return (
    <div className={`${bg} py-4 py-lg-4`}>
      <Container>
        <Row className="align-items-start ">
          <Col xl={12} lg={12} md={12} sm={12} className="text-start">
            <div>
              <h1 className="mb-0 pageHeadingTitle">{pagetitle}</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageHeading;
