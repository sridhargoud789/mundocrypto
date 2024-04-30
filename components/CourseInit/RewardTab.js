import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import * as React from "react";
import { Col, Row } from "react-bootstrap";

const RewardTab = (props) => {
  const { name, instruction, duration, reward, id } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="container">
      <Card className="cardReward" onClick={props.handleClick}>
        <CardHeader
          className="p-2"
          avatar={<img src="/rewards_star.png" width={40} />}
          action={
            <>
              <Row className="pt-2 pr-4">
                <Col>
                  <img src="/whitelogo.png" width={30} />
                  <span className="cardRewardPoints">
                    {Math.round(reward).toFixed(2)} MCT
                  </span>
                </Col>
              </Row>
            </>
          }
          title={<span className="cardRewardPointsTitle">{name}</span>}
          subheader={
            <span className="cardRewardPointssubheader">
              Duration: {duration}m
            </span>
          }
        />
      </Card>
    </div>
  );
};

export default RewardTab;
