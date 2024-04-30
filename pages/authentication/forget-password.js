// import node module libraries
import Link from "next/link";
import { Fragment, useState } from "react";
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import i18 from "../../next-i18next.config";

// import widget/custom components
import * as formik from "formik";
import { GeeksSEO } from "widgets";
import * as Yup from "yup";

// import authlayout to override default layout
import AuthLayout from "layouts/dashboard/AuthLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { forgotPassword, resetPassword } from "../../services/nodeapi";

const ForgetPassword = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [isResetPassword, setIsResetPassword] = useState(false);
  const { Formik } = formik;
  const [errorMessage, setErrorMessage] = useState("");

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = Yup.object().shape({
    otp: Yup.string()
      .min(6, t("error.otp_invalid"))
      .max(6, t("error.otp_invalid"))
      .required(t("error.otp_required"))
      .matches(phoneRegExp, t("error.otp_invalid")),
    password: Yup.string()
      .required(t("error.password_required"))
      .min(8, t("error.password_short"))
      .matches(/^(?=.*[a-z])/, t("error.password_one_lowercase"))
      .matches(/^(?=.*[A-Z])/, t("error.password_one_uppercase"))
      .matches(/^(?=.*[0-9])/, t("error.password_one_number"))
      .matches(/^(?=.*[!@#%&$^()])/, t("error.password_one_special")),
    confirmpassword: Yup.string()
      .required(t("error.confirmpassword_required"))
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          t("error.password_confirm_match")
        ),
      }),
  });
  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    const form = e;
    const _email = form.target.email.value;
    setEmail(_email);
    const resp = await forgotPassword({ email: _email });
    if (resp.status === 200) {
      if (resp.data.isSuccess) {
        setIsResetPassword(true);
        Swal.fire({
          icon: "success",
          title: "OTP enviado a tu email correctamente",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Email no encontrado.",
        });
      }
    }
  };

  const resendOTP = async () => {
    const resp = await forgotPassword({ email });
    if (resp.status === 200) {
      if (resp.data.isSuccess) {
        setIsResetPassword(true);
        Swal.fire({
          icon: "success",
          title: "OTP sent to email successfully.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Email not found.",
        });
      }
    }
  };
  const handleSubmit = async (e) => {
    const resp = await resetPassword({
      email,
      password: e.confirmpassword,
      otp: e.otp,
    });
    if (resp.status === 200) {
      if (resp.data.isSuccess) {
        Swal.fire({
          icon: "success",
          title: resp.data.message,
        }).then((result) => {
          router.push("/authentication/sign-in");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: resp.data.message,
        });
      }
    }
  };
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Forget Password | Academy - MundoCrypto" />
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
                  {isResetPassword
                    ? "Establecer nueva contraseña"
                    : "¿Has olvidado tu contraseña?"}
                </h1>
                {!isResetPassword && (
                  <span>
                    Por favor, introduce tu email para establecer tu nueva
                    contraseña
                  </span>
                )}
              </div>
              {/* Form */}
              {isResetPassword ? (
                <Formik
                  noValidate
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
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col lg={12} md={12} className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            name="email"
                            id="email"
                            disabled={true}
                            value={email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.otp}
                          </Form.Control.Feedback>
                        </Col>
                        <Col lg={8} md={8} className="mb-3">
                          <Form.Label>OTP</Form.Label>
                          <Form.Control
                            type="text"
                            name="otp"
                            id="otp"
                            value={values.otp}
                            onChange={handleChange}
                            isInvalid={!!errors.otp}
                            isValid={touched.otp && !errors.otp}
                            placeholder="OTP"
                            autoComplete="otp"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.otp}
                          </Form.Control.Feedback>
                        </Col>
                        <Col lg={4} md={4} className="mb-3">
                          <Button
                            type="button"
                            size="sm"
                            className="mt-6"
                            variant="outline-primary"
                            onClick={resendOTP}
                          >
                            Resend OTP
                          </Button>
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
                            isInvalid={!!errors.password}
                            isValid={touched.password && !errors.password}
                            placeholder={t("signup.password_Place_holder")}
                            autoComplete="new-password"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </Col>

                        <Col lg={12} md={12} className="mb-3">
                          {/* Password */}
                          <Form.Label>
                            {t("signup.confirm_password")}{" "}
                          </Form.Label>
                          <Form.Control
                            name="confirmpassword"
                            type="password"
                            id="confirmpassword"
                            placeholder={t(
                              "signup.confirm_password_Place_holder"
                            )}
                            value={values.confirmpassword}
                            onChange={handleChange}
                            isInvalid={!!errors.confirmpassword}
                            isValid={
                              touched.confirmpassword && !errors.confirmpassword
                            }
                            autoComplete="new-password"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmpassword}
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
                            Submit
                          </Button>
                        </Col>
                      </Row>
                      <span>
                        Return to{" "}
                        <Link href="/authentication/sign-in">
                          <a>Sign in</a>
                        </Link>
                      </span>
                    </Form>
                  )}
                </Formik>
              ) : (
                <Form onSubmit={handleOTPSubmit}>
                  <Row>
                    <Col lg={12} md={12} className="mb-3">
                      {/*  email */}
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3 d-grid gap-2">
                      {/* Button */}
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                  <span>
                    Return to{" "}
                    <Link href="/authentication/sign-in">
                      <a>Sign in</a>
                    </Link>
                  </span>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

ForgetPassword.Layout = AuthLayout;

export default ForgetPassword;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
