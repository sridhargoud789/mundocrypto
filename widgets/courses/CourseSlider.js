// import node module libraries
import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";

// import widget/custom components

// import data files

import { getCourseList } from "../../services/nodeapi";
import CourseCard from "./CourseCard";

const CourseSlider = ({ recommended, popular, trending, category }) => {
  const settings = {
    swipeToSlide: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  const [obj, setOBJ] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    pageLoad();
  }, []);

  const pageLoad = async () => {
    setIsLoading(true);
    const resp = await getCourseList();

    if (resp.status === 200) {
      setOBJ(resp.data.category);
    }

    setIsLoading(false);
  };
  return (
    <Fragment>
      <Slider {...settings} className="pb-sm-5 mb-5 slick-slider-wrapper">
        {obj.map((item, index) => (
          <>
            <div className="item px-md-1" key={item.id}>
              <CourseCard key={index} item={item} viewby="grid" />
            </div>
          </>
        ))}
      </Slider>
    </Fragment>
  );
};

// Specifies the default values for props
CourseSlider.defaultProps = {
  recommended: false,
  popular: false,
  trending: false,
  category: null,
};

// Typechecking With PropTypes
CourseSlider.propTypes = {
  recommended: PropTypes.bool,
  popular: PropTypes.bool,
  trending: PropTypes.bool,
  category: PropTypes.string,
};

export default CourseSlider;
