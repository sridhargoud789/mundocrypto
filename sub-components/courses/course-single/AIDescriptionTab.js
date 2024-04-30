// import node module libraries
import ExpertTalk from "components/bootstrap/ExpertTalk";
import { Fragment } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { GKAccordionPlus } from "widgets";

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
const AIDescriptionTab = (props) => {
  return (
    <Fragment>
      <Container style={{ backgroundColor: "#F2F9FF" }}>
        <h2 className="mb-2 pt-4">En esta formación vas a…</h2>
        <Row className="mb-3">
          <Col lg={12} md={12} sm={12}>
            <ListGroup bsPrefix="list-unstyled" variant="flush">
              <ListGroup.Item bsPrefix=" " className="d-flex mb-2">
                <i className="far fa-check-circle text-success me-2 mt-2"></i>
                <p>
                  Ser capaz de identificar las oportunidades y priorizar los
                  ámbitos de aplicación más rentables, así como desarrollar una
                  estrategia que genere beneficios para el negocio.{" "}
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex mb-2">
                <i className="far fa-check-circle text-success me-2 mt-2"></i>
                <p>
                  Dominar las principales herramienta de IA (Amazon suite,
                  ChatGPT, DALL-E 2, CopyAt, MidJourney, Synthesia io,
                  Streamlit, Weights and Biases.){" "}
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex mb-2">
                <i className="far fa-check-circle text-success me-2 mt-2"></i>
                <p>
                  Aprender los conceptos básicos y avanzados de la IA,
                  incluyendo aprendizaje automático y visión por computadora
                  para aplicarlos en la vida real.
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex mb-2">
                <i className="far fa-check-circle text-success me-2 mt-2"></i>
                <p>
                  Desarrollar tus propios modelos de IA y resolver problemas
                  complejos con la ayuda de la tecnología.
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex mb-2">
                <i className="far fa-check-circle text-success me-2 mt-2"></i>
                <p>
                  Domina una amplia variedad de algoritmos de IA para tareas de
                  clasificación, regresión, clustering, generación de datos y
                  mucho más.
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex mb-2">
                <i className="far fa-check-circle text-success me-2 mt-2"></i>
                <p>
                  Desarrollar habilidades prácticas para construir modelos de IA
                  utilizando Python.
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex mb-2">
                <i className="far fa-check-circle text-success me-2 mt-2"></i>
                <p>
                  Aprender a aplicar la IA a problemas reales en diferentes
                  industrias.
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex mb-2">
                <i className="far fa-check-circle text-success me-2 mt-2"></i>
                <p>
                  Acceder a materiales de enseñanza de alta calidad, incluyendo
                  videos, directos con expertos y tutoriales interactivos.{" "}
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex mb-2">
                <i className="far fa-check-circle text-success me-2 mt-2"></i>
                <p>
                  Participar en una comunidad online de estudiantes y
                  profesionales interesados en IA{" "}
                </p>
              </ListGroup.Item>
            </ListGroup>
            <div className="d-flex align-items-center justify-content-center my-5 ">
              <ExpertTalk
                variant="primary"
                classnames="btn_homeBanner"
                btnText="pages.doubts_button"
              />
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <h2 className="mb-2  pt-4">
          Descripción del Máster en Inteligencia Artificial
        </h2>
        <Row className="mb-3">
          <Col lg={12} md={12} sm={12}>
            <ListGroup bsPrefix="list-unstyled" variant="flush">
              <ListGroup.Item bsPrefix=" " className="d-flex">
                <i className="far fa-circle  text-primary me-2 mt-2"></i>
                <p>
                  Asiste a directos en vivo donde conectar con los profesores y
                  poder resolver todas tus dudas.
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex">
                <i className="far fa-circle  text-primary me-2 mt-2"></i>
                <p>
                  Puedes aplicar los conocimientos adquiridos en diversos
                  campos, desde la medicina, ingeniería, robótica, programación,
                  trading, marketing digital, fotografía, video, etc.
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex">
                <i className="far fa-circle  text-primary me-2 mt-2"></i>
                <p>
                  Desarrolla tus habilidades como Especialista IA para ser capaz
                  de desenvolverte como un profesional en cualquier proyecto,
                  tanto desde el punto de vista técnico, como analítico y
                  estratégico.
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex">
                <i className="far fa-circle  text-primary me-2 mt-2"></i>
                <p>
                  Descubre los componentes en los que se basa IA: programación,
                  matemáticas y estadística. Es clave para el desarrollo de
                  algoritmos y modelos de IA precisos y efectivos. Abre un
                  sinfín de oportunidades en el futuro.
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex">
                <i className="far fa-circle  text-primary me-2 mt-2"></i>
                <p>
                  Aprende sobre aprendizaje no supervisado, supervisado y
                  aprendizaje por refuerzo, en el que se aprende por prueba y
                  error.
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex">
                <i className="far fa-circle  text-primary me-2 mt-2"></i>
                <p>
                  Adéntrate en el deep learning o redes neuronales, una subárea
                  de la inteligencia artificial que se enfoca en el uso de redes
                  neuronales profundas para aprender patrones en  datos
                  complejos como pueden ser video, imagenes y audio.
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex">
                <i className="far fa-circle  text-primary me-2 mt-2"></i>
                <p>
                  Aprende a desarrollar tu bot de trading paso a paso como un
                  profesional gracias a ChatGPT.
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex">
                <i className="far fa-circle  text-primary me-2 mt-2"></i>
                <p>
                  Un curso donde obtienes recompensas en tokens MCT si
                  demuestras tus conocimiento aprobando tus exámenes.
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex">
                <i className="far fa-circle  text-primary me-2 mt-2"></i>
                <p>
                  Hay una enorme demanda de profesionales capacitados en IA en
                  el mercado laboral, por ello el curso es 100% enfocado al
                  mercado laboral.
                </p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <Container>
        <h2 className="mb-2  pt-4">
          Este máster en inteligencia artificial es para ti si eres…
        </h2>
        <Row className="mb-3">
          <Col lg={12} md={12} sm={12}>
            <ListGroup bsPrefix="list-unstyled" variant="flush">
              <ListGroup.Item bsPrefix=" " className="d-flex">
                <img
                  className="text-primary mb-4 me-4"
                  width={34}
                  src="/images_optimized\aiicons/studentIcon.svg"
                />
                <p>
                  <h3 className="fs-4">
                    <b>Estudiante</b>
                  </h3>
                  Los estudiantes que no sepan utilizar la Inteligencia
                  Artificial lo van a pasar mal. Por eso, vamos a daros toda esa
                  información en este máster. No te quedes atrás, se más
                  productivo y no seas rechazado en la búsqueda de empleo.
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex">
                <img
                  className="text-primary mb-4 me-4"
                  width={34}
                  src="/images_optimized\aiicons/Programmer.svg"
                />
                <p>
                  <h3 className="fs-4">
                    <b>Programador</b>
                  </h3>
                  Es vital ya que te permite automatizar tareas complejas y
                  mejorar la eficiencia en el procesamiento de datos. Además, te
                  abre nuevas oportunidades de carrera en el campo de la IA y
                  tecnologías relacionadas.
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex">
                <img
                  className="text-primary mb-4 me-4"
                  width={34}
                  src="/images_optimized\aiicons/Datascientist.svg"
                />
                <p>
                  <h3 className="fs-4">
                    <b>Data scientist</b>
                  </h3>
                  Es crucial ya que mejora tus habilidades en análisis de datos,
                  aumenta tu eficiencia, mejora tu toma de decisiones y te abre
                  nuevas oportunidades de carrera en el campo de la ciencia de
                  datos.
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex">
                <img
                  className="text-primary mb-4 me-4"
                  width={34}
                  src="/images_optimized\aiicons/Businessman.svg"
                />
                <p>
                  <h3 className="fs-4">
                    <b>Empresario</b>
                  </h3>
                  Porque te permite aprovechar al máximo la tecnología para
                  mejorar la toma de decisiones y optimizar los procesos de
                  negocio. La IA puede analizar grandes cantidades de datos y
                  proporcionar información valiosa para mejorar la eficiencia y
                  la rentabilidad. Además, mantenerse actualizado en la
                  tecnología de IA es crucial para que te mantengas competitivo
                  en el mercado.
                </p>
              </ListGroup.Item>
              <ListGroup.Item bsPrefix=" " className="d-flex">
                <img
                  className="text-primary mb-4 me-4"
                  width={34}
                  src="/images_optimized\aiicons/Technology.svg"
                />
                <p>
                  <h3 className="fs-4">
                    <b>Apasionado de la tecnología</b>
                  </h3>
                  Es una oportunidad de estar al día con una de las tecnologías
                  más avanzadas y en constante evolución. La IA tiene un impacto
                  significativo en una variedad de industrias, desde la medicina
                  hasta la fabricación, y conocer sobre ella permite comprender
                  su alcance y potencial. Además, aprender sobre IA puede abrir
                  nuevas oportunidades de carrera y permitir a un apasionado de
                  la tecnología participar activamente en su desarrollo y
                  aplicación.
                </p>
              </ListGroup.Item>
            </ListGroup>
            <div className="d-flex flex-column align-items-center justify-content-center my-5 ">
              <ExpertTalk
                variant="primary"
                classnames="btn_homeBanner"
                btnText="pages.doubts_button"
              />
              <span
                className="mt-3 text-center fw-bold"
                style={{ width: "300px" }}
              >
                Solicita información gratuita y sin compromiso. Contactaremos
                contigo en tu horario preferido. Tarjeta de crédito no
                requerida.
              </span>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="mt-4" style={{ backgroundColor: "#F2F9FF" }}>
        <Row className="">
          <h2 className="mb-2 mt-5 ">Expertos y profesores</h2>
          <ListGroup bsPrefix="list-unstyled" variant="flush">
            <ListGroup.Item bsPrefix=" " className="d-flex mb-2">
              <i className="far fa-check-circle text-success me-2 mt-2"></i>
              <p>
                Los profesores son <b>expertos</b> en sus respectivos campos y
                cuentan con amplia experiencia en todo lo que engloba la IA.
              </p>
            </ListGroup.Item>
            <ListGroup.Item bsPrefix=" " className="d-flex mb-2">
              <i className="far fa-check-circle text-success me-2 mt-2"></i>
              <p>
                Todos ellos tienen un <b>Doctorado</b> en campos relacionados y
                han trabajado en proyectos y aplicaciones de la IA.
              </p>
            </ListGroup.Item>
            <ListGroup.Item bsPrefix=" " className="d-flex mb-2">
              <i className="far fa-check-circle text-success me-2 mt-2"></i>
              <p>
                Por lo tanto, están <b>altamente capacitados para enseñar</b>{" "}
                los fundamentos de la IA, habilidades de programación y
                aplicaciones avanzadas.
              </p>
            </ListGroup.Item>
            <ListGroup.Item bsPrefix=" " className="d-flex mb-2">
              <i className="far fa-check-circle text-success me-2 mt-2"></i>
              <p>
                Además, están comprometidos en proporcionar una{" "}
                <b>educación de alta calidad y en guiar a los estudiantes</b> a
                lo largo de todo el proceso de aprendizaje.
              </p>
            </ListGroup.Item>
          </ListGroup>
          <div className=" mt-5">
            <Row className="justify-content-md-center">
              <Col lg={4} md={4} sm={12} className="mb-3">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src="/images/psanchez.jpg"
                    style={{ borderRadius: "50%" }}
                    width="120px"
                  />{" "}
                  <span className="fs-3 fw-bold" style={{ color: "#000000" }}>
                    Pablo Sánchez
                  </span>
                  <span>Ph.D. Student</span>
                </div>
              </Col>
              <Col lg={4} md={4} sm={12} className="mb-3">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src="/images/dbaptista.jpg"
                    style={{ borderRadius: "50%" }}
                    width="120px"
                  />{" "}
                  <span className="fs-3 fw-bold" style={{ color: "#000000" }}>
                    Diego Baptista
                  </span>
                  <span>Ph.D. Student</span>
                </div>
              </Col>
              <Col lg={4} md={4} sm={12} className="mb-3">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src="/images/ipeis.jpg"
                    style={{ borderRadius: "50%" }}
                    width="120px"
                  />{" "}
                  <span className="fs-3 fw-bold" style={{ color: "#000000" }}>
                    Ignacio Peis
                  </span>
                  <span>Ph.D. Student</span>
                </div>
              </Col>
            </Row>
          </div>
        </Row>
      </Container>
      <Container className="mt-4" style={{ backgroundColor: "#F7E9C3" }}>
        <Row className="text-center">
          <Col>
            {/* <img
              width={80}
              className="text-primary"
              src="/images_optimized\aiicons/Vacancy.svg"
            /> */}
            <h2 className="mt-4">Evaluación</h2>
            <p>
              Para garantizar que los estudiantes tengan un sólido dominio de
              los conceptos y habilidades enseñadas en el curso, se realizará un{" "}
              <b>examen al final del curso.</b>
            </p>
            <p>
              Además, para ayudar a los estudiantes a prepararse para el examen,
              se llevarán a cabo varias <b>sesiones de preparación</b> a lo
              largo del curso. Durante estas sesiones, se discutirán los temas
              claves del curso, se resolverán preguntas frecuentes y se
              practicarán ejercicios similares a los del examen.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <h2 className="mb-2 pt-4 fw-bold">VENTAJAS DEL MÁSTER DE IA</h2>
        <hr />
        <Row className="mb-3">
          <Col lg={12} md={12} sm={12}>
            <ListGroup bsPrefix="list-unstyled" variant="flush">
              <ListGroup.Item bsPrefix=" " className="d-flex">
                <p>
                  <h3>
                    <b>LEARN-TO-EARN - L2E</b>
                  </h3>
                  <p>
                    El modelo L2E se ha creado para abordar el problema de la
                    alta tasa de abandono en los cursos en línea. Según nuestras
                    estadísticas, menos del 10% de los estudiantes que comienzan
                    un curso en línea lo terminan.
                  </p>
                  <p>
                    Para abordar este problema, queremos{" "}
                    <b>
                      motivar a los estudiantes a aprender y ser recompensados
                    </b>{" "}
                    mientras lo hacen. Nuestro modelo incentiva a los nuevos
                    usuarios a aprender tanto como sea posible al mismo tiempo
                    que les brinda la posibilidad de{" "}
                    <b>ganar recompensas en el proceso.</b>
                  </p>
                </p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <ListGroup.Item bsPrefix=" " className="d-flex">
            <p>
              <h3>
                <b>PLATAFORMA ONLINE</b>
              </h3>
              <p>
                Con nuestra plataforma de aprendizaje en línea, tendrás la
                flexibilidad de acceder a los cursos{" "}
                <b>desde cualquier lugar y en cualquier momento</b> que desees.
                No tendrás que preocuparte por asistir a clases en persona o
                ajustar tu horario para adaptarse a las lecciones.
              </p>
            </p>
          </ListGroup.Item>
          <ListGroup.Item bsPrefix=" " className="d-flex">
            <p>
              <h3>
                <b>METODOLOGÍA</b>
              </h3>
              <p>
                El enfoque metodológico del proceso de formación en línea está
                <b> completamente centrado en el estudiante.</b>
              </p>
              <p>
                Uno de los beneficios de estudiar en MundoCrypto es que el
                estudiante puede decidir el horario que le convenga más y puede
                estudiar a su propio ritmo.
              </p>
            </p>
          </ListGroup.Item>
          <ListGroup.Item bsPrefix=" " className="d-flex">
            <p>
              <h3>
                <b>COMUNIDAD EXCLUSIVA</b>
              </h3>
              <p>
                Como parte de nuestro compromiso con el éxito de nuestros
                alumnos, ofrecemos a nuestros estudiantes una comunidad
                exclusiva donde pueden{" "}
                <b>conectarse con otros estudiantes y profesionales</b> en su
                campo de estudio.
              </p>
              <p>
                La comunidad es un espacio seguro donde pueden hacer{" "}
                <b>preguntas, colaborar</b> en proyectos y{" "}
                <b>recibir actualizaciones</b> del curso.
              </p>
              <p>
                Es una fuente de <b>motivación y apoyo</b> para los estudiantes,
                y les ayuda a{" "}
                <b>obtener una perspectiva global y mantenerse actualizados</b>{" "}
                en su área de estudio.
              </p>
            </p>
          </ListGroup.Item>
          <div className="d-flex align-items-center justify-content-center mt-2 mb-5 ">
            <ExpertTalk
              variant="primary"
              classnames="btn_homeBanner"
              btnText="pages.doubts_button"
            />
          </div>
        </Row>
      </Container>

      <Container className="mt-4" style={{ backgroundColor: "#D1F5EA" }}>
        <Row className="text-center pt-4">
          <Col>
            <img
              width={80}
              className="text-primary"
              src="/images_optimized\aiicons/Vacancy.svg"
            />
            <h2 className="mt-4">Bolsa de Trabajo Mundocrypto</h2>
            <p>
              Accede a la bolsa de trabajo de Mundocrypto. Contamos con una red
              de decenas de empresas y clientes, y conocemos, de primera mano,
              las demandas del mercado.{" "}
            </p>
          </Col>
        </Row>
      </Container>

      <Container className="mt-4" style={{ backgroundColor: "#F2F9FF" }}>
        <Row className="text-center pt-4">
          <Col>
            <img
              width={80}
              className="text-primary"
              src="/images_optimized\aiicons/Doubts.svg"
            />
            <h2 className="mt-4">
              Resuelve todas tus Dudas Gracias a Nuestro Sistema de Atención
              Personalizada{" "}
            </h2>
            <p>
              Gracias a la atención online personalizada, podrás avanzar
              constantemente, y mantener una alta motivación.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex align-items-center">
              <ul>
                <li>
                  <h3 className="mt-2 d-flex align-items-center">
                    Acelera tu aprendizaje IA con tutorías en directo y apoyo en
                    el examen{" "}
                  </h3>
                </li>
              </ul>
            </div>
            <p>
              Participarás en una tutoría grupal, con el resto de participantes
              del máster de inteligencia artificial. Se trata de un elemento
              clave para mantener tu foco y asentar los conocimientos
              adquiridos.{" "}
            </p>
            <div className="d-flex align-items-center">
              <ul>
                <li>
                  <h3 className="mt-2 d-flex align-items-center">
                    Feedback profesional
                  </h3>
                </li>
              </ul>
            </div>
            <p>
              Recibe feedback profesional en los ejercicios y casos de estudio
              planteados durante el programa.
            </p>
          </Col>
        </Row>
      </Container>

      {/* FAQS */}
      <div className="py-12 py-lg-6 bg-white">
        <Container>
          <Row className="mb-2 justify-content-left">
            <Col lg={8} md={12} sm={12} className="">
              <h2 className="mt-5">Preguntas Frecuentes</h2>
            </Col>
          </Row>
          <hr />
          <Row className="justify-content-center">
            <Col lg={12} md={12} sm={12}>
              <GKAccordionPlus accordionItems={faqlst} item className="px-0" />
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};
export default AIDescriptionTab;
