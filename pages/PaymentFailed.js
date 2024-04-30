/* eslint-disable */
// import node module libraries
import Link from "next/link";
import { useRouter } from "next/router";
import i18 from "../next-i18next.config";

import { Fragment, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";

// import widget/custom components
import { GeeksSEO } from "widgets";
// import authlayout to override default layout
import groovyWalkAnimation from "animations/failure.json";
import AuthLayout from "layouts/dashboard/AuthLayout";
import Lottie from "lottie-react";

import _ from "lodash";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRecoilValue } from "recoil";
import { userObject } from "services/states";

const style = {
  height: 200,
};
const PaymentFailed = () => {
  const router = useRouter();
  const userObj = useRecoilValue(userObject);

  useEffect(() => {
    pageLoad();
  }, [router]);
  const pageLoad = async () => {
    await delay(5000);
    try {
      if (_.isEmpty(userObj)) {
        router.push("/");
      } else {
        const { paymentfor, courseid } = router.query;
        if (paymentfor === "nft") {
          router.push("/NFTCheckout/" + courseid + "");
        }
      }
    } catch (e) {
      console.log(e);
    }
    //router.push("/MyLearnings");
  };
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Purchase Status | MundoCrypto" />

      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4" style={{ textAlign: "center" }}>
                <Lottie
                  animationData={groovyWalkAnimation}
                  loop={true}
                  style={style}
                />
                <h1 className="mb-1 fw-bold" style={{ fontSize: "24px" }}>
                  Payment failed please try again.
                </h1>

                <span>
                  You will be automatically redirected to checkout page or else
                  <Link href={_.isEmpty(userObj) ? "/" : "/Checkout"}>
                    <a className="ms-1">click here</a>
                  </Link>{" "}
                  to go checkout page.
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

PaymentFailed.Layout = AuthLayout;

export default PaymentFailed;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
