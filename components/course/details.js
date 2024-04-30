// import node module libraries
import { useRouter } from "next/router";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";

import { mdiFacebook, mdiInstagram, mdiLinkedin, mdiTwitter } from "@mdi/js";
import Icon from "@mdi/react";

import BottomNavigation from "@mui/material/BottomNavigation";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
// import popup youtube video
import ModalVideo from "react-modal-video";

// import widget/custom components
import { GeeksSEO, Ratings } from "widgets";

// import sub components

// import data files
import _ from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  addToCart,
  addToWishlist,
  getCourseDetails,
  getCourseList,
  getMyCourses,
  getUserCartList,
  removeFromWishList,
  tokenValue,
} from "../../services/nodeapi";

import { mdiShare } from "@mdi/js";
import LoadingSpinner from "components/bootstrap/loadingspinner";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { toast, ToastContainer } from "react-toastify";
import { DescriptionTab } from "sub-components";
import FreeCourseDescriptionTab from "sub-components/courses/course-single/FreeCourseDescriptionTab";
import Swal from "sweetalert2";
import { cartObject, userObject } from "../../services/states";
import Coursefulldetails from "./coursefulldetails";
import MCAuthor from "./mcAuthor";
import Stickyfooter from "./stickyfooter";

const CourseDetails = (props) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [obj, setOBJ] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [YouTubeURL] = useState("JRzWRZahOVU");
  const [cdOBJ, setcdOBJ] = useState({});
  const [lectures, setLectures] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const courseId = props.courseId;

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [openEnrollNewUser, setopenEnrollNewUser] = useState(false);
  const [openContactForm, setopenContactForm] = useState(false);
  const [isAddedToWishList, setIsAddedToWishList] = useState(false);
  const [isMyCourse, setIsMyCourse] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const [cartObj, setCartObj] = useRecoilState(cartObject);
  const userObj = useRecoilValue(userObject);
  const [mctPrice, setMCTPrice] = useState(null);
  const [isFreeCourse, setIsFreeCourse] = useState(null);
  const [totalVideosCount, settotalVideosCount] = useState(0);
  const [totalVideosDuration, settotalVideosDuration] = useState(0);
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [showShareModal, setshowShareModal] = useState(false);
  const { locale: activeLocale, locales, asPath } = useRouter();

  const handleAddToCart = async () => {
    const courseId = props.courseId;
    if (cdOBJ.is_partial_payment_available === 1) {
      const url =
        courseId === "55" || courseId === "56"
          ? `/SpecialCheckout/${courseId}`
          : `/SplitPaymentCheckout/${courseId}`;
      router.push(url);
    } else {
      if (!_.isEmpty(userObj)) {
        const resp = await addToCart({ courseId });
        const clResp = await getUserCartList();
        setCartObj(clResp.data.courses);
        toast.success("Se ha añadido a tu carrito");
        handleIsMyCourse();
        setIsAddedToCart(true);
        router.push("/Checkout?courseid=" + courseId);
      } else {
        router.push("/Checkout?courseid=" + courseId);
      }
    }
  };

  useEffect(() => {
    pageLoad();
  }, [activeLocale]);
  const pageLoad = async () => {
    setIsLoading(true);
    const resp = await getCourseList();

    if (resp.status === 200) {
      setOBJ(resp.data.category);
    }

    const cdresp = await getCourseDetails(courseId);

    if (cdresp.status === 200) {
      setcdOBJ(cdresp.data.courseData);
      const isPublic = cdresp.data.courseData.is_public === 1 ? true : false;
      setIsFreeCourse(isPublic);
    }
    let objLect = [];
    const courseModules = _.orderBy(
      cdresp.data.courseData.courseModules,
      ["module_index"],
      ["asc"]
    );

    let iTotalVideosCount = 0;
    let iTotalVideosDuration = 0;
    courseModules.map((m) => {
      let topics = [];
      let totalDuration = 0;

      m.courseLectures.map((l) => {
        totalDuration = totalDuration + l.duration;
        topics.push({
          id: l.id,
          title: l.name,
          duration: l.duration + "m",
          status: "pending",
          locked: true,
          sub_module_id: l.sub_module_id,
          sub_module_name: !_.isEmpty(l.sub_modules) ? l.sub_modules.name : "",
        });
      });
      objLect.push({
        id: m.id,
        title: m.name,
        total_videos: m.courseLectures.length,
        total_duratoin: totalDuration + "mins",
        completed: 0,
        topics,
      });
      iTotalVideosCount = iTotalVideosCount + m.courseLectures.length;
      iTotalVideosDuration = iTotalVideosDuration + totalDuration;
    });

    setLectures(objLect);
    settotalVideosCount(iTotalVideosCount);
    settotalVideosDuration(iTotalVideosDuration);
    await handleIsMyCourse();

    if (!_.isEmpty(localStorage.getItem("mctprice"))) {
      setMCTPrice(parseFloat(localStorage.getItem("mctprice")));
    } else {
      await loadMCTPrice();
    }
    setIsLoading(false);
  };

  const loadMCTPrice = async () => {
    const resp = await tokenValue();

    if (resp.status === 200) {
      setMCTPrice(resp.data.data);
    }
  };
  const handleIsMyCourse = async () => {
    if (!_.isEmpty(userObj)) {
      const resp = await getMyCourses();

      if (resp.data.list.length > 0) {
        setIsMyCourse(
          _.some(resp.data.list, { course_id: parseInt(courseId) })
        );
      }
    }

    if (!_.isEmpty(cartObj)) {
      setIsAddedToCart(_.some(cartObj, { id: parseInt(courseId) }));
    }
  };

  const handleAddWishList = async (courseId) => {
    if (!_.isEmpty(userObj)) {
      const resp = await addToWishlist({ courseId });
      setIsFav(true);
      toast.success("Añadido a tu Lista de Deseados");
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
    toast.success("Eliminado de tu Lista de Deseados");
  };
  const freeCourseEnrollment = () => {
    const courseId = props.courseId;

    if (!_.isEmpty(userObj)) {
      router.push(`/CourseResume/${courseId}`);
    } else {
      setopenEnrollNewUser(true);
    }
  };

  const handleDownloadBrochure = () => {
    setopenContactForm(true);
  };
  const CardPriceDetails = () => {
    return (
      <>
        {/* Card */}
        <Card className="mb-0 noBorderCard rounded-0">
          <div className="p-0">
            <div
              className="d-flex justify-content-center position-relative py-10 bg-cover"
              style={{
                background: `url(${cdOBJ.signed_url_image_thumbnail})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
            >
              {!_.isEmpty(cdOBJ.thumbnail_video) ? (
                <Link href="#">
                  <a
                    className="popup-youtube icon-shape rounded-circle btn-play icon-xl text-decoration-none"
                    onClick={() => setOpen(true)}
                  >
                    <i className="fe fe-play"></i>
                  </a>
                </Link>
              ) : (
                <Link href="#">
                  <a
                    className="popup-youtube  icon-xl text-decoration-none"
                    href="#"
                  ></a>
                </Link>
              )}
            </div>
          </div>
          {/* video popup */}
          <ModalVideo
            channel="custom"
            isOpen={isOpen}
            url={cdOBJ.thumbnail_video}
            // videoId={YouTubeURL}
            onClose={() => setOpen(false)}
          />
          {/* end of video popup */}

          {/* Card body */}
          <Card.Body>
            {/* Price single page */}
            {!isFreeCourse && (
              <div className="mb-3">
                <div className="d-flex justify-content-center">
                  <img
                    src="/images_optimized/mclogo_price_black.svg"
                    className="imgPrice_Coin"
                    width="40"
                  />
                  &nbsp;&nbsp;
                  <span className="cd-pricedetails">
                    {parseFloat(cdOBJ.price / mctPrice).toFixed(2)}
                    &nbsp;/&nbsp;${cdOBJ.price}
                  </span>
                </div>
              </div>
            )}
            {isFreeCourse && (
              <div className="d-grid">
                {_.isEmpty(userObj) ? (
                  <>
                    <Button
                      onClick={freeCourseEnrollment}
                      className="btn btn-primary mb-2"
                    >
                      {_.isEmpty(userObj)
                        ? "HACER EL EXAMEN Y OBTENER EL CURSO GRATIS"
                        : "HACER EL EXAMEN"}
                    </Button>
                    <Modal
                      show={openEnrollNewUser}
                      size="lg"
                      centered
                      aria-labelledby="contained-modal-title-vcenter"
                      onHide={() => setopenEnrollNewUser(false)}
                    >
                      <Modal.Body>
                        <div className="d-grid pt-4">
                          <Button
                            onClick={() =>
                              router.push(
                                `/authentication/sign-in${
                                  courseId !== undefined
                                    ? "?courseId=" + courseId
                                    : ""
                                }`
                              )
                            }
                            className="btn btn-primary mb-2"
                          >
                            {t("signin.sign_in")}
                          </Button>
                          <Button
                            onClick={() =>
                              router.push(
                                `/authentication/sign-up${
                                  courseId !== undefined
                                    ? "?courseId=" + courseId
                                    : ""
                                }`
                              )
                            }
                            className="btn btn-primary mb-2"
                          >
                            {t("signup.signup")}
                          </Button>
                        </div>

                        {/* <EnrollUser courseId={courseId} /> */}
                      </Modal.Body>
                    </Modal>
                  </>
                ) : (
                  <Button
                    onClick={() => router.push(`/CourseResume/${cdOBJ.id}`)}
                    className="btn btn-primary mb-2"
                  >
                    {t("pages.start_learning")}
                  </Button>
                )}
              </div>
            )}

            {!isFreeCourse && (
              <>
                {!isLoading && !isMyCourse && (
                  <>
                    {!isAddedToCart && (
                      <div className="d-grid">
                        {cdOBJ.is_sold_out === 1 ? (
                          <Button
                            disabled={true}
                            className="btn btn-danger mb-2"
                          >
                            Sold Out
                          </Button>
                        ) : (
                          <>
                            {courseId === "55" && (
                              <>
                                <span
                                  className="fs-8 h4 mt-2 text-center"
                                  style={{ color: "red", float: "left" }}
                                >
                                  Solo Acceso por selección
                                </span>

                                <Button
                                  href={
                                    courseId === "55"
                                      ? "https://calendly.com/mentoria-mani/mentoria-mani-1"
                                      : "https://calendly.com/mundocrypto1/pako-thawani-master"
                                  }
                                  target="_blank"
                                  className="btn btn-primary mb-2"
                                >
                                  Pide una llamada
                                </Button>
                              </>
                            )}
                          </>
                        )}
                        {courseId !== "55" && cdOBJ.is_sold_out !== 1 && (
                          <Button
                            onClick={handleAddToCart}
                            className="btn btn-primary mb-2"
                          >
                            {t("pages.proceed_to_checkout")}
                          </Button>
                        )}
                        <Button
                          variant="outline-primary"
                          href={
                            courseId === "55"
                              ? "https://calendly.com/mentoria-mani/mentoria-mani-1"
                              : "https://calendly.com/mundocrypto1/pako-thawani-master"
                          }
                          target="_blank"
                        >
                          {t("pages.talk_to_experts")}
                        </Button>
                      </div>
                    )}
                    {isAddedToCart && (
                      <div className="d-grid">
                        <Button
                          onClick={() =>
                            router.push(
                              courseId === "55" || courseId === "56"
                                ? `/SpecialCheckout/${courseId}`
                                : cdOBJ.is_partial_payment_available === 1
                                ? `/SplitPaymentCheckout/${courseId}`
                                : `/Checkout?courseid=${courseId}`
                            )
                          }
                          className="btn btn-primary mb-2"
                        >
                          {t("pages.proceed_to_checkout")}
                        </Button>
                      </div>
                    )}
                  </>
                )}
                {!isLoading && isMyCourse && (
                  <>
                    {" "}
                    {cdOBJ.is_ready_for_Learning === 0 ? (
                      <div className="d-grid">
                        <Button
                          disabled={true}
                          className="btn btn-primary mb-2"
                        >
                          Aprendizaje Próximamente
                        </Button>
                      </div>
                    ) : (
                      <div className="d-grid">
                        <Button
                          onClick={() =>
                            router.push(`/CourseResume/${cdOBJ.id}`)
                          }
                          className="btn btn-primary mb-2"
                        >
                          Resume Learning
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
            {!isLoading && isMyCourse && (
              <div className="d-grid">
                <Button
                  onClick={() => router.push(`/CourseResume/${cdOBJ.id}`)}
                  className="btn btn-primary mb-2"
                >
                  Reanudar el aprendizaje
                </Button>
              </div>
            )}
            <Card.Text className="text-end pt-2">
              <Button
                variant="outline-dark"
                size="sm"
                onClick={() => setshowShareModal(true)}
              >
                Compartir &nbsp;
                <Icon path={mdiShare} size={0.8} />
              </Button>{" "}
              <Modal
                show={showShareModal}
                onHide={() => setshowShareModal(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Compartir</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col lg={12} md={12} sm={12} className={"text-center"}>
                      <div className="fs-4 ">
                        <Link
                          href={`https://www.facebook.com/sharer/sharer.php?u=${
                            window && window.location.href
                          }`}
                        >
                          <a
                            className=" text-primary-hover me-3"
                            target="_blank"
                          >
                            <Icon path={mdiFacebook} size={2} />
                          </a>
                        </Link>
                        <Link href={window && window.location.href}>
                          <a
                            className="text-primary-hover me-3"
                            target="_blank"
                          >
                            <Icon path={mdiTwitter} size={2} />
                          </a>
                        </Link>

                        <Link href="https://www.linkedin.com/school/mundocryptoacademy/">
                          <a
                            className="text-primary-hover me-3"
                            target="_blank"
                          >
                            <Icon path={mdiLinkedin} size={2} />
                          </a>
                        </Link>

                        <Link href="https://www.instagram.com/mundocryptooficial/">
                          <a
                            className="text-primary-hover me-3"
                            target="_blank"
                          >
                            <Icon path={mdiInstagram} size={2} />
                          </a>
                        </Link>

                        <Link href="https://discord.gg/mundocryptocommunity">
                          <a
                            className="text-primary-hover me-3"
                            style={{
                              marginTop: "-0.8rem",
                              marginLeft: "-0.5rem",
                            }}
                            target="_blank"
                          >
                            <Image
                              className="text-primary-hover "
                              src="/images_optimized/discord.svg"
                              width={50}
                            />
                          </a>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </Modal.Body>
              </Modal>
            </Card.Text>
          </Card.Body>
        </Card>
        {/* Card */}
        <Card className="mb-4 noBorderCard">
          {/* Card header */}
          <Card.Header className="noBorderCard">
            <h4 className="mb-0 cd-includesTitle">
              {t("pages.what_includes")}
            </h4>
          </Card.Header>
          {/* Card Body */}
          <Card.Body className="p-0 noBorderCard">
            <Row>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="noBorderCard">
                    <img
                      width={20}
                      src="/images_optimized/videosonline.svg"
                      className="fe fe-award me-2 align-middle text-dark"
                    />
                    Videos Online
                  </ListGroup.Item>
                  <ListGroup.Item className="noBorderCard">
                    <img
                      width={20}
                      src="/images_optimized/accessfull.svg"
                      className="fe fe-award me-2 align-middle text-dark"
                    />
                    {t("pages.lifetime_access")}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="noBorderCard">
                    <img
                      width={20}
                      src="/images_optimized/nftcertificate.svg"
                      className="fe fe-award me-2 align-middle text-dark"
                    />
                    Certificados NFT
                  </ListGroup.Item>
                  <ListGroup.Item className="noBorderCard">
                    <img
                      width={20}
                      src="/images_optimized/infinite.svg"
                      className="fe fe-award me-2 align-middle text-dark"
                    />
                    Acceso de por vida
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        {/* Card */}
        <MCAuthor />
      </>
    );
  };
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO
        title={`${
          cdOBJ.name === undefined ? "Course" : cdOBJ.name
        } | MundoCrypto`}
      />
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
      {!isLoading && !_.isEmpty(cdOBJ) && (
        <>
          {/* Page header */}
          <div className="pt-lg-8  pt-8 pb-4 bg-primary courseDetailHeader">
            <Container>
              <LoadingSpinner showLoading={isLoading} />
              <Row className="align-items-center ">
                <Col xl={7} lg={7} md={12} sm={12}>
                  <Breadcrumb className="breadcrumbtext pb-4">
                    <Breadcrumb.Item className="breadcrumbtext" href="/">
                      Todos
                    </Breadcrumb.Item>
                    <Breadcrumb.Item className="breadcrumbtext" active>
                      {cdOBJ.name}
                    </Breadcrumb.Item>
                  </Breadcrumb>
                  <div>
                    <h1 className="cd_title pb-4">{cdOBJ.name}</h1>
                    <p
                      className="cd-subtitle pb-4"
                      dangerouslySetInnerHTML={{
                        __html: cdOBJ.sub_title,
                      }}
                    ></p>
                    <div className="d-flex align-items-center pb-4">
                      <span className="text-warning">
                        <Ratings rating={5} starSize="20px" />
                        &nbsp;
                        <span
                          style={{
                            fontSize: "20px",
                            marginTop: "-3px",
                            position: "absolute",
                          }}
                        >
                          5.0
                        </span>
                      </span>
                      {/* {!isMyCourse && (
                        <GKTooltip
                          placement="top"
                          toolTipText="Añadir a deseados"
                          className="bookmark text-white text-decoration-none"
                        >
                          {isFav ? (
                            <FavoriteIcon
                              onClick={() => handleRemoveWishList(courseId)}
                              className="fs-3"
                            />
                          ) : (
                            <FavoriteBorderOutlinedIcon
                              onClick={() => handleAddWishList(courseId)}
                              className="fs-3"
                            />
                          )}{" "}
                          {t("pages.add_to_wishlist")}
                        </GKTooltip>
                      )} */}
                      {!isFreeCourse && (
                        <span className="text-white ms-10">
                          <i
                            style={{ fontSize: "15px" }}
                            className="fe fe-clock text-white"
                          ></i>
                          {cdOBJ.duration}
                        </span>
                      )}
                    </div>
                    <hr />

                    {!isMobile && (
                      <>
                        <Row className="pb-4">
                          <Col md={4} sm={4} xs={6}>
                            <span className="text-white cd-attributes">
                              <i className="fe fe-file text-white"></i>{" "}
                              {/* {isFreeCourse
                                ? JSON.parse(cdOBJ.description).class
                                : courseId === "56"
                                ? "350 clases"
                                : courseId === "57"
                                ? "375 módulos"
                                : "114 módulos"} */}
                              {cdOBJ.total_modules}
                            </span>
                          </Col>
                          <Col sm={4} md={4} xs={6}>
                            {!isFreeCourse && (
                              <span className="text-white mx-2 cd-attributes">
                                <i className="fe fe-layers text-white"></i>{" "}
                                {cdOBJ.training_type}
                              </span>
                            )}
                            {isFreeCourse && (
                              <span className="text-white mx-2 cd-attributes">
                                <i className="fe fe-layers text-white"></i>{" "}
                                Recompensa&nbsp;
                                {JSON.parse(cdOBJ.description).Recompensa}
                              </span>
                            )}
                          </Col>
                          <Col sm={4} md={4} xs={6}>
                            <span className="text-white mx-2 cd-attributes">
                              <i className="fe fe-user text-white"></i>{" "}
                              {cdOBJ.access_type}
                            </span>
                          </Col>
                        </Row>
                        <Row className="pb-2">
                          <Col sm={4} md={4} xs={6}>
                            <span className="text-white cd-attributes">
                              <i className="fe fe-archive text-white"></i>{" "}
                              {cdOBJ.launguage}
                            </span>
                          </Col>
                          <Col sm={4} md={4} xs={6}>
                            <span className="text-white mx-2 cd-attributes">
                              <i className="fe fe-play text-white"></i>{" "}
                              {cdOBJ.online_text}
                            </span>
                          </Col>
                          <Col sm={4} md={4} xs={6}>
                            <span className="text-white mx-2 cd-attributes">
                              <i className="fe fe-calendar text-white"></i>{" "}
                              {cdOBJ.duration}
                            </span>
                          </Col>
                        </Row>
                      </>
                    )}
                    {isMobile && (
                      <>
                        <Row className="pb-4">
                          <Col md={4} sm={4} xs={6}>
                            <span className="text-white mx-2 cd-attributes">
                              <i className="fe fe-file text-white"></i>{" "}
                              {isFreeCourse
                                ? JSON.parse(cdOBJ.description).class
                                : courseId === "56"
                                ? "350 clases"
                                : "114 módulos"}
                            </span>
                          </Col>
                          <Col sm={4} md={4} xs={6}>
                            {!isFreeCourse && (
                              <span className="text-white mx-2 cd-attributes">
                                <i className="fe fe-layers text-white"></i>{" "}
                                Formación tutorizada
                              </span>
                            )}
                            {isFreeCourse && (
                              <span className="text-white mx-2 cd-attributes">
                                <i className="fe fe-layers text-white"></i>{" "}
                                Recompensa&nbsp;
                                {JSON.parse(cdOBJ.description).Recompensa}
                              </span>
                            )}
                          </Col>
                        </Row>
                        <Row className="pb-4">
                          <Col sm={4} md={4} xs={6}>
                            <span className="text-white mx-2 cd-attributes">
                              <i className="fe fe-user text-white"></i> Acceso
                              vitalicio
                            </span>
                          </Col>
                          <Col sm={4} md={4} xs={6}>
                            <span className="text-white mx-2 cd-attributes">
                              <i className="fe fe-archive text-white"></i>{" "}
                              Español
                            </span>
                          </Col>
                        </Row>
                        <Row className="pb-4">
                          <Col sm={4} md={4} xs={6}>
                            <span className="text-white mx-2 cd-attributes">
                              <i className="fe fe-play text-white"></i> 100%
                              online
                            </span>
                          </Col>
                          <Col sm={4} md={4} xs={6}>
                            {courseId === "38" && (
                              <span className="text-white mx-2 cd-attributes">
                                <i className="fe fe-calendar text-white"></i>{" "}
                                {cdOBJ.duration}
                              </span>
                            )}
                          </Col>
                        </Row>
                      </>
                    )}
                    <hr />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          {/* Page content */}
          <div className="pb-10 pt-6">
            {courseId === "38" ||
            courseId === "55" ||
            courseId === "56" ||
            courseId === "57" ||
            courseId === "58" ||
            courseId === "59" ||
            courseId === "68" ||
            courseId === "61" ? (
              <Coursefulldetails
                lectures={lectures}
                totalVideosCount={totalVideosCount}
                totalVideosDuration={totalVideosDuration}
                cdOBJ={cdOBJ}
                obj={obj}
                CardPriceDetails={CardPriceDetails}
                showOtherCourses={true}
              />
            ) : (
              <>
                {isFreeCourse ? (
                  <FreeCourseDescriptionTab
                    data={JSON.parse(cdOBJ.description)}
                    CardPriceDetails={CardPriceDetails}
                    showOtherCourses={true}
                  />
                ) : (
                  <DescriptionTab
                    description={cdOBJ.description}
                    learning_points={cdOBJ.learning_points}
                    CardPriceDetails={CardPriceDetails}
                    showOtherCourses={true}
                  />
                  // <Coursefulldetails
                  //   lectures={lectures}
                  //   totalVideosCount={totalVideosCount}
                  //   totalVideosDuration={totalVideosDuration}
                  //   cdOBJ={cdOBJ}
                  //   obj={obj}
                  //   CardPriceDetails={CardPriceDetails}
                  //   showOtherCourses={true}
                  // />
                )}
              </>
            )}
          </div>
        </>
      )}
      {!isDesktop && !isLaptop && (
        <>
          {!isFreeCourse && !isLoading && !isMyCourse && (
            <>
              {!isAddedToCart && (
                <Stickyfooter
                  is_sold_out={cdOBJ.is_sold_out}
                  dollarprice={cdOBJ.price}
                  mctprice={parseFloat(cdOBJ.price / mctPrice).toFixed(2)}
                  src={"coursedetail"}
                  btnText={t("pages.add_to_cart")}
                  handleCheckout={handleAddToCart}
                />
              )}
              {isAddedToCart && (
                <Stickyfooter
                  dollarprice={cdOBJ.price}
                  mctprice={parseFloat(cdOBJ.price / mctPrice).toFixed(2)}
                  src={"coursedetail"}
                  btnText={t("pages.proceed_to_checkout")}
                  handleCheckout={() =>
                    router.push(
                      courseId === "55" || courseId === "56"
                        ? `/SpecialCheckout/${courseId}`
                        : cdOBJ.is_partial_payment_available === 1
                        ? `/SplitPaymentCheckout/${courseId}`
                        : "/Checkout"
                    )
                  }
                />
              )}
            </>
          )}
          {isFreeCourse && (
            <Box sx={{ pb: 2 }}>
              <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0, pb: 5 }}
              >
                <BottomNavigation showLabels>
                  <div className="d-grid pt-4">
                    <Button
                      onClick={freeCourseEnrollment}
                      className="btn btn-primary mb-2"
                    >
                      {_.isEmpty(userObj)
                        ? "HACER EL EXAMEN Y OBTENER EL CURSO GRATIS"
                        : "HACER EL EXAMEN"}
                    </Button>
                  </div>
                </BottomNavigation>
              </Paper>
            </Box>
          )}
        </>
      )}
    </Fragment>
  );
};

export default CourseDetails;
