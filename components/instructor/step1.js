import * as formik from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";

import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const InstructorStep1Form = () => {
  const { Formik } = formik;

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 characters")
      .max(20, "Maximum 50 symbols")
      .required("Email is required"),
  });
  const handleSubmit = async (e) => {
    console.log(e);
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        initialValues={{
          fullName: "",
          email: "",
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
          <Row>
            <Col className="mt-4">
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationFormik01">
                  <Form.Label>{t("signup.full_name")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    isInvalid={!!errors.fullName}
                    isValid={touched.fullName && !errors.fullName}
                    className="rounded-0"
                    placeholder="Introduce tu nombre completo"
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="validationFormik03">
                  <Form.Label>{t("signup.email")}</Form.Label>

                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    isValid={touched.email && !errors.email}
                    className="rounded-0"
                    placeholder="Introduce tu email"
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    className="btn  btn-lg btnBlack  rounded-0"
                  >
                    Registrarse
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        )}
      </Formik>
      <br />
      {isError && <span className="danger py-2">{errorMessage}</span>}
    </>
  );
};

export default InstructorStep1Form;
