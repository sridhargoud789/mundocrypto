import ExpertTalk from "components/bootstrap/ExpertTalk";
import _ from "lodash";
import {
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Stack,
  Tab,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import {
  CourseCard,
  CourseSlider,
  GKAccordionDefault,
  GKAccordionPlus,
} from "widgets";

const objEstundent = [
  {
    title: "Estudiante",
    description: `Los estudiantes que no sepan utilizar la Inteligencia
    Artificial lo van a pasar mal. Por eso, vamos a daros toda esa
    información en este máster. No te quedes atrás, se más
    productivo y no seas rechazado en la búsqueda de empleo.`,
  },
  {
    title: "Programador",
    description: `   Es vital ya que te permite automatizar tareas complejas y
    mejorar la eficiencia en el procesamiento de datos. Además, te
    abre nuevas oportunidades de carrera en el campo de la IA y
    tecnologías relacionadas.`,
  },
  {
    title: "Data scientist",
    description: `Es crucial ya que mejora tus habilidades en análisis de datos,
    aumenta tu eficiencia, mejora tu toma de decisiones y te abre
    nuevas oportunidades de carrera en el campo de la ciencia de
    datos.`,
  },
  {
    title: "Empresario",
    description: `Porque te permite aprovechar al máximo la tecnología para
    mejorar la toma de decisiones y optimizar los procesos de
    negocio. La IA puede analizar grandes cantidades de datos y
    proporcionar información valiosa para mejorar la eficiencia y
    la rentabilidad. Además, mantenerse actualizado en la
    tecnología de IA es crucial para que te mantengas competitivo
    en el mercado.`,
  },
  {
    title: "Apasionado de la tecnología",
    description: `Es una oportunidad de estar al día con una de las tecnologías
    más avanzadas y en constante evolución. La IA tiene un impacto
    significativo en una variedad de industrias, desde la medicina
    hasta la fabricación, y conocer sobre ella permite comprender
    su alcance y potencial. Además, aprender sobre IA puede abrir
    nuevas oportunidades de carrera y permitir a un apasionado de
    la tecnología participar activamente en su desarrollo y
    aplicación.`,
  },
];

const objEstundent2 = [
  {
    title: "Personas con una idea, pero no saben cómo empezar",
    description: `Seguro que alguna vez habrás tenido una idea que, por casualidad, luego viste que fue exitosa. O, quizás tienes esa idea que puede ser el próximo éxito… Aquí aprenderás a tomar acción.`,
  },
  {
    title: "Personas que trabajan, pero también quieren iniciar un negocio",
    description: `Si tienes ganas de emprender y crear tu propio negocio, pero tienes obligaciones de trabajo que no te permiten dedicarte completamente a emprender, en este curso te enseñamos a diversificar tu tiempo para poder tomar acción desde el primer minuto.`,
  },
  {
    title: "Personas que buscan capital para empezar su negocio",
    description: `Si piensas que empezar a montar un negocio millonario, tienes que disponer de ese capital, estás equivocado. Aquí te enseñaremos estrategias para capitalizarte y escalar de la forma más eficiente`,
  },
  {
    title: "Emprendedores en un startup",
    description: `Si ya has empezado un negocio y no quieres quedarte atrás, además de reforzar tus habilidades y conocimientos para crecer tu startup y lograr éxito, este curso te será de ayuda.`,
  },
  {
    title:
      "Emprendedores con negocios existentes buscando crecer y facturar millones",
    description: `Si ya iniciaste tu negocio, pero aún no has logrado ganar mucho dinero, este curso te dará herramientas y claves para escalar tu negocio ahorrando costes y maximizando tus ganancias.`,
  },
];

const concepts = [
  "EMPRENDER DESDE CERO",
  "IDENTIFICAR OPORTUNIDADES DE NEGOCIO",
  "EVALUAR UNA IDEA Y ANALIZAR EL MERCADO",
  "MEJORAR LA ESTRATEGIA EMPRESARIAL",
  "USAR HERRAMIENTAS FÁCILES PARA TI",
  "CÓMO OBTENER CAPITAL",
  "CÓMO ATRAER INVERSORES PARA TU IDEA",
  "ESCALAR TU NEGOCIO DE 0 A 1 MILLÓN",
  "ESCALAR TU NEGOCIO DE 1 MILLÓN A 50 MILLONES",
];

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

const Coursefulldetails = ({
  cdOBJ,
  lectures,
  totalVideosCount,
  totalVideosDuration,
  obj = [],
  CardPriceDetails = null,
  showOtherCourses = false,
  is_learning_page = false,
}) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <Container>
      {showOtherCourses && isMobile && <CardPriceDetails />}
      <Row>
        <Col
          lg={is_learning_page ? 12 : 8}
          md={12}
          sm={12}
          className="mb-4 mb-lg-0"
        >
          <Tab.Container defaultActiveKey={"description"}>
            <Card className="noBorderCard">
              {showOtherCourses && (
                <>
                  <Card.Header className="cd-detailsContentTitle noBorderCard">
                    Contenido
                  </Card.Header>
                  <Card.Body className="noBorderCard">
                    <Card.Text className="pb-0">
                      <div className="d-flex">
                        {/* {cdOBJ.id === 56 ? (
                          <div className="p-2">
                            9 formaciones • +350 clases • +200horas
                          </div>
                        ) : (
                          <div className="p-2">
                            {lectures.length} formaciones • {totalVideosCount}{" "}
                            lectures • {cdOBJ.custom_field_3}Horas
                          </div>
                        )} */}
                        <div className="p-2">
                          {cdOBJ.total_modules} formaciones • {totalVideosCount}{" "}
                          lectures • {cdOBJ.custom_field_3}Horas
                        </div>
                      </div>
                    </Card.Text>
                    {!_.isEmpty(lectures) && (
                      <GKAccordionDefault
                        accordionItems={lectures}
                        itemclassName="px-0 pt-2"
                      />
                    )}
                  </Card.Body>
                </>
              )}
              {!_.isEmpty(cdOBJ.custom_field_2) && (
                <>
                  <Card.Header className="cd-detailstitles noBorderCard pt-6">
                    Descripción del {cdOBJ.name}
                  </Card.Header>
                  <Card.Body>
                    <Row className="pb-4">
                      <Col lg={12} md={12} sm={12}>
                        <ListGroup bsPrefix="list-unstyled" variant="flush">
                          {JSON.parse(cdOBJ.custom_field_2).map((d, i) => (
                            <ListGroup.Item
                              bsPrefix=" "
                              className="d-flex"
                              key={i}
                            >
                              <i className="fa fa-check  text-dark me-4 mt-1"></i>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: d,
                                }}
                              ></p>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </Col>
                    </Row>
                    <hr className="cd-detailsHR " />
                  </Card.Body>
                </>
              )}
              {showOtherCourses && (
                <>
                  {" "}
                  <Card.Header className="cd-detailstitles noBorderCard pt-2">
                    Los estudiantes también compraron
                  </Card.Header>
                  <Card.Body>
                    {!_.isEmpty(obj) &&
                      obj.map((item, index) => (
                        <>
                          <div className="item px-md-1" key={item.id}>
                            <CourseCard
                              key={index}
                              item={item}
                              viewby="smalllist"
                            />
                          </div>
                        </>
                      ))}
                    <hr className="cd-detailsHR mt-3" />
                  </Card.Body>
                </>
              )}
              {cdOBJ.id === 38 && (
                <>
                  <Card.Header className="cd-detailstitles noBorderCard pt-2">
                    Expertos y profesores
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6} sm={12}>
                        <ListGroup bsPrefix="list-unstyled" variant="flush">
                          <ListGroup.Item bsPrefix=" " className="d-flex">
                            <i className="fa fa-check  text-dark me-4 mt-1"></i>
                            <p>
                              Los profesores son expertos en sus respectivos
                              campos y cuentan con amplia experiencia en todo lo
                              que engloba la IA.
                            </p>
                          </ListGroup.Item>
                          <ListGroup.Item bsPrefix=" " className="d-flex">
                            <i className="fa fa-check  text-dark me-4 mt-1"></i>
                            <p>
                              Por lo tanto, están altamente capacitados para
                              enseñar los fundamentos de la IA, habilidades de
                              programación y aplicaciones avanzadas.
                            </p>
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                      <Col md={6} sm={12}>
                        <ListGroup bsPrefix="list-unstyled" variant="flush">
                          <ListGroup.Item bsPrefix=" " className="d-flex">
                            <i className="fa fa-check  text-dark me-4 mt-1"></i>
                            <p>
                              Todos ellos tienen un Doctorado en campos
                              relacionados y han trabajado en proyectos y
                              aplicaciones de la IA.
                            </p>
                          </ListGroup.Item>
                          <ListGroup.Item bsPrefix=" " className="d-flex">
                            <i className="fa fa-check  text-dark me-4 mt-1"></i>
                            <p>
                              Además, están comprometidos en proporcionar una
                              educación de alta calidad y en guiar a los
                              estudiantes a lo largo de todo el proceso de
                              aprendizaje.
                            </p>
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                    </Row>
                    <Row className="mt-3 justify-content-md-center ">
                      <Col md={12} className="justify-content-center d-flex">
                        <Stack
                          direction={isMobile ? "vertical" : "horizontal"}
                          className={isMobile ? "align-items-center" : ""}
                          gap={3}
                        >
                          <div
                            className={`d-flex flex-column align-items-center p-4 cd-instructorbpx${
                              isMobile ? "_mobile" : ""
                            }`}
                          >
                            <img
                              src="/images/psanchez.jpg"
                              style={{ borderRadius: "50%" }}
                              width={isMobile ? 200 : 100}
                            />{" "}
                            <span className=" cd-instrucTitle">
                              Pablo Sánchez
                            </span>
                            <span className="cd-instrucSubTitle pt-2 ">
                              Ph.D. Student
                            </span>
                          </div>
                          <div
                            className={`d-flex flex-column align-items-center p-4 cd-instructorbpx${
                              isMobile ? "_mobile" : ""
                            }`}
                          >
                            <img
                              src="/images/dbaptista.jpg"
                              style={{ borderRadius: "50%" }}
                              width={isMobile ? 200 : 100}
                            />{" "}
                            <span className="pt-2 cd-instrucTitle">
                              Diego Baptista
                            </span>
                            <span className="cd-instrucSubTitle pt-2 ">
                              Ph.D. Student
                            </span>
                          </div>
                          <div
                            className={`d-flex flex-column align-items-center p-4 cd-instructorbpx${
                              isMobile ? "_mobile" : ""
                            }`}
                          >
                            <img
                              src="/images/ipeis.jpg"
                              style={{ borderRadius: "50%" }}
                              width={isMobile ? 200 : 100}
                            />{" "}
                            <span className="  pt-2 cd-instrucTitle">
                              Ignacio Peis
                            </span>
                            <span className="cd-instrucSubTitle pt-2">
                              Ph.D. Student
                            </span>
                          </div>
                        </Stack>
                      </Col>
                    </Row>
                    <div
                      className="mt-4"
                      style={{ backgroundColor: "rgb(242, 249, 255)" }}
                    >
                      <Row className="text-center">
                        <Col>
                          <h2 className="mt-4 cd-evaluationTitle">
                            Evaluación
                          </h2>
                          <p className="cd-evaluationdesc">
                            Para garantizar que los estudiantes tengan un sólido
                            dominio de los conceptos y habilidades enseñadas en
                            el curso, se realizará un{" "}
                            <b>examen al final del curso.</b>
                          </p>
                          <p className="cd-evaluationdesc">
                            Además, para ayudar a los estudiantes a prepararse
                            para el examen, se llevarán a cabo varias{" "}
                            <b>sesiones de preparación</b> a lo largo del curso.
                            Durante estas sesiones, se discutirán los temas
                            claves del curso, se resolverán preguntas frecuentes
                            y se practicarán ejercicios similares a los del
                            examen.
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                </>
              )}
              {cdOBJ.id === 57 && (
                <>
                  <Card.Header className="cd-detailstitles noBorderCard pt-2">
                    Cuerpo Docente: Expertos en Criptomonedas y Blockchain
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6} sm={12}>
                        <ListGroup bsPrefix="list-unstyled" variant="flush">
                          <ListGroup.Item bsPrefix=" " className="d-flex">
                            <i className="fa fa-check  text-dark me-4 mt-1"></i>
                            <p>
                              Nuestro equipo docente está compuesto por
                              destacadas figuras en el mundo de las
                              criptomonedas y la tecnología Blockchain, cada uno
                              de ellos con una profunda experiencia en sus
                              respectivas áreas de especialización. Estos
                              profesionales no solo poseen un amplio
                              conocimiento en el campo de las monedas digitales
                              y la tecnología descentralizada, sino que también
                              cuentan con una rica experiencia práctica,
                              garantizando así una educación completa y de
                              vanguardia.
                            </p>
                          </ListGroup.Item>
                          <ListGroup.Item bsPrefix=" " className="d-flex">
                            <i className="fa fa-check  text-dark me-4 mt-1"></i>
                            <p>
                              Los instructores de nuestro programa son titulares
                              de Doctorados en campos relacionados con las
                              criptomonedas y Blockchain, y han participado
                              activamente en proyectos innovadores y
                              aplicaciones prácticas en este sector. Su
                              experiencia abarca desde el desarrollo técnico
                              hasta las estrategias de inversión y la regulación
                              en el mundo de las criptomonedas.
                            </p>
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                      <Col md={6} sm={12}>
                        <ListGroup bsPrefix="list-unstyled" variant="flush">
                          <ListGroup.Item bsPrefix=" " className="d-flex">
                            <i className="fa fa-check  text-dark me-4 mt-1"></i>
                            <p>
                              Además, están profundamente comprometidos con
                              brindar una educación de alta calidad, centrada en
                              el estudiante. Se dedican a guiar a los
                              estudiantes a través del proceso de aprendizaje,
                              asegurándose de que cada uno desarrolle las
                              habilidades y conocimientos necesarios para
                              sobresalir en este emocionante y dinámico campo.
                            </p>
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                    </Row>
                    <Row className="mt-3 justify-content-md-center ">
                      <Col md={12} className="justify-content-center d-flex">
                        <Stack
                          direction={isMobile ? "vertical" : "horizontal"}
                          className={isMobile ? "align-items-center" : ""}
                          gap={3}
                        >
                          <div
                            className={`d-flex flex-column align-items-center p-4 cd-instructorbpx${
                              isMobile ? "_mobile" : ""
                            }`}
                          >
                            <img
                              src="/images/psanchez.jpg"
                              style={{ borderRadius: "50%" }}
                              width={isMobile ? 200 : 100}
                            />{" "}
                            <span className=" cd-instrucTitle">
                              Pablo Sánchez
                            </span>
                            <span className="cd-instrucSubTitle pt-2 ">
                              Ph.D. Student
                            </span>
                          </div>
                          <div
                            className={`d-flex flex-column align-items-center p-4 cd-instructorbpx${
                              isMobile ? "_mobile" : ""
                            }`}
                          >
                            <img
                              src="/images/dbaptista.jpg"
                              style={{ borderRadius: "50%" }}
                              width={isMobile ? 200 : 100}
                            />{" "}
                            <span className="pt-2 cd-instrucTitle">
                              Diego Baptista
                            </span>
                            <span className="cd-instrucSubTitle pt-2 ">
                              Ph.D. Student
                            </span>
                          </div>
                          <div
                            className={`d-flex flex-column align-items-center p-4 cd-instructorbpx${
                              isMobile ? "_mobile" : ""
                            }`}
                          >
                            <img
                              src="/images/ipeis.jpg"
                              style={{ borderRadius: "50%" }}
                              width={isMobile ? 200 : 100}
                            />{" "}
                            <span className="  pt-2 cd-instrucTitle">
                              Ignacio Peis
                            </span>
                            <span className="cd-instrucSubTitle pt-2">
                              Ph.D. Student
                            </span>
                          </div>
                        </Stack>
                      </Col>
                    </Row>
                  </Card.Body>
                </>
              )}
              {cdOBJ.id === 55 && (
                <Card.Body>
                  <div className=" mt-2">
                    <Row className="justify-content-md-center">
                      <Col lg={12} md={12} sm={12} className="mb-3">
                        <div className="d-flex flex-column align-items-center">
                          <img
                            className="img-fluid"
                            src="/images_optimized/mani_profilepic2.jpg"
                          />{" "}
                          <span
                            className="fs-3 pt-6 fw-bold"
                            style={{ color: "#000000" }}
                          >
                            Mani Thawani
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div
                    className="mt-4"
                    style={{ backgroundColor: "rgb(242, 249, 255)" }}
                  >
                    <Row className="text-center">
                      <Col>
                        <h2 className="mt-4 cd-evaluationTitle">
                          ACERCA DE MANI THAWANI
                        </h2>
                        <p className="cd-evaluationdesc">
                          Tras el éxito de Mundo Crypto, Mani se ha convertido
                          en una figura destacada en el mundo empresarial. En
                          solo 5 años, logró convertir la academia en líder de
                          su campo y alcanzó una valoración actual de 46
                          millones de dólares. Actualmente, gestiona empresas de
                          comercio online, fondeos, marketing, academias y
                          colabora con gobiernos y empresas internacionales. A
                          la edad de 30 años, ganó el premio como "Emprendedor
                          del Año" en la reconocida revista "Entrepreneur" en el
                          Medio Oriente y África, y sigue expandiéndose
                          internacionalmente hacia América.
                        </p>
                        <p className="cd-evaluationdesc">
                          Su visión y pasión por el emprendimiento lo llevaron a
                          crear el curso "Dinero Desbloqueado", con el objetivo
                          de ayudar a mucha gente a alcanzar sus sueños.
                        </p>
                        <p className="cd-evaluationdesc">
                          Mani Thawani cree firmemente que todos pueden
                          convertir una idea en un negocio exitoso, y está
                          decidido a mostrar a otros que también pueden
                          lograrlo, tal como él lo ha hecho.
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              )}
              {cdOBJ.id === 56 && (
                <Card.Body>
                  <div className=" mt-2">
                    <Row className="justify-content-md-center">
                      <Col lg={12} md={12} sm={12} className="mb-3">
                        <div className="d-flex flex-column align-items-center">
                          <img
                            className="img-fluid"
                            src="/images_optimized/pako_thawani_cropped.png"
                          />{" "}
                          <span
                            className="fs-3 pt-6 fw-bold"
                            style={{ color: "#000000" }}
                          >
                            PAKO THAWANI
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div
                    className="mt-4"
                    style={{ backgroundColor: "rgb(242, 249, 255)" }}
                  >
                    <Row className="text-center">
                      <Col>
                        <h2 className="mt-4 cd-evaluationTitle">
                          ACERCA DE PAKO THAWANI
                        </h2>
                        <p className="cd-evaluationdesc">
                          De trabajar en una tienda de ropa a generar +10
                          millones de dólares con el trading. Pako Thawani,
                          trader profesional y co-fundador de MundoCrypto,
                          después de su gran éxito con los mercados, creó un
                          moine y presencial, los cuales han conseguido cuentas
                          de fondeo y consvimiento de ejército de traders bajo
                          el nombre “La Élite del Trading”. Ha formado a miles
                          de alumnos de forma onlistencia en sus resultados.
                        </p>
                        <p className="cd-evaluationdesc">
                          Su pasado, experiencia y cercanía con sus alumnos a lo
                          largo del camino lo llevaron a crear el Máster de la
                          Élite del Trading, con el objetivo de ayudar a mucha
                          gente a alcanzar sus sueños, cumpliendo así también,
                          el suyo.
                        </p>
                        <p className="cd-evaluationdesc">
                          Pako Thawani cree firmemente que todos pueden
                          conseguir dedicarse al trading, y está decidido a
                          mostrar a otros que también pueden lograrlo, tal como
                          él lo ha hecho.
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              )}
              <Card.Header className="cd-detailstitles noBorderCard pt-2">
                {cdOBJ.id === 55 && <span>¿Quién Puede Participar?</span>}
                {cdOBJ.id === 38 && (
                  <span>
                    Este máster en inteligencia artificial es para ti si eres…
                  </span>
                )}
              </Card.Header>
              <Card.Body>
                <Row>
                  {cdOBJ.id === 55 &&
                    objEstundent2.map((d, i) => (
                      <Col md={12} sm={12} className="pb-4" key={i}>
                        <Card className="cd-astudentCard noBorderCard">
                          <Card.Body className="cd-estudentadesc">
                            <h2 className="cd-estudentatitle cd-astudentCard noBorderCard pb-2">
                              {d.title}
                            </h2>
                            {d.description}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  {cdOBJ.id === 38 &&
                    objEstundent.map((d, i) => (
                      <Col md={12} sm={12} className="pb-4" key={i}>
                        <Card className="cd-astudentCard noBorderCard">
                          <Card.Body className="cd-estudentadesc">
                            <h2 className="cd-estudentatitle cd-astudentCard noBorderCard pb-2">
                              {d.title}
                            </h2>
                            {d.description}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                </Row>
                <Row className={`pb-4 ${isMobile ? "text-center" : ""}`}>
                  <Col>
                    <ExpertTalk
                      variant="primary"
                      classnames="btn_homeBanner btn-sm fs-6"
                      btnText="pages.doubts_button"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Solicita información gratuita y sin compromiso.
                    Contactaremos contigo en tu horario preferido. Tarjeta de
                    crédito no requerida.
                  </Col>
                </Row>
                {cdOBJ.id === 38 && (
                  <>
                    <Row
                      className="p-2 mt-4"
                      style={{ backgroundColor: "rgb(242, 249, 255)" }}
                    >
                      <Col
                        md={4}
                        sm={12}
                        className="p-4 d-flex justify-content-center"
                      >
                        <Image
                          src="/images_optimized/wearehiring.png"
                          width={150}
                        />
                      </Col>
                      <Col md={8} sm={12} className="p-4">
                        <h2 className="mb-2 mb-3 cd-hiring">
                          Bolsa de Trabajo Mundocrypto
                        </h2>
                        <p>
                          Accede a la bolsa de trabajo de Mundocrypto. Contamos
                          con una red de decenas de empresas y clientes, y
                          conocemos, de primera mano, las demandas del mercado.
                        </p>
                      </Col>
                    </Row>
                    <Row
                      className="mt-4"
                      style={{ backgroundColor: "#F8F8F8" }}
                    >
                      <Col>
                        <Row className="text-center pt-4">
                          <Col>
                            <img
                              width={80}
                              className="text-primary"
                              src="/images_optimized\aiicons/Doubts.svg"
                            />
                            <h2 className="mt-4 cd-resuelveTitle">
                              Resuelve todas tus Dudas Gracias a Nuestro Sistema
                              de Atención Personalizada{" "}
                            </h2>
                            <p>
                              Gracias a la atención online personalizada, podrás
                              avanzar constantemente, y mantener una alta
                              motivación.
                            </p>
                          </Col>
                        </Row>
                        <Row className="text-center pt-4">
                          <Col>
                            <div className="d-flex align-items-center">
                              <h3 className="mt-2 d-flex align-items-center cd-resuelveSubTitle">
                                Acelera tu aprendizaje IA con tutorías en
                                directo y apoyo en el examen{" "}
                              </h3>
                            </div>
                            <p>
                              Participarás en una tutoría grupal, con el resto
                              de participantes del máster de inteligencia
                              artificial. Se trata de un elemento clave para
                              mantener tu foco y asentar los conocimientos
                              adquiridos.{" "}
                            </p>
                            <div className="d-flex align-items-center">
                              <h3 className="mt-2 d-flex align-items-center cd-resuelveSubTitle">
                                Feedback profesional
                              </h3>
                            </div>
                            <p>
                              Recibe feedback profesional en los ejercicios y
                              casos de estudio planteados durante el programa.
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </>
                )}
              </Card.Body>

              {cdOBJ.id === 38 && (
                <>
                  <Card.Header className="cd-detailstitles noBorderCard pt-2">
                    VENTAJAS DEL MÁSTER DE IA
                  </Card.Header>
                  <Card.Body>
                    <Row className="mb-3">
                      <Col lg={12} md={12} sm={12}>
                        <ListGroup bsPrefix="list-unstyled" variant="flush">
                          <ListGroup.Item bsPrefix=" " className="d-flex">
                            <p>
                              <h3 className="cd-ventajasSubTitle">
                                LEARN-TO-EARN - L2E
                              </h3>
                              <p>
                                El modelo L2E se ha creado para abordar el
                                problema de la alta tasa de abandono en los
                                cursos en línea. Según nuestras estadísticas,
                                menos del 10% de los estudiantes que comienzan
                                un curso en línea lo terminan.
                              </p>
                              <p>
                                Para abordar este problema, queremos{" "}
                                <b>
                                  motivar a los estudiantes a aprender y ser
                                  recompensados
                                </b>{" "}
                                mientras lo hacen. Nuestro modelo incentiva a
                                los nuevos usuarios a aprender tanto como sea
                                posible al mismo tiempo que les brinda la
                                posibilidad de{" "}
                                <b>ganar recompensas en el proceso.</b>
                              </p>
                            </p>
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                      <ListGroup.Item bsPrefix=" " className="d-flex">
                        <p>
                          <h3 className="cd-ventajasSubTitle">
                            PLATAFORMA ONLINE
                          </h3>
                          <p>
                            Con nuestra plataforma de aprendizaje en línea,
                            tendrás la flexibilidad de acceder a los cursos{" "}
                            <b>desde cualquier lugar y en cualquier momento</b>{" "}
                            que desees. No tendrás que preocuparte por asistir a
                            clases en persona o ajustar tu horario para
                            adaptarse a las lecciones.
                          </p>
                        </p>
                      </ListGroup.Item>
                      <ListGroup.Item bsPrefix=" " className="d-flex">
                        <p>
                          <h3 className="cd-ventajasSubTitle">METODOLOGÍA</h3>
                          <p>
                            El enfoque metodológico del proceso de formación en
                            línea está
                            <b> completamente centrado en el estudiante.</b>
                          </p>
                          <p>
                            Uno de los beneficios de estudiar en MundoCrypto es
                            que el estudiante puede decidir el horario que le
                            convenga más y puede estudiar a su propio ritmo.
                          </p>
                        </p>
                      </ListGroup.Item>
                      <ListGroup.Item bsPrefix=" " className="d-flex">
                        <p>
                          <h3 className="cd-ventajasSubTitle">
                            COMUNIDAD EXCLUSIVA
                          </h3>
                          <p>
                            Como parte de nuestro compromiso con el éxito de
                            nuestros alumnos, ofrecemos a nuestros estudiantes
                            una comunidad exclusiva donde pueden{" "}
                            <b>
                              conectarse con otros estudiantes y profesionales
                            </b>{" "}
                            en su campo de estudio.
                          </p>
                          <p>
                            La comunidad es un espacio seguro donde pueden hacer{" "}
                            <b>preguntas, colaborar</b> en proyectos y{" "}
                            <b>recibir actualizaciones</b> del curso.
                          </p>
                          <p>
                            Es una fuente de <b>motivación y apoyo</b> para los
                            estudiantes, y les ayuda a{" "}
                            <b>
                              obtener una perspectiva global y mantenerse
                              actualizados
                            </b>{" "}
                            en su área de estudio.
                          </p>
                        </p>
                      </ListGroup.Item>
                    </Row>
                    <Row className={`pb-4 ${isMobile ? "text-center" : ""}`}>
                      <Col>
                        <ExpertTalk
                          variant="primary"
                          classnames="btn_homeBanner btn-sm fs-6"
                          btnText="pages.doubts_button"
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </>
              )}
              {cdOBJ.id === 55 && (
                <>
                  <Card.Header className="cd-detailstitles noBorderCard pt-2">
                    CONCEPTOS CLAVE
                  </Card.Header>
                  <Card.Body>
                    <Row className="mb-3">
                      <Col lg={12} md={12} sm={12}>
                        <ListGroup bsPrefix="list-unstyled" variant="flush">
                          {concepts.map((d, i) => (
                            <ListGroup.Item
                              bsPrefix=" "
                              className="d-flex"
                              key={i}
                            >
                              <i className="fa fa-check  text-dark me-4 mt-1"></i>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: d,
                                }}
                              ></p>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </Col>
                    </Row>
                  </Card.Body>
                </>
              )}
              {cdOBJ.id === 38 && (
                <>
                  <Card.Header className="cd-detailstitles noBorderCard pt-2">
                    Preguntas Frecuentes
                  </Card.Header>
                  <Card.Body>
                    <Row className="justify-content-center">
                      <Col lg={12} md={12} sm={12}>
                        <GKAccordionPlus
                          accordionItems={faqlst}
                          item
                          className="px-0"
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </>
              )}
            </Card>
          </Tab.Container>
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

export default Coursefulldetails;
