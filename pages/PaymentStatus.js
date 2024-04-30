// import node module libraries
import Link from "next/link";
import { useRouter } from "next/router";
import i18 from "../next-i18next.config";

import { Fragment, useEffect, useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";

// import widget/custom components
import { GeeksSEO } from "widgets";
// import authlayout to override default layout
import AuthLayout from "layouts/dashboard/AuthLayout";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { verifyPayment } from "../services/nodeapi";

const PaymentStatus = () => {
  const router = useRouter();
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    pageLoad();
  }, [router]);

  const pageLoad = async () => {
    const { paymentId, token } = router.query;
    if (paymentId !== undefined) {
      try {
        const resp = await verifyPayment({ paymentId });
        if (resp.status === 200) {
          const { totalAmount } = resp.data;
          if (totalAmount > 0) {
            setIsPaymentSuccess(true);
          } else {
            setIsPaymentSuccess(false);
          }
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    }
  };

  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Purchase Status | MundoCrypto" />

      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            {!isLoading && (
              <Card.Body className="p-6">
                <div className="mb-4" style={{ textAlign: "center" }}>
                  <Link href="/">
                    <a>
                      <Image
                        src={`/images_optimized/${
                          isPaymentSuccess ? "purchasesuccess.png" : "error.png"
                        }`}
                        className="mb-4"
                        alt=""
                        width={100}
                      />
                    </a>
                  </Link>
                  <h1 className="mb-1 fw-bold">
                    {isPaymentSuccess
                      ? "Payment successfully completed"
                      : "Payment failed please try again."}
                  </h1>
                  {isPaymentSuccess ? (
                    <span>
                      Click
                      <Link href="/MyLearnings">
                        <a className="ms-1">here</a>
                      </Link>{" "}
                      to see my learnings.
                    </span>
                  ) : (
                    <span>
                      Click
                      <Link href="/Checkout">
                        <a className="ms-1">here</a>
                      </Link>{" "}
                      to go checkout page.
                    </span>
                  )}
                </div>
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

PaymentStatus.Layout = AuthLayout;

export default PaymentStatus;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
