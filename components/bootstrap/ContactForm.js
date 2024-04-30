import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  Row,
} from "react-bootstrap";
import * as Yup from "yup";

const ContactForm = ({ openContactForm, handleToOpenForm }) => {
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Too short")
      .max(10, "Too long")
      .required("Required"),
  });
  return (
    <Modal
      show={openContactForm}
      size="lg"
      onHide={() => handleToOpenForm(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h1 className="mb-1 fw-bold">Please provide below details</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        test
        {/* <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Formik
              initialValues={{ name: "", email: "", phone: "" }}
              validationSchema={SignupSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your name"
                      component={Input}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      component={Input}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Field
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="Enter your phone number"
                      component={Input}
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                  <Button color="primary" type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row> */}
      </Modal.Body>
    </Modal>
  );
};

export default ContactForm;
