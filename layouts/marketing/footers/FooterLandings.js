// import node module libraries
import { Fragment } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Link from "next/link";

// import sub components
import FooterWithLinks from "./FooterWithLinks";

const FooterLandings = () => {
  return (
    <Fragment>
      {/* call to action */}
      <div
        className="py-lg-16 py-10 bg-dark"
        style={{
          background: `url('/images_optimized/background/course-graphics.svg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <Container>
          {/*  row  */}
          <Row className="justify-content-center text-center">
            <Col md={9} sm={12}>
              {/* heading  */}
              <h2 className="display-4 text-white">
                Join more than 1 million learners worldwide
              </h2>
              <p className="lead text-white px-lg-12 mb-6">
                Effective learning starts with assessment. Learning a new skill
                is hard work—Signal makes it easier.
              </p>
              {/* button */}
              <div className="d-grid d-md-block">
                <Link href="/authentication/sign-up">
                  <a className="btn btn-primary mb-2 mb-md-0">
                    Start Learning for Free
                  </a>
                </Link>{" "}
                <Link href="/authentication/sign-up">
                  <a className="btn btn-info">Geeks for Business</a>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <FooterWithLinks />
    </Fragment>
  );
};

export default FooterLandings;
