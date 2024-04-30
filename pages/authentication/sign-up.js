// import node module libraries
import * as formik from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { Alert, Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import i18 from "../../next-i18next.config";

// import widget/custom components
import { GeeksSEO } from "widgets";

// import authlayout to override default layout
import LoadingSpinner from "components/bootstrap/loadingspinner";
import _ from "lodash";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { getUserWalletAddress } from "../../helper/web3.helper";
import {
  addToCart,
  getCourseDetails,
  getUserProfileDetails,
  linkEmailToWallet,
  redeemMCTokens,
  sendOTP,
  signup,
  verifyOTP,
} from "../../services/nodeapi";
import { userObject, userProfileObject } from "../../services/states";

import AuthLayout from "layouts/dashboard/AuthLayout";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

const SignUp = () => {
  const { t } = useTranslation();
  const { Formik } = formik;

  const router = useRouter();
  const refForm = useRef();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsUserAlreadyLogedIn] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState("");
  const [userObj, setuserObject] = useRecoilState(userObject);
  const [showLoader, setshowLoader] = useState(false);

  const [userProfileObj, setUserProfileObject] =
    useRecoilState(userProfileObject);
  const [isTermsAccepted, setisTermsAccepted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pwdErrMsg, setPwdErrMsg] = useState("");
  const phoneRegExp =
    /^\+?((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const fullNameRegExp = /^[aA-zZ\s]+$/;
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [OTP, setOTP] = useState("");
  const [showOTPModel, setShowOTPModel] = useState(true);
  useEffect(() => {
    const isLogin = !_.isEmpty(userObj) ? true : false;
    setIsUserAlreadyLogedIn(isLogin);
  });
  const [courseId, setcourseId] = useState(0);

  useEffect(() => {
    const { courseId } = router.query;
    if (courseId !== undefined) {
      setcourseId(courseId);
    }
  }, [router]);
  const handleSubmit = async (e) => {
    if (phoneNumber === "") {
      setIsError(true);
      setErrorMessage(t("error.phone_required"));
      return;
    }
    try {
      setshowLoader(true);
      const walletAddress = await getUserWalletAddress();

      let req = {};

      if (walletAddress === null) {
        req = {
          ...e,
          phone_number: phoneNumber,
          is_phone_verified: isMobileVerified ? 1 : 0,
          course_id: courseId !== 0 ? courseId : null,
        };
      } else {
        req = {
          ...e,
          walletAddress: walletAddress,
          phone_number: phoneNumber,
          is_phone_verified: isMobileVerified ? 1 : 0,
          course_id: courseId !== 0 ? courseId : null,
        };
      }

      if (isAuthenticated) {
        const resp = await linkEmailToWallet(req);
        setshowLoader(false);
        if (resp.status === 200) {
          const d = resp.data;
          if (!d.isSuccess) {
            setIsError(true);
            setErrorMessage(d.message);
          } else {
            setIsError(false);
            const upResp = await getUserProfileDetails();
            setUserProfileObject(upResp.data.userData);
            Swal.fire({
              icon: "success",
              title: t("error.success"),
              text: d.message,
            }).then(async (result) => {
              if (courseId !== 0) {
                const cdresp = await getCourseDetails(courseId);
                if (cdresp.data.courseData.is_partial_payment_available === 1) {
                  router.push(`/SplitPaymentCheckout/${courseId}`);
                } else {
                  const resp = await addToCart({ courseId });
                  router.push("/Checkout");
                }
              } else {
                router.push("/");
              }
            });
          }
        } else {
          setIsError(true);
          setErrorMessage(t("error.sometime"));
        }
      } else {
        const resp = await signup(req);
        setshowLoader(false);

        if (resp.status === 200) {
          const d = resp.data;
          if (!d.isSuccess) {
            setIsError(true);
            setErrorMessage(d.message);
          } else {
            setIsError(false);

            setuserObject(d.data);

            localStorage.setItem("access_token", d.data.access_token);

            const upResp = await getUserProfileDetails();

            setUserProfileObject(upResp.data.userData);

            try {
              const mcwalletResp = await redeemMCTokens({
                referralCode: req.referralCode,
              });
            } catch (error) {
              console.log(error);
            }

            Swal.fire({
              icon: "success",
              title: t("error.success"),
              text: t("error.registered_successfully"),
            }).then(async (result) => {
              if (courseId !== 0) {
                const cdresp = await getCourseDetails(courseId);
                if (cdresp.data.courseData.is_public === 1) {
                  router.push(`/CourseResume/${courseId}`);
                } else {
                  if (
                    cdresp.data.courseData.is_partial_payment_available === 1
                  ) {
                    router.push(`/SplitPaymentCheckout/${courseId}`);
                  } else {
                    const resp = await addToCart({ courseId });
                    router.push("/Checkout");
                  }
                }
              } else {
                router.push("/");
              }
            });
          }
        } else {
          setIsError(true);
          setErrorMessage(t("error.sometime"));
        }
      }
    } catch (error) {
      setshowLoader(false);
      setIsError(true);
      setErrorMessage(t("error.sometime"));
    }
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === password) {
      setPwdErrMsg("");
    } else {
      setPwdErrMsg("Passwords do not match.");
    }
  };
  const handleCKBTerms = (e) => {
    setisTermsAccepted(e.target.checked);
  };
  const schema = Yup.object().shape({
    fullName: Yup.string()
      .required(t("error.fullname_required"))
      .matches(fullNameRegExp, t("error.invalid_fullname")),
    email: Yup.string()
      .email(t("error.invalid_email"))
      .min(3, t("error.min_3_characters"))
      .required(t("error.email_required")),
    // phone_number: Yup.string()
    //   .min(6, t("error.invalid_phone"))
    //   .max(15, t("error.invalid_phone"))
    //   .required(t("error.phone_required"))
    //   .matches(phoneRegExp, t("error.invalid_phone")),
    password: Yup.string()
      .required(t("error.password_required"))
      .min(8, t("error.password_short"))
      .matches(/^(?=.*[a-z])/, t("error.password_one_lowercase"))
      .matches(/^(?=.*[A-Z])/, t("error.password_one_uppercase"))
      .matches(/^(?=.*[0-9])/, t("error.password_one_number"))
      .matches(/^(?=.*[!@#%&$^()]*)/, t("error.password_one_special")),
    confirmpassword: Yup.string()
      .required(t("error.confirmpassword_required"))
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          t("error.password_confirm_match")
        ),
      }),
    terms: Yup.bool().required().oneOf([true], "Terms must be accepted"),
    referralCode: Yup.string(),
  });

  const onPhoneNoChange = (status, phoneNumber, country, code) => {
    const number = "+" + country.dialCode + phoneNumber;
    setPhoneNumber(number.trim());
  };

  const validateMobileNo = async () => {
    if (phoneNumber === "") {
      setIsError(true);
      setErrorMessage(t("error.phone_required"));
      return;
    } else {
      const resp = await sendOTP({ mobile_number: phoneNumber });
      if (resp.status === 200) {
        if (resp.data.isSuccess) {
          Swal.fire({
            title:
              "Por favor, ingresa el código de verificación que enviamos a tu número de teléfono",
            input: "number",
            inputLabel: "",
            inputValue: "",
            showCancelButton: true,
            confirmButtonText: "Validar",
            cancelButtonText: "Cancelar",
            inputValidator: async (value) => {
              if (!value) {
                return "Por favor ingrese OTP.";
              } else {
                const verifyOTPResp = await verifyOTP({
                  mobile_number: phoneNumber,
                  otp: value,
                });
                const { isSuccess, message } = verifyOTPResp.data;
                if (!isSuccess) {
                  return message;
                } else {
                  setIsMobileVerified(true);
                  Swal.fire({
                    icon: "success",
                    title: t("error.success"),
                    text: "OTP validado con éxito.",
                  });
                }
              }
            },
          });
        }
      }
    }
  };
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO
        title={`${
          isAuthenticated ? t("signup.link_email") : t("signup.signup")
        } | MundoCrypto`}
      />
      <LoadingSpinner showLoading={showLoader} />

      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4">
                <Link href="/">
                  <a>
                    {" "}
                    <Image
                      src="/images_optimized/mc_black_blue.png"
                      className="mb-4"
                      alt=""
                      width={140}
                    />
                  </a>
                </Link>
                <h1 className="mb-1 fw-bold">
                  {isAuthenticated
                    ? t("signup.link_email")
                    : t("signup.signup")}
                </h1>
                <span>
                  <Link
                    href={`/authentication/sign-in${
                      courseId !== undefined ? "?courseId=" + courseId : ""
                    }`}
                  >
                    <a className="ms-1">{t("signin.sign_in")}</a>
                  </Link>
                </span>
              </div>
              {/* Form */}
              <Formik
                noValidate
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={schema}
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                initialValues={{
                  fullName: "",
                  email: "",
                  // phone_number: "",
                  password: "",
                  confirmpassword: "",
                  terms: false,
                  referralCode: "",
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors,
                }) => (
                  <Form ref={refForm} onSubmit={handleSubmit}>
                    <Row>
                      <Col lg={12} md={12} className="mb-3">
                        {/* User Name */}
                        <Form.Label>{t("signup.full_name")}</Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={values.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.fullName}
                          isValid={touched.fullName && !errors.fullName}
                          id="username"
                          placeholder={t("signup.full_name_place_holder")}
                          autoComplete="new-password"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.fullName}
                        </Form.Control.Feedback>
                      </Col>
                      <Col lg={12} md={12} className="mb-3">
                        {/* User Name */}
                        <Form.Label>{t("signup.phone_no")}</Form.Label>
                        <br />
                        <IntlTelInput
                          width={100}
                          inputClassName="form-control"
                          preferredCountries={["es", "us", "in"]}
                          defaultCountry="es"
                          useMobileFullscreenDropdown={true}
                          onPhoneNumberChange={onPhoneNoChange}
                          onPhoneNumberBlur={() => {}}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone_number}
                        </Form.Control.Feedback>
                      </Col>
                      <Col lg={12} md={12} className="mb-3">
                        {/* email */}
                        <Form.Label>{t("signup.email")} </Form.Label>
                        <Form.Control
                          type="email"
                          id="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.email}
                          isValid={touched.email && !errors.email}
                          placeholder={t("signup.email_Place_holder")}
                          autoComplete="new-password"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Col>
                      <Col lg={12} md={12} className="mb-3">
                        {/* Password */}
                        <Form.Label>{t("signup.password")}</Form.Label>
                        <Form.Control
                          name="password"
                          type="password"
                          id="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.password}
                          isValid={touched.password && !errors.password}
                          placeholder={t("signup.password_Place_holder")}
                          autoComplete="new-password"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Col>
                      {/* <Col lg={12} md={12} className="mb-3">
                        <span
                          data-bs-toggle="tooltip"
                          data-placement="right"
                          title=""
                        >
                          {t("signup.password_strength")}
                        </span>
                        <PasswordStrengthMeter password={password} />
                      </Col> */}

                      <Col lg={12} md={12} className="mb-3">
                        {/* Password */}
                        <Form.Label>{t("signup.confirm_password")} </Form.Label>
                        <Form.Control
                          name="confirmpassword"
                          type="password"
                          id="confirmpassword"
                          placeholder={t(
                            "signup.confirm_password_Place_holder"
                          )}
                          value={values.confirmpassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.confirmpassword}
                          isValid={
                            touched.confirmpassword && !errors.confirmpassword
                          }
                          autoComplete="new-password"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmpassword}
                        </Form.Control.Feedback>
                        {pwdErrMsg && (
                          <span style={{ color: "red" }}>{pwdErrMsg}</span>
                        )}
                      </Col>
                      {!isMobileVerified && (
                        <>
                          <Alert variant="info">
                            Confirma tu teléfono móvil para recibir $MCT usando
                            el código de referido &nbsp;
                            <Button
                              size="sm"
                              variant="outline-primary"
                              disabled={isMobileVerified}
                              onClick={validateMobileNo}
                            >
                              Confirmar
                            </Button>
                          </Alert>
                        </>
                      )}
                      {isMobileVerified && (
                        <Col lg={12} md={12} className="mb-3">
                          {/* User Name */}
                          <Form.Label>
                            {t("checkout.reference_code")}
                          </Form.Label>

                          <Form.Control
                            type="text"
                            name="referralCode"
                            value={values.referralCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={!isMobileVerified}
                            isInvalid={!!errors.referralCode}
                            isValid={
                              touched.referralCode && !errors.referralCode
                            }
                            id="username"
                            placeholder={t("checkout.reference_code")}
                            autoComplete="new-referralCode"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.referralCode}
                          </Form.Control.Feedback>
                        </Col>
                      )}

                      <Col lg={12} md={12} className="mb-3">
                        {/* Checkbox */}
                        <Form.Group className="mb-3">
                          <Form.Check
                            name="terms"
                            label={
                              <>
                                {" "}
                                {t("signup.i_agree_to_the")}{" "}
                                <Link href="/TermsandConditions">
                                  <a>{t("signup.terms_of_service")}</a>
                                </Link>{" "}
                                {t("signup.and")}{" "}
                                <Link href="/PrivacyPolicy">
                                  <a>{t("signup.privacy_policy")}</a>
                                </Link>
                              </>
                            }
                            onChange={handleChange}
                            isInvalid={!!errors.terms}
                            feedback={errors.terms}
                            feedbackType="invalid"
                            id="validationFormik0"
                          />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                          {errors.terms}
                        </Form.Control.Feedback>
                        {/* <Form.Check type="checkbox" id="check-api-checkbox">
                          <Form.Check.Input
                            type="checkbox"
                            required
                            onChange={handleCKBTerms}
                          />
                          <Form.Check.Label>
                            {t("signup.i_agree_to_the")}{" "}
                            <Link href="/TermsandConditions">
                              <a>{t("signup.terms_of_service")}</a>
                            </Link>{" "}
                            {t("signup.and")}{" "}
                            <Link href="/PrivacyPolicy">
                              <a>{t("signup.privacy_policy")}</a>
                            </Link>
                          </Form.Check.Label>
                        </Form.Check> */}
                      </Col>
                      {errorMessage && (
                        <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                          <span style={{ color: "red" }}>{errorMessage}</span>
                        </Col>
                      )}
                      <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                        {/* Button */}
                        <Button variant="primary" type="submit">
                          {isAuthenticated
                            ? t("signup.link")
                            : t("signup.signup")}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

SignUp.Layout = AuthLayout;
export default SignUp;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
