// import node module libraries
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
// import widget/custom components
import { CourseCard, GeeksSEO, PageHeading } from "widgets";
import i18 from "../next-i18next.config";

// import sub components

import _ from "lodash";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  getUserCartList,
  removeItemFromCart,
  tokenValue,
} from "../services/nodeapi";

import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [cObj, setcObj] = useState([]);
  const [cartCount, setcartCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [iTotalPrice, setTotalPrice] = useState(0);
  const [mctPrice, setMCTPrice] = useState(null);

  useEffect(() => {
    pageLoad();
  }, []);
  const pageLoad = async () => {
    setIsLoading(true);

    const clResp = await getUserCartList();

    if (clResp.status === 200) {
      setcObj(clResp.data.courses);
      let price = 0;
      clResp.data.courses.map((c) => {
        price = price + c.price;
      });
      setcartCount(clResp.data.courses.length);
      setTotalPrice(price);
    }

    if (!_.isEmpty(localStorage.getItem("mctprice"))) {
      setMCTPrice(parseFloat(localStorage.getItem("mctprice")));
    } else {
      await loadMCTPrice();
    }
    setIsLoading(false);
  };

  const loadMCTPrice = async () => {
    const resp = await tokenValue();

    if (resp.status === 200) {
      setMCTPrice(resp.data.data);
    }
  };
  const deleteFromCart = async (courseId) => {
    setIsLoading(true);
    const resp = await removeItemFromCart({ courseId });
    if (resp.status === 200) {
      await pageLoad();
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Cart | MundoCrypto" />

      {/* Page header */}
      <PageHeading bg="bg-black" pagetitle="Cart" />

      {/* Content */}
      <div className="py-6">
        <Container>
          <Row>
            <Col xl={8} lg={8} md={12} sm={12}>
              {!_.isEmpty(cObj) &&
                cObj.map((item, index) => (
                  <>
                    <div className="item px-md-1" key={item.id}>
                      <CourseCard
                        key={index}
                        item={item}
                        viewby="cartlist"
                        deleteFromCart={deleteFromCart}
                      />
                    </div>
                  </>
                ))}
              {cObj && cObj.length === 0 && (
                <Alert variant="info">
                  {t("pages.no_courses_cart_1")}{" "}
                  <Link href="/CourseList">{t("pages.no_courses_cart_2")}</Link>
                </Alert>
              )}
            </Col>
            <Col lg={4} md={12} sm={12}>
              {/*  Card */}
              <Card className="mb-3 cc-pricedetailsCard">
                {/*  Card body */}
                <Card.Header className="cc-pricedetailTotal">Total</Card.Header>
                <vr />
                <Card.Body>
                  <Card.Text className="text-center">
                    <img
                      className="mb-3"
                      src="/images_optimized/mclogo_price_black.svg"
                      width={40}
                    />
                    &nbsp;&nbsp;
                    <span className="text-center cc-pricedetailsPrice">
                      {parseFloat(iTotalPrice / mctPrice).toFixed(2)}
                      &nbsp;/&nbsp;$
                      {iTotalPrice}
                    </span>
                  </Card.Text>
                  <div className="d-grid gap-2 pt-2">
                    <Link href="/Checkout">
                      <a className="btn btn-dark-blue">{t("pages.checkout")}</a>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
              {/*  Card */}
              {/* <Card className="border-0 mb-3 mb-lg-0">
                <Card.Body>
                  <h3 className="mb-2">{t("pages.dicount_codes")}</h3>
                  <Form>
                    <Form.Group
                      className="input-group"
                      controlId="discountcodes"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter your code"
                        required
                      />
                      <Button variant="secondary" id="couponCode">
                        {t("pages.apply")}
                      </Button>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card> */}
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default Cart;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
