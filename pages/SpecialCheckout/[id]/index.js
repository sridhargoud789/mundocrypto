import _ from "lodash";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Badge,
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
  addToCart,
  cartCheckout,
  checkMCTDiscount,
  checkReferralDiscount,
  coinValue,
  editProfile,
  getAddressList,
  getCourseDetails,
  getMCWalletBalance,
  getMyCourses,
  getVatRateByCountry,
  removeItemFromCart,
  specialpartialCheckout,
  tokenValue,
} from "../../../services/nodeapi";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LoadingSpinner from "../../../components/bootstrap/loadingspinner";

import { ethers } from "ethers";
import moment from "moment";
import { useTranslation } from "react-i18next";

import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { useRecoilValue } from "recoil";
import { decryptv1, encrypt, encryptv1 } from "services/crpyto";
import { userObject } from "services/states";

const Checkout = () => {
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
  const [iTotalPrice, setTotalPrice] = useState(0);
  const [iActualPrice, setActualPrice] = useState(0);
  const userObj = useRecoilValue(userObject);
  const [addressList, setAddressList] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedBA, setSelectedBA] = useState({});
  const [isCheckoutProcessing, setCheckoutInProcess] = useState(false);
  const [mctPrice, setMCTPrice] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [courseId, setcourseId] = useState(0);
  const [cdOBJ, setcdOBJ] = useState({});
  const [myCourse, setMyCourse] = useState([]);
  const [isRenewal, setIsRenewal] = useState(false);
  const [purchaseData, setPurchaseData] = useState({});
  const [selctedSplitBy, setSelctedSplitBy] = useState(1);
  const [split_payment_amounts_obj, setsplit_payment_amounts_obj] = useState(
    []
  );
  const [referralCode, setReferralCode] = useState("");
  const [walletConnected, isWalletConnected] = useState(false);
  const [walletText, setWalletText] = useState(t("header.connectToWallet"));
  const [walletAddress, setWalletAddress] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mcWalletBalance, setMCWalletBalance] = useState(0);
  const [isSpecialCode, setIsSpecialCode] = useState(false);
  const [isSpecialCode2, setIsSpecialCode2] = useState(false);
  const [isSpecialCode3, setIsSpecialCode3] = useState(false);

  const [isSpecialCode4, setIsSpecialCode4] = useState(false);

  const [isSpecialCode5, setIsSpecialCode5] = useState(false);
  const [isSpecialCode6, setIsSpecialCode6] = useState(false);
  const [isSpecialCode7, setIsSpecialCode7] = useState(false);
  const [isSpecialCode8, setIsSpecialCode8] = useState(false);
  const [isSpecialCode9, setIsSpecialCode9] = useState(false);
  const [isSpecialCode10, setIsSpecialCode10] = useState(false);
  const [isSpecialCode11, setIsSpecialCode11] = useState(false);
  const [isSpecialCode12, setIsSpecialCode12] = useState(false);

  const [isPayingWithWallet, isSetPayingWithWallet] = useState(false);
  const [ipartialTime, setpartialTime] = useState(0);

  const [isales_agent, setisales_agent] = useState(0);
  const [countryTax, setCountryTax] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length === 0) {
              isWalletConnected(false);
              setWalletAddress(null);
              setWalletText(t("header.connectToWallet"));
            }
          });
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          isWalletConnected(true);
          setWalletAddress(address);
        }
      } catch (err) {
        console.log("err", err);
      }
    })();
  }, [walletConnected]);

  useEffect(() => {
    if (router.query.id) {
      setcourseId(router.query.id);
      pageLoad(router.query.id);
    } else {
      router.pushState("/");
    }
  }, [router]);
  const pageLoad = async (_courseId) => {
    setIsLoading(true);
    const enc = encrypt;

    const encv1 = encryptv1;

    const decv1 = decryptv1;

    const sales_agent = router.query.sales_agent;

    if (sales_agent !== undefined) {
      const _isales_agent = decv1(sales_agent);
      setisales_agent(parseInt(_isales_agent));
    }
    const code = router.query.code;
    if (code !== undefined) {
      if (code === "U2FsdGVkX1/2IJoeuMrvXWtfNFuhYuVCAM/02bq19dk=") {
        // U2FsdGVkX1%2F2IJoeuMrvXWtfNFuhYuVCAM%2F02bq19dk%3D
        setIsSpecialCode(true);
      } else if (code === "U2FsdGVkX1/aTM4sCjv95QpjeZseYwD+mkZwGR8j0/s=") {
        // U2FsdGVkX1%2FaTM4sCjv95QpjeZseYwD%2BmkZwGR8j0%2Fs%3D
        setIsSpecialCode2(true);
      } else if (code === "U2FsdGVkX1+wyKLZcKByIR+z4YCckSZ20NZk+NsVj9U=") {
        // U2FsdGVkX1%2BwyKLZcKByIR%2Bz4YCckSZ20NZk%2BNsVj9U%3D
        setIsSpecialCode3(true);
      } else if (code === "U2FsdGVkX1+VsmWVW5n2JHCbWhDhKGVVkwrDfSAkXAg=") {
        // U2FsdGVkX1%2BVsmWVW5n2JHCbWhDhKGVVkwrDfSAkXAg%3D
        setIsSpecialCode4(true);
      } else if (code === "U2FsdGVkX1/zXyg8HLWqypYk2gh3fD21iLKX1UDn4YA=") {
        // U2FsdGVkX1%2FzXyg8HLWqypYk2gh3fD21iLKX1UDn4YA%3D
        setIsSpecialCode5(true);
      } else if (code === "U2FsdGVkX19LEtDIzlZW7060HY7j3Uor8z/hdvsipzw=") {
        // U2FsdGVkX19LEtDIzlZW7060HY7j3Uor8z%2Fhdvsipzw%3D
        setIsSpecialCode6(true);
      } else if (code === "U2FsdGVkX19UuQkBD40EZmFiCTHcBzPNH8gthq2Olgw=") {
        // U2FsdGVkX19UuQkBD40EZmFiCTHcBzPNH8gthq2Olgw%3D
        setIsSpecialCode7(true);
      } else if (code === "U2FsdGVkX1+PS/mea+Eto/ytM9ELdKLpriw2Bv/gLkU=") {
        // U2FsdGVkX1%2BPS%2Fmea%2BEto%2FytM9ELdKLpriw2Bv%2FgLkU%3D
        setIsSpecialCode8(true);
      } else if (code === "U2FsdGVkX18+c2aO+UecsS081IbxeTu3cRC74fhHuMo=") {
        // U2FsdGVkX18%2Bc2aO%2BUecsS081IbxeTu3cRC74fhHuMo%3D
        setIsSpecialCode9(true);
      } else if (code === "U2FsdGVkX19+oo9s9I0gObJSf0eMmfplTKH6aQPBle4=") {
        // U2FsdGVkX19%2Boo9s9I0gObJSf0eMmfplTKH6aQPBle4%3D
        setIsSpecialCode10(true);
      } else if (code === "U2FsdGVkX18EMAnR9jIf8KiRZHwW0bGaGA+F0QEkETs=") {
        // U2FsdGVkX18EMAnR9jIf8KiRZHwW0bGaGA%2BF0QEkETs%3D
        setIsSpecialCode11(true);
      } else if (code === "U2FsdGVkX1/31oKopE/WPH4lgfxmh0N/7KdOY5KtfsA=") {
        // U2FsdGVkX1%2F31oKopE%2FWPH4lgfxmh0N%2F7KdOY5KtfsA%3D
        setIsSpecialCode12(true);
      }
    }
    const cdresp = await getCourseDetails(_courseId);
    if (cdresp.status === 200) {
      const { price } = cdresp.data.courseData;
      setcdOBJ(cdresp.data.courseData);
      const objPayment = JSON.parse(
        cdresp.data.courseData.split_payment_amounts
      );
      const vatResp = await getVatRateByCountry();

      if (vatResp.data.data !== null) {
        const { percentage } = vatResp.data.data;
        if (percentage) {
          setCountryTax(percentage);
          const tax = (price * parseFloat(percentage)) / 100;
          const totalWithTax = price + tax;
          setTotalPrice(totalWithTax);
          setActualPrice(totalWithTax);
        }
      } else {
        setTotalPrice(price);
        setActualPrice(price);
      }
      setsplit_payment_amounts_obj(objPayment);
    }

    if (!_.isEmpty(userObj)) {
      try {
        const mc = await getMyCourses();
        if (mc.status === 200) {
          const d = mc.data.list;

          d.map((c) => {
            if (c.course_id === parseInt(router.query.id)) {
              const {
                is_partial_payment,
                remian_payments,
                next_payment_date,
                each_payment_amount,
              } = c.purchaseData;
              if (is_partial_payment === 1 && remian_payments > 0) {
                setIsRenewal(true);
                setTotalPrice(each_payment_amount);
                setActualPrice(each_payment_amount);
                setPurchaseData(c.purchaseData);
              }
            }
          });
        } else {
          setIsLoading(false);
        }

        const alResp = await getAddressList();

        setAddressList(alResp.data.data);
        await fetchMCBalance();
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      setShowAddressForm(true);
      setSelectedBA("");
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
  const handleCompleteCheckOut = async (event) => {
    const form = event.currentTarget;

    if (!showAddressForm) {
      if (
        (selectedPM === "mcwallet" ||
          selectedPM === "crypto" ||
          selectedPM === "stripe") &&
        _.isEmpty(selectedBA)
      ) {
        Swal.fire({
          icon: "error",
          title: t("error.error"),
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
        title: t("error.error"),
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
    if (_.isEmpty(userObj)) {
      courseIdList = [parseInt(courseId)];
    }
    const req = {
      ..._formData,
      course_id: courseId,
      partialTime: isRenewal ? purchaseData.payment_devied_in : ipartialTime,
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
      purchsedId: isRenewal ? purchaseData.id : null,
      referalCode: referralCode,
      checkOutWithMc: isPayingWithWallet,
      purchase_amount_usd: iTotalPrice,
      sales_agent: isales_agent,
    };

    if (selctedSplitBy === 1 && !_.isEmpty(userObj)) {
      const addToCartresp = await addToCart({ courseId });
    }

    const resp = isRenewal
      ? await specialpartialCheckout(req)
      : selctedSplitBy === 1
      ? await cartCheckout(req)
      : await specialpartialCheckout(req);

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
          title: t("error.error"),
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

  const handlePaymentChange = async (e) => {
    setselectedPM(e.target.value);
    if (e.target.value === "stripe") {
      const tax = (iTotalPrice * 5) / 100;
      const totalWithTax = iTotalPrice + tax;
      //setTotalPrice(Math.round(totalWithTax));
      setDiscountAmount(0);
      setReferralCode("");
    } else {
      if (!isPayingWithWallet) {
        setTotalPrice(iActualPrice);
        setDiscountAmount(0);
        setReferralCode("");
      }
    }
  };

  const fetchMCBalance = async () => {
    const resp = await getMCWalletBalance();
    if (resp.data.data !== null) {
      setMCWalletBalance(Math.round(resp.data.data.token_balance));
    } else {
      setMCWalletBalance(0);
    }
  };
  const handleSplitChange = (i, e) => {
    setselectedPM("");
    setpartialTime(i);
    setSelctedSplitBy(e);
    const price =
      e.original_price === undefined
        ? e.emi[0].original_price
        : e.original_price;
    setTotalPrice(price);
    setDiscountAmount(0);
    setReferralCode("");
  };

  const handlePayWithMCWallet = (e) => {
    setselectedPM("");
    if (e.target.checked) {
      const maxDisDollars = 288;
      const maxDisMCT = 288 / mctPrice;
      const availableMCDollars = mcWalletBalance * mctPrice;
      const newPrice = iActualPrice - maxDisDollars;
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

  const validateMCTDiscount = async () => {
    const resp = await checkMCTDiscount();
    const { data } = resp.data;
    if (data.isMCTDiscountAvailable) {
      const discPer = data.discount_percentage;
      const disPrice = (iActualPrice * discPer) / 100;
      const newPrice = iActualPrice - disPrice;
      setTotalPrice(newPrice);
      setDiscountAmount(disPrice);
      Swal.fire({
        icon: "success",
        title: t("error.success"),
        text: "25% de descuento aplicado con éxito.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: t("error.error"),
        text: "No elegible para descuento.",
      });
    }
  };

  const validateReferralDiscount = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    const referral_code = form?.referral_code.value;
    const resp = await checkReferralDiscount({
      referral_code,
      course_id: courseId,
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

  const onPhoneNoChange = (status, phoneNumber, country, code) => {
    const number = "+" + country.dialCode + phoneNumber;
    setPhoneNumber(number.trim());
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
            <Col xl={8} lg={8} md={12} sm={12}>
              {/*  Card */}
              <Card className="mb-4  bg-white">
                {/*  Card header */}
                <Card.Header className="noBorderCard bg-white">
                  <h3 className="mb-0">{t("checkout.billing_address")} </h3>
                </Card.Header>
                {/*  Card body */}
                <Card.Body className=" bg-white">
                  {/*  Form */}
                  <ListGroup variant="flush" className="mb-4 bg-white">
                    {!isLoading &&
                      addressList &&
                      addressList.map(
                        (l, i) =>
                          !_.isEmpty(l.first_name) &&
                          !_.isEmpty(l.address_line_1) && (
                            <ListGroup.Item
                              className="px-0 pt-0 pb-4 bg-white"
                              key={i}
                            >
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
                          )
                      )}
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
                    {!isRenewal && courseId === "55" && (
                      <Col md={12} sm={12} className="mb-3">
                        <h3 className="mb-0">{t("checkout.pay_now_later")}</h3>

                        {!isPayingWithWallet &&
                          !_.isEmpty(split_payment_amounts_obj) && (
                            <Row>
                              <Col>
                                <ListGroup className="my-4 paymentMethods_Card">
                                  {!isSpecialCode &&
                                    !isSpecialCode2 &&
                                    !isSpecialCode3 &&
                                    !isSpecialCode4 &&
                                    !isSpecialCode5 &&
                                    !isSpecialCode6 &&
                                    !isSpecialCode7 &&
                                    !isSpecialCode8 &&
                                    !isSpecialCode9 &&
                                    !isSpecialCode10 &&
                                    !isSpecialCode11 &&
                                    !isSpecialCode12 && (
                                      <>
                                        {" "}
                                        <ListGroup.Item>
                                          <Form.Check
                                            onChange={() =>
                                              handleSplitChange(
                                                0,
                                                split_payment_amounts_obj[0]
                                              )
                                            }
                                            label={
                                              <Row
                                                style={{ marginTop: "-1rem" }}
                                              >
                                                <Col md={6} lg={6} sm={12}>
                                                  <div className="splitPayment_txt">
                                                    {t("checkout.pay_now")}
                                                  </div>
                                                  <span className="muted text-primary">
                                                    <b>
                                                      Total: $
                                                      {!_.isEmpty(
                                                        split_payment_amounts_obj
                                                      ) &&
                                                        split_payment_amounts_obj[0]
                                                          .total_price}
                                                    </b>
                                                  </span>
                                                </Col>
                                                <Col
                                                  md={6}
                                                  lg={6}
                                                  sm={12}
                                                  className="text-end"
                                                >
                                                  <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                                    <b>
                                                      $
                                                      {parseFloat(
                                                        split_payment_amounts_obj[0]
                                                          .total_price -
                                                          discountAmount
                                                      ).toFixed(2)}{" "}
                                                    </b>
                                                  </div>
                                                </Col>
                                              </Row>
                                            }
                                            name="splitPayment"
                                            value="0"
                                            type={"radio"}
                                            id={`sp-1`}
                                            defaultChecked
                                          />
                                        </ListGroup.Item>
                                      </>
                                    )}
                                  {isSpecialCode && (
                                    <ListGroup.Item>
                                      <Form.Check
                                        onChange={() =>
                                          handleSplitChange(
                                            1,
                                            split_payment_amounts_obj[1]
                                          )
                                        }
                                        label={
                                          <Row style={{ marginTop: "-1rem" }}>
                                            <Col md={6} lg={6} sm={12}>
                                              <div className="splitPayment_txt">
                                                {t("checkout.split_by_2")}
                                              </div>

                                              <span className="muted text-primary">
                                                <b>
                                                  Total: $
                                                  {split_payment_amounts_obj[1]
                                                    .original_price * 2}
                                                </b>
                                              </span>
                                            </Col>
                                            <Col
                                              md={6}
                                              lg={6}
                                              sm={12}
                                              className="text-end"
                                            >
                                              <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                                <b>
                                                  {" "}
                                                  $
                                                  {parseFloat(
                                                    split_payment_amounts_obj[1]
                                                      .original_price
                                                  ).toFixed(2)}{" "}
                                                </b>
                                              </div>
                                            </Col>
                                          </Row>
                                        }
                                        name="splitPayment"
                                        value="1"
                                        type={"radio"}
                                        id={`sp-2`}
                                      />
                                    </ListGroup.Item>
                                  )}
                                  {isSpecialCode2 && (
                                    <>
                                      <ListGroup.Item>
                                        <Form.Check
                                          onChange={() =>
                                            handleSplitChange(
                                              2,
                                              split_payment_amounts_obj[2]
                                            )
                                          }
                                          label={
                                            <Row style={{ marginTop: "-1rem" }}>
                                              <Col md={6} lg={6} sm={12}>
                                                <div className="splitPayment_txt">
                                                  {t("checkout.split_by_3")}
                                                </div>

                                                <span className="muted text-primary">
                                                  <b>
                                                    Total: $
                                                    {split_payment_amounts_obj[2]
                                                      .original_price * 3}
                                                  </b>
                                                </span>
                                              </Col>
                                              <Col
                                                md={6}
                                                lg={6}
                                                sm={12}
                                                className="text-end"
                                              >
                                                <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                                  <b>
                                                    $
                                                    {parseFloat(
                                                      split_payment_amounts_obj[2]
                                                        .original_price
                                                    ).toFixed(2)}{" "}
                                                  </b>{" "}
                                                </div>
                                              </Col>
                                            </Row>
                                          }
                                          name="splitPayment"
                                          value="2"
                                          type={"radio"}
                                          id={`sp-3`}
                                        />
                                      </ListGroup.Item>
                                      <ListGroup.Item>
                                        <Form.Check
                                          onChange={() =>
                                            handleSplitChange(
                                              3,
                                              split_payment_amounts_obj[3]
                                            )
                                          }
                                          label={
                                            <Row style={{ marginTop: "-1rem" }}>
                                              <Col md={6} lg={6} sm={12}>
                                                <div className="splitPayment_txt">
                                                  {t("checkout.split_by_4")}
                                                  <br />
                                                  <small>
                                                    Pay now $
                                                    {
                                                      split_payment_amounts_obj[3]
                                                        .emi[0].original_price
                                                    }{" "}
                                                    and remaining in $
                                                    {
                                                      split_payment_amounts_obj[3]
                                                        .emi[1].original_price
                                                    }{" "}
                                                    X 3
                                                  </small>
                                                </div>

                                                <span className="muted text-primary">
                                                  <b>
                                                    Total: $
                                                    {
                                                      split_payment_amounts_obj[3]
                                                        .total_price
                                                    }
                                                  </b>
                                                </span>
                                              </Col>
                                              <Col
                                                md={6}
                                                lg={6}
                                                sm={12}
                                                className="text-end"
                                              >
                                                <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                                  <b>
                                                    $
                                                    {parseFloat(
                                                      split_payment_amounts_obj[3]
                                                        .emi[0].original_price
                                                    ).toFixed(2)}{" "}
                                                  </b>{" "}
                                                </div>
                                              </Col>
                                            </Row>
                                          }
                                          name="splitPayment"
                                          value="3"
                                          type={"radio"}
                                          id={`sp-4`}
                                        />
                                      </ListGroup.Item>
                                    </>
                                  )}
                                  {isSpecialCode3 && (
                                    <>
                                      {" "}
                                      <ListGroup.Item>
                                        <Form.Check
                                          onChange={() =>
                                            handleSplitChange(
                                              4,
                                              split_payment_amounts_obj[4]
                                            )
                                          }
                                          label={
                                            <Row style={{ marginTop: "-1rem" }}>
                                              <Col md={6} lg={6} sm={12}>
                                                <div className="splitPayment_txt">
                                                  {t("checkout.split_by_3")}
                                                </div>

                                                <span className="muted text-primary">
                                                  <b>
                                                    Total: $
                                                    {
                                                      split_payment_amounts_obj[4]
                                                        .total_price
                                                    }
                                                  </b>
                                                </span>
                                              </Col>
                                              <Col
                                                md={6}
                                                lg={6}
                                                sm={12}
                                                className="text-end"
                                              >
                                                <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                                  <b>
                                                    $
                                                    {parseFloat(
                                                      split_payment_amounts_obj[4]
                                                        .original_price
                                                    ).toFixed(2)}{" "}
                                                  </b>{" "}
                                                </div>
                                              </Col>
                                            </Row>
                                          }
                                          name="splitPayment"
                                          value="4"
                                          type={"radio"}
                                          id={`sp-5`}
                                        />
                                      </ListGroup.Item>
                                    </>
                                  )}
                                  {isSpecialCode4 && (
                                    <>
                                      <ListGroup.Item>
                                        <Form.Check
                                          onChange={() =>
                                            handleSplitChange(
                                              7,
                                              split_payment_amounts_obj[7]
                                            )
                                          }
                                          label={
                                            <Row style={{ marginTop: "-1rem" }}>
                                              <Col md={6} lg={6} sm={12}>
                                                <div className="splitPayment_txt">
                                                  {t("checkout.split_by_3")}
                                                  <br />
                                                  <small>
                                                    Pay now $
                                                    {
                                                      split_payment_amounts_obj[7]
                                                        .emi[0].original_price
                                                    }{" "}
                                                    and remaining in $
                                                    {
                                                      split_payment_amounts_obj[7]
                                                        .emi[1].original_price
                                                    }{" "}
                                                    X 3
                                                  </small>
                                                </div>

                                                <span className="muted text-primary">
                                                  <b>
                                                    Total: $
                                                    {
                                                      split_payment_amounts_obj[7]
                                                        .total_price
                                                    }
                                                  </b>
                                                </span>
                                              </Col>
                                              <Col
                                                md={6}
                                                lg={6}
                                                sm={12}
                                                className="text-end"
                                              >
                                                <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                                  <b>
                                                    $
                                                    {parseFloat(
                                                      split_payment_amounts_obj[7]
                                                        .emi[0].original_price
                                                    ).toFixed(2)}{" "}
                                                  </b>{" "}
                                                </div>
                                              </Col>
                                            </Row>
                                          }
                                          name="splitPayment"
                                          value="7"
                                          type={"radio"}
                                          id={`sp-7`}
                                        />
                                      </ListGroup.Item>
                                    </>
                                  )}
                                  {isSpecialCode5 && (
                                    <>
                                      <ListGroup.Item>
                                        <Form.Check
                                          onChange={() =>
                                            handleSplitChange(
                                              8,
                                              split_payment_amounts_obj[8]
                                            )
                                          }
                                          label={
                                            <Row style={{ marginTop: "-1rem" }}>
                                              <Col md={6} lg={6} sm={12}>
                                                <div className="splitPayment_txt">
                                                  {t("checkout.split_by_3")}
                                                  <br />
                                                  <small>
                                                    Pay now $
                                                    {
                                                      split_payment_amounts_obj[8]
                                                        .emi[0].original_price
                                                    }{" "}
                                                    and remaining in $
                                                    {
                                                      split_payment_amounts_obj[8]
                                                        .emi[1].original_price
                                                    }{" "}
                                                    X 2
                                                  </small>
                                                </div>

                                                <span className="muted text-primary">
                                                  <b>
                                                    Total: $
                                                    {
                                                      split_payment_amounts_obj[8]
                                                        .total_price
                                                    }
                                                  </b>
                                                </span>
                                              </Col>
                                              <Col
                                                md={6}
                                                lg={6}
                                                sm={12}
                                                className="text-end"
                                              >
                                                <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                                  <b>
                                                    $
                                                    {parseFloat(
                                                      split_payment_amounts_obj[8]
                                                        .emi[0].original_price
                                                    ).toFixed(2)}{" "}
                                                  </b>{" "}
                                                </div>
                                              </Col>
                                            </Row>
                                          }
                                          name="splitPayment"
                                          value="8"
                                          type={"radio"}
                                          id={`sp-8`}
                                        />
                                      </ListGroup.Item>
                                    </>
                                  )}
                                  {isSpecialCode6 && (
                                    <>
                                      <ListGroup.Item>
                                        <Form.Check
                                          onChange={() =>
                                            handleSplitChange(
                                              9,
                                              split_payment_amounts_obj[9]
                                            )
                                          }
                                          label={
                                            <Row style={{ marginTop: "-1rem" }}>
                                              <Col md={6} lg={6} sm={12}>
                                                <div className="splitPayment_txt">
                                                  {t("checkout.split_by_3")}
                                                  <br />
                                                  <small>
                                                    Pay now $
                                                    {
                                                      split_payment_amounts_obj[9]
                                                        .emi[0].original_price
                                                    }{" "}
                                                    and remaining in $
                                                    {
                                                      split_payment_amounts_obj[9]
                                                        .emi[1].original_price
                                                    }{" "}
                                                    X 3
                                                  </small>
                                                </div>

                                                <span className="muted text-primary">
                                                  <b>
                                                    Total: $
                                                    {
                                                      split_payment_amounts_obj[9]
                                                        .total_price
                                                    }
                                                  </b>
                                                </span>
                                              </Col>
                                              <Col
                                                md={6}
                                                lg={6}
                                                sm={12}
                                                className="text-end"
                                              >
                                                <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                                  <b>
                                                    $
                                                    {parseFloat(
                                                      split_payment_amounts_obj[9]
                                                        .emi[0].original_price
                                                    ).toFixed(2)}{" "}
                                                  </b>{" "}
                                                </div>
                                              </Col>
                                            </Row>
                                          }
                                          name="splitPayment"
                                          value="9"
                                          type={"radio"}
                                          id={`sp-9`}
                                        />
                                      </ListGroup.Item>
                                    </>
                                  )}
                                  {isSpecialCode7 && (
                                    <ListGroup.Item>
                                      <Form.Check
                                        onChange={() =>
                                          handleSplitChange(
                                            10,
                                            split_payment_amounts_obj[10]
                                          )
                                        }
                                        label={
                                          <Row style={{ marginTop: "-1rem" }}>
                                            <Col md={6} lg={6} sm={12}>
                                              <div className="splitPayment_txt">
                                                {t("checkout.split_by_2")}
                                              </div>

                                              <span className="muted text-primary">
                                                <b>
                                                  Total: $
                                                  {split_payment_amounts_obj[10]
                                                    .original_price * 2}
                                                </b>
                                              </span>
                                            </Col>
                                            <Col
                                              md={6}
                                              lg={6}
                                              sm={12}
                                              className="text-end"
                                            >
                                              <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                                <b>
                                                  {" "}
                                                  $
                                                  {parseFloat(
                                                    split_payment_amounts_obj[10]
                                                      .original_price
                                                  ).toFixed(2)}{" "}
                                                </b>
                                              </div>
                                            </Col>
                                          </Row>
                                        }
                                        name="splitPayment"
                                        value="10"
                                        type={"radio"}
                                        id={`sp-10`}
                                      />
                                    </ListGroup.Item>
                                  )}
                                  {isSpecialCode8 && (
                                    <>
                                      {" "}
                                      <ListGroup.Item>
                                        <Form.Check
                                          onChange={() =>
                                            handleSplitChange(
                                              11,
                                              split_payment_amounts_obj[11]
                                            )
                                          }
                                          label={
                                            <Row style={{ marginTop: "-1rem" }}>
                                              <Col md={6} lg={6} sm={12}>
                                                <div className="splitPayment_txt">
                                                  {t("checkout.pay_now")}
                                                </div>
                                                <span className="muted text-primary">
                                                  <b>
                                                    Total: $
                                                    {!_.isEmpty(
                                                      split_payment_amounts_obj
                                                    ) &&
                                                      split_payment_amounts_obj[11]
                                                        .total_price}
                                                  </b>
                                                </span>
                                              </Col>
                                              <Col
                                                md={6}
                                                lg={6}
                                                sm={12}
                                                className="text-end"
                                              >
                                                <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                                  <b>
                                                    $
                                                    {parseFloat(
                                                      split_payment_amounts_obj[11]
                                                        .total_price -
                                                        discountAmount
                                                    ).toFixed(2)}{" "}
                                                  </b>
                                                </div>
                                              </Col>
                                            </Row>
                                          }
                                          name="splitPayment"
                                          value="11"
                                          type={"radio"}
                                          id={`sp-11`}
                                        />
                                      </ListGroup.Item>
                                    </>
                                  )}
                                  {isSpecialCode9 && (
                                    <>
                                      <ListGroup.Item>
                                        <Form.Check
                                          onChange={() =>
                                            handleSplitChange(
                                              12,
                                              split_payment_amounts_obj[12]
                                            )
                                          }
                                          label={
                                            <Row style={{ marginTop: "-1rem" }}>
                                              <Col md={6} lg={6} sm={12}>
                                                <div className="splitPayment_txt">
                                                  {t("checkout.split_by_2")}
                                                </div>

                                                <span className="muted text-primary">
                                                  <b>
                                                    Total: $
                                                    {split_payment_amounts_obj[12]
                                                      .original_price * 2}
                                                  </b>
                                                </span>
                                              </Col>
                                              <Col
                                                md={6}
                                                lg={6}
                                                sm={12}
                                                className="text-end"
                                              >
                                                <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                                  <b>
                                                    {" "}
                                                    $
                                                    {parseFloat(
                                                      split_payment_amounts_obj[12]
                                                        .original_price
                                                    ).toFixed(2)}{" "}
                                                  </b>
                                                </div>
                                              </Col>
                                            </Row>
                                          }
                                          name="splitPayment"
                                          value="12"
                                          type={"radio"}
                                          id={`sp-12`}
                                        />
                                      </ListGroup.Item>

                                      <ListGroup.Item>
                                        <Form.Check
                                          onChange={() =>
                                            handleSplitChange(
                                              13,
                                              split_payment_amounts_obj[13]
                                            )
                                          }
                                          label={
                                            <Row style={{ marginTop: "-1rem" }}>
                                              <Col md={6} lg={6} sm={12}>
                                                <div className="splitPayment_txt">
                                                  {t("checkout.split_by_3")}
                                                </div>

                                                <span className="muted text-primary">
                                                  <b>
                                                    Total: $
                                                    {split_payment_amounts_obj[13]
                                                      .original_price * 3}
                                                  </b>
                                                </span>
                                              </Col>
                                              <Col
                                                md={6}
                                                lg={6}
                                                sm={12}
                                                className="text-end"
                                              >
                                                <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                                  <b>
                                                    {" "}
                                                    $
                                                    {parseFloat(
                                                      split_payment_amounts_obj[13]
                                                        .original_price
                                                    ).toFixed(2)}{" "}
                                                  </b>
                                                </div>
                                              </Col>
                                            </Row>
                                          }
                                          name="splitPayment"
                                          value="13"
                                          type={"radio"}
                                          id={`sp-13`}
                                        />
                                      </ListGroup.Item>
                                    </>
                                  )}

                                  {isSpecialCode10 && (
                                    <ListGroup.Item>
                                      <Form.Check
                                        onChange={() =>
                                          handleSplitChange(
                                            5,
                                            split_payment_amounts_obj[5]
                                          )
                                        }
                                        label={
                                          <Row style={{ marginTop: "-1rem" }}>
                                            <Col md={6} lg={6} sm={12}>
                                              <div className="splitPayment_txt">
                                                {t("checkout.split_by_4")}
                                                <br />
                                                <small>
                                                  Pay now $
                                                  {
                                                    split_payment_amounts_obj[5]
                                                      .emi[0].original_price
                                                  }{" "}
                                                  and remaining in $
                                                  {
                                                    split_payment_amounts_obj[5]
                                                      .emi[1].original_price
                                                  }{" "}
                                                  X 3
                                                </small>
                                              </div>

                                              <span className="muted text-primary">
                                                <b>
                                                  Total: $
                                                  {
                                                    split_payment_amounts_obj[5]
                                                      .total_price
                                                  }
                                                </b>
                                              </span>
                                            </Col>
                                            <Col
                                              md={6}
                                              lg={6}
                                              sm={12}
                                              className="text-end"
                                            >
                                              <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                                <b>
                                                  $
                                                  {parseFloat(
                                                    split_payment_amounts_obj[5]
                                                      .emi[0].original_price
                                                  ).toFixed(2)}{" "}
                                                </b>{" "}
                                              </div>
                                            </Col>
                                          </Row>
                                        }
                                        name="splitPayment"
                                        value="5"
                                        type={"radio"}
                                        id={`sp-6`}
                                      />
                                    </ListGroup.Item>
                                  )}

                                  {isSpecialCode11 && (
                                    <ListGroup.Item>
                                      <Form.Check
                                        onChange={() =>
                                          handleSplitChange(
                                            6,
                                            split_payment_amounts_obj[6]
                                          )
                                        }
                                        label={
                                          <Row style={{ marginTop: "-1rem" }}>
                                            <Col md={6} lg={6} sm={12}>
                                              <div className="splitPayment_txt">
                                                {t("checkout.split_by_4")}
                                              </div>

                                              <span className="muted text-primary">
                                                <b>
                                                  Total: $
                                                  {
                                                    split_payment_amounts_obj[6]
                                                      .total_price
                                                  }
                                                </b>
                                              </span>
                                            </Col>
                                            <Col
                                              md={6}
                                              lg={6}
                                              sm={12}
                                              className="text-end"
                                            >
                                              <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                                <b>
                                                  $
                                                  {parseFloat(
                                                    split_payment_amounts_obj[6]
                                                      .original_price
                                                  ).toFixed(2)}{" "}
                                                </b>{" "}
                                              </div>
                                            </Col>
                                          </Row>
                                        }
                                        name="splitPayment"
                                        value="4"
                                        type={"radio"}
                                        id={`sp-5`}
                                      />
                                    </ListGroup.Item>
                                  )}

                                  {isSpecialCode12 && (
                                    <ListGroup.Item>
                                      <Form.Check
                                        onChange={() =>
                                          handleSplitChange(
                                            14,
                                            split_payment_amounts_obj[14]
                                          )
                                        }
                                        label={
                                          <Row style={{ marginTop: "-1rem" }}>
                                            <Col md={6} lg={6} sm={12}>
                                              <div className="splitPayment_txt">
                                                {t("checkout.split_by_2")}
                                                <br />
                                                <small>
                                                  Pay now $
                                                  {
                                                    split_payment_amounts_obj[14]
                                                      .emi[0].original_price
                                                  }{" "}
                                                  and remaining in $
                                                  {
                                                    split_payment_amounts_obj[14]
                                                      .emi[1].original_price
                                                  }{" "}
                                                  X 1
                                                </small>
                                              </div>

                                              <span className="muted text-primary">
                                                <b>
                                                  Total: $
                                                  {
                                                    split_payment_amounts_obj[14]
                                                      .total_price
                                                  }
                                                </b>
                                              </span>
                                            </Col>
                                            <Col
                                              md={6}
                                              lg={6}
                                              sm={12}
                                              className="text-end"
                                            >
                                              <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                                <b>
                                                  $
                                                  {parseFloat(
                                                    split_payment_amounts_obj[14]
                                                      .emi[0].original_price
                                                  ).toFixed(2)}{" "}
                                                </b>{" "}
                                              </div>
                                            </Col>
                                          </Row>
                                        }
                                        name="splitPayment"
                                        value="14"
                                        type={"radio"}
                                        id={`sp-14`}
                                      />
                                    </ListGroup.Item>
                                  )}
                                </ListGroup>
                              </Col>
                            </Row>
                          )}
                      </Col>
                    )}
                    {!isRenewal &&
                      courseId === "56" &&
                      !_.isEmpty(split_payment_amounts_obj) && (
                        <Col md={12} sm={12} className="mb-3">
                          <h3 className="mb-0">
                            {t("checkout.pay_now_later")}
                          </h3>
                          <Row>
                            <Col>
                              <ListGroup className="my-4 paymentMethods_Card">
                                <ListGroup.Item>
                                  <Form.Check
                                    onChange={() =>
                                      handleSplitChange(
                                        0,
                                        split_payment_amounts_obj[0]
                                      )
                                    }
                                    label={
                                      <Row style={{ marginTop: "-1rem" }}>
                                        <Col md={6} lg={6} sm={12}>
                                          <div className="splitPayment_txt">
                                            {t("checkout.pay_now")}
                                          </div>
                                          <span className="muted text-primary">
                                            <b>
                                              Total: $
                                              {!_.isEmpty(
                                                split_payment_amounts_obj
                                              ) &&
                                                split_payment_amounts_obj[0]
                                                  .total_price}
                                            </b>
                                          </span>
                                        </Col>
                                        <Col
                                          md={6}
                                          lg={6}
                                          sm={12}
                                          className="text-end"
                                        >
                                          <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                            <b>
                                              $
                                              {parseFloat(
                                                split_payment_amounts_obj[0]
                                                  .total_price - discountAmount
                                              ).toFixed(2)}{" "}
                                            </b>
                                          </div>
                                        </Col>
                                      </Row>
                                    }
                                    name="splitPayment"
                                    value="0"
                                    type={"radio"}
                                    id={`sp-1`}
                                    defaultChecked
                                  />
                                </ListGroup.Item>
                                {isales_agent !== 0 && (
                                  <>
                                    <ListGroup.Item>
                                      <Form.Check
                                        onChange={() =>
                                          handleSplitChange(
                                            1,
                                            split_payment_amounts_obj[1]
                                          )
                                        }
                                        label={
                                          <Row style={{ marginTop: "-1rem" }}>
                                            <Col md={6} lg={6} sm={12}>
                                              <div className="splitPayment_txt">
                                                {t("checkout.split_by_2")}
                                              </div>

                                              <span className="muted text-primary">
                                                <b>
                                                  Total: $
                                                  {split_payment_amounts_obj[1]
                                                    .original_price * 2}
                                                </b>
                                              </span>
                                            </Col>
                                            <Col
                                              md={6}
                                              lg={6}
                                              sm={12}
                                              className="text-end"
                                            >
                                              <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                                <b>
                                                  {" "}
                                                  $
                                                  {parseFloat(
                                                    split_payment_amounts_obj[1]
                                                      .original_price
                                                  ).toFixed(2)}{" "}
                                                </b>
                                              </div>
                                            </Col>
                                          </Row>
                                        }
                                        name="splitPayment"
                                        value="1"
                                        type={"radio"}
                                        id={`sp-2`}
                                      />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      <Form.Check
                                        onChange={() =>
                                          handleSplitChange(
                                            2,
                                            split_payment_amounts_obj[2]
                                          )
                                        }
                                        label={
                                          <Row style={{ marginTop: "-1rem" }}>
                                            <Col md={6} lg={6} sm={12}>
                                              <div className="splitPayment_txt">
                                                {t("checkout.split_by_3")}
                                              </div>

                                              <span className="muted text-primary">
                                                <b>
                                                  Total: $
                                                  {split_payment_amounts_obj[2]
                                                    .original_price * 3}
                                                </b>
                                              </span>
                                            </Col>
                                            <Col
                                              md={6}
                                              lg={6}
                                              sm={12}
                                              className="text-end"
                                            >
                                              <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                                                <b>
                                                  $
                                                  {parseFloat(
                                                    split_payment_amounts_obj[2]
                                                      .original_price
                                                  ).toFixed(2)}{" "}
                                                </b>{" "}
                                              </div>
                                            </Col>
                                          </Row>
                                        }
                                        name="splitPayment"
                                        value="2"
                                        type={"radio"}
                                        id={`sp-3`}
                                      />
                                    </ListGroup.Item>
                                  </>
                                )}{" "}
                              </ListGroup>
                            </Col>
                          </Row>
                        </Col>
                      )}
                    <Col md={12} sm={12} className="mb-3">
                      {iTotalPrice > 0 && (
                        <>
                          {" "}
                          <h3 className="mb-0">
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
                                )}
                                <ListGroup.Item>
                                  <Form.Check
                                    type="radio"
                                    className="ckb_Payments"
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
                                          BTC, ETH, LTC, DASH, BAT, DAI, BCH,
                                          USDC, USDT or BUSD (BEP20)
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
                      {!isPayingWithWallet &&
                        selectedPM === "mct" &&
                        iTotalPrice === iActualPrice && (
                          <Row>
                            <Col md={12} sm={12} className="mb-3">
                              <Alert variant={"info"}>
                                Conéctese a la billetera y valide la
                                elegibilidad para obtener un 25 % de descuento
                                al pagar a través de MCT.&nbsp;&nbsp;
                                <Badge
                                  role="button"
                                  disabled={!walletConnected}
                                  onClick={validateMCTDiscount}
                                  bg="info"
                                >
                                  Validar
                                </Badge>
                                {/* <Button
                                style={{ padding: "3px" }}
                                size="sm"
                                disabled={!walletConnected}
                                onClick={validateMCTDiscount}
                              >
                                Validar
                              </Button> */}
                              </Alert>
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
              <Card className="border-0 mb-3 bg-white">
                {/*  Card body */}
                <div className="p-3 text-center">
                  <div className="mb-2 mt-2">
                    <h4 className="fw-bold">{cdOBJ.name}</h4>{" "}
                    <img src={cdOBJ.signed_url_image_thumbnail} width={300} />
                    {isRenewal && (
                      <p className=" mt-3 ">
                        <span className="text-dark fw-medium">
                          Renewal date -{" "}
                          {moment(purchaseData.next_payment_date).format(
                            "DD-MMM-YYYY"
                          )}
                        </span>{" "}
                      </p>
                    )}
                  </div>
                </div>

                <hr className="m-0" />
                <div className="p-3 text-center">
                  <div className="mb-2 mt-3">
                    <h1 className="fw-bold">Total</h1>
                  </div>

                  <div className="d-flex justify-content-center">
                    <div className="display-5 fw-bold text-primary">
                      {" "}
                      <span className="mb-0 mx-2 fw-bold text-primary">$</span>
                      {Math.round(iTotalPrice)}
                    </div>
                  </div>
                  {countryTax !== 0 && countryTax !== "0.00" && (
                    <div className=" text-primary">
                      {`Incluye +${countryTax}% VAT.`}
                    </div>
                  )}
                </div>
                {discountAmount !== 0 && (
                  <div className="d-flex justify-content-center">
                    <Alert variant={"info"}>
                      <b> {`Recibiste un descuento de $${discountAmount}`}</b>
                    </Alert>
                  </div>
                )}
                <hr className="m-0" />
              </Card>
              {!isPayingWithWallet && iTotalPrice === iActualPrice && (
                <Card className="border-0 mb-3 mb-lg-0  bg-white">
                  {/*  Card body */}
                  <Card.Body className="noBorderCard">
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
                          variant="secondary"
                          id="couponCode"
                        >
                          {t("checkout.apply")}
                        </Button>
                      </Form.Group>
                    </Form>
                    {courseId === 55 && mcWalletBalance !== 0 && (
                      <>
                        {" "}
                        <div className="d-flex align-items-center justify-content-end pt-4 text-primary">
                          <Form.Check
                            size="sm"
                            onChange={handlePayWithMCWallet}
                            name="mcwallet"
                            type={"switch"}
                            id={`sp-mcwallet`}
                          />{" "}
                          <b> Pay with MC Wallet</b>
                          <br />
                        </div>
                        <div className="d-flex align-items-center justify-content-end fw-bold text-primary">
                          (Maximun $288)
                        </div>
                      </>
                    )}
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

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
