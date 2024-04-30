import { useState } from "react";
import { Button, Card, Col, Image, NavLink, Row } from "react-bootstrap";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import LoginForm from "../components/Login/LoginForm";
import RegistrationForm from "../components/Login/Register";

const Login_SignUp = () => {
  const [islogin, setislogin] = useState(true);
  return (
    <>
      <Header />
      <section className="container h-auto  d-flex align-items-center justify-content-center secLogin">
        <Card className=" noBorderCard shadow cardLogin">
          <Card.Body className="p-5">
            <Card.Title>
              <h3>
                <b>{islogin ? "Login" : "Get an account"}</b>
              </h3>
            </Card.Title>

            <Row className="py-4">
              <Col>{islogin ? <LoginForm /> : <RegistrationForm />}</Col>
            </Row>
            <Row className=" border-top py-2">
              <Col>{islogin ? "Or Login using" : "Or register using"}</Col>
            </Row>
            <Row>
              <Col sm={12} md={6} className="py-2">
                <div className="d-grid gap-2">
                  <Button
                    variant="outline-dark"
                    type="button"
                    className="btn  btn-sm btnCustomOutline  rounded-0"
                  >
                    <Image width="24px" height="24px" src="/google.png" /> Tu
                    cuenta de Google
                  </Button>
                </div>
              </Col>

              <Col sm={12} md={6} className="py-2">
                <div className="d-grid gap-2">
                  <Button
                    type="button"
                    variant="outline-dark"
                    className="btn  btn-sm btnCustomOutline  rounded-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                      />
                    </svg>
                    &nbsp; Wallet
                  </Button>
                </div>
              </Col>
            </Row>
            <Row className="  py-2">
              <Col>
                {islogin ? "¿No tienes cuenta?" : "Already have an account?"}
              </Col>
            </Row>
            <Row>
              <Col>
                <NavLink
                  onClick={() => setislogin(!islogin)}
                  className="lnkSignUpLogin"
                >
                  <small>{islogin ? "Get an account" : "Login"}</small>
                </NavLink>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </section>
      <Footer />
    </>
  );
};

export default Login_SignUp;
