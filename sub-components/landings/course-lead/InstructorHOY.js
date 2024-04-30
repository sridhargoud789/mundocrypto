import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

const InstructorHOY = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div style={{ backgroundColor: "rgba(245, 245, 245, 1)", color: "black" }}>
      <Container className="p-2">
        <Row className={` ${isMobile ? "text-center" : "p-2"}`}>
          <Col md={4} sm={12} className="p-4">
            <Image
              src="/images_optimized/Mask group.png"
              width={isMobile ? 350 : 300}
            />
          </Col>
          <Col md={8} sm={12} className="p-6">
            <h2 className="mb-2 mb-3 instructorHOYTitle">
              Conviértete en instructor HOY
            </h2>
            <p>
              Expertos de todo el mundo están empoderando a miles de alumnos en
              MundoCrypto. Te ofrecemos las herramientas y habilidades para
              compartir tu pasión y, a su vez, obtener recompensas en el
              proceso.
            </p>
            <Button
              className="btn btn-primary btn-sm mb-5 mt-5 px-10 fs-3"
              style={{ backgroundColor: "#00629B", borderColor: "transparent" }}
              href="/Business"
            >
              Quiero ser Instructor
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InstructorHOY;
