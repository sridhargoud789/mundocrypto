// import node module libraries
import { Fragment } from "react";

// import MDI icons
import { mdiStar, mdiStarHalfFull, mdiStarOutline } from "@mdi/js";
import Icon from "@mdi/react";

const Ratings = ({ rating, starSize = "0.875rem" }) => {
  rating = Math.abs(rating);
  let integer = Math.floor(rating);
  let decimal = rating - integer;
  let starsize = starSize;

  const PrintFilledStar = (repeatValue) => {
    const stars = [];
    for (let i = 1; i <= repeatValue; i++) {
      stars.push(<Icon key={i} path={mdiStar} size={starsize} />);
    }
    return stars;
  };
  const PrintHalfStar = (repeatValue) => {
    return repeatValue > 0 ? (
      <Icon path={mdiStarHalfFull} size={starsize} />
    ) : (
      ""
    );
  };
  const PrintBlankStar = (repeatValue) => {
    const blankstars = [];
    for (let i = 1; i <= repeatValue; i++) {
      blankstars.push(<Icon key={i} path={mdiStarOutline} size={starsize} />);
    }
    return blankstars;
  };
  return (
    <Fragment>
      {PrintFilledStar(integer)}
      {PrintHalfStar(decimal)}
      {PrintBlankStar(5 - integer - (decimal > 0 ? 1 : 0))}
    </Fragment>
  );
};

export default Ratings;
