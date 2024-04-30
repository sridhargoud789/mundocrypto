// import node module libraries
import { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Dropdown,
  Image,
  ListGroup,
  NavItem,
  NavLink,
  Row,
} from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
// simple bar scrolling used for notification item scrolling
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
// import widget/custom components

// import custom components

// import data files

// import hooks
import useMounted from "hooks/useMounted";

import _ from "lodash";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import {
  getCategories,
  getUserCartList,
  tokenValue,
} from "../../../services/nodeapi";
import {
  cartObject,
  courseInitObject,
  userObject,
  userProfileObject,
} from "../../../services/states";
const QuickMenu = (props) => {
  const { t } = useTranslation("");
  const hasMounted = useMounted();
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [catOBJ, setCatOBJ] = useState({});
  const [cartObj, setCartObj] = useRecoilState(cartObject);
  const [userObj, setuserObject] = useRecoilState(userObject);
  const [userProfObj, setuserProfObject] = useRecoilState(userProfileObject);
  const [ciObj, setciObj] = useRecoilState(courseInitObject);
  const [iTotalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mctPrice, setMCTPrice] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const { locale: activeLocale, locales, asPath } = useRouter();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    pageLoad();
  }, [activeLocale]);

  const pageLoad = async () => {
    setIsLoading(true);
    await setCatagories();
    if (!_.isEmpty(userObj)) {
      setAvatar(userObj.avatar);
      await setCart();
    }

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
  const setCatagories = async () => {
    const catresp = await getCategories();

    if (catresp.status === 200) {
      setCatOBJ(catresp.data.category);
    }
  };

  const setCart = async () => {
    setIsLoading(true);

    const clResp = await getUserCartList();
    if (clResp.status === 200) {
      setCartObj(clResp.data.courses);
      let price = 0;
      clResp.data.courses.map((c) => {
        price = price + c.price;
      });

      setTotalPrice(price);
      setIsLoading(false);
    }
  };

  const handleLogOut = () => {
    setuserObject(null);
    setuserProfObject(null);
    setCartObj(null);
    setciObj(null);
    localStorage.removeItem("access_token");
    router.push("/");
  };

  const Notifications = () => {
    return (
      <SimpleBar style={{ maxHeight: "300px" }}>
        <ListGroup variant="flush">
          {props.cartData.map(function (item, index) {
            return (
              <ListGroup.Item key={index}>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <Image
                      src={item.signed_url_image}
                      onError={(e) => {
                        e.currentTarget.src = "/images_optimized/noimage.png";
                      }}
                      width="80"
                      alt=""
                      className="me-3"
                    />
                    <div>
                      <h5 className="mb-0">{item.name}</h5>
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </SimpleBar>
    );
  };

  const QuickMenuDesktop = () => {
    return (
      <Fragment>
        <Dropdown as={NavItem} className="mt-2 me-0">
          <Dropdown.Toggle
            as={NavLink}
            bsPrefix="h1"
            className="icon-notifications me-lg-1  btn  btn-icon "
            onClick={() => router.push("/Cart")}
          >
            <img src="/images_optimized/featuredlist/Cart.svg" width={25} />
          </Dropdown.Toggle>
          {(isDesktop || isLaptop) && (
            <Dropdown.Menu
              className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end mt-4 py-0"
              align="end"
              show
            >
              {props.cartData.length > 0 && (
                <Dropdown.Item className="mt-3" bsPrefix=" " as="div">
                  <div className="border-bottom px-3 pt-0 pb-3 d-flex justify-content-between align-items-end">
                    <span className="h4 mb-0">{t("header.cart")}</span>
                  </div>
                  <Notifications />
                  <div className="border-top px-3 pt-3 pb-3">
                    {t("header.cart_total")}:{" "}
                    <img
                      src="/images_optimized/coin_blue.png"
                      className="imgPrice_Coin"
                      width="25px"
                    />
                    <span className="text-dark fw-bold">
                      {parseFloat(props.iTotalPrice / mctPrice).toFixed(2)}
                    </span>{" "}
                    <small className="fs-6 text-muted">
                      ${props.iTotalPrice}
                    </small>
                    <Button
                      className="btn btn-sm btn_blue float-right"
                      style={{ float: "right" }}
                      onClick={() => router.push("/Checkout")}
                    >
                      {t("header.cart_checkout")}
                    </Button>
                  </div>
                </Dropdown.Item>
              )}
              {props.cartData.length === 0 && (
                <Dropdown.Item className="mt-3" bsPrefix=" " as="div">
                  <Alert variant="info">
                    {t("header.cart_addcoursestocart")}
                  </Alert>
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          )}
        </Dropdown>
        {(isDesktop || isLaptop) && (
          <Dropdown as={NavItem} className="mt-2 me-0">
            <Dropdown.Toggle
              as={NavLink}
              bsPrefix="h1"
              className="icon-notifications me-lg-1  btn  btn-icon"
              onClick={() => router.push("/Wishlist")}
            >
              <img
                src="/images_optimized/featuredlist/Favorite.svg"
                width={40}
              />
            </Dropdown.Toggle>
          </Dropdown>
        )}
        <Dropdown as={NavItem}>
          <Dropdown.Toggle
            as={NavLink}
            bsPrefix="dt"
            className="rounded-circle border-bottom-0"
          >
            <div className="avatar avatar-md avatar-indicators avatar-online">
              <Image
                alt="avatar"
                src={
                  !_.isEmpty(avatar)
                    ? avatar
                    : "/images_optimized/avatar/defaultuser.png"
                }
                className="rounded-circle"
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="dashboard-dropdown dropdown-menu-end mt-4 py-0"
            align="end"
          >
            <Dropdown.Item className="mt-3">
              <div className="d-flex">
                <div className="avatar avatar-md avatar-indicators avatar-online">
                  <Image
                    alt="avatar"
                    src={
                      !_.isEmpty(avatar)
                        ? avatar
                        : "/images_optimized/avatar/defaultuser.png"
                    }
                    className="rounded-circle"
                  />
                </div>
                <div className="ms-3 lh-1">
                  <h5 className="mb-1">{props.userObj.name}</h5>
                  <p className="mb-0 text-muted">{props.userObj.email}</p>
                </div>
              </div>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              eventKey="3"
              onClick={() => router.push("/privatearea/billing-info")}
            >
              <Row className="text-primary fw-bold fs-6 py-0">
                <Col
                  md={6}
                  sm={6}
                  lg={6}
                  className="d-flex justify-content-start "
                >
                  MCT Balance:
                </Col>
                <Col
                  md={6}
                  sm={6}
                  lg={6}
                  className="d-flex justify-content-end "
                >
                  <img
                    src="/images_optimized/mclogo_price.svg"
                    width={15}
                    className="mt-0"
                  />
                  {parseFloat(
                    props.userProfileObj.wallet.token_balance
                  ).toFixed(2)}{" "}
                  / $
                  {parseFloat(
                    props.userProfileObj.wallet.token_balance * mctPrice
                  ).toFixed(2)}
                </Col>
              </Row>
            </Dropdown.Item>
            <Dropdown.Divider />

            <Dropdown.Item eventKey="3">
              <b>
                {" "}
                {t("header.claimedRewards")}:
                {props.userProfileObj.request_to_collect_points}
              </b>
            </Dropdown.Item>

            <Dropdown.Item eventKey="3">
              <b>
                {" "}
                {t("header.unClaimedRewards")}:
                {props.userProfileObj.un_collected_reward_points}
              </b>
            </Dropdown.Item>
            <Dropdown.Divider />

            {/* <Dropdown.Item
              eventKey="2"
              onClick={() => router.push("/privatearea/edit-profile")}
            >
              <i className="fe fe-user me-2"></i> Profile
            </Dropdown.Item> */}
            <Dropdown.Item
              eventKey="3"
              onClick={() => router.push("/privatearea/mylearnings")}
            >
              <i className="fe fe-dollar-sign me-2"></i> Pagos
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="3"
              onClick={() => router.push("/MyLearnings")}
            >
              <i className="fe fe-star me-2"></i> {t("header.myLearnings")}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => router.push("/privatearea/billing-info")}
            >
              <i className="fe fe-credit-card me-2"></i>{" "}
              {t("private_area.wallets")}
            </Dropdown.Item>

            <Dropdown.Item
              onClick={() => router.push("/privatearea/MyCertificates")}
            >
              <i className="fe fe-award me-2"></i> Certificados
            </Dropdown.Item>
            <Dropdown.Item onClick={() => router.push("/privatearea/security")}>
              <i className="fe fe-settings me-2"></i> {t("header.settings")}
            </Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item className="mb-3" onClick={handleLogOut}>
              <i className="fe fe-power me-2"></i> {t("header.signOut")}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    );
  };

  return (
    <>
      {!isLoading && <Fragment>{hasMounted && <QuickMenuDesktop />}</Fragment>}
    </>
  );
};

export default QuickMenu;
