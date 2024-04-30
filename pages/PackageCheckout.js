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
  coinValue,
  editProfile,
  getAddressList,
  getMCWalletBalance,
  getPackageDetails,
  removeItemFromCart,
  tokenValue,
} from "../services/nodeapi";

import * as formik from "formik";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as Yup from "yup";
import LoadingSpinner from "../components/bootstrap/loadingspinner";

import { useTranslation } from "react-i18next";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { useRecoilValue } from "recoil";
import { userObject } from "services/states";

const PackageCheckout = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(1); //  1: show yes, 2: show no.

  const radioHandler = (status) => {
    setStatus(status);
  };
  const { Formik } = formik;

  const router = useRouter();
  const userObj = useRecoilValue(userObject);
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
  const [packageDetails, setPackageDetails] = useState([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [iActualPrice, setActualPrice] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mcWalletBalance, setMCWalletBalance] = useState(0);
  const [isPayingWithWallet, isSetPayingWithWallet] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const fullNameRegExp = /^[aA-zZ\s]+$/;

  const schema = Yup.object().shape({
    first_name: Yup.string()
      .required(t("error.fullname_required"))
      .matches(fullNameRegExp, t("error.invalid_firstname")),
    last_name: Yup.string()
      .required(t("error.lastname_required"))
      .matches(fullNameRegExp, t("error.invalid_lastname")),
    phone_number: Yup.string()
      .min(10, t("error.invalid_phone"))
      .max(12, t("error.invalid_phone"))
      .required(t("error.phone_required"))
      .matches(phoneRegExp, t("error.invalid_phone")),
    address_line_1: Yup.string().required(t("error.address_line_1_required")),
    address_line_2: Yup.string().required(t("error.address_line_1_required")),
    state: Yup.string().required(t("error.state_required")),
    country: Yup.string().required(t("error.country_required")),
  });
  useEffect(() => {
    pageLoad();
  }, []);
  const pageLoad = async () => {
    try {
      setIsLoading(true);

      const resp = await getPackageDetails(1);
      let _iDiscountAmount = 0;

      if (resp.status === 200) {
        if (!_.isEmpty(resp.data.data.discountDetails)) {
          _iDiscountAmount = parseFloat(
            resp.data.data.discountDetails.discount_amount
          );
          setDiscountAmount(parseFloat(_iDiscountAmount).toFixed(2));
        }
        setPackageDetails(resp.data.data.packageData);
        setTotalPrice(resp.data.data.packageData.price - _iDiscountAmount);
        setActualPrice(resp.data.data.packageData.price - _iDiscountAmount);
      }
      try {
        if (!_.isEmpty(userObj)) {
          const alResp = await getAddressList();

          setAddressList(alResp.data.data);
          await fetchMCBalance();
        } else {
          setShowAddressForm(true);
        }
        if (!_.isEmpty(localStorage.getItem("mctprice"))) {
          setMCTPrice(parseFloat(localStorage.getItem("mctprice")));
        } else {
          await loadMCTPrice();
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
    }
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
  const handleSubmit = async (event) => {
    setFormData(event);
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
    const req = {
      ..._formData,
      isCoinbase: selectedPM === "crypto" ? true : false,
      isCreditCard: selectedPM === "paypal" ? true : false,
      isMCTToken: selectedPM === "mct" ? true : false,
      isStripe: selectedPM === "stripe" ? true : false,
      isWalletPay: iTotalPrice >= 0 && isPayingWithWallet ? true : false,
      courseIdList,
      source_url:
        selectedPM === "crypto"
          ? process.env.NEXT_PUBLIC_BASE_URL + "/PaymentStatus/"
          : process.env.NEXT_PUBLIC_BASE_URL + "/PaymentSuccess/",
      cancel_url: process.env.NEXT_PUBLIC_BASE_URL + "/PaymentFailed/",
      transaction_id,
      checkOutWithMc: isPayingWithWallet,
      packId: 1,
      isCoursePack: true,
    };
    const resp = await cartCheckout(req);

    console.log("resp----------->", resp);
    if (resp.status === 200) {
      if (selectedPM === "paypal") {
        window.location.href = resp.data.data.redirectUrl;
      } else if (selectedPM === "stripe") {
        window.location.href = resp.data.data.redirectUrl;
      } else if (selectedPM === "crypto") {
        window.location.href = resp.data.data.redirectUrl;
      } else {
        router.push("/PurchaseSuccess");
      }
    }
    setIsLoading(false);
  };

  const mctPaymentV1 = async () => {
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
      let priceInUsd = iTotalPrice;
      const courseIdList = [];
      // courses.forEach((element) => {
      //   priceInUsd += element.price;
      //   courseIdList.push(element.id);
      // });

      const mctAmount = Number(priceInUsd / price).toFixed(2);
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
      submitCheckOut(finalPurchase.transactionHash);
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
    setselectedPM(e.target.attributes["data-category"].value);
  };

  const onPhoneNoChange = (status, phoneNumber, country, code) => {
    const number = "+" + country.dialCode + phoneNumber;
    setPhoneNumber(number.trim());
  };

  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Checkout | MundoCrypto" />

      {/* Page header */}
      <PageHeading pagetitle={t("checkout.checkout")} />

      {/*  Content */}
      <div className="py-6">
        <Container>
          <LoadingSpinner showLoading={isLoading} />
          <Row>
            <Col xl={8} lg={8} md={12} sm={12}>
              {/*  Card */}
              <Card className="mb-4">
                {/*  Card header */}
                <Card.Header>
                  <h3 className="mb-0">{t("checkout.billing_address")} </h3>
                </Card.Header>
                {/*  Card body */}
                <Card.Body>
                  {/*  Form */}
                  <ListGroup variant="flush" className="mb-4">
                    {!isLoading &&
                      addressList &&
                      addressList.map((l, i) => (
                        <>
                          {!_.isEmpty(l.address_line_1) && (
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
                          )}
                        </>
                      ))}
                  </ListGroup>
                  {/* Add new address */}
                  {!_.isEmpty(userObj) && (
                    <Button
                      className="btn btn-primary mb-5"
                      onClick={() => {
                        setShowAddressForm(!showAddressForm);
                        setSelectedBA("");
                      }}
                    >
                      {t("checkout.add_new_address")}
                    </Button>
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
                            <Form.Label>{t("checkout.first_name")}</Form.Label>
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
                            <Form.Label>{t("checkout.last_name")}</Form.Label>
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
                              <Form.Label>{t("signin.form.email")}</Form.Label>
                              <Form.Control
                                type="email"
                                placeholder={t(
                                  "signin.form.email_Place_holder"
                                )}
                                required
                                name="email"
                                value={!_.isEmpty(userObj) ? userObj.email : ""}
                              />
                            </Form.Group>
                          </Col>
                        )}
                        <Col md={6} sm={12} className="mb-3">
                          <Form.Group controlId="phone">
                            <Form.Label>{t("checkout.phone_no")} </Form.Label>
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
                            <Form.Label>
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
                            <Form.Label>
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
                          <Form.Label>{t("checkout.state")}</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={t("checkout.state_placeholder")}
                            required
                            name="state"
                          />
                        </Col>
                        {/*  Country  */}
                        <Col md={6} sm={12} className="mb-3">
                          <Form.Label>{t("checkout.country")}</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={t("checkout.country_placeholder")}
                            required
                            name="country"
                          />
                        </Col>
                      </>
                    )}
                    <Col md={12} sm={12} className="mb-3">
                      <h3 className="mb-0">{t("checkout.payment_method")}</h3>
                      {mcWalletBalance !== 0 && (
                        <div className="d-flex align-items-center justify-content-end pt-4 text-primary">
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
                              src="/images_optimized/coin_blue.png"
                              width={15}
                            />{" "}
                            {mcWalletBalance}{" "}
                          </b>
                          )
                        </div>
                      )}
                      {iTotalPrice > 0 && (
                        <Row>
                          <Col>
                            <ListGroup className="my-4 paymentMethods_Card">
                              <ListGroup.Item>
                                <Form.Check
                                  type="radio"
                                  className="ckb_Payments"
                                  name="paymentMethods"
                                  onChange={(e) => handlePaymentChange(e)}
                                  data-category="mct"
                                  value="mct"
                                  id={`pm-1`}
                                  checked={selectedPM === "mct" ? true : false}
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
                                            src="/images_optimized/coin_blue.png"
                                            width={20}
                                            height={20}
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
                                        Pay with BTC, ETH, LTC, DASH, BAT, DAI,
                                        BCH, USDC, USDT or BUSD (BEP20)
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
                      )}
                      <Row className="pt-6">
                        <Col>
                          <div className="d-grid gap-2">
                            <Button
                              disabled={isCheckoutProcessing}
                              type="submit"
                              className="btn  btn-lg btn_blue  rounded-0"
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
            <Col lg={4} md={12} sm={12}>
              {/*  Card */}
              <Card className="border-0 mb-3">
                {/*  Card body */}
                <div className="p-5 text-center">
                  <div className="mb-5 mt-3">
                    <h1 className="fw-bold">Total</h1>
                    {/* <p className="mb-0 ">
                      Access all{" "}
                      <span className="text-dark fw-medium">
                        premium courses and workshops.
                      </span>
                    </p> */}
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="display-5 fw-bold text-primary">
                      {" "}
                      <span className="mb-0 mx-2 fw-bold text-primary">$</span>
                      {Math.round(iTotalPrice)} /
                      <div className="d-flex justify-content-center align-items-center">
                        <img
                          src="/images_optimized/coin_blue.png"
                          className="imgPrice_Coin mx-2"
                          width="20"
                          height="20"
                        />

                        <div className="display-4 fw-bold fs-3 text-primary">
                          {" "}
                          {Math.round(iTotalPrice / mctPrice)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {discountAmount !== 0 && (
                  <div className="d-flex justify-content-center">
                    <Alert variant={"info"}>
                      {`You recieved a discount of $${discountAmount}`}
                    </Alert>
                  </div>
                )}

                <hr className="m-0" />
                {/* <div className="p-5">
                  <h4 className="fw-bold mb-4">
                    Everything in Starter, plus:{" "}
                  </h4>
                  <ListGroup as="ul" className="mb-0" bsPrefix="list-unstyled">
                    <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                      <span className="text-success me-1">
                        <i className="far fa-check-circle"></i>
                      </span>
                      <span>Offline viewing </span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                      <span className="text-success me-1">
                        <i className="far fa-check-circle"></i>
                      </span>
                      <span>
                        <span className="fw-bold text-dark">Offline </span>
                        projects{" "}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                      <span className="text-success me-1">
                        <i className="far fa-check-circle"></i>
                      </span>
                      <span>
                        <span className="fw-bold text-dark">Unlimited </span>
                        storage
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                      <span className="text-success me-1">
                        <i className="far fa-check-circle"></i>
                      </span>
                      <span>Custom domain support </span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                      <span className="text-success me-1">
                        <i className="far fa-check-circle"></i>
                      </span>
                      <span>Bulk editing </span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="mb-1" bsPrefix=" ">
                      <span className="text-success me-1">
                        <i className="far fa-check-circle"></i>
                      </span>
                      <span>12 / 5 support</span>
                    </ListGroup.Item>
                  </ListGroup>
                </div> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default PackageCheckout;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
