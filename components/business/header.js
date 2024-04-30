import Link from "next/link";
import { useState } from "react";
import { Breadcrumb, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Check } from "react-feather";
import ModalVideo from "react-modal-video";
const BusinessHeader = () => {
  const [isOpen, setOpen] = useState(false);
  const [YouTubeURL] = useState("NH6VEALWFTY");

  return (
    <>
      <div className="mb-4 mb-xl-0 text-center text-md-start">
        <Breadcrumb className="breadcrumbtext_b2b pb-4">
          <Breadcrumb.Item className="breadcrumbtext_b2b" href="/">
            Todos
          </Breadcrumb.Item>
          <Breadcrumb.Item className="breadcrumbtext_b2b" active>
            Instructors
          </Breadcrumb.Item>
        </Breadcrumb>
        {/*  Caption  */}
        <h4 className="b2b-header mb-3">Academia para Empresas B2B</h4>
        <p className="mb-4 b2b-headerdesc">
          Mejora las habilidades de tus empleados, estudiantes o ciudadanos para
          destacar y progresar en la economía gracias a las criptomonedas, la
          web3 y la tecnología blockchain.
        </p>
        <hr style={{ backgroundColor: "#1C1D1F", opacity: "0.3" }} />
        {/*  List  */}
        <h4 className="mb-3 b2binfoHeader">
          El entrenamiento para empresas o países incluye:
        </h4>
        <div className="mb-6 mb-0">
          <ListGroup bsPrefix="list-unstyled fs-4 ">
            <ListGroup.Item bsPrefix="mb-2 text-black-50">
              <span className="me-2 ">
                <Check size="18" className="me-1 text-dark" />
              </span>
              <span className="b2binfoHeader-points">
                Diseño y construcción de contenido para la capacitación y
                desarrollo de habilidades en el ecosistema cripto.
              </span>
            </ListGroup.Item>
            <ListGroup.Item bsPrefix="mb-2 text-black-50">
              <span className="me-2 ">
                <Check size="18" className="me-1 text-dark" />
              </span>
              <span className="b2binfoHeader-points">
                Ofrece contenido más actualizado de la mano de profesionales y
                profesores de la academia con mayor experiencia en estudiantes
                hispanohablantes.
              </span>
            </ListGroup.Item>
            <ListGroup.Item bsPrefix="mb-2 text-black-50">
              <span className="me-2 ">
                <Check size="18" className="me-1 text-dark" />
              </span>
              <span className="b2binfoHeader-points">
                Proporcionar tanto aprendizaje teórico como práctico con
                ejemplos guiados.
              </span>
            </ListGroup.Item>
            <ListGroup.Item bsPrefix="mb-2 text-black-50">
              <span className="me-2 ">
                <Check size="18" className="me-1 text-dark" />
              </span>
              <span className="b2binfoHeader-points">
                Seguimiento riguroso por parte del equipo Mundocrypto, tanto por
                parte de los profesores como de profesionales de la industria, y
                un soporte especializado.
              </span>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
      <Row>
        <Col md={12} sm={12}>
          <Card>
            <div className="p-1">
              <div className="d-flex justify-content-center position-relative rounded py-10 border-white border rounded-3 b2bVideoBG">
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
              autoplay={true}
              isOpen={isOpen}
              url="https://mundocrypto-files.s3.eu-central-1.amazonaws.com/homepage/McB2bacademy.mp4"
              onClose={() => setOpen(false)}
            />
            <Card.Body>
              {/* Price single page */}
              <div className="mb-3">
                <span className="text-dark fw-bold h2 me-2">$600</span>
                <del className="fs-4 text-muted">$750</del>
              </div>
              {false && (
                <div className="d-grid">
                  <Link href="#">
                    <a className="btn btn-primary mb-2  ">
                      Comenzar el mes gratis
                    </a>
                  </Link>
                  <Link href="/marketing/pages/pricing/">
                    <a className="btn btn-outline-primary">Acceso completo</a>
                  </Link>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BusinessHeader;
