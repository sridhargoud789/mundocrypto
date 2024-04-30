import Fab from "@mui/material/Fab";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { GKAccordionPlus } from "widgets";
const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 150,
  left: "auto",
  paddingRight: "10px",
  position: "fixed",
};

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

export default function ContactUsFloating() {
  const { t } = useTranslation();
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Fab
        className="fabRewards"
        style={style}
        variant="extended"
        size="small"
        color="primary"
        aria-label="add"
        onClick={() => setModalShow(true)}
      >
        <img src="/images_optimized/customer-support-icon.jpg" width={20} />{" "}
        &nbsp; Soporte
      </Fab>
      <Modal show={modalShow} size="lg" onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Soporte</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <GKAccordionPlus accordionItems={faqlst} item className="px-0" />
        </Modal.Body>
      </Modal>
    </>
  );
}
