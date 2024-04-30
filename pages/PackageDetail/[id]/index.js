import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";

// import widget/custom components
import { CourseCard, GeeksSEO } from "widgets";

// import sub components

import ExpertTalk from "components/bootstrap/ExpertTalk";
import Stickyfooter from "components/course/stickyfooter";
import _ from "lodash";
import Link from "next/link";
import ModalVideo from "react-modal-video";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue } from "recoil";
import { getCourseList, getPackageDetails, tokenValue } from "services/nodeapi";
import i18 from "../../../next-i18next.config";
import { userObject } from "../../../services/states";

const PackageDetail = (props) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [YouTubeURL] = useState("DYKfJw_kgnw");
  const [packageId, setpackageId] = useState(0);
  const [courses, setCourses] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [obj, setOBJ] = useState([]);
  const [packageDetails, setPackageDetails] = useState([]);
  const [mctPrice, setMCTPrice] = useState(null);
  const userObj = useRecoilValue(userObject);
  const [oldPrice, setOldPrice] = useState();
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const videoURL =
    "https://mundocrypto-files.s3.eu-central-1.amazonaws.com/Packages/xmas-pack.mp4";
  useEffect(() => {
    if (router.query.id) {
      setpackageId(router.query.id);
      pageLoad();
    }
  }, [router]);

  const pageLoad = async () => {
    setIsLoading(true);

    if (!_.isEmpty(localStorage.getItem("mctprice"))) {
      setMCTPrice(parseFloat(localStorage.getItem("mctprice")));
    } else {
      await loadMCTPrice();
    }
    const resp = await getPackageDetails(1);
    if (resp.status === 200) {
      setPackageDetails(resp.data.data.packageData);
      const packCourses = resp.data.data.courses;

      setCourses(resp.data.data.courses);
      let _oPrice = 0;
      resp.data.data.courses.map((c) => {
        _oPrice = _oPrice + c.price;
      });
      setOldPrice(_oPrice);
      setIsLoading(false);
    }

    const respCL = await getCourseList();

    if (respCL.status === 200) {
      setOBJ(respCL.data.category);
    }
    setIsLoading(false);
  };

  const loadMCTPrice = async () => {
    const resp = await tokenValue();

    if (resp.status === 200) {
      setMCTPrice(resp.data.data);
    }
  };
  const PackePriceDetails = () => {
    return (
      <>
        {/* Card */}
        <Card className="mb-3 mb-4">
          <div className="p-1">
            <div
              className="d-flex justify-content-center position-relative rounded py-10 border-white border rounded-3 bg-cover"
              style={{
                background: `url('/images_optimized/paquete-de-navidad.png')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
            >
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
            autoplay
            isOpen={isOpen}
            url={videoURL}
            onClose={() => setOpen(false)}
          />
          {/* end of video popup */}

          {/* Card body */}
          <Card.Body>
            {/* Price single page */}
            <span className="fs-6 text-dark fw-bold">Antes:</span>
            <div className="mb-3">
              <span className="text-dark fw-bold h2 me-2">
                <img
                  src="/images_optimized/mclogo_price.svg"
                  className="imgPrice_Coin"
                  width="25px"
                />{" "}
                <del> {parseFloat(oldPrice / mctPrice).toFixed(2)}</del>
              </span>
              {" / "}
              <small className="fs-4 text-muted">
                <del>${oldPrice}</del>
              </small>
            </div>
            <span className="fs-6 text-dark fw-bold">Ahora:</span>
            <div className="mb-3">
              <span className="text-dark fw-bold h2 me-2">
                <img
                  src="/images_optimized/mclogo_price.svg"
                  className="imgPrice_Coin"
                  width="25px"
                />{" "}
                <span className=" text-danger">
                  {" "}
                  {parseFloat(packageDetails.price / mctPrice).toFixed(2)}
                </span>
              </span>
              {" / "}
              <small className="fs-4 text-danger">
                ${packageDetails.price}
              </small>
            </div>
            <div className="d-grid">
              <Button
                // onClick={handleAddToCart}
                className="btn btn-primary mb-2"
                onClick={handleCheckout}
              >
                Compra AHORA
              </Button>
              <ExpertTalk
                variant="outline-primary"
                classnames={""}
                btnText="Hablar con uno de nuestros expertos"
              />
            </div>
          </Card.Body>
        </Card>
        {/* Card */}
        <Card className="mb-4">
          {/* Card header */}
          <Card.Header>
            <h4 className="mb-0">¿Qué incluye?</h4>
          </Card.Header>
          {/* Card Body */}
          <Card.Body className="p-0">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <i className="fe fe-play-circle align-middle me-2 text-primary"></i>
                7 Cursos
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="fe fe-award me-2 align-middle text-success"></i>
                Certificados NFT
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent">
                <i className="fe fe-clock align-middle me-2 text-warning"></i>
                Acceso vitalicio
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        {/* Card */}
        <Card>
          {/* Card body */}
          <Card.Body>
            <div className="d-flex align-items-center">
              <div className="position-relative">
                <Image
                  src="/images_optimized/mclogo_price.svg"
                  alt=""
                  className="rounded-circle avatar-xl"
                />
                <Link href="#">
                  <a
                    className="position-absolute mt-2 ms-n3"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title="Verifed"
                  >
                    <Image
                      src="/images_optimized/svg/checked-mark.svg"
                      alt=""
                      height="30"
                      width="30"
                    />
                  </a>
                </Link>
              </div>
              <div className="ms-4">
                <h4 className="mb-0">MundoCrypto Academy</h4>
                <p className="mb-1 fs-6">Academia de Cryptomonedas y Web3</p>
                <span className="fs-6">
                  <span className="text-warning">4.5</span>
                  <span className="mdi mdi-star text-warning me-2"></span>
                  Valoraciones
                </span>
              </div>
            </div>
            <Row className="border-top mt-3 border-bottom mb-3 g-0">
              <Col>
                <div className="pe-1 ps-2 py-3">
                  <h5 className="mb-0">57.000</h5>
                  <span>Estudiantes</span>
                </div>
              </Col>
              <Col className="border-start">
                <div className="pe-1 ps-3 py-3">
                  <h5 className="mb-0">31</h5>
                  <span>Cursos</span>
                </div>
              </Col>
              <Col className="border-start">
                <div className="pe-1 ps-3 py-3">
                  <h5 className="mb-0">1321</h5>
                  <span>Reviews</span>
                </div>
              </Col>
            </Row>
            <p>
              Plataforma educatica MundoCrypto desde 2019 Academia de
              Criptomonedas, Blockchain y Web3. Conviértete en un experto.
            </p>
            <Link href="/CourseList">
              <a className="btn btn-outline-white btn-sm">Ver Cursos</a>
            </Link>
          </Card.Body>
        </Card>
      </>
    );
  };
  const handleCheckout = async () => {
    router.push("/PackageCheckout");
  };
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Package details | Mundo Crypto" />
      {!isLoading && (
        <>
          <div className="pt-lg-8 pb-lg-16 pt-8 pb-12 bg-primary courseDetailHeader">
            <Container>
              <Row className="align-items-center">
                <Col xl={7} lg={7} md={12} sm={12}>
                  <div>
                    <h1 className="text-white display-4 fw-semi-bold">
                      OFERTA ESPECIAL - PACK DE CURSOS DE CRIPTOMONEDAS,
                      BLOCKCHAIN Y WEB3
                    </h1>
                    <p className="text-white mb-6 lead">
                      ¡Descubre las criptomonedas, blockchain y Web3 con nuestro
                      pack de cursos! Diseñado para principiantes y personas con
                      conocimientos previos, con contenido actualizado y de
                      calidad, estarás en camino de convertirte en un experto.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="pb-10">
            <Container>
              <Row>
                <Col lg={8} md={12} sm={12} className="mt-n8 mb-4 mb-lg-0">
                  <Tab.Container
                    defaultActiveKey={
                      !isDesktop && !isLaptop ? "details" : "paquete de cursos"
                    }
                  >
                    <Card>
                      <Nav className="nav-lb-tab">
                        {!isDesktop && !isLaptop && (
                          <Nav.Item>
                            <Nav.Link
                              href={`#details`}
                              eventKey={"details"}
                              className="mb-sm-3 mb-md-0"
                            >
                              Detalles
                            </Nav.Link>
                          </Nav.Item>
                        )}
                        {["Paquete de Cursos", "Descripción"].map(
                          (item, index) => (
                            <Nav.Item key={index}>
                              <Nav.Link
                                href={`#${item.toLowerCase()}`}
                                eventKey={item.toLowerCase()}
                                className="mb-sm-3 mb-md-0"
                              >
                                {item}
                              </Nav.Link>
                            </Nav.Item>
                          )
                        )}
                      </Nav>
                      <Card.Body className="p-0">
                        <Tab.Content>
                          {!isDesktop && !isLaptop && (
                            <Tab.Pane
                              eventKey="details"
                              className="pb-4 pt-3 px-4"
                            >
                              <PackePriceDetails />
                            </Tab.Pane>
                          )}
                          <Tab.Pane
                            eventKey="paquete de cursos"
                            className="pb-4 pt-3 px-4"
                          >
                            {!_.isEmpty(obj) &&
                              courses.length > 0 &&
                              courses.map((item, index) => {
                                console.log(item);
                                return (
                                  <Col lg={12} md={12} sm={4} key={index}>
                                    <CourseCard
                                      viewby={
                                        !isDesktop && !isLaptop
                                          ? "grid"
                                          : "list"
                                      }
                                      showprogressbar={true}
                                      progress={item.progress}
                                      item={item}
                                      isMyCourse={true}
                                    />
                                  </Col>
                                );
                              })}
                          </Tab.Pane>
                          <Tab.Pane eventKey="descripción" className="pb-4 p-4">
                            <div className="mb-4">
                              <h2 className="mb-2">
                                Learn to Earn: Los primeros alumnos consiguen
                                hasta un 120% del valor del curso.
                              </h2>
                              <p>
                                Aprovecha la oportunidad del BOOST PROGRAM para
                                beneficiarte de un 120% sobre el valor del
                                curso. Gracias al modelo Learn to Earn podrás
                                conseguir recompensas si demuestras tus
                                conocimientos.{" "}
                              </p>
                              <h2 className="mb-2">
                                ¿Qué aprenderás en este pack de lanzamiento de
                                MundoCrypto?
                              </h2>
                              <p>
                                Mundocrypto ofrece un pack donde reunimos{" "}
                                <b>los 7 cursos más destacados</b> de la
                                plataforma educativa Learn to Earn. Obtendrás
                                recompensas por cada examen que apruebes de cada
                                curso.{" "}
                              </p>
                              <ul>
                                <li>
                                  <b>Aprende a programar en Solidity</b>, el
                                  lenguaje más usado en Web3, donde podrás crear
                                  tu propio token, programar smart contracts y
                                  tus propios NFTs.{" "}
                                </li>
                                <li>
                                  Aprende cuál es la verdadera{" "}
                                  <b>historia de la economía.</b>
                                </li>
                                <li>
                                  Profundiza en el{" "}
                                  <b>
                                    análisis fundamental, técnicos, trading y
                                    finanzas descentralizadas.
                                  </b>{" "}
                                </li>
                                <li>
                                  Conoce cuáles son los pilares del{" "}
                                  <b>management de portafolio</b>{" "}
                                </li>
                                <li>
                                  Explora el mundo de las{" "}
                                  <b>DAOs, tokenización y de los NFTs</b>{" "}
                                </li>
                                <li>
                                  Introdúcete al mundo del{" "}
                                  <b>gaming y el metaverso</b> conociendo los
                                  diferentes actores dentro del play to earn y
                                  del metaverso
                                </li>
                                <li>
                                  Conoce los diferentes conceptos básicos de{" "}
                                  <b>
                                    programación orientada a contratos
                                    inteligentes.
                                  </b>{" "}
                                </li>
                                <li>
                                  Sumérgete en el ecosistema de módulos de
                                  NodeJS y{" "}
                                  <b>aprende a programar una blockchain</b>{" "}
                                  usando javascript, uno de los lenguajes de
                                  programación más usados.
                                </li>
                                <li>
                                  Explora el <b>mercado DeFi</b> y sus
                                  diferentes actores analizando varias
                                  plataformas y estrategias para generar
                                  rendimientos.
                                </li>
                              </ul>

                              <h2 className="mb-2">
                                Este curso es para ti si eres…
                              </h2>
                              <p>
                                <b>Emprendedor:</b> buscas entender cómo
                                funciona la economía basada en tokens y sus
                                modelos de negocios. Quieres emprender un
                                proyecto basado en Blockchain y desarrollarlo
                                desde cero.
                              </p>
                              <p>
                                <b>Inversor:</b> eres un amante de las
                                inversiones y el trading. No solo quieres
                                aprender una estrategia, sino que quieres ser
                                capaz de desarrollarla.{" "}
                              </p>
                              <p>
                                <b>Investigador:</b> Deseas analizar y
                                profundizar en el ecosistema criptográfico desde
                                un punto de vista objetivo como tecnología.{" "}
                              </p>
                              <p>
                                <b>Programador:</b> buscas profundizar en la
                                programación enfocada a blockchain, solidity,
                                Javascript, creación de smart contrat, nfts,
                                etc.{" "}
                              </p>
                              <p>
                                <b>Ingeniero:</b> deseas conocer en profundidad
                                cómo funciona el sector de las criptomonedas y
                                blockchain desde sus bases en código.{" "}
                              </p>
                              <p>
                                <b>Consultor:</b> te gustaría dar respaldo
                                técnico a proyectos para el lanzamiento de una
                                Dapp.
                              </p>
                              <p>
                                <b>Tecnólogo:</b> Te apasiona la tecnología y
                                quieres actualizarte para comprender cómo
                                blockchain y las DTLs ofrecen mejoras y
                                revolucionan la tecnología de la información.
                              </p>
                            </div>
                          </Tab.Pane>
                        </Tab.Content>
                      </Card.Body>
                    </Card>
                  </Tab.Container>
                </Col>
                {(isDesktop || isLaptop) && (
                  <Col lg={4} md={12} sm={12} className="mt-lg-n22">
                    <PackePriceDetails />
                  </Col>
                )}
              </Row>
            </Container>
          </div>
        </>
      )}
      {!isDesktop && !isLaptop && (
        <Stickyfooter
          dollarprice={packageDetails.price}
          mctprice={parseFloat(packageDetails.price / mctPrice).toFixed(2)}
          src={"packagedetail"}
          handleCheckout={handleCheckout}
          btnText={"Compra AHORA"}
        />
      )}
    </Fragment>
  );
};
export default PackageDetail;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
