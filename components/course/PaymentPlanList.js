import { Col, Form, ListGroup, Row } from "react-bootstrap";
const PaymentPlanList = ({
  handleSplitChange,
  split_payment_amounts_obj,
  index,
  t,
}) => {
  return (
    <ListGroup.Item>
      <Form.Check
        onChange={() => handleSplitChange(2, split_payment_amounts_obj[index])}
        label={
          <Row style={{ marginTop: "-1rem" }}>
            <Col md={6} lg={6} sm={12}>
              <div className="splitPayment_txt">
                {t("checkout.split_by")} -{" "}
                {split_payment_amounts_obj[index].emis} *{" $"}
                {split_payment_amounts_obj[index].original_price}
              </div>

              <span className="muted text-primary">
                <b>Total: ${split_payment_amounts_obj[index].total_price}</b>
              </span>
            </Col>
            <Col md={6} lg={6} sm={12} className="text-end">
              <div className="ms-auto  pr-4 divSecuredConnection splitPayment_txt text-primary mt-3">
                <b>
                  $
                  {parseFloat(
                    split_payment_amounts_obj[index].original_price
                  ).toFixed(2)}{" "}
                </b>{" "}
              </div>
            </Col>
          </Row>
        }
        name="splitPayment"
        value="2"
        type={"radio"}
        id={`sp-3`}
      />
    </ListGroup.Item>
  );
};

export default PaymentPlanList;
