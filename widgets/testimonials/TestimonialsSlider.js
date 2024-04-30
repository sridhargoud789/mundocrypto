// import node module libraries
import PropTypes from "prop-types";
import { Fragment } from "react";
import Slider from "react-slick";

// import sub components
import TestimonialCard from "./TestimonialCard";

// import data files
import { TestimonialsList } from "data/testimonials/TestimonialsList";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={"slickarrows"}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={"slickarrows"}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const TestimonialsSlider = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Fragment>
      <Slider {...settings} className="pb-5 mb-5">
        {TestimonialsList.map((item, index) => (
          <div className="item p-2" key={item.id}>
            <TestimonialCard key={index} item={item} />
          </div>
        ))}
      </Slider>
    </Fragment>
  );
};

// Specifies the default values for props
TestimonialsSlider.defaultProps = {
  recommended: false,
  popular: false,
  trending: false,
};

// Typechecking With PropTypes
TestimonialsSlider.propTypes = {
  recommended: PropTypes.bool,
  popular: PropTypes.bool,
  trending: PropTypes.bool,
};

export default TestimonialsSlider;
