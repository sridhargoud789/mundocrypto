import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import {
  getMCWalletBalance,
  redeemMCTokens,
  tokenValue,
} from "services/nodeapi";
import { userProfileObject } from "services/states";
import Swal from "sweetalert2";

const MCWallet = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [mcWalletBalance, setMCWalletBalance] = useState(0);
  const [mctPrice, setMCTPrice] = useState(0);
  const userObj = useRecoilValue(userProfileObject);
  useEffect(() => {
    pageLoad();
  }, []);

  const pageLoad = async () => {
    const resp = await getMCWalletBalance();
    if (resp.data.data !== null) {
      await loadMCTPrice();
      setMCWalletBalance(resp.data.data.token_balance);
    } else {
      setMCWalletBalance(0);
    }
  };

  const loadMCTPrice = async () => {
    const resp = await tokenValue();
    if (resp.status === 200) {
      setMCTPrice(resp.data.data.price);
    }
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();

      if (userObj.is_phone_verified === 0) {
        Swal.fire({
          icon: "error",
          title: t("error.error"),
          text: "Por favor, valide el número de móvil.",
        }).then(async (result) => {
          router.push("/privatearea/security");
        });
      } else {
        const resp = await redeemMCTokens({
          referralCode: form.referralCode.value,
        });
        const { isSuccess, data } = resp.data;
        await pageLoad();
        Swal.fire({
          icon: isSuccess ? "success" : "error",
          title: isSuccess ? t("error.success") : t("error.error"),
          text: isSuccess ? "Agregado exitosamente." : "Codigo invalido.",
        });
        form.reset();
      }
    }
    setValidated(true);
  };

  return (
    <>
      <Card className="border-0 mb-4">
        <Card.Header className="d-lg-flex align-items-center justify-content-between">
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">{t("claim_mct")}</h3>
          </div>
        </Card.Header>
        <Card.Body className="p-4 ">
          <Card className="border-0">
            <Card.Header
              className="d-lg-flex align-items-center justify-content-between"
              style={{ backgroundColor: "#ECF2FF" }}
            >
              <div className="mb-3 mb-lg-0">
                <h5 className="mb-0">{t("available_balance")}</h5>
              </div>
              <div>
                <b>
                  {" "}
                  <img
                    src="/images_optimized/MundoWallet.svg"
                    width={24}
                    height={24}
                  />{" "}
                  {parseFloat(mcWalletBalance).toFixed(2)} / $
                  {parseFloat(mcWalletBalance * mctPrice).toFixed(2)}
                </b>{" "}
              </div>
            </Card.Header>
          </Card>
          <Form
            className="mt-4"
            noValidate={true}
            validated={validated}
            onSubmit={handleSubmit}
          >
            <h4>Canjear Código</h4>
            <Row className="mb-3">
              <Col sm={8} className="my-1">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Canjear Código"
                  required={true}
                  name="referralCode"
                />
              </Col>

              <Col xs="auto" className="my-1">
                <Button type="submit" size="sm" variant="primary">
                  {t("add_to_wallet")}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
export default MCWallet;
