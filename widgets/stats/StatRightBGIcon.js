// import node module libraries
import { Card } from "react-bootstrap";

const StatRightBGIcon = (props) => {
  const { title, value, summary, iconName, iconColorVariant, classValue } =
    props;

  return (
    <Card border="light" className={`${classValue}`}>
      <Card.Body>
        <span className="Rewards_claimPoints_txt">{title}</span>
        <div className="mt-2 d-flex justify-content-between align-items-center">
          <div className="lh-1">
            <h2 className="h1 fw-bold mb-1">
              <img
                src="/images_optimized/mct_coin.png"
                width={30}
                className="mx-2"
              />
              {value}
            </h2>
            <span>{summary}</span>
          </div>
          <div>
            <span>
              <img src={iconName} width={80} />
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatRightBGIcon;
