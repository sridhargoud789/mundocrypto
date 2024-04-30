/* eslint-disable */
// import node module libraries
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18 from "../next-i18next.config";

import { Card, Col, Row } from "react-bootstrap";

// import widget/custom components
import { GeeksSEO } from "widgets";
// import authlayout to override default layout
import AuthLayout from "layouts/dashboard/AuthLayout";

import groovyWalkAnimation from "animations/success.json";
import _ from "lodash";
import Lottie from "lottie-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRecoilValue } from "recoil";
import { userObject } from "services/states";
const style = {
  height: 200,
};
const PaymentSuccess = () => {
  const { t } = useTranslation();
  const userObj = useRecoilValue(userObject);
  const router = useRouter();
  useEffect(() => {
    pageLoad();
  }, [router]);
  const pageLoad = async () => {
    await delay(5000);
    try {
      if (_.isEmpty(userObj)) {
        router.push("/");
      } else {
        const { paymentfor } = router.query;

        if (paymentfor === "nft") {
          router.push("/privatearea/MyCertificates");
        } else {
          router.push("/MyLearnings");
        }
      }
    } catch (e) {
      if (_.isEmpty(userObj)) {
        router.push("/");
      } else {
        router.push("/MyLearnings");
      }
    }
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
                  {t("payment_success.title")}
                </h1>
                <span>
                  {t("payment_success.sub_1")}
                  <Link href={_.isEmpty(userObj) ? "/" : "/MyLearnings"}>
                    <a className="ms-1 fw-bold">{t("payment_success.sub_2")}</a>
                  </Link>{" "}
                  {t("payment_success.sub_3")}
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

PaymentSuccess.Layout = AuthLayout;

export default PaymentSuccess;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
