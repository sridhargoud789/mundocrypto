// import node module libraries
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import i18 from "../../next-i18next.config";

// import widget/custom components
import { useRouter } from "next/router";
import { GeeksSEO } from "widgets";
// import authlayout to override default layout
import LoadingSpinner from "components/bootstrap/loadingspinner";
import AuthLayout from "layouts/dashboard/AuthLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import {
  addToCart,
  getCourseDetails,
  getUserProfileDetails,
  login,
} from "../../services/nodeapi";
import { userObject, userProfileObject } from "../../services/states";

const SignIn = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userObj, setuserObject] = useRecoilState(userObject);
  const [userProfileObj, setUserProfileObject] =
    useRecoilState(userProfileObject);
  const [showLoader, setshowLoader] = useState(false);
  const [courseId, setcourseId] = useState(0);

  useEffect(() => {
    const { courseId } = router.query;
    if (courseId !== undefined) {
      setcourseId(courseId);
    }
  }, [router]);
  const SubmitLogin = async (e) => {
    e.preventDefault();
    setshowLoader(true);
    try {
      const req = {
        email: e.target.email.value,
        password: e.target.password.value,
        course_id: courseId !== 0 ? courseId : null,
      };

      const resp = await login(req);
      setshowLoader(false);
      if (resp.status === 200) {
        const d = resp.data;
        if (!d.isSuccess) {
          setIsError(true);
          setErrorMessage("Invalid credentials. Please try again.");
        } else {
          setIsError(false);
          setuserObject(d.data);
          localStorage.setItem("access_token", d.data.access_token);
          const upResp = await getUserProfileDetails();
          setUserProfileObject(upResp.data.userData);

          if (courseId !== 0) {
            const cdresp = await getCourseDetails(courseId);
            if (cdresp.data.courseData.is_public === 1) {
              router.push(`/CourseResume/${courseId}`);
            } else {
              if (cdresp.data.courseData.is_partial_payment_available === 1) {
                router.push(`/SplitPaymentCheckout/${courseId}`);
              } else {
                const resp = await addToCart({ courseId });
                router.push("/Checkout");
              }
            }
          } else {
            router.push("/");
          }
        }
      } else {
        setIsError(true);
        setErrorMessage("Error occured. Please try after sometime.");
      }
    } catch (error) {
      setshowLoader(false);
      setIsError(true);
      setErrorMessage("Error occured. Please try after sometime.");
    }
  };
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Sign In | MundoCrypto" />
      <LoadingSpinner showLoading={showLoader} />
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4">
                <Link href="/">
                  <a>
                    <Image
                      src="/images_optimized/mc_black_blue.png"
                      className="mb-4"
                      alt=""
                      width={140}
                    />
                  </a>
                </Link>
                <h1 className="mb-1 fw-bold">{t("signin.sign_in")}</h1>
                <span>
                  {t("signin.dont_have_account")}{" "}
                  <Link
                    href={`/authentication/sign-up${
                      courseId !== 0 ? "?courseId=" + courseId : ""
                    }`}
                  >
                    <a className="ms-1">{t("signin.sign_up")}</a>
                  </Link>
                </span>
              </div>
              {/* Form */}
              <Form onSubmit={SubmitLogin}>
                <Row>
                  <Col lg={12} md={12} className="mb-3">
                    {/* Username or email */}
                    <Form.Label> {t("signin.form.email")} </Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      name="email"
                      placeholder={t("signin.form.email_Place_holder")}
                      required
                    />
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    {/* Password */}
                    <Form.Label>{t("signin.form.password")} </Form.Label>
                    <Form.Control
                      type="password"
                      id="password"
                      name="password"
                      placeholder={t("signin.form.password_Place_holder")}
                      required
                    />
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    {/* Checkbox */}
                    <div className="d-md-flex justify-content-between align-items-center">
                      <Form.Group
                        className="mb-3 mb-md-0"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check
                          type="checkbox"
                          label={t("signin.form.remember_me")}
                        />
                      </Form.Group>
                      <Link href="/authentication/forget-password">
                        <a>{t("signin.form.forgot_password")}</a>
                      </Link>
                    </div>
                  </Col>
                  <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                    {/* Button */}
                    <Button variant="primary" type="submit">
                      {t("signin.sign_in")}
                    </Button>
                  </Col>
                </Row>
              </Form>
              {isError && <span className="danger py-2">{errorMessage}</span>}
              <hr className="my-4" />
              {/* <div className="mt-4 text-center">
                <Link href="#">
                  <a className="btn-social btn-social-outline btn-facebook">
                    <i className="fab fa-facebook"></i>
                  </a>
                </Link>{" "}
                <Link href="#">
                  <a className="btn-social btn-social-outline btn-twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                </Link>{" "}
                <Link href="#">
                  <a className="btn-social btn-social-outline btn-linkedin">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </Link>{" "}
                <Link href="#">
                  <a className="btn-social btn-social-outline btn-github">
                    <i className="fab fa-github"></i>
                  </a>
                </Link>
              </div> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

SignIn.Layout = AuthLayout;

export default SignIn;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
