// import node module libraries
import Link from "next/link";
import PropTypes from "prop-types";
import * as React from "react";
import { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ProgressBar,
  Row,
  Stack,
} from "react-bootstrap";

// import widget/custom components
import { GKTooltip } from "widgets";

// import custom components
import { useRouter } from "next/router";
import LevelIcon from "widgets/miscellaneous/LevelIcon";
import Ratings from "widgets/ratings/Ratings";
// import utility file
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { numberWithCommas } from "helper/utils";

import _ from "lodash";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";

import Tooltip from "@mui/material/Tooltip";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import {
  addToWishlist,
  getUserWishList,
  removeFromWishList,
  removeItemFromCart,
  tokenValue,
} from "../../services/nodeapi";
import { userObject } from "../../services/states";

const CourseCard = (props) => {
  const {
    item,
    free,
    viewby,
    extraclass,
    showprogressbar,
    isMyCourse = false,
    progress,
    is_partial_payment,
    purchaseData,
  } = props;
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const router = useRouter();
  const userObj = useRecoilValue(userObject);
  const [isFav, setIsFav] = useState(false);
  const [mctPrice, setMCTPrice] = useState(null);
  const [isLearningPage, setIsLearningPage] = useState(false);

  useEffect(() => {
    pageLoad();
  }, []);

  const pageLoad = async () => {
    if (router.pathname.toLowerCase().includes("learning")) {
      setIsLearningPage(true);
    }

    if (!_.isEmpty(localStorage.getItem("mctprice"))) {
      setMCTPrice(parseFloat(localStorage.getItem("mctprice")));
    } else {
      await loadMCTPrice();
    }
    try {
      if (!_.isEmpty(userObj)) {
        const resp = await getUserWishList();

        if (resp.data.courses.length > 0) {
          setIsFav(_.some(resp.data.courses, { id: item.id }));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loadMCTPrice = async () => {
    const resp = await tokenValue();

    if (resp.status === 200) {
      setMCTPrice(resp.data.data);
    }
  };
  const deleteFromCart = async (courseId) => {
    const resp = await removeItemFromCart({ courseId });
    if (resp.status === 200) {
      router.reload(window.location.pathname);
    }
  };

  const handleAddWishList = async (courseId) => {
    if (!_.isEmpty(userObj)) {
      const resp = await addToWishlist({ courseId });
      setIsFav(true);
      toast.success("Added To wish list Successfully.");
    } else {
      Swal.fire({
        icon: "info",
        title: "Login",
        text: "Inicie sesión",
      }).then((result) => {
        router.push("/authentication/sign-in");
      });
    }
  };

  const handleRemoveWishList = async (courseId) => {
    const resp = await removeFromWishList({ courseId });
    setIsFav(false);
    toast.success("Deleted from wish list Successfully.");
  };
  const handleOnClick = () => {
    window.location = isMyCourse
      ? `/CourseResume/${item.id}`
      : `/CourseDetail/${item.id}`;
  };
  /** Used in Course Index, Course Category, Course Filter Page, Student Dashboard etc...  */
  const GridView = () => {
    return (
      <>
        <Tooltip
          arrow
          style={{ backgroundColor: "white" }}
          title={
            <React.Fragment>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <Card>
                    <Card.Body>
                      <h1
                        className="h4 fw-bold mb-4 "
                        style={{ maxHeight: "3rem" }}
                      >
                        {item.name}
                      </h1>
                      <span className="text-warning me-1 mb-1">
                        {" "}
                        <Ratings rating={5} />
                      </span>
                      <p
                        className="text-dark"
                        dangerouslySetInnerHTML={{
                          __html: item.custom_field_10,
                        }}
                      ></p>

                      {item.is_public === 0 && (
                        <Stack
                          direction="horizontal"
                          gap={2}
                          className="mt-3 pb-4"
                        >
                          <div className="text-dark">
                            <i className="far fa-clock me-1"></i>
                            {item.duration}
                          </div>
                          <div className="ms-auto">
                            {" "}
                            {!isMyCourse && (
                              <GKTooltip
                                placement="top"
                                toolTipText="Añadir a deseados"
                                className="text-dark heart divHeart"
                              >
                                {isFav ? (
                                  <FavoriteIcon
                                    onClick={() =>
                                      handleRemoveWishList(item.id)
                                    }
                                  />
                                ) : (
                                  <>
                                    <FavoriteBorderOutlinedIcon
                                      onClick={() => handleAddWishList(item.id)}
                                    />
                                    Añadir a deseados
                                  </>
                                )}
                              </GKTooltip>
                            )}
                          </div>
                        </Stack>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </React.Fragment>
          }
          placement="right"
        >
          <Card
            data-tooltip-id={`my-tooltip-${item.id}`}
            className={`mb-4 card-hover ${extraclass}`}
          >
            <Link
              shallow={true}
              href={
                isMyCourse
                  ? `/CourseResume/${item.id}`
                  : `/CourseDetail/${item.id}`
              }
              onClick={handleOnClick}
            >
              <a>
                <Image
                  alt=""
                  className="card-img-top rounded-top-md"
                  src={item.signed_url_image}
                  // onError={(e) => {
                  //   e.currentTarget.src = "./images_optimized/noimage.png";
                  // }}
                />
              </a>
            </Link>
            {/* Card body  */}
            <Card.Body className="cbCourseCard">
              <Stack direction="horizontal" gap={3} className="p-0 mb-4">
                <div className="">
                  {" "}
                  <i className="far fa-clock me-1"></i>
                  {item.duration}
                </div>
                <div className="ms-auto">
                  {" "}
                  <span className="text-warning me-1 mb-1">
                    {" "}
                    <Ratings rating={5} />
                  </span>
                  <span className="text-warning me-1"> 5.0</span>
                </div>
              </Stack>
              <h3
                className="h4 mb-4"
                style={{ maxHeight: "3rem", height: "3rem" }}
              >
                <Link
                  shallow={true}
                  href={
                    isMyCourse
                      ? `/CourseResume/${item.id}`
                      : `/CourseDetail/${item.id}`
                  }
                  onClick={() => {
                    window.location = isMyCourse
                      ? `/CourseResume/${item.id}`
                      : `/CourseDetail/${item.id}`;
                  }}
                >
                  <a className="text-inherit h1CourseTitle">{item.name}</a>
                </Link>
              </h3>

              {item.is_public === 0 && (
                <Stack direction="horizontal" gap={2} className="mt-3">
                  {item.is_sold_out === 1 ? (
                    <>
                      {" "}
                      <div>
                        <img
                          src="/images_optimized/mclogo_price_black.svg"
                          className="imgPrice_Coin"
                          width="25px"
                        />
                      </div>
                      <span
                        className="fs-8"
                        style={{ color: "red", float: "right" }}
                      >
                        Sold Out
                      </span>
                    </>
                  ) : (
                    <div>
                      {item.id === 57 && (
                        <del>
                          <img
                            src="/images_optimized/mclogo_price_black.svg"
                            className="imgPrice_Coin"
                            width="20px"
                          />
                          &nbsp;
                          <span className="spancoursemctPrice">
                            {parseFloat(3600 / mctPrice).toFixed(2)}
                          </span>
                          <span className=" spancoursePrice ">/ ${3600}</span>
                        </del>
                      )}
                      <div>
                        <img
                          src="/images_optimized/mclogo_price_black.svg"
                          className="imgPrice_Coin"
                          width="20px"
                        />
                        &nbsp;
                        <span className="spancoursemctPrice">
                          {parseFloat(item.price / mctPrice).toFixed(2)}
                        </span>
                        <span className=" spancoursePrice ">
                          {" "}
                          / ${item.price}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="ms-auto">
                    {" "}
                    {!isMyCourse && (
                      <GKTooltip
                        placement="top"
                        toolTipText="Añadir a deseados"
                        className="text-muted heart divHeart"
                      >
                        {isFav ? (
                          <FavoriteIcon
                            onClick={() => handleRemoveWishList(item.id)}
                          />
                        ) : (
                          <FavoriteBorderOutlinedIcon
                            onClick={() => handleAddWishList(item.id)}
                          />
                        )}
                      </GKTooltip>
                    )}
                  </div>
                </Stack>
              )}
              {false && !_.isEmpty(item.custom_field_1) && (
                <span
                  className="fs-8 blink h4"
                  style={{ color: "red", float: "left" }}
                >
                  {item.custom_field_1}&nbsp;plazas
                </span>
              )}
            </Card.Body>
            {/* Card Footer */}
            {showprogressbar && (
              <Card.Footer>
                <span className={`${showprogressbar ? "" : "d-none"}`}>
                  <ProgressBar
                    variant="success"
                    now={progress > 100 ? 100 : progress}
                    label={`${progress > 100 ? 100 : progress}%`}
                    //  style={{ height: "5px" }}
                  />
                </span>
              </Card.Footer>
            )}
          </Card>
        </Tooltip>
      </>
    );
  };

  /** Used in Course Filter Page  */
  const ListView = () => {
    return (
      <Card className="mb-4 card-hover">
        <Row className="g-0">
          <Link
            shallow={true}
            href={
              isMyCourse
                ? `/CourseResume/${item.id}`
                : `/CourseDetail/${item.id}`
            }
            onClick={() => {
              window.location = isMyCourse
                ? `/CourseResume/${item.id}`
                : `/CourseDetail/${item.id}`;
            }}
          >
            <a
              className="bg-cover img-left-rounded col-12 col-md-12 col-xl-3 col-lg-3 "
              style={{
                background: `url(${item.signed_url_image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "right",
              }}
            >
              <Image
                src={`${item.signed_url_image}`}
                alt="..."
                className="img-fluid d-lg-none invisible"
              />
            </a>
          </Link>
          <Col lg={9} md={12} sm={12}>
            {/* <!-- Card body --> */}
            <Card.Body>
              <h3 className="h4 mb-2" style={{ maxHeight: "3rem" }}>
                <Link
                  shallow={true}
                  href={
                    isMyCourse
                      ? `/CourseResume/${item.id}`
                      : `/CourseDetail/${item.id}`
                  }
                  onClick={() => {
                    window.location = isMyCourse
                      ? `/CourseResume/${item.id}`
                      : `/CourseDetail/${item.id}`;
                  }}
                >
                  <a className="text-inherit">{item.name}</a>
                </Link>
              </h3>
              {/* <!-- List inline --> */}
              <ListGroup as="ul" bsPrefix="list-inline" className="mb-5">
                <ListGroup.Item as="li" bsPrefix="list-inline-item">
                  <i className="far fa-clock me-1"></i>
                  {item.duration}
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix="list-inline-item">
                  <span className="text-warning">
                    <Ratings rating={5} /> 5.0
                  </span>
                </ListGroup.Item>
              </ListGroup>
              {/* <!-- Row --> */}
              {is_partial_payment && purchaseData.remian_payments > 0 && (
                <Alert variant="info">
                  <Row className="align-items-center g-0">
                    <Col className="">
                      Next Payment Date <b>{purchaseData.next_payment_date}</b>
                    </Col>
                    <Col className="col-mx">
                      <Button
                        size="sm"
                        onClick={() =>
                          router.push(
                            `${
                              item.id === 55 || item.id === 56
                                ? `/SpecialCheckout/`
                                : `/SplitPaymentCheckout/`
                            }${item.id}`
                          )
                        }
                      >
                        {" "}
                        Pay now $
                        {parseFloat(purchaseData.each_payment_amount).toFixed(
                          2
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Alert>
              )}
              {!isMyCourse && (
                <Row className="align-items-center g-0">
                  <Col className="col-auto">
                    <GKTooltip
                      placement="top"
                      toolTipText="Add to Wish List"
                      className="text-muted heart"
                    >
                      {isFav ? (
                        <>
                          <FavoriteIcon
                            onClick={() => handleRemoveWishList(item.id)}
                          />
                          Remove from Wishlist
                        </>
                      ) : (
                        <>
                          <FavoriteBorderOutlinedIcon
                            onClick={() => handleAddWishList(item.id)}
                          />
                          Add to Wishlist
                        </>
                      )}
                    </GKTooltip>
                  </Col>
                  <Col className="col ms-2"></Col>
                  <Col className="col-auto pr-2"></Col>
                  <Col className="col-auto">
                    <GKTooltip
                      placement="top"
                      toolTipText="Delete from Cart"
                      className="text-muted trash"
                    >
                      <a
                        className="text-muted"
                        onClick={() => deleteFromCart(item.id)}
                      >
                        {" "}
                        <i className="fe fe-trash-2"></i> Delete
                      </a>
                    </GKTooltip>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  };

  const ListViewSmall = () => {
    return (
      <Card
        className="mb-4 g-0"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.2)",
        }}
      >
        <Card.Body className="p-0">
          <Row>
            <Col md={2} sm={12} xs={12}>
              <Image
                src={`${item.signed_url_image}`}
                alt="..."
                width={isMobile ? "100%" : "168"}
                className={isMobile ? "" : "p-4"}
              />
            </Col>
            <Col md={7} sm={6}>
              <ListGroup
                as="ul"
                bsPrefix="list-inline"
                className="ms-3 p-2 pb-0 mt-2"
              >
                <ListGroup.Item
                  as="li"
                  bsPrefix="list-inline-item"
                  className="pb-2"
                >
                  <Link
                    shallow={true}
                    href={`/CourseDetail/${item.id}`}
                    onClick={() => {
                      window.location = `/CourseDetail/${item.id}`;
                    }}
                  >
                    <a className="cc-coursetitle btn-sm">{item.name}</a>
                  </Link>
                </ListGroup.Item>
                <br />

                <ListGroup.Item
                  as="li"
                  bsPrefix="list-inline-item"
                  className="pb-2"
                >
                  <span className="text-warning">
                    <Ratings rating={5} starSize="20px" /> 5.0
                  </span>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  bsPrefix="list-inline-item"
                  className="pb-2"
                >
                  {isMobile ? (
                    <>
                      {" "}
                      <br />
                      <Stack gap={4} direction="horizontal">
                        <div>
                          <Button className="cc-btnbestseller rounded-0">
                            El más vendido{" "}
                          </Button>
                        </div>
                        <div>{item.custom_field_3} horas en total</div>
                      </Stack>
                      <br />
                      <Stack gap={4} direction="horizontal">
                        <div>{item.custom_field_4} lectures</div>
                        <div>Todos los niveles</div>
                      </Stack>
                    </>
                  ) : (
                    <Stack gap={4} direction="horizontal">
                      <div>
                        <Button className="cc-btnbestseller rounded-0">
                          El más vendido{" "}
                        </Button>
                      </div>
                      <div>{item.custom_field_3} horas en total</div>
                      <div>{item.custom_field_4} lectures</div>
                      <div>Todos los niveles</div>
                    </Stack>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col
              md={3}
              sm={12}
              xs={12}
              className="d-flex align-items-center bd-highlight"
            >
              {isMobile ? (
                <>
                  <ListGroup
                    as="ul"
                    bsPrefix="list-inline"
                    className="ms-3 pb-0 p-2 pt-0 w-100"
                  >
                    <ListGroup.Item
                      as="li"
                      bsPrefix="list-inline-item "
                      className="pb-2 w-100"
                    >
                      <Stack gap={3} direction="horizontal">
                        <div>
                          <img
                            src="/images_optimized/groupusers.png"
                            width={20}
                          />{" "}
                          &nbsp; 124,828
                        </div>
                        <div className="ms-auto p-2">
                          <img
                            src="/images_optimized/mclogo_price_black.svg"
                            width={20}
                          />{" "}
                          <span className="cc-price">
                            {parseFloat(item.price / mctPrice).toFixed(2)}
                          </span>{" "}
                          / ${item.price}
                        </div>
                      </Stack>
                    </ListGroup.Item>
                  </ListGroup>
                </>
              ) : (
                <>
                  <div className="vrdark ms-1 mt-4" />

                  <div className="py-2 ms-4 mt-4">
                    <img src="/images_optimized/groupusers.png" width={20} />{" "}
                    &nbsp; 124,828
                    <br />
                    <img
                      src="/images_optimized/mclogo_price_black.svg"
                      width={20}
                    />{" "}
                    &nbsp;
                    <span className="cc-price">
                      {parseFloat(item.price / mctPrice).toFixed(2)}
                    </span>{" "}
                    / ${item.price}
                  </div>
                </>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };

  const CartListView = () => {
    return (
      <Card
        className="mb-4 g-0"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.2)",
        }}
      >
        <Card.Body className="p-0">
          <Row>
            <Col md={2} sm={6}>
              <Image
                src={`${item.signed_url_image}`}
                alt="..."
                width={168}
                className="p-4"
              />
            </Col>
            <Col md={7} sm={6}>
              <ListGroup
                as="ul"
                bsPrefix="list-inline"
                className="ms-3 p-2 pb-0 mt-2"
              >
                <ListGroup.Item
                  as="li"
                  bsPrefix="list-inline-item"
                  className="pb-2"
                >
                  <Link
                    shallow={true}
                    href={`/CourseDetail/${item.id}`}
                    onClick={() => {
                      window.location = `/CourseDetail/${item.id}`;
                    }}
                  >
                    <a className="cart-courseTitle btn-sm">{item.name}</a>
                  </Link>
                </ListGroup.Item>

                <br />
                <ListGroup.Item
                  as="li"
                  bsPrefix="list-inline-item"
                  className="pb-2"
                >
                  By&nbsp;
                  <a href="#" className="cc-author btn-sm">
                    {"Admin Smith"}
                  </a>
                </ListGroup.Item>
                <br />
                <ListGroup.Item
                  as="li"
                  bsPrefix="list-inline-item"
                  className="pb-2"
                >
                  <span className="text-warning">
                    <Ratings rating={5} starSize="20px" /> 5.0
                  </span>
                </ListGroup.Item>
                <br />
                <ListGroup.Item
                  as="li"
                  bsPrefix="list-inline-item"
                  className="pb-2"
                >
                  <Stack gap={3} direction="horizontal">
                    <div>9,5 horas en total</div>
                    <div>51 lectures</div>
                    <div>All Levels</div>
                  </Stack>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col
              md={3}
              sm={6}
              className="d-flex align-items-center bd-highlight mb-3"
            >
              <ListGroup
                as="ul"
                bsPrefix="list-inline"
                className="ms-3 p-2 pb-0 mt-2"
              >
                <ListGroup.Item
                  as="li"
                  bsPrefix="list-inline-item"
                  className="pb-2"
                >
                  <a href="#" className="cc-attrTitle btn-sm">
                    {"Remove"}
                  </a>
                </ListGroup.Item>
                <br />
                <ListGroup.Item
                  as="li"
                  bsPrefix="list-inline-item"
                  className="pb-2"
                >
                  <a href="#" className="cc-attrTitle btn-sm">
                    {"Move to Wishlist"}
                  </a>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };
  /** Used in Instructor Profile Page  */
  const ListGroupView = () => {
    return (
      <div className="d-lg-flex align-items-center">
        <div>
          <Image src={item.image} alt="" className="rounded img-4by3-lg" />
        </div>
        <div className="ms-lg-3 mt-2 mt-lg-0">
          <h4 className="text-primary-hover">{item.name} </h4>
          <ListGroup
            as="ul"
            bsPrefix="list-inline"
            className="fs-6 mb-0 text-inherit"
          >
            <ListGroup.Item as="li" bsPrefix="list-inline-item">
              <i className="far fa-clock me-1"></i>
              {item.duration}
            </ListGroup.Item>
            <ListGroup.Item as="li" bsPrefix="list-inline-item">
              <LevelIcon level={item.level} />
              {item.level}
            </ListGroup.Item>
            <ListGroup.Item as="li" bsPrefix="list-inline-item">
              <span className="text-warning">
                {" "}
                <Ratings rating={item.star_avg} /> {item.star_avg.toFixed(1)}
              </span>
              <span className="fs-6 text-muted">
                {" "}
                ({numberWithCommas(item.total_reviews)})
              </span>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {viewby === "grid" ? (
        <GridView />
      ) : viewby === "list" ? (
        <ListView />
      ) : viewby === "cartlist" ? (
        <CartListView />
      ) : viewby === "smalllist" ? (
        <ListViewSmall />
      ) : (
        <ListGroupView />
      )}
    </Fragment>
  );
};

// Typechecking With PropTypes
CourseCard.propTypes = {
  item: PropTypes.object.isRequired,
  free: PropTypes.bool,
  viewby: PropTypes.string,
  showprogressbar: PropTypes.bool,
  extraclass: PropTypes.string,
};

export default CourseCard;
