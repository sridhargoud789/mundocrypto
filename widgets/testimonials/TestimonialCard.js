// import node module libraries
import PropTypes from "prop-types";
import { Card, Col, Image, Row } from "react-bootstrap";

// import widget/custom components
import { useTranslation } from "react-i18next";
import { Ratings } from "widgets";

const TestimonialCard = ({ item }) => {
  const { t } = useTranslation("common");
  return (
    <Card className="border shadow-none">
      <Card.Body className="p-5 justify-content-center  align-items-center">
        <h1 className="testimonialTitle">"{t(item.content)}"</h1>
        <div className="mt-4 mb-2 text-center">
          <span className=" text-warning testimonialRating">
            <Ratings rating={item.rating} starSize="35px" />
          </span>
        </div>
        <Row className="mt-4">
          <Col md={{ span: 8, offset: 4 }}>
            <div className="d-flex align-items-center">
              <Image
                src={item.image}
                alt=""
                className="avatar avatar-md rounded-circle"
              />
              <div className="ms-3">
                <h4 className="mb-2 testmonialByTitle">{item.name}</h4>
                <p className="mb-0 testmonialByDesignation">
                  {item.designation}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

// Typechecking With PropTypes
TestimonialCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default TestimonialCard;
