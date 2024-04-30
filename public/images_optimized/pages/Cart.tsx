import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, NavLink, Row, Stack } from "react-bootstrap";
import MUISkeleton from "../components/Common/MUISkeleton";
import Header from "../components/Header/Header";
import CartObject from "../components/Course/CartObject";

import { getUserCartList, removeItemFromCart } from "../services/nodeapi";
import "../styles/cart.module.css";

const Cart = () => {
  const router = useRouter();

  const [cObj, setcObj] = useState([]);
  const [cartCount, setcartCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [iTotalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    pageLoad();
  }, []);
  const pageLoad = async () => {
    setIsLoading(true);

    const clResp = await getUserCartList();

    if (clResp.status === 200) {
      setcObj(clResp.data.courses);
      let price = 0;
      clResp.data.courses.map((c: any) => {
        price = price + c.price;
      });
      setcartCount(clResp.data.courses.length);
      setTotalPrice(price);
    }
    setIsLoading(false);
  };

  const deleteFromCart = async (courseId: any) => {
    setIsLoading(true);
    const resp = await removeItemFromCart({ courseId });
    if (resp.status === 200) {
      await pageLoad();
    }
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <section className="container h-auto  d-flex align-items-center justify-content-center p-6">
        <div className="container">
          <Row className="pb-6">
            <Col>
              <h2>Shopping Cart</h2>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              {isLoading && <MUISkeleton />}
              {!isLoading &&
                !_.isEmpty(cObj) &&
                cObj.map((d: object, i: number) => {
                  return (
                    <>
                      <CartObject
                        {...d}
                        deleteFromCart={deleteFromCart}
                        key={i}
                      />
                      <br />
                    </>
                  );
                })}
            </Col>
            <Col md={4}>
              <Card className="rounded-0">
                <Card.Body>
                  <Card.Title>Order Summary</Card.Title>
                  <Row>
                    <Col>
                      <Stack direction="horizontal" gap={0}>
                        <Form.Control
                          className="me-auto rounded-0"
                          placeholder="Enter Coupon Code"
                        />
                        <Button variant="dark" className="rounded-0">
                          Apply
                        </Button>
                      </Stack>
                    </Col>
                  </Row>
                  <Row className="pt-10">
                    <Col>
                      <Stack direction="horizontal" gap={3}>
                        <div>
                          <b>Subtotal</b> ({cartCount} items)
                        </div>
                        <div className="ms-auto  pr-4">
                          <img
                            src="./coin_black.png"
                            width={20}
                            height={20}
                            style={{ marginTop: "-4%" }}
                          />
                          <span className="Cart_CoursePrice_MC">
                            {iTotalPrice}
                          </span>
                          {" / "}
                          <span className="Cart_CoursePrice_USD">
                            ${Math.round(iTotalPrice).toFixed(2)}
                          </span>
                        </div>
                      </Stack>
                    </Col>
                  </Row>
                  <Row className="pt-6">
                    <Col>
                      <span className="Cart_TNC_lbl">
                        By completing your purchase, you agree to these{" "}
                        <NavLink href="#" className="Cart_TNC_link">
                          Terms of Use.
                        </NavLink>
                      </span>
                    </Col>
                  </Row>
                  <Row className="pt-6">
                    <Col>
                      <div className="d-grid gap-2">
                        <Button
                          type="submit"
                          className="btn  btn-lg btnBlack  rounded-0"
                          onClick={() => router.push("/Checkout")}
                        >
                          Proceed to Checkout
                        </Button>
                      </div>{" "}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default Cart;
