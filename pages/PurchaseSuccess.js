// import node module libraries
import Link from "next/link";
import { Fragment } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import i18 from "../next-i18next.config";

// import widget/custom components
import { GeeksSEO } from "widgets";
// import authlayout to override default layout
import AuthLayout from "layouts/dashboard/AuthLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRecoilValue } from "recoil";
import { userObject } from "services/states";

const PurchaseSuccess = () => {
  const userObj = useRecoilValue(userObject);

  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Sign In | MundoCrypto" />

      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4" style={{ textAlign: "center" }}>
                <Link href="/">
                  <a>
                    <Image
                      src="/images_optimized/PurchaseSuccess.png"
                      className="mb-4"
                      alt=""
                      width={100}
                    />
                  </a>
                </Link>
                <h1 className="mb-1 fw-bold">Payment successfully completed</h1>
                <span>
                  Click
                  <Link href="/MyLearnings">
                    <a className="ms-1">here</a>
                  </Link>{" "}
                  to see my learnings.
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

PurchaseSuccess.Layout = AuthLayout;

export default PurchaseSuccess;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
