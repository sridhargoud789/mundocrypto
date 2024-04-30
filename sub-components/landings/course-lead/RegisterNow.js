// import node module libraries
import { useRouter } from "next/router";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

const RegisterNow = ({ data }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const router = useRouter();
  return (
    <div
      className=" py-4 shadow-sm pb-2"
      style={{ backgroundColor: "#00629B", color: "white" }}
    >
      <Container>
        <Row className="align-items-center p-4">
          <Col
            xl={6}
            md={8}
            sm={12}
            lg={7}
            xs={12}
            className={`${isMobile ? "text-center" : "order-1"} text-white`}
            style={{ color: "#ffff" }}
          >
            <h1
              className={`mb-2 mb-3 homeregisterNowTitle ${
                isMobile ? "text-center" : ""
              }`}
            >
              Crea tu cuenta hoy y recibe Gratis estos PDF valorados en $ 200
              para invertir en tu educación.
            </h1>
            {isMobile && <br />}
            <a
              href="/authentication/sign-up"
              className={`fs-3 ${
                isMobile ? "homeregisterNowLink mt-6 " : "pe-6"
              }`}
            >
              REGISTRATE AHORA
            </a>
          </Col>
          {/*  Img  */}
          <Col
            md={6}
            sm={12}
            xs={12}
            lg={{ span: 5, order: 2 }}
            className={`mb-6 mb-lg-0 text-center ${isMobile ? " pt-4" : ""}`}
          >
            <Image
              src="/images_optimized/register_es.png"
              alt=""
              className="img-fluid"
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/authentication/sign-up")}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default RegisterNow;
