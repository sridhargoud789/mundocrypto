import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
const LoadingSkeleton = () => {
  return (
    <Fragment>
      <Row>
        <Col md={8} sm={12}>
          <Skeleton animation="wave" variant="rectangular" height={430} />
        </Col>
        <Col md={4} sm={12}>
          <Stack spacing={1}>
            <Skeleton animation="wave" variant="rectangular" height={100} />
            <Skeleton animation="wave" variant="rectangular" height={100} />
            <Skeleton animation="wave" variant="rectangular" height={100} />
            <Skeleton animation="wave" variant="rectangular" height={100} />
          </Stack>
        </Col>
      </Row>
    </Fragment>
  );
};

export default LoadingSkeleton;
