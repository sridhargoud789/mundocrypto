// import node module libraries
import { Fragment } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

const DescriptionTab = (props) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <Fragment>
      <Container>
        {props.showOtherCourses && isMobile && <props.CardPriceDetails />}
        <Row>
          <Col
            lg={props.is_learning_page ? 12 : 8}
            md={12}
            sm={12}
            className="mb-4 mb-lg-0"
          >
            <div className="mb-4">
              <h3 className="mb-2">{t("pages.training_desc")}</h3>
              {/* <p dangerouslySetInnerHTML={{ __html: props.description }}></p> */}
            </div>
            <h4 className="mb-3">{t("pages.what_are_you_learning")}</h4>
            <Row className="mb-3">
              <Col lg={12} md={12} sm={12}>
                <ListGroup bsPrefix="list-unstyled" variant="flush">
                  {props.learning_points.split(",").map((l, i) => {
                    return (
                      <ListGroup.Item
                        bsPrefix=" "
                        className="d-flex mb-2"
                        key={i}
                      >
                        <i className="far fa-check-circle text-success me-2 mt-2"></i>
                        <p dangerouslySetInnerHTML={{ __html: l }}></p>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Col>
            </Row>
          </Col>
          {props.showOtherCourses && (
            <>
              {(isDesktop || isLaptop) && (
                <Col
                  lg={4}
                  md={12}
                  sm={12}
                  className="mt-lg-n22 courserightdetails sticky-top"
                >
                  <props.CardPriceDetails />
                </Col>
              )}
            </>
          )}
        </Row>
      </Container>
    </Fragment>
  );
};
export default DescriptionTab;
