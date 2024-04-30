import _ from "lodash";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  NavLink,
  Row,
  Stack,
} from "react-bootstrap";
import MUISkeleton from "../components/Common/MUISkeleton";
import CheckOutCart from "../components/Course/CheckOutCart";
import Header from "../components/Header/Header";
import {
  cartCheckout,
  getUserCartList,
  removeItemFromCart,
} from "../services/nodeapi";
import "../styles/cart.module.css";

const Checkout = () => {
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
  const handleCompleteCheckOut = async () => {
    setIsLoading(true);

    const resp = await cartCheckout();

    if (resp.status === 200) {
      router.push("/PurchaseSuccess");
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
              <h2>Checkout</h2>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Row>
                <Col>
                  <Card className="noBorderCard">
                    <Card.Title>
                      <Stack direction="horizontal" gap={3}>
                        <div className="Cart_CardHeader">Payment Methods</div>
                        <div className="ms-auto  pr-4 divSecuredConnection">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                          Secured Connection
                        </div>
                      </Stack>
                    </Card.Title>
                    <Card.Body className="">
                      <Row>
                        <Col>
                          <ListGroup className="my-4 paymentMethods_Card">
                            <ListGroup.Item action>
                              <Form.Check type="radio" className="ckb_Payments">
                                <Form.Check.Input
                                  type="radio"
                                  name="paymentMethods"
                                />
                                <Form.Check.Label className="paymentMethods_lbl">
                                  <Stack direction="horizontal" gap={3}>
                                    <div className="paymentMethods_txt">
                                      Pay with $MCT Token
                                    </div>
                                    <div className="ms-auto  pr-4 divSecuredConnection">
                                      <img
                                        src="./coin_blue.png"
                                        width={20}
                                        height={20}
                                      />
                                    </div>
                                  </Stack>
                                </Form.Check.Label>
                              </Form.Check>
                            </ListGroup.Item>
                            <ListGroup.Item action>
                              <Form.Check type="radio" className="ckb_Payments">
                                <Form.Check.Input
                                  type="radio"
                                  name="paymentMethods"
                                />
                                <Form.Check.Label className="paymentMethods_lbl">
                                  <Stack direction="horizontal" gap={3}>
                                    <div className="paymentMethods_txt">
                                      Pay with Crypto
                                    </div>
                                    <div className="ms-auto  pr-4 divSecuredConnection">
                                      <img
                                        src="./Crypto.svg"
                                        width={192}
                                        height={24}
                                      />
                                    </div>
                                  </Stack>
                                  <small>
                                    Pay with BTC, ETH, LTC, DASH, BAT, DAI, BCH,
                                    USDC, USDT or BUSD (BEP20)
                                  </small>
                                </Form.Check.Label>
                              </Form.Check>
                            </ListGroup.Item>
                            <ListGroup.Item action>
                              <Form.Check type="radio" className="ckb_Payments">
                                <Form.Check.Input
                                  type="radio"
                                  name="paymentMethods"
                                />
                                <Form.Check.Label className="paymentMethods_lbl">
                                  <Stack direction="horizontal" gap={3}>
                                    <div className="paymentMethods_txt">
                                      Pay with Credit Card
                                    </div>
                                    <div className="ms-auto  pr-4 divSecuredConnection">
                                      <img
                                        src="./Cards.svg"
                                        width={118}
                                        height={24}
                                      />
                                    </div>
                                  </Stack>
                                </Form.Check.Label>
                              </Form.Check>
                            </ListGroup.Item>
                          </ListGroup>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card className="noBorderCard">
                    <Card.Body>
                      <Card.Title>
                        <div className="Cart_CardHeader">Order</div>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                  {isLoading && <MUISkeleton />}
                  {!isLoading &&
                    !_.isEmpty(cObj) &&
                    cObj.map((d: object, i: number) => {
                      return (
                        <>
                          <CheckOutCart
                            {...d}
                            deleteFromCart={deleteFromCart}
                            key={i}
                          />
                          <br />
                        </>
                      );
                    })}
                </Col>
              </Row>
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
                        <Button className="rounded-0">Apply</Button>
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
                          onClick={handleCompleteCheckOut}
                        >
                          Complete Checkout
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

export default Checkout;
