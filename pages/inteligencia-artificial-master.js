// import node module libraries
import * as formik from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import i18 from "../next-i18next.config";

// import widget/custom components
import { GeeksSEO } from "widgets";

// import authlayout to override default layout
import LoadingSpinner from "components/bootstrap/loadingspinner";
import AuthLayout from "layouts/dashboard/AuthLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import ModalVideo from "react-modal-video";
import Swal from "sweetalert2";
import { getUserWalletAddress } from "../helper/web3.helper";
import {
  addToCart,
  getCourseDetails,
  getUserProfileDetails,
  linkEmailToWallet,
  signup,
} from "../services/nodeapi";
import { userObject, userProfileObject } from "../services/states";

const SignUp = () => {
  const { t } = useTranslation();
  const { Formik } = formik;
  const [isOpen, setOpen] = useState(false);

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

  const [courseId, setcourseId] = useState(0);

  const handleSubmit = async (e) => {
    try {
      setshowLoader(true);
      const walletAddress = await getUserWalletAddress();

      let req = {};
      req = { ...e, source: "google" };
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
            setIsError(false);
          } else {
            setIsError(false);
            setuserObject(d.data);

            localStorage.setItem("access_token", d.data.access_token);
            const upResp = await getUserProfileDetails();
            setUserProfileObject(upResp.data.userData);
          }
          Swal.fire({
            icon: "success",
            title: t("error.success"),
            text: t("error.registered_successfully"),
          }).then(async (result) => {
            router.push("/master-inteligencia-artificial");
          });
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
    phone_number: Yup.string()
      .min(6, t("error.invalid_phone"))
      .max(15, t("error.invalid_phone"))
      .required(t("error.phone_required"))
      .matches(phoneRegExp, t("error.invalid_phone")),
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
  });

  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO
        title={`Máster en Inteligencia Artificial - IA Máster | MundoCrypto`}
      />
      <LoadingSpinner showLoading={showLoader} />
      <Container fluid>
        <div className="p-1">
          <div
            className="d-flex img-fluid justify-content-center position-relative rounded py-10 border-white border rounded-3 bg-cover"
            style={{
              backgroundImage: `url(https://mundocrypto-prod.s3.eu-central-1.amazonaws.com/M%C3%A1ster%20en%20Inteligencia%20Artificial%20-%20AI%20Mastery/url_image_mobile.jfif)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          >
            <Link href="#">
              <a
                className="popup-youtube icon-shape rounded-circle btn-play icon-xl text-decoration-none"
                onClick={() => setOpen(true)}
              >
                <i className="fe fe-play"></i>
              </a>
            </Link>
          </div>
        </div>
        {/* video popup */}
        <ModalVideo
          channel="custom"
          autoplay
          isOpen={isOpen}
          url={
            "https://mundocrypto-files.s3.eu-central-1.amazonaws.com/course_video_thumbnail/Ai+course.mp4"
          }
          onClose={() => setOpen(false)}
        />
        <h2 className="mb-1 fw-bold">Rellena el formulario</h2>
      </Container>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-4 py-xl-0">
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

                <h2 className="mb-1 fw-bold">Rellena el formulario</h2>
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
                  phone_number: "",
                  password: "",
                  confirmpassword: "",
                  terms: false,
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
                        <Form.Control
                          type="text"
                          name="phone_number"
                          id="phone_number"
                          value={values.phone_number}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.phone_number}
                          isValid={touched.phone_number && !errors.phone_number}
                          placeholder={t("signup.phone_no_place_holder")}
                          autoComplete="new-password"
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
                      </Col>
                      {errorMessage && (
                        <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                          <span style={{ color: "red" }}>{errorMessage}</span>
                        </Col>
                      )}
                      <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                        {/* Button */}
                        <Button variant="primary" type="submit">
                          Entregar
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
