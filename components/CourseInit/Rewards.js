import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import * as React from "react";
import { Col, Row } from "react-bootstrap";

const RewardTab = (props) => {
  const { name, instruction, duration, reward, id, isFreeCourse } = props;

  const [expanded, setExpanded] = React.useState(false);
  window.scrollTo(0, 0);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="container">
      <Card className="noBorderCard cursor-pointer" onClick={props.handleClick}>
        <CardHeader
          className="p-2"
          avatar={<img src="/images_optimized/Badge.png" width={20} />}
          action={
            <>
              <Row className="pt-2 pr-4" style={{ paddingRight: "0.5rem" }}>
                <Col>
                  <span className="">{duration}m</span>
                </Col>
              </Row>
            </>
          }
          title={<span className="cardRewardPointsTitle">{name}</span>}
          subheader={
            <>
              {" "}
              {!isFreeCourse && (
                <h2 className="pt-2">
                  <div className="d-flex align-items-center">
                    <img
                      src="/images_optimized/mct_coin.png"
                      width={20}
                      className="mx-2"
                    />
                    {"  "}
                    <span className="fs-4 fw-bold">
                      {Math.round(reward).toFixed(0)} MCT
                    </span>
                  </div>
                </h2>
              )}
            </>
          }
        />
      </Card>
    </div>
  );
};

export default RewardTab;
