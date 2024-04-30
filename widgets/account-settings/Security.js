// import node module libraries

import { useRouter } from "next/router";

import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { userProfileObject } from "../../services/states";
// import widget/custom components
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { PasswordStrengthMeter } from "widgets";
import {
  changePassword,
  getUserProfileDetails,
  sendOTP,
  verifyOTP,
} from "../../services/nodeapi";

import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
const Security = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [currentpassword, setCurrentPassword] = useState("");
  const [pwdErrMsg, setPwdErrMsg] = useState("");
  const router = useRouter();

  const [userObj, setUserProfileObject] = useRecoilState(userProfileObject);

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === password) {
      setPwdErrMsg("");
    } else {
      setPwdErrMsg("Passwords do not match.");
    }
  };

  const SubmitResetPassword = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmpassword) {
        setPwdErrMsg("Passwords do not match.");
        return;
      }
      const req = {
        currentPassword: e.target.currentPassword.value,
        newPassword: e.target.newPassword.value,
      };
      const resp = await changePassword(req);

      if (resp.status === 200) {
        const d = resp.data;
        if (!d.isSuccess) {
          setPwdErrMsg(d.message);
        } else {
          setPwdErrMsg(false);

          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Updated successfully.",
          }).then((result) => {
            router.push("/");
          });
        }
      } else {
        setPwdErrMsg("Error occured. Please try after sometime.");
      }
    } catch (error) {
      setPwdErrMsg("Error occured. Please try after sometime.");
    }
  };

  const validateMobileNo = async () => {
    const resp = await sendOTP({ mobile_number: userObj.phone_number });
    if (resp.status === 200) {
      if (resp.data.isSuccess) {
        Swal.fire({
          title:
            "Por favor, ingresa el código de verificación que enviamos a tu número de teléfono",
          input: "number",
          inputLabel: "",
          inputValue: "",
          showCancelButton: true,
          confirmButtonText: "Validar",
          cancelButtonText: "Cancelar",
          inputValidator: async (value) => {
            if (!value) {
              return "Por favor ingrese OTP.";
            } else {
              const verifyOTPResp = await verifyOTP({
                mobile_number: userObj.phone_number,
                otp: value,
              });
              const { isSuccess, message } = verifyOTPResp.data;
              if (!isSuccess) {
                return message;
              } else {
                const upResp = await getUserProfileDetails();

                setUserProfileObject(upResp.data.userData);
                Swal.fire({
                  icon: "success",
                  title: t("error.success"),
                  text: "OTP validado con éxito.",
                });
              }
            }
          },
        });
      }
    }
  };
  return (
    <Card className="border-0">
      <Card.Header>
        <div className="mb-3 mb-lg-0">
          <h3 className="mb-0">{t("private_area.security")}</h3>
          <p className="mb-0">
            {t("private_area.security_edit_account_settings")}
          </p>
        </div>
      </Card.Header>
      <Card.Body>
        <p className="d-flex justify-content-between">
          <div className="">
            <h4 className="mb-0">
              {t("signup.phone_no")}&nbsp;&nbsp;
              {userObj.is_phone_verified === 1 && (
                <Chip
                  size="small"
                  label={
                    <>
                      <img src="/images_optimized/check.svg" width={15} />
                      &nbsp;Verificado
                    </>
                  }
                  color="success"
                />
              )}
            </h4>
            {t("signup.phone_no")}{" "}
            <span className="text-success">{userObj.phone_number}</span>
          </div>
          {userObj.is_phone_verified === 0 && (
            <div className="">
              <Button size="sm" variant="primary" onClick={validateMobileNo}>
                Verificar número de móvil
              </Button>
            </div>
          )}
        </p>
        <hr className="my-5" />
        <h4 className="mb-0">{t("private_area.security_email")}</h4>
        <p>
          {t("private_area.security_current_email")}{" "}
          <span className="text-success">{userObj.email}</span>
        </p>
        <hr className="my-5" />
        <div>
          <h4 className="mb-0">{t("private_area.security_change_password")}</h4>
          <p>{t("private_area.security_password_email")}</p>
          {/* Form */}
          <Form onSubmit={SubmitResetPassword}>
            <Row>
              <Col lg={6} md={12} sm={12}>
                {/* Current password */}

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="currentpassword">
                    {t("private_area.security_current_password")}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    id="currentpassword"
                    name="currentPassword"
                    value={currentpassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* New password */}
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="newpassword">
                    {t("private_area.security_new_password")}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    id="newpassword"
                    value={password}
                    name="newPassword"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Row className="align-items-center g-0">
                  <Col sm={6}>
                    <span
                      data-bs-toggle="tooltip"
                      data-placement="right"
                      title=""
                    >
                      {t("private_area.security_password_strength")}
                      <OverlayTrigger
                        key="top"
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-top">
                            {t("private_area.security_tooltip")}
                          </Tooltip>
                        }
                      >
                        <i className="fas fa-question-circle ms-1"></i>
                      </OverlayTrigger>
                    </span>
                  </Col>
                </Row>
                <PasswordStrengthMeter password={password} />

                {/* Confirm new password */}
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="confirmpassword">
                    {t("private_area.security_confirm_password")}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    id="confirmpassword"
                    value={confirmpassword}
                    onChange={handleConfirmPassword}
                    required
                  />
                  {pwdErrMsg && (
                    <span style={{ color: "red" }}>{pwdErrMsg}</span>
                  )}
                </Form.Group>
                {/* Button */}
                <Button type="submit" className="btn btn-primary">
                  {t("private_area.security_save_password")}
                </Button>
                <div className="col-6"></div>
              </Col>
            </Row>
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Security;
