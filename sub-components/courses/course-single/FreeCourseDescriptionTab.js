// import node module libraries
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { CourseSlider } from "widgets";

const faqlst = [
  {
    id: 1,
    title: `¿Qué nivel de conocimientos se requieren para tomar el curso de IA?`,
    content: `No se requiere conocimiento previo en programación o matemáticas
  avanzadas. Sin embargo, es recomendable tener un nivel de conocimientos
  básicos en ambos temas.`,
  },
  {
    id: 2,
    title: `¿Cómo se estructura el curso?`,
    content: ` El curso está estructurado en módulos temáticos, que van desde la
    introducción de la IA, hasta temas más avanzados y fundamentos complejos
    aplicados al campo.`,
  },
  {
    id: 3,
    title: `¿Cuánto tiempo tengo para completar el curso?`,
    content: `Tendrás acceso vitalicio al curso. El tiempo necesario para completar el
    curso dependerá de tu disponibilidad y de cuánto tiempo dediques a
    estudiar cada semana.`,
  },
  {
    id: 4,
    title: `¿Se otorga algún certificado al finalizar el curso?`,
    content: `Sí, se otorgará un certificado al completar con éxito el curso. Este
    certificado lo podrás agregar a tu currículum o portafolio.`,
  },
  {
    id: 5,
    title: `¿Cómo se imparten las lecciones?`,
    content: `Las lecciones se imparten en directo a través de vídeos, diapositivas,
    ejercicios y discusiones en grupo. Los profesores también estarán
    disponibles para responder preguntas y proporcionar asistencia.`,
  },
  {
    id: 6,
    title: `¿Qué oportunidades laborales ofrece este curso?`,
    content: `El campo de la IA es uno de los que más demanda laboral tiene en la
    actualidad. Al completar el curso, tendrás la oportunidad de postularte
    a trabajos en empresas relacionadas con la IA o que estén buscando
    aplicar esta tecnología en sus actividades laborales.`,
  },
  {
    id: 7,
    title: `¿Qué sucede si tengo dificultades técnicas durante el curso?`,
    content: `Si tienes alguna dificultad técnica, nuestro equipo de soporte técnico
    estará disponible para ayudarte a resolver el problema.`,
  },
  {
    id: 8,
    title: `¿Puedo unirme a la comunidad exclusiva de alumnos si no adquiero el
    curso?`,
    content: `La comunidad exclusiva de alumnos está reservada para los alumnos que
    formen parte del curso.`,
  },
];
const FreeCourseDescriptionTab = ({
  data,
  showOtherCourses = false,
  is_learning_page = false,
  CardPriceDetails,
}) => {
  const { t } = useTranslation();

  console.log(data);
  const {
    Description_1,
    Description_2,
    Description_3,
    Description_4,
    Description_5,
  } = data;

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return (
    <Container>
      <Row>
        <Col
          lg={is_learning_page ? 12 : 8}
          md={12}
          sm={12}
          className="mb-4 mb-lg-0"
        >
          <Card>
            <Card.Body>
              <div style={{ backgroundColor: "#F2F9FF" }}>
                <h2 className="mb-2 pt-4">{Description_1.Title}</h2>
                <Row className="mb-3">
                  <Col lg={12} md={12} sm={12}>
                    <ListGroup bsPrefix="list-unstyled" variant="flush">
                      {!_.isEmpty(Description_1.descriptions) &&
                        Description_1.descriptions.map((d, i) => (
                          <ListGroup.Item
                            bsPrefix=" "
                            key={i}
                            className="d-flex mb-2"
                          >
                            <i className="far fa-check-circle text-success me-2 mt-2"></i>
                            <p>{d}</p>
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  </Col>
                </Row>
              </div>
              <div className="mt-4" style={{ backgroundColor: "#F7E9C3" }}>
                <Row className="text-center">
                  <Col>
                    <h2 className="mt-4">{Description_2.Title}</h2>
                    {!_.isEmpty(Description_2.descriptions) &&
                      Description_2.descriptions.map((d, i) => (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: d,
                          }}
                        ></p>
                      ))}
                  </Col>
                </Row>
              </div>
              <div>
                <h2 className="mb-2  pt-4">{Description_3.Title}</h2>
                <Row className="mb-3">
                  <Col lg={12} md={12} sm={12}>
                    <ListGroup bsPrefix="list-unstyled" variant="flush">
                      {!_.isEmpty(Description_3.descriptions) &&
                        Description_3.descriptions.map((d, i) => (
                          <ListGroup.Item
                            bsPrefix=" "
                            key={i}
                            className="d-flex"
                          >
                            <p>
                              <h3 className="fs-4">
                                <b>{d.title}</b>
                              </h3>
                              {d.description}
                            </p>
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  </Col>
                </Row>
              </div>
              <div className="mt-4" style={{ backgroundColor: "#F2F9FF" }}>
                <Row className="">
                  <h2 className="mb-2 mt-5 ">{Description_4.Title}</h2>
                  <ListGroup bsPrefix="list-unstyled" variant="flush">
                    {!_.isEmpty(Description_4.descriptions) &&
                      Description_4.descriptions.map((d, i) => (
                        <ListGroup.Item
                          bsPrefix=" "
                          key={i}
                          className="d-flex mb-2"
                        >
                          <i className="far fa-check-circle text-success me-2 mt-2"></i>
                          <p>{d}</p>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </Row>
              </div>

              <div className="mt-4" style={{ backgroundColor: "#D1F5EA" }}>
                <Row className="text-center pt-4">
                  <Col>
                    <p>{Description_5.descriptions}</p>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {showOtherCourses && (
          <>
            {(isDesktop || isLaptop) && (
              <Col
                lg={4}
                md={12}
                sm={12}
                className="mt-lg-n22 courserightdetails sticky-top"
              >
                <CardPriceDetails />
              </Col>
            )}

            <div className="pt-5">
              <h2 className="mb-1">{t("pages.outstanding_courses")}</h2>
              {/* <p className="">
                    Obtén recompensas con el nuevo modelo educativo Learn to
                    Earn en la plataforma educativa de Mundo Crypto.
                  </p> */}
              <CourseSlider recommended={true} />
            </div>
          </>
        )}
      </Row>
    </Container>
  );
};
export default FreeCourseDescriptionTab;
