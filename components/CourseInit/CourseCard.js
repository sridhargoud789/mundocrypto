// import node module libraries
import Link from "next/link";
import { Card, Col, Image, ListGroup, ProgressBar, Row } from "react-bootstrap";

// import widget/custom components
import { GKTooltip } from "widgets";

// import custom components
import LevelIcon from "../../widgets/miscellaneous/LevelIcon";
import Ratings from "../../widgets/ratings/Ratings";
// import utility file
import { numberWithCommas } from "helper/utils";
import { useRouter } from "next/router";

const CourseCard = (props) => {
  const { item, free, viewby, extraclass, progress } = props;
  const router = useRouter();

  return (
    <Card
      className={`mb-4 card-hover ${extraclass}`}
      onClick={() => router.push(`/CourseResume/${item.id}`)}
    >
      <Link href={`/CourseResume/${item.id}`}>
        <a>
          <Image
            alt=""
            className="card-img-top rounded-top-md"
            src="/images_optimized/mclogo_price.svg"
          />
        </a>
      </Link>
      {/* Card body  */}
      <Card.Body>
        <h3 className="h4 mb-2 text-truncate-line-2 ">
          <Link href="#">
            <a className="text-inherit">{item.name}</a>
          </Link>
        </h3>
        <ListGroup as="ul" bsPrefix="list-inline" className="mb-3">
          <ListGroup.Item as="li" bsPrefix="list-inline-item">
            <i className="far fa-clock me-1"></i>
            1hr 20min {/* {item.duration} */}
          </ListGroup.Item>
          <ListGroup.Item as="li" bsPrefix="list-inline-item">
            <LevelIcon level={item.level} />
            {item.level}
          </ListGroup.Item>
        </ListGroup>
        <div
          className={`lh-1 d-flex align-items-center ${
            free ||
            item.price === undefined ||
            item.price <= 0 ||
            item.discount === undefined
              ? "mb-5"
              : ""
          }`}
        >
          <span className="text-warning me-1 mb-1">
            {" "}
            <Ratings rating={item.star_avg} />
          </span>
          <span className="text-warning me-1"> {item.star_avg.toFixed(1)}</span>
          <span className="fs-6 text-muted">
            {" "}
            ({numberWithCommas(item.total_reviews)})
          </span>
        </div>
        <div className={`lh-1 mt-3`}>
          <img
            src="/images_optimized/coin_blue.png"
            className="imgPrice_Coin"
            width="25px"
          />
          <span className="text-dark fw-bold">{item.price}</span>{" "}
          <small className="fs-6 text-muted">${item.price}</small>
        </div>
      </Card.Body>
      {/* Card Footer */}
      <Card.Footer>
        <Row className="align-items-center g-0">
          <Col className="col-auto">
            <Image
              src={"/images_optimized/avatar/defaultuser.png"}
              className="rounded-circle avatar-xs"
              alt=""
            />
          </Col>
          <Col className="col ms-2">
            <span>{"User"}</span>
          </Col>
          <Col className="col-auto">
            <GKTooltip
              placement="top"
              toolTipText="Add to Bookmarks"
              className="text-muted bookmark"
            >
              <i className="fe fe-bookmark"></i>
            </GKTooltip>
          </Col>
        </Row>
        <span>
          <ProgressBar
            variant="success"
            now={progress}
            className="mt-3"
            style={{ height: "5px" }}
          />
        </span>
      </Card.Footer>
    </Card>
  );
};

export default CourseCard;
