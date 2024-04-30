import _ from "lodash";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
// import Web3 from "web3";
import i18 from "../next-i18next.config";

// import widget/custom components
import Swal from "sweetalert2";
import { GeeksSEO, PageHeading } from "widgets";
import { tokenContractHelper } from "../helper/contract.helper";
import {
  cartCheckout,
  checkReferralDiscount,
  coinValue,
  editProfile,
  getAddressList,
  getCourseList,
  getMCWalletBalance,
  getUserCartList,
  getVatRateByCountry,
  removeItemFromCart,
  tokenValue,
} from "../services/nodeapi";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LoadingSpinner from "../components/bootstrap/loadingspinner";

import { useTranslation } from "react-i18next";
import "react-intl-tel-input/dist/main.css";
import { useRecoilValue } from "recoil";
import { userObject } from "services/states";

import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { useMediaQuery } from "react-responsive";
const Checkout = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [status, setStatus] = useState(1); //  1: show yes, 2: show no.

  const radioHandler = (status) => {
    setStatus(status);
  };
  const router = useRouter();
  const [countryTax, setCountryTax] = useState(0);
  const [formData, setFormData] = useState({});
  const [cObj, setcObj] = useState([]);
  const [cartCount, setcartCount] = useState(0);
  const [validated, setValidated] = useState(false);
  const [selectedPM, setselectedPM] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [iTotalPrice, setTotalPrice] = useState(0);
  const [addressList, setAddressList] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedBA, setSelectedBA] = useState({});
  const [isCheckoutProcessing, setCheckoutInProcess] = useState(false);
  const [mctPrice, setMCTPrice] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [iActualPrice, setActualPrice] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mcWalletBalance, setMCWalletBalance] = useState(0);

  const [referralCode, setReferralCode] = useState("");

  const [isPayingWithWallet, isSetPayingWithWallet] = useState(false);
  const userObj = useRecoilValue(userObject);

  useEffect(() => {
    pageLoad();
  }, [router]);
  const pageLoad = async () => {
    const { courseid } = router.query;
    setIsLoading(true);
    const vatResp = await getVatRateByCountry();

    if (!_.isEmpty(userObj)) {
      const clResp = await getUserCartList();
      let _iDiscountAmount = 0;
      if (clResp.status === 200) {
        if (!_.isEmpty(clResp.data.courses)) {
          setcObj(clResp.data.courses);
          if (!_.isEmpty(clResp.data.discounts)) {
            _iDiscountAmount = parseFloat(
              clResp.data.discounts.discount_amount
            );
            setDiscountAmount(
              parseFloat(clResp.data.discounts.discount_amount).toFixed(2)
            );
          }
          let price = 0;
          clResp.data.courses.map((c) => {
            price = price + c.price;
          });
          setcartCount(clResp.data.courses.length);

          if (vatResp.data.data !== null) {
            const { percentage } = vatResp.data.data;
            if (percentage) {
              setCountryTax(percentage);
              const tax = (price * parseFloat(percentage)) / 100;
              const totalWithTax = price + tax;
              setTotalPrice(totalWithTax - _iDiscountAmount);
              setActualPrice(totalWithTax);
            }
          } else {
            setTotalPrice(price - _iDiscountAmount);
            setActualPrice(price);
          }
        } else {
          if (courseid !== undefined) {
            const cData = await getCourseList();
            const courseData = _.filter(cData.data.category, {
              id: parseInt(courseid),
            });

            setcObj(courseData);
            setcartCount(1);
            if (vatResp.data.data !== null) {
              const { percentage } = vatResp.data.data;

              if (percentage) {
                setCountryTax(percentage);
                const tax =
                  (courseData[0].price * parseFloat(percentage)) / 100;
                const totalWithTax = courseData[0].price + tax;
                setTotalPrice(totalWithTax);
                setActualPrice(totalWithTax);
              }
            } else {
              setTotalPrice(courseData[0].price);
              setActualPrice(courseData[0].price);
            }

            setShowAddressForm(false);
            setSelectedBA("");
          }
        }
        const alResp = await getAddressList();
        setAddressList(alResp.data.data);
      }
    } else {
      if (courseid !== undefined) {
        const cData = await getCourseList();
        const courseData = _.filter(cData.data.category, {
          id: parseInt(courseid),
        });

        setcObj(courseData);
        setcartCount(1);

        if (vatResp.data.data !== null) {
          const { percentage } = vatResp.data.data;
          if (percentage) {
            setCountryTax(percentage);
            const tax = (courseData[0].price * parseFloat(percentage)) / 100;
            const totalWithTax = courseData[0].price + tax;
            setTotalPrice(totalWithTax);
            setActualPrice(totalWithTax);
          }
        } else {
          setTotalPrice(courseData[0].price);
          setActualPrice(courseData[0].price);
        }

        setShowAddressForm(true);
        setSelectedBA("");
      }
    }

    await fetchMCBalance();
    if (!_.isEmpty(localStorage.getItem("mctprice"))) {
      setMCTPrice(parseFloat(localStorage.getItem("mctprice")));
    } else {
      await loadMCTPrice();
    }
    setIsLoading(false);
  };

  const fetchMCBalance = async () => {
    if (!_.isEmpty(userObj)) {
      const resp = await getMCWalletBalance();
      if (resp.data.data !== null) {
        setMCWalletBalance(Math.round(resp.data.data.token_balance));
      } else {
        setMCWalletBalance(0);
      }
    }
  };

  const handlePayWithMCWallet = (e) => {
    if (e.target.checked) {
      const availableMCDollars = mcWalletBalance * mctPrice;
      const newPrice = iActualPrice - availableMCDollars;
      if (newPrice <= 0) {
        setselectedPM("");
      }
      setTotalPrice(newPrice < 0 ? 0 : newPrice);
      isSetPayingWithWallet(true);
    } else {
      setTotalPrice(iActualPrice);
      isSetPayingWithWallet(false);
    }
  };
  const loadMCTPrice = async () => {
    const resp = await tokenValue();

    if (resp.status === 200) {
      setMCTPrice(resp.data.data);
    }
  };
  const handleCompleteCheckOut = async (event) => {
    const form = event.currentTarget;

    if (!showAddressForm) {
      if (
        (selectedPM === "paypal" || selectedPM === "stripe") &&
        _.isEmpty(selectedBA)
      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Selecciona o añade una dirección",
        });
        window.scrollTo(0, 0);
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    }
    if (selectedPM === "" && iTotalPrice !== 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Selecciona método de pago",
      });
      window.scrollTo(0, 0);
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (form.checkValidity() === false) {
      window.scrollTo(0, 0);
      setValidated(false);
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      event.preventDefault();
      event.stopPropagation();
      let _fd = {};
      if (_.isEmpty(selectedBA))
        _fd = {
          first_name: event.target.first_name.value,
          last_name: event.target.last_name.value,
          email: _.isEmpty(userObj) ? event.target.email.value : userObj.email,
          phone_number: event.target.phone_number.value,
          address_line_1: event.target.address_line_1.value,
          address_line_2: event.target.address_line_2.value,
          state: event.target.state.value,
          country: event.target.country.value,
        };

      setFormData(_fd);
      if (selectedPM === "mct") {
        mctPaymentV1(cObj);
      } else {
        submitCheckOut(null, null, _fd);
      }
    }
    setValidated(true);
  };

  const submitCheckOut = async (
    transaction_id = null,
    courseIdList = null,
    _fd = null
  ) => {
    setIsLoading(true);
    let _formData = {};
    if (!_.isEmpty(selectedBA)) {
      _formData = {
        first_name: selectedBA.first_name,
        last_name: selectedBA.last_name,
        phone_number: selectedBA.phone_number,
        address_line_1: selectedBA.address_line_1,
        address_line_2: selectedBA.address_line_2,
        state: selectedBA.state,
        country: selectedBA.country,
        zip_code: "",
        isShippingSame: true,
        isSave: false,
      };
    } else {
      _formData = {
        ..._fd,
        zip_code: "",
        isShippingSame: true,
        isSave: true,
      };
    }
    //let courseIdList = [];
    if (_.isEmpty(userObj)) {
      courseIdList = [parseInt(router.query.courseid)];
    }
    const req = {
      ..._formData,
      courseIdList,
      isCoinbase: selectedPM === "crypto" ? true : false,
      isCreditCard: selectedPM === "paypal" ? true : false,
      isMCTToken: selectedPM === "mct" ? true : false,
      isStripe: selectedPM === "stripe" ? true : false,
      isWalletPay: iTotalPrice >= 0 && isPayingWithWallet ? true : false,
      source_url:
        selectedPM === "crypto"
          ? process.env.NEXT_PUBLIC_BASE_URL + "/PaymentStatus/"
          : process.env.NEXT_PUBLIC_BASE_URL + "/PaymentSuccess/",
      cancel_url: process.env.NEXT_PUBLIC_BASE_URL + "/PaymentFailed/",
      transaction_id,
      referalCode: referralCode,
      checkOutWithMc: isPayingWithWallet,
    };
    const resp = await cartCheckout(req);

    if (resp.status === 200) {
      if (selectedPM === "paypal") {
        window.location.href = resp.data.data.redirectUrl;
      } else if (selectedPM === "stripe") {
        window.location.href = resp.data.data.redirectUrl;
      } else if (selectedPM === "crypto") {
        window.location.href = resp.data.data.redirectUrl;
      } else {
        router.push("/PaymentSuccess");
      }
    }
    setIsLoading(false);
  };

  const mctPaymentV1 = async (courses) => {
    try {
      if (window.ethereum.networkVersion != process.env.NEXT_PUBLIC_CHAIN_ID) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please connect to ethereum network",
        });

        return;
      }
      const tokenValue = await coinValue();
      const {
        data: {
          data: { price },
        },
      } = tokenValue;
      let priceInUsd = 0;
      const courseIdList = [];
      courses.forEach((element) => {
        priceInUsd += element.price;
        courseIdList.push(element.id);
      });
      const mctAmount = Number(iTotalPrice / price).toFixed(2);

      const amountHex = `0x${(mctAmount * 1000000000000000000).toString(16)}`;
      setCheckoutInProcess(true);
      const purchase = await tokenContractHelper("transfer", [
        process.env.NEXT_PUBLIC_WALLET_ADDRESS,
        amountHex,
      ]);
      setIsLoading(true);
      const finalPurchase = await purchase.wait();
      setIsLoading(false);
      setCheckoutInProcess(false);
      submitCheckOut(finalPurchase.transactionHash, courseIdList);
    } catch (err) {
      setCheckoutInProcess(false);
      setIsLoading(false);
      console.log("error", err);
      Swal.fire({
        icon: "error",
        title: "Transacción fallida",
        text: "Transacción fallida por el servidor. Por favor inténtelo de nuevo.",
      });
    }
  };
  const submitAddress = async (e) => {
    const resp = await editProfile(e.target);
  };

  const deleteFromCart = async (courseId) => {
    setIsLoading(true);
    const resp = await removeItemFromCart({ courseId });
    if (resp.status === 200) {
      await pageLoad();
    }
    setIsLoading(false);
  };

  const handlePaymentChange = (e) => {
    setselectedPM(e.target.value);
  };
  const onPhoneNoChange = (status, phoneNumber, country, code) => {
    const number = "+" + country.dialCode + phoneNumber;
    setPhoneNumber(number.trim());
  };

  const handleIntlTel = (e) => {};

  const validateReferralDiscount = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { courseid } = router.query;
    const form = event.currentTarget;
    const referral_code = form?.referral_code.value;
    const resp = await checkReferralDiscount({
      referral_code,
      course_id: courseid,
    });

    const { isSuccess, data } = resp.data;
    if (isSuccess) {
      const { discount_percentage, stripe_discount_id } =
        data.referralCodeDetails;
      const discPer = discount_percentage;
      const disPrice = (iActualPrice * discPer) / 100;
      const newPrice = iActualPrice - disPrice;
      setTotalPrice(newPrice);
      setDiscountAmount(disPrice);
      setReferralCode(referral_code);
      Swal.fire({
        icon: "success",
        title: t("error.success"),
        text: "$" + disPrice + " de descuento aplicado con éxito.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: t("error.error"),
        text: "Código de referencia no válido.",
      });
    }
  };

  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Checkout | MundoCrypto" />

      {/* Page header */}
      <PageHeading bg="bg-black" pagetitle={t("checkout.checkout")} />

      {/*  Content */}
      <div className="py-6">
        <Container>
          <LoadingSpinner showLoading={isLoading} />
          <Row>
            <Col
              xl={8}
              lg={8}
              md={12}
              sm={12}
              className={isMobile ? "order-2" : ""}
            >
              {/*  Card */}
              <Card className="mb-4">
                {/*  Card header */}
                <Card.Header className="noBorderCard">
                  <h3 className="mb-0 checkout-Title">
                    {t("checkout.billing_address")}{" "}
                  </h3>
                </Card.Header>
                {/*  Card body */}
                <Card.Body className="noBorderCard">
                  {/*  Form */}
                  <ListGroup variant="flush" className="mb-4">
                    {!isLoading &&
                      addressList &&
                      addressList.map((l, i) => (
                        <ListGroup.Item className="px-0 pt-0 pb-4" key={i}>
                          <Row>
                            <Col>
                              <Form.Check
                                name="group1"
                                type="radio"
                                id={`inline-radio-${i}`}
                              >
                                <Form.Check.Input
                                  type="radio"
                                  name="address"
                                  defaultChecked={
                                    selectedBA.id === l.id ? true : false
                                  }
                                  className="me-1"
                                  onClick={() => setSelectedBA(l)}
                                />
                                <Form.Check.Label>
                                  <span className="h4">
                                    {l.first_name} {l.last_name}
                                  </span>
                                  <span className="d-block">
                                    {l.address_line_1}, {l.address_line_2},{" "}
                                    {l.state}, {l.country}
                                  </span>
                                </Form.Check.Label>
                              </Form.Check>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>

                  {/* Add new address */}
                  {!_.isEmpty(userObj) && (
                    <>
                      <Button
                        className="btn btn-primary mb-5"
                        onClick={() => {
                          setShowAddressForm(!showAddressForm);
                          setSelectedBA("");
                        }}
                      >
                        {t("checkout.add_new_address")}
                      </Button>
                      <br />
                      <span style={{ color: "red" }}>
                        {t("checkout.add_new_address_msg")}
                      </span>
                    </>
                  )}
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleCompleteCheckOut}
                    className="row"
                  >
                    {showAddressForm && (
                      <>
                        {/*  First name  */}
                        <Col md={6} sm={12} className="mb-3">
                          <Form.Group controlId="fname">
                            <Form.Label className="checkout-fm-label">
                              {t("checkout.first_name")}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder={t("checkout.first_name_placeholder")}
                              required
                              name="first_name"
                            />
                          </Form.Group>
                        </Col>
                        {/*  Last name  */}
                        <Col md={6} sm={12} className="mb-3">
                          <Form.Group controlId="lname">
                            <Form.Label className="checkout-fm-label">
                              {t("checkout.last_name")}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder={t("checkout.last_name_placeholder")}
                              required
                              name="last_name"
                            />
                          </Form.Group>
                        </Col>
                        {_.isEmpty(userObj) && (
                          <Col md={6} sm={12} className="mb-3">
                            <Form.Group controlId="lname">
                              <Form.Label className="checkout-fm-label">
                                {t("signin.form.email")}
                              </Form.Label>
                              <Form.Control
                                type="email"
                                placeholder={t(
                                  "signin.form.email_Place_holder"
                                )}
                                required
                                name="email"
                              />
                            </Form.Group>
                          </Col>
                        )}
                        <Col md={6} sm={12} className="mb-3">
                          <Form.Group controlId="phone">
                            <Form.Label className="checkout-fm-label">
                              {t("checkout.phone_no")}{" "}
                            </Form.Label>
                            <IntlTelInput
                              required={false}
                              name="phone"
                              width={100}
                              inputClassName="form-control"
                              preferredCountries={["es", "us", "in"]}
                              defaultCountry="es"
                              useMobileFullscreenDropdown={true}
                              onPhoneNumberChange={onPhoneNoChange}
                              onPhoneNumberBlur={() => {}}
                            />
                            <Form.Control
                              style={{ display: "none" }}
                              type="text"
                              placeholder={t("checkout.phone_no_placeholder")}
                              required
                              value={phoneNumber}
                              name="phone_number"
                            />
                            <Form.Control.Feedback type="invalid">
                              {t("error.phone_required")}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        {/*  Address  */}
                        <Col md={12} sm={12} className="mb-3">
                          <Form.Group controlId="address">
                            <Form.Label className="checkout-fm-label">
                              {t("checkout.address_line_1")}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder={t("checkout.address_line_1")}
                              required
                              name="address_line_1"
                            />
                          </Form.Group>
                        </Col>
                        {/*  Address  */}
                        <Col md={12} sm={12} className="mb-3">
                          <Form.Group controlId="address2">
                            <Form.Label className="checkout-fm-label">
                              {t("checkout.address_line_2")}{" "}
                              <span className="text-muted">
                                {t("checkout.optional")}
                              </span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder={t("checkout.address_line_2")}
                              name="address_line_2"
                            />
                          </Form.Group>
                        </Col>
                        {/*  State */}
                        <Col md={6} sm={12} className="mb-3">
                          <Form.Label className="checkout-fm-label">
                            {t("checkout.state")}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={t("checkout.state_placeholder")}
                            required
                            name="state"
                          />
                        </Col>
                        {/*  Country  */}
                        <Col md={6} sm={12} className="mb-3">
                          <Form.Label className="checkout-fm-label">
                            {t("checkout.country")}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={t("checkout.country_placeholder")}
                            required
                            name="country"
                          />
                        </Col>
                      </>
                    )}
                    <Col md={12} sm={12} className="mt-4 mb-3">
                      {mcWalletBalance !== 0 && (
                        <div className="d-flex align-items-center justify-content-end pt-4 text-dark">
                          <Form.Check
                            size="sm"
                            onChange={handlePayWithMCWallet}
                            name="mcwallet"
                            type={"switch"}
                            id={`sp-mcwallet`}
                          />{" "}
                          <b>
                            {" "}
                            Pay with MC Wallet ($
                            {Math.round(mcWalletBalance * mctPrice)} /{" "}
                            <img
                              src="/images_optimized/mclogo_price_black.svg"
                              width={15}
                            />{" "}
                            {mcWalletBalance}{" "}
                          </b>
                          )
                        </div>
                      )}
                      {iTotalPrice > 0 && (
                        <>
                          <h3 className="mb-0 checkout-Title">
                            {t("checkout.payment_method")}
                          </h3>
                          <Row>
                            <Col>
                              <ListGroup className="my-4 paymentMethods_Card">
                                {false && (
                                  <ListGroup.Item>
                                    <Form.Check
                                      type="radio"
                                      className="ckb_Payments"
                                      name="paymentMethods"
                                      onChange={(e) => handlePaymentChange(e)}
                                      data-category="mct"
                                      value="mct"
                                      id={`pm-1`}
                                      checked={
                                        selectedPM === "mct" ? true : false
                                      }
                                      label={
                                        <Row style={{ marginTop: "-1rem" }}>
                                          <Col md={6} lg={6} sm={12}>
                                            <div className="paymentMethods_txt">
                                              {t("checkout.pay_with_mct")}
                                            </div>
                                          </Col>
                                          <Col
                                            md={6}
                                            lg={6}
                                            sm={12}
                                            className="text-end"
                                          >
                                            <div className="ms-auto  pr-4 divSecuredConnection">
                                              <img
                                                src="/images_optimized/mclogo_price_black.svg"
                                                width={20}
                                                height={20}
                                              />
                                            </div>
                                          </Col>
                                        </Row>
                                      }
                                    />
                                  </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                  <Form.Check
                                    type="radio"
                                    name="paymentMethods"
                                    onChange={(e) => handlePaymentChange(e)}
                                    data-category="crypto"
                                    checked={
                                      selectedPM === "crypto" ? true : false
                                    }
                                    label={
                                      <>
                                        <Row>
                                          <Col md={6} lg={6} sm={12}>
                                            <div className="paymentMethods_txt">
                                              {t("checkout.pay_with_crypto")}
                                            </div>
                                          </Col>
                                          <Col
                                            md={6}
                                            lg={6}
                                            sm={12}
                                            className="text-end"
                                          >
                                            <div className="ms-auto  pr-4 divSecuredConnection">
                                              <img
                                                src="/images_optimized/Crypto.svg"
                                                width={192}
                                                height={24}
                                              />
                                            </div>
                                          </Col>
                                        </Row>
                                        <small>
                                          Pay with BTC, ETH, LTC, DASH, BAT,
                                          DAI, BCH, USDC, USDT or BUSD (BEP20)
                                        </small>
                                      </>
                                    }
                                    value="crypto"
                                    id={`pm-2`}
                                  />
                                </ListGroup.Item>
                                <ListGroup.Item style={{ display: "none" }}>
                                  <Form.Check
                                    type="radio"
                                    name="paymentMethods"
                                    onChange={(e) => handlePaymentChange(e)}
                                    data-category="paypal"
                                    value="paypal"
                                    id={`pm-3`}
                                    label={
                                      <Row>
                                        <Col md={6} lg={6} sm={12}>
                                          <div className="paymentMethods_txt">
                                            {t("checkout.pay_with_paypal")}
                                          </div>
                                        </Col>
                                        <Col
                                          md={6}
                                          lg={6}
                                          sm={12}
                                          className="text-end"
                                        >
                                          <div className="ms-auto  pr-4 divSecuredConnection">
                                            <img
                                              src="/images_optimized/paypal.png"
                                              width={118}
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                    }
                                  />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <Form.Check
                                    type="radio"
                                    className="ckb_Payments"
                                    name="paymentMethods"
                                    onChange={(e) => handlePaymentChange(e)}
                                    data-category="stripe"
                                    checked={
                                      selectedPM === "stripe" ? true : false
                                    }
                                    label={
                                      <Row style={{ marginTop: "-1rem" }}>
                                        <Col md={6} lg={6} sm={12}>
                                          <div className="paymentMethods_txt">
                                            {t("checkout.pay_with_stripe")}
                                          </div>
                                        </Col>

                                        <Col
                                          md={6}
                                          lg={6}
                                          sm={12}
                                          className="text-end"
                                        >
                                          <div className="ms-auto  pr-4 divSecuredConnection">
                                            <img
                                              src="/images_optimized/stripe.png"
                                              width={118}
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                    }
                                    value="stripe"
                                    id={`pm-4`}
                                  />
                                </ListGroup.Item>
                              </ListGroup>
                            </Col>
                          </Row>
                        </>
                      )}
                      <Row className="pt-6">
                        <Col>
                          <div className="d-grid gap-2">
                            <Button
                              disabled={isCheckoutProcessing}
                              type="submit"
                              style={{
                                backgroundColor: "#00629B",
                                color: "#fff",
                              }}
                              className="btn  btn-lg   rounded-0"
                            >
                              {t("checkout.complete_checkout")}
                            </Button>
                          </div>{" "}
                        </Col>
                      </Row>
                    </Col>
                  </Form>
                </Card.Body>
              </Card>
              {/*  Card */}
            </Col>
            <Col lg={4} md={12} sm={12} className={isMobile ? "order-1" : ""}>
              {/*  Card */}
              {!_.isEmpty(cObj) && (
                <Card className="border-0 mb-3">
                  {/*  Card body */}
                  <div className="p-3 ">
                    <div className="mb-6 mt-3">
                      <h1 className="checkout-Summary">
                        Dirección de Facturación
                      </h1>
                    </div>
                    <Row>
                      <Col md={4} sm={12} xs={12}>
                        <img
                          src={cObj[0].signed_url_image_thumbnail}
                          width={isMobile ? 225 : 125}
                        />
                      </Col>
                      <Col
                        md={8}
                        sm={12}
                        xs={12}
                        className={`checkout-totalprice d-flex pt-4 ${
                          isMobile
                            ? "justify-content-start"
                            : "justify-content-end"
                        } `}
                      >
                        {cObj[0].name}
                      </Col>
                    </Row>
                  </div>
                  <hr className="m-0 checkout-hr" />
                  <div className="p-3 ">
                    <div className="mb-2 mt-3">
                      <h1 className="checkout-Summary">Summary</h1>
                    </div>
                    <Row>
                      <Col md={4} xs={6} sm={6} className="checkout-totalprice">
                        Total
                      </Col>
                      <Col
                        md={8}
                        xs={6}
                        sm={6}
                        className="checkout-totalprice d-flex justify-content-end"
                      >
                        {" "}
                        ${Math.round(iTotalPrice)} /
                        <Image
                          className="imgPrice_Coin mx-2"
                          src="/images_optimized/mclogo_price_black.svg"
                          width={20}
                        />
                        {Math.round(iTotalPrice / mctPrice)}
                      </Col>
                    </Row>
                    {countryTax !== 0 && countryTax !== "0.00" && (
                      <div className=" text-primary">
                        {`Incluye +${countryTax}% VAT.`}
                      </div>
                    )}
                  </div>
                  {discountAmount !== 0 && (
                    <div className="d-flex justify-content-center">
                      <Alert variant={"info"}>
                        {`Recibiste un descuento de $${discountAmount}`}
                      </Alert>
                    </div>
                  )}
                  <hr className="m-0" />
                </Card>
              )}
              {!isPayingWithWallet && iTotalPrice === iActualPrice && (
                <Card className="border-0 mb-3 mb-lg-0">
                  {/*  Card body */}
                  <Card.Body>
                    <h3 className="mb-2">{t("checkout.reference_code")}</h3>
                    <Form onSubmit={validateReferralDiscount}>
                      <Form.Group
                        className="input-group"
                        controlId="discountcodes"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("checkout.enter_code")}
                          required
                          name="referral_code"
                        />
                        <Button
                          type="submit"
                          style={{ background: "#00629B" }}
                          id="couponCode"
                        >
                          {t("checkout.apply")}
                        </Button>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default Checkout;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
