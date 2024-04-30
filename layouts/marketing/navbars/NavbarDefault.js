// import node module libraries
import Link from "next/link";
import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Image,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
// import sub components
import QuickMenu from "./QuickMenu";

// import data files

// import layouts

// import hooks
import useMounted from "hooks/useMounted";

import LiveSearch from "components/bootstrap/LiveSearch";
import MegaMenu from "components/bootstrap/MegaMenu";
import Wallet from "components/bootstrap/Wallet";
import _ from "lodash";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import { GKTooltip } from "widgets";
import {
  getCategories,
  getUserCartList,
  getUserProfileDetails,
  tokenValue,
} from "../../../services/nodeapi";
import {
  cartObject,
  userObject,
  userProfileObject,
} from "../../../services/states";
const NavbarDefault = ({ headerstyle, login }) => {
  const [expandedMenu, setExpandedMenu] = useState(false);
  const hasMounted = useMounted();

  const { t } = useTranslation();
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const router = useRouter();

  const { locale: activeLocale, locales, asPath } = useRouter();

  const availableLocales = locales.filter((locale) => locale !== activeLocale);

  const [catOBJ, setCatOBJ] = useState({});
  const [cartObj, setCartObj] = useRecoilState(cartObject);
  const [userObj, setuserObj] = useRecoilState(userObject);

  const [userProfileObj, setUserProfileObject] =
    useRecoilState(userProfileObject);

  const cObj = useRecoilValue(cartObject);
  const [isLoading, setIsLoading] = useState(false);
  const [iTotalPrice, setTotalPrice] = useState(0);

  const [openCart, setOpenCart] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [arrowRef, setarrowRef] = useState(null);
  const [mctPrice, setMCTPrice] = useState(null);

  const [showHomePromBanner, setshowHomePromBanner] = useState(false);
  const [showAICoursePromBanner, setshowAICoursePromBanner] = useState(false);

  const handleCartClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenCart((previousOpen) => !previousOpen);
  };
  const clickAwayHandler = () => setOpenCart(false);

  const MINUTE_MS = 10000;

  useEffect(() => {
    const rp = router.pathname;
    if (rp === "/") {
      setshowHomePromBanner(false);
    } else {
      setshowHomePromBanner(false);
    }
    if (rp === "/master-inteligencia-artificial") {
      setshowAICoursePromBanner(false);
    } else {
      setshowAICoursePromBanner(false);
    }
  }, [router]);
  useEffect(() => {
    pageLoad();
    const interval = setInterval(() => {
      loadMCTPrice();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [activeLocale]);

  const pageLoad = async () => {
    setIsLoading(true);
    try {
      const upResp = await getUserProfileDetails();

      setUserProfileObject(upResp.data.userData);
      setuserObj(upResp.data.userData);
    } catch (e) {
      console.log(e);
    }
    await setCatagories();

    if (!_.isEmpty(userObj)) {
      await setCart();
    }
    await loadMCTPrice();
    setIsLoading(false);
  };

  const loadMCTPrice = async () => {
    const resp = await tokenValue();

    if (resp.status === 200) {
      setMCTPrice(resp.data.data);
      localStorage.setItem("mctprice", resp.data.data.price);
    }
  };

  const setCatagories = async () => {
    const catresp = await getCategories();
    if (catresp.status === 200) {
      setCatOBJ(catresp.data.category);
    }
  };

  const setCart = async () => {
    const clResp = await getUserCartList();

    if (clResp.status === 200) {
      setCartObj(clResp.data.courses);
      let price = 0;
      clResp.data.courses.map((c) => {
        price = price + c.price;
      });
      setTotalPrice(price);
    }
  };

  const setCookie = (locale) => {
    localStorage.setItem("language_code", locale);
    router.push(router.asPath, router.asPath, { locale: locale });
  };
  return (
    <Fragment>
      {showHomePromBanner && (isDesktop || isLaptop) && (
        <Navbar expand="lg" className="navHomePromo ">
          <Container fluid className="d-flex justify-content-between ">
            <div></div>
            <div className="d-flex justify-content-center">
              <span className="navTxtHomePromo">{t("ai_banner_text")}</span>

              <Button
                size="sm"
                target="_blank"
                href="https://mct.mundocrypto.com/pdf-chatgpt/"
                style={{ backgroundColor: "#E53F3C", color: "white" }}
              >
                {t("button_ai_banner")}
              </Button>
            </div>
            <div className="d-flex justify-content-end">
              <button
                onClick={() => setshowHomePromBanner(false)}
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
              ></button>
            </div>
          </Container>
        </Navbar>
      )}
      {showHomePromBanner && !isDesktop && !isLaptop && (
        <Navbar expand="lg" className="navHomePromo ">
          <Container fluid className="d-flex justify-content-between ">
            <Row>
              <Col sm="12">
                <span className="navTxtHomePromo">{t("ai_banner_text")}</span>
                <button
                  onClick={() => setshowHomePromBanner(false)}
                  type="button"
                  className="btn-close btn-close-white btnHomeClose"
                  aria-label="Close"
                ></button>
              </Col>
              <Col sm="12" className="text-center">
                <Button
                  size="sm"
                  target="_blank"
                  href="https://mct.mundocrypto.com/pdf-chatgpt/"
                  style={{ backgroundColor: "#E53F3C", color: "white" }}
                >
                  {t("button_ai_banner")}
                </Button>
              </Col>
            </Row>
          </Container>
        </Navbar>
      )}
      {showAICoursePromBanner && (isDesktop || isLaptop) && (
        <Navbar expand="lg" className="navAICoursePromo ">
          <Container fluid className="d-flex justify-content-between ">
            <div></div>
            <div className="d-flex justify-content-center">
              <span className="navTxtHomePromo">
                ¡Reserva tu plaza Antes de la Subida de precio a $2900!
                &nbsp;&nbsp;<b style={{ color: "#FF3B37" }}>SÓLO 150 PLAZAS*</b>
              </span>
            </div>
            <div className="d-flex justify-content-end">
              <button
                onClick={() => setshowAICoursePromBanner(false)}
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
              ></button>
            </div>
          </Container>
        </Navbar>
      )}
      {showAICoursePromBanner && !isDesktop && !isLaptop && (
        <Navbar expand="lg" className="navAICoursePromo ">
          <Container fluid className="d-flex justify-content-between ">
            <Row>
              <Col sm="12">
                <span className="navTxtAIPromo d-flex justify-content-center">
                  ¡Reserva tu plaza Antes de la Subida de precio a $2900!
                </span>
                <button
                  onClick={() => setshowAICoursePromBanner(false)}
                  type="button"
                  className="btn-close btn-close-white btnAIClose"
                  aria-label="Close"
                ></button>
              </Col>
              <Col sm="12" className="d-flex justify-content-center ">
                <span className="navTxtHomePromo">
                  <b style={{ color: "#FF3B37" }}>SÓLO 150 PLAZAS*</b>
                </span>
              </Col>
            </Row>
          </Container>
        </Navbar>
      )}
      <Navbar
        onToggle={(collapsed) => setExpandedMenu(collapsed)}
        expanded={expandedMenu}
        expand="md"
        className={
          (login ? "bg-white" : "") +
          " navbar p-2 " +
          (headerstyle === "dark"
            ? "navbar-dark bg-dark"
            : "navbar-default py-2")
        }
      >
        <Container fluid="lg" className="">
          <Link href="/" passHref>
            <Navbar.Brand>
              <Image
                src="/images_optimized/mc_black_blue.png"
                width={`${!isDesktop && !isLaptop ? "100" : "160"}`}
                alt=""
              />
            </Navbar.Brand>
          </Link>
          {!isDesktop && !isLaptop && mctPrice && (
            <>
              {" "}
              <Nav.Item>
                {availableLocales.map((locale) => {
                  return (
                    <li key={locale} style={{ listStyle: "none" }}>
                      <img
                        role="button"
                        className="me-4 navbar-text pointer"
                        onClick={() => setCookie(locale)}
                        width={20}
                        src={`/images_optimized/flags/${
                          locale.toUpperCase() === "EN"
                            ? "Spanish.png"
                            : "English.png"
                        }`}
                      />
                    </li>
                  );
                })}
              </Nav.Item>
            </>
          )}
          {!isDesktop && !isLaptop && !_.isEmpty(userObj) && (
            <QuickMenu
              cartData={cObj}
              userObj={userObj}
              userProfileObj={userProfileObj}
              iTotalPrice={iTotalPrice}
            />
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="icon-bar top-bar mt-0"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            {!isDesktop && !isLaptop && (
              <Nav className="mt-3">
                {mctPrice && (
                  <Nav.Item>
                    <Nav.Link
                      href="#"
                      target="_blank"
                      bsPrefix="div"
                      className="ms-auto"
                    >
                      <Badge className="mctBadge">
                        <Row className="align-items-center g-0">
                          <Col>
                            <img
                              src="/images_optimized/mclogo_price.svg"
                              width={20}
                            />{" "}
                          </Col>
                          <Col>
                            <span className="mctPriceSpan">
                              1MCT=${parseFloat(mctPrice.price).toFixed(3)}
                            </span>
                          </Col>
                        </Row>
                        {"  "}
                      </Badge>
                    </Nav.Link>
                  </Nav.Item>
                )}
                <Nav.Item className="mt-3">
                  <Form className="px-2 formtxtSearch">
                    <span className="position-absolute ps-3 search-icon">
                      <i className="fe fe-search"></i>
                    </span>
                    <LiveSearch />
                  </Form>
                </Nav.Item>
              </Nav>
            )}
            <Nav className={`${!isDesktop && !isLaptop ? "mt-3" : ""}`}>
              {(isDesktop || isLaptop) && <MegaMenu />}
              <NavDropdown
                className={`me-2 navbar-text`}
                title={
                  <>
                    <span className="navbar-text">
                      {t("header.categories")}
                    </span>
                  </>
                }
                id="basic-nav-dropdown"
              >
                {!isLoading && !_.isEmpty(catOBJ) && (
                  <>
                    {catOBJ.map((d, i) => {
                      return (
                        <NavDropdown.Item
                          key={i}
                          href={`/CourseList?category=${d.name}`}
                        >
                          {" "}
                          {`${d.name}`}
                        </NavDropdown.Item>
                      );
                    })}
                  </>
                )}
              </NavDropdown>
            </Nav>
            {!isDesktop && !isLaptop && (
              <>
                <Nav className="mt-3">
                  <Nav.Item className="me-2 navbar-text">
                    <Nav.Link
                      href="/Business"
                      bsPrefix="text"
                      className="me-4 navbar-text"
                    >
                      {t("header.business")}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <hr className="hrDivider" />
                <Nav className="mt-3">
                  <Nav.Item className="me-2  navbar-text">
                    <Nav.Link
                      href="/Instructors"
                      bsPrefix="text"
                      className="me-4 navbar-text"
                    >
                      {t("header.instructors")}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <hr className="hrDivider" />
                <Nav className="mt-3">
                  <Nav.Item className="me-2  navbar-text">
                    <Nav.Link
                      href="/articles"
                      target="_blank"
                      bsPrefix="text"
                      className="me-4 navbar-text"
                    >
                      Articulos
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <hr className="hrDivider" />
                {_.isEmpty(userObj) && (
                  <>
                    <Nav className="mt-1">
                      <Nav.Item className="me-2  navbar-text">
                        <div className="d-grid gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() =>
                              router.push("/authentication/sign-in")
                            }
                          >
                            {t("header.login")}
                          </Button>
                        </div>
                      </Nav.Item>
                    </Nav>
                  </>
                )}
                <Nav className="mt-1">
                  <Nav.Item className="me-2  navbar-text">
                    <Wallet isMobile={true} />
                  </Nav.Item>
                </Nav>
              </>
            )}
            {(isDesktop || isLaptop) && (
              <Form className="px-2 formtxtSearch">
                <span className="position-absolute ps-3 search-icon">
                  <i className="fe fe-search"></i>
                </span>
                <LiveSearch />
              </Form>
            )}
            <Nav className="navbar-nav navbar-end-wrap ms-auto d-flex nav-top-wrap mt-3 mt-lg-0 align-items-center">
              {(isDesktop || isLaptop) && mctPrice && (
                <Nav.Item>
                  <Nav.Link
                    href="#"
                    target="_blank"
                    bsPrefix="div"
                    className="me-4"
                  >
                    <Badge className="mctBadge">
                      <Row className="align-items-center g-0">
                        <Col>
                          <img
                            src="/images_optimized/mclogo_price_black.svg"
                            width={20}
                          />{" "}
                        </Col>
                        <Col>
                          <span className="mctPriceSpan">
                            1MCT=$1
                            {/* {parseFloat(mctPrice.price).toFixed(3)} */}
                          </span>
                        </Col>
                      </Row>
                      {"  "}
                    </Badge>
                  </Nav.Link>
                </Nav.Item>
              )}
              {(isDesktop || isLaptop) && (
                <>
                  {/* <Nav.Item>
                    <Nav.Link
                      href="/Business"
                      bsPrefix="text"
                      className="me-4 navbar-text"
                    >
                      {t("header.business")}
                    </Nav.Link>{" "}
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      href="/Instructors"
                      bsPrefix="text"
                      className="me-4 navbar-text"
                    >
                      {t("header.instructors")}
                    </Nav.Link>{" "}
                  </Nav.Item> */}
                  <Nav.Item style={{ display: "none" }}>
                    <GKTooltip
                      placement="bottom"
                      toolTipText={t("header.more_lang_coming_soon")}
                      className=" text-white text-decoration-none me-4"
                    >
                      <img
                        width={20}
                        src={`/images_optimized/flags/Spanish.png`}
                      />
                    </GKTooltip>
                  </Nav.Item>
                </>
              )}
              {(isDesktop || isLaptop) && (
                <Nav.Item>
                  {availableLocales.map((locale) => {
                    return (
                      <li key={locale}>
                        <img
                          role="button"
                          className="me-4 navbar-text pointer"
                          onClick={() => setCookie(locale)}
                          width={20}
                          src={`/images_optimized/flags/${
                            locale.toUpperCase() === "EN"
                              ? "Spanish.png"
                              : "English.png"
                          }`}
                        />
                      </li>
                    );
                  })}
                </Nav.Item>
              )}
              {(isDesktop || isLaptop) && _.isEmpty(userObj) && (
                <Nav.Item>
                  <Nav.Link
                    href="#"
                    onClick={() => router.push("/authentication/sign-in")}
                    bsPrefix="text"
                    className="btn btn-outline-primary btn-sm"
                  >
                    {t("header.login")}
                  </Nav.Link>{" "}
                </Nav.Item>
              )}
              &nbsp;
              {(isDesktop || isLaptop) && <Wallet />}
              &nbsp;
              {(isDesktop || isLaptop) && !_.isEmpty(userObj) && (
                <QuickMenu
                  cartData={cObj}
                  userObj={userObj}
                  userProfileObj={userProfileObj}
                  iTotalPrice={iTotalPrice}
                />
              )}
            </Nav>
            {/* end of right side quick / shortcut menu  */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

// Specifies the default values for props
NavbarDefault.defaultProps = {
  headerstyle: "navbar-default",
  login: false,
};

// Typechecking With PropTypes
NavbarDefault.propTypes = {
  headerstyle: PropTypes.string,
  login: PropTypes.bool,
};

export default NavbarDefault;
