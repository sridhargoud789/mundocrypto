// import node module libraries
import { useState } from "react";
import { Button, Col, Container, Image, Modal, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { GKAccordionPlus } from "widgets";

const faqlst = [
  {
    id: 1,
    title: `No puedo acceder a mi cuenta, ¿me pueden ayudar? `,
    content: `¡Claro! Escribenos en el correo electrónico Soporte@mundocrypto.com y te ayudarémos a solucionar el problema.
`,
  },
  {
    id: 2,
    title: `Los videos del curso no se reproducen correctamente. ¿Qué puedo hacer?`,
    content: `Lamentamos el inconveniente. ¿Podrías indicarme por el correo Soporte@mundocrypto.com qué navegador estás utilizando y si has probado en otro dispositivo?`,
  },
  {
    id: 3,
    title: `Realicé el pago, pero aún no tengo acceso al curso. ¿Pueden verificarlo?`,
    content: `¡Por supuesto! escribenos a este <a href="https://api.whatsapp.com/send/?phone=971588163253&text&type=phone_number&app_absent=0" target="_blank" >Whatsapp</a> de soporte y proporciona el ID de transacción.`,
  },
  {
    id: 4,
    title: `¿Cuándo se liberará el próximo módulo del curso?`,
    content: `Hola escribenos a este <a href="https://api.whatsapp.com/send/?phone=971588163253&text&type=phone_number&app_absent=0" target="_blank" >Whatsapp</a> de soporte `,
  },
  {
    id: 5,
    title: `Estoy tratando de acceder al curso desde mi tablet y tengo problemas.`,
    content: `¡Claro! Nuestra plataforma es compatible con tablets. ¿Podrías especificar el problema que encuentras para ayudarte mejor en este correo Soporte@mundocrypto.com?`,
  },
  {
    id: 6,
    title: `Me encantó el curso, pero creo que podrían mejorar X aspecto.`,
    content: `¡Gracias por tu feedback! Siempre estamos buscando mejorar. Tomaremos en cuenta tu comentario por favor escribenos en Info@mundocrypto.com.`,
  },
  {
    id: 7,
    title: `Puedo tener información de este curso.`,
    content: `Claro agende una llamada con nuestro agente.:<a href='https://calendly.com/mentoria-mani/mentoria-mani-1' target='_blank'>Calendly</a>`,
  },
  {
    id: 8,
    title: `No puedo publicar en el foro del curso. ¿Existe algún problema?`,
    content: `¡Lamentamos eso! Por favor, envíanos un screenshot del error que observas a este correo 
Soporte@mundocrypto.com.`,
  },
];
const Support = ({ data }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [modalShow, setModalShow] = useState(false);
  return (
    <div
      className=" py-4 shadow-sm pb-2"
      style={{ backgroundColor: "rgba(29, 147, 201, 0.2)", color: "black" }}
    >
      <Container>
        <Row
          className={`align-items-center p-4 ${isMobile ? "text-center" : ""}`}
        >
          <Col
            xl={8}
            md={8}
            sm={12}
            lg={8}
            className={`${isMobile ? "text-center" : "order-1"} text-dark`}
            style={{ color: "#ffff" }}
          >
            <h1 className="mb-2 mb-3 supportTitle">
              ¿Tienes dudas sobre las formaciones?
            </h1>
            <p className={`supportText  ${isMobile ? "" : "pe-6"}`}>
              Contáctanos y responderemos todas tus dudas sin compromiso.
            </p>
            {isMobile && (
              <>
                <br />
              </>
            )}
            <Button
              variant="outline-secondary"
              className="rounded-0 text-dark"
              onClick={() => setModalShow(true)}
            >
              Quiero Ayuda
            </Button>
            <Modal
              show={modalShow}
              size="lg"
              onHide={() => setModalShow(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Soporte</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <GKAccordionPlus
                  accordionItems={faqlst}
                  item
                  className="px-0"
                />
              </Modal.Body>
            </Modal>
            {isMobile && (
              <>
                <br />
              </>
            )}
          </Col>
          {/*  Img  */}
          <Col
            md={4}
            sm={12}
            xs={12}
            lg={{ span: 3, order: 2 }}
            className={`mb-6 mb-lg-0 text-center ${isMobile ? "pt-8" : ""}`}
          >
            <Image
              src="/images_optimized/support.png"
              alt=""
              width={isMobile ? "350px" : "250px"}
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Support;
