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
import i18 from "../../../next-i18next.config";

// import widget/custom components
import Swal from "sweetalert2";
import { GeeksSEO, PageHeading } from "widgets";
import { tokenContractHelper } from "../../../helper/contract.helper";
import {
  coinValue,
  editProfile,
  getAddressList,
  getMCWalletBalance,
  nftCheckout,
  removeItemFromCart,
  tokenValue,
} from "../../../services/nodeapi";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LoadingSpinner from "../../../components/bootstrap/loadingspinner";

import { useTranslation } from "react-i18next";
import "react-intl-tel-input/dist/main.css";
const NFTCheckout = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(1); //  1: show yes, 2: show no.

  const radioHandler = (status) => {
    setStatus(status);
  };
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [cObj, setcObj] = useState([]);
  const [cartCount, setcartCount] = useState(0);
  const [validated, setValidated] = useState(false);
  const [selectedPM, setselectedPM] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [iTotalPrice, setTotalPrice] = useState(50);
  const [addressList, setAddressList] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedBA, setSelectedBA] = useState({});
  const [isCheckoutProcessing, setCheckoutInProcess] = useState(false);
  const [mctPrice, setMCTPrice] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [iActualPrice, setActualPrice] = useState(0);

  const [mcWalletBalance, setMCWalletBalance] = useState(0);

  const [isPayingWithWallet, isSetPayingWithWallet] = useState(false);

  useEffect(() => {
    if (router.query.id) {
      pageLoad();
    }
  }, [router]);
  const pageLoad = async () => {
    setIsLoading(true);

    setTotalPrice(50);
    setActualPrice(50);
    await fetchMCBalance();
    const alResp = await getAddressList();

    setAddressList(alResp.data.data);

    if (!_.isEmpty(localStorage.getItem("mctprice"))) {
      setMCTPrice(parseFloat(localStorage.getItem("mctprice")));
    } else {
      await loadMCTPrice();
    }
    setIsLoading(false);
  };

  const fetchMCBalance = async () => {
    const resp = await getMCWalletBalance();
    if (resp.data.data !== null) {
      setMCWalletBalance(Math.round(resp.data.data.token_balance));
    } else {
      setMCWalletBalance(0);
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
        address_id: selectedBA.id,
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
          : process.env.NEXT_PUBLIC_BASE_URL + "/PaymentSuccess?paymentfor=nft",
      cancel_url:
        process.env.NEXT_PUBLIC_BASE_URL +
        "/PaymentFailed?paymentfor=nft&courseid=" +
        router.query.id,
      transaction_id,
      checkOutWithMc: isPayingWithWallet,
      course_id: router.query.id,
    };
    const resp = await nftCheckout(req);

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

  const handleIntlTel = (e) => {};
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
                  <Button
                    className="btn btn-primary mb-5"
                    onClick={() => {
                      setShowAddressForm(!showAddressForm);
                      setSelectedBA("");
                    }}
                  >
                    {t("checkout.add_new_address")}
                  </Button>
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
                        <Col md={12} sm={12} className="mb-3">
                          <Form.Group controlId="phone">
                            <Form.Label>{t("checkout.phone_no")} </Form.Label>
                            <Form.Control
                              type="number"
                              placeholder={t("checkout.phone_no_placeholder")}
                              required
                              name="phone_number"
                            />
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
                        <Col md={4} sm={12} className="mb-3">
                          <Form.Label>{t("checkout.state")}</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={t("checkout.state_placeholder")}
                            required
                            name="state"
                          />
                        </Col>
                        {/*  Country  */}
                        <Col md={4} sm={12} className="mb-3">
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
                <div className="p-5 text-center">
                  <div className="mb-5 mt-3">
                    <h1 className="fw-bold">Total</h1>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="display-5 fw-bold text-primary">
                      {" "}
                      <div className="d-flex justify-content-center align-items-center">
                        $ {Math.round(iTotalPrice)} /
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
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default NFTCheckout;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
