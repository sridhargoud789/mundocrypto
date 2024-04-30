// import node module libraries
import Link from "next/link";
import { Fragment } from "react";
import { Col, Image, Row } from "react-bootstrap";

// import widget/custom components
import { GeeksSEO } from "widgets";

// import blank layout, header and footer to override default layout
import NotFound from "layouts/marketing/NotFound";

import { useTranslation } from "react-i18next";

const Error404 = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="404 Error | MundoCrypto" />

      <Row>
        <Col lg={12} md={12} sm={12}>
          <Row className="align-items-center justify-content-center g-0 py-lg-12 py-10">
            <Col
              xl={{ offset: 1, span: 4 }}
              lg={6}
              md={12}
              className="text-center text-lg-start"
            >
              <h1 className="display-1 mb-3">404</h1>
              <p className="mb-5 lead">
                Lo sentimos, parece que la página que estás buscando no se
                encuentra disponible. Por favor, inténtalo de nuevo o utiliza el
                menú para encontrar lo que estás buscando. Si necesitas ayuda
                adicional, no dudes en ponerte en contacto con nosotros.
                ¡Gracias!{" "}
                <Link href="mailto:info@mundocrypto.com">
                  <a className="btn-link">
                    <u>Contacta con nosotros</u>
                  </a>
                </Link>
              </p>
              <Link href="/">
                <a className="btn btn-primary me-2">Volver a Inicio</a>
              </Link>
            </Col>
            <Col
              xl={{ offset: 1, span: 6 }}
              lg={6}
              md={12}
              className="mt-8 mt-lg-0"
            >
              <Image
                src="/images_optimized/error/404-error-img.svg"
                alt=""
                className="w-100"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

Error404.Layout = NotFound;

export default Error404;
