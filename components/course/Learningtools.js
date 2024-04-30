import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { Fragment, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { useMediaQuery } from "react-responsive";
import { enableCourseRemainders } from "services/nodeapi";
import Swal from "sweetalert2";

const Learningtools = ({ course_id }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [phoneNumber, setPhoneNumber] = useState("");
  const [showEnableNotifications, setshowEnableNotifications] = useState(true);
  const onPhoneNoChange = (status, phoneNumber, country, code) => {
    const number = "+" + country.dialCode + phoneNumber;
    setPhoneNumber(number.trim());
  };
  const handleEnableRemainders = async () => {
    const resp = await enableCourseRemainders({
      course_id,
      is_remainder_notifications_enabled: 1,
    });
    setshowEnableNotifications(false);
    Swal.fire({
      icon: "success",
      title: t("error.success"),
      text: "Recordatorio activado con éxito",
    }).then(async (result) => {
      //setShowQuestionForm(false);
    });
  };
  return (
    <Fragment>
      <div className={`mb-3  ${!isMobile ? "pt-0 p-6" : "p-0"}`}>
        <Card className="noBorderCard">
          <Card.Header className="cd-detailsContentTitle noBorderCard">
            Recordatorios de aprendizaje
          </Card.Header>

          <Card.Body>
            <Card.Text className="lt-SubTitle">
              Calendario de actividades
            </Card.Text>

            <Card.Text>
              Aprender un poco cada día suma. Los estudios demuestran que los
              estudiantes que convierten el aprendizaje en un hábito tienen más
              probabilidades de alcanzar sus objetivos. Reserva tiempo para
              aprender y recibe recordatorios utilizando tu agenda de
              aprendizaje.
            </Card.Text>
            {showEnableNotifications && (
              <Button
                className="btn-dark-blue"
                size="lg"
                onClick={handleEnableRemainders}
              >
                ACTIVAR RECORDATORIO
                <Icon path={mdiPlus} size={1} />
              </Button>
            )}
            {false && (
              <>
                {" "}
                <Card.Text className="lt-SubTitle mt-6">
                  Text me a link to download the app
                </Card.Text>
                <Row>
                  <Col md={6} sm={12} className="mb-3">
                    <Form.Group controlId="phone">
                      <IntlTelInput
                        required={false}
                        name="phone"
                        width={100}
                        inputClassName="form-control"
                        preferredCountries={["es", "us", "in"]}
                        defaultCountry="es"
                        useMobileFullscreenDropdown={true}
                        onPhoneNumberChange={onPhoneNoChange}
                        onPhoneNumberBlur={() => {}}
                      />
                      <Form.Control
                        style={{ display: "none" }}
                        type="text"
                        required
                        value={phoneNumber}
                        name="phone_number"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} sm={12} className="mb-3">
                    <Button className="btn-dark-blue" size="md">
                      Send
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    By providing your phone number, you agree to receive a
                    one-time automated text message with a link to get app.
                    Standard messaging rates may apply.
                  </Col>
                </Row>
              </>
            )}
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
};

export default Learningtools;
