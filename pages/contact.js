// import node module libraries
import Link from "next/link";
import { Fragment } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import i18 from "../next-i18next.config";

// import MDI icons
import { mdiFacebook, mdiGithub, mdiTwitter } from "@mdi/js";
import Icon from "@mdi/react";

// import BS icons
import { EnvelopeOpen, GeoAlt, Telephone } from "react-bootstrap-icons";

// import widget/custom components
import { GeeksSEO } from "widgets";

// import sub components
import { ContactForm } from "sub-components";

// import your layout to override default layout
import BlankLayout from "layouts/marketing/BlankLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Contact = () => {
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Contact | MundoCrypto" />

      <Container fluid className="bg-white">
        <Row className="align-items-center min-vh-100">
          <Col lg={6} md={12} sm={12}>
            <div className="px-xl-20 px-md-8 px-4 py-8 py-lg-0">
              {/* content */}
              <div className="d-flex justify-content-between mb-7 align-items-center">
                <Link href="/">
                  <a>
                    <Image src="/images_optimized/mc_black_blue.png" alt="" />
                  </a>
                </Link>
              </div>
              <div className="text-dark">
                <h1 className="display-4 fw-bold">Get In Touch.</h1>
                <p className="lead text-dark">
                  Fill in the form to the right to get in touch with someone on
                  our team, and we will reach out shortly.
                </p>
                <div className="mt-8">
                  <p className="fs-4 mb-4">
                    If you are seeking support please visit our{" "}
                    <Link href="#">
                      <a>support portal</a>
                    </Link>{" "}
                    before reaching out directly.
                  </p>
                  {/* Address */}
                  <p className="fs-4">
                    <Telephone size={16} className="text-primary me-2" /> +
                    0123-456-7890
                  </p>
                  <p className="fs-4">
                    <EnvelopeOpen size={16} className="text-primary me-2" />{" "}
                    hello@geekui.com
                  </p>
                  <p className="fs-4 ">
                    <GeoAlt size={17} className="text-primary me-2" /> 2652
                    Kooter Lane Charlotte, NC 28263
                  </p>
                </div>

                {/* social media */}
                <div className="mt-10">
                  {/*Facebook*/}
                  <Link href="#">
                    <a className="text-muted me-3">
                      <Icon path={mdiFacebook} size={1} />
                    </a>
                  </Link>
                  {/*Twitter*/}
                  <Link href="#">
                    <a className="text-muted me-3">
                      <Icon path={mdiTwitter} size={1} />
                    </a>
                  </Link>
                  {/*GitHub*/}
                  <Link href="#">
                    <a className="text-muted ">
                      <Icon path={mdiGithub} size={1} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </Col>

          {/* right side form section with background color */}
          <Col
            lg={6}
            className="d-lg-flex align-items-center w-lg-50 min-vh-lg-100 position-fixed-lg bg-cover bg-light top-0 right-0"
          >
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

Contact.Layout = BlankLayout;

export default Contact;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
