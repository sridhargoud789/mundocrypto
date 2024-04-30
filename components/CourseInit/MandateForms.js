import LoadingSpinner from "components/bootstrap/loadingspinner";
import useMounted from "hooks/useMounted";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Accordion, Alert, Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useRecoilState } from "recoil";
import {
  addMandateQAToGoogleSheet,
  addTelegramUserToGoogleSheet,
  getUserProfileDetails,
  updateEmployeeType,
  updateMandateQA,
  updateTelegramSubmitted,
} from "services/nodeapi";
import { userObject } from "services/states";
import Swal from "sweetalert2";
import mandateData from "../../pages/data/dinerodesbloqueado_qa.json";
import MandateForm from "./MandateForm";

const MandateForms = ({ onMandateEmpOrgSubmit, mainPageReload }) => {
  const { t } = useTranslation();
  const [userObj, setuserObject] = useRecoilState(userObject);

  const hasMounted = useMounted();
  const router = useRouter();
  const [showLoader, setshowLoader] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [isEmployee_Company, setIsEmployee_Company] = useState("");

  const [mandateformvalidated, setMandateformvalidated] = useState(false);

  const [is_module_1_submitted, setis_module_1_submitted] = useState(false);

  const [is_module_2_submitted, setis_module_2_submitted] = useState(false);
  const [is_module_3_submitted, setis_module_3_submitted] = useState(false);
  const [is_module_4_submitted, setis_module_4_submitted] = useState(false);

  const [is_module_5_submitted, setis_module_5_submitted] = useState(false);
  const [is_module_6_submitted, setis_module_6_submitted] = useState(false);

  const [is_module_7_submitted, setis_module_7_submitted] = useState(false);
  const [is_module_8_submitted, setis_module_8_submitted] = useState(false);

  const [is_module_9_submitted, setis_module_9_submitted] = useState(false);
  const [is_module_10_submitted, setis_module_10_submitted] = useState(false);

  const [is_module_11_submitted, setis_module_11_submitted] = useState(false);
  const [is_module_12_submitted, setis_module_12_submitted] = useState(false);

  const [is_module_13_submitted, setis_module_13_submitted] = useState(false);
  const [is_module_14_submitted, setis_module_14_submitted] = useState(false);

  const [istelegram_username_submitted, settelegram_username_submitted] =
    useState(false);
  const remainingForms = [];

  useEffect(() => {
    if (router.query.id) {
      pageLoad(router.query.id);
    }
  }, [router]);

  const pageLoad = async (courseId) => {
    if (parseInt(courseId) === 55) {
      const upResp = await getUserProfileDetails();
      const _employee_company = upResp.data.userData.employee_company;
      const _telegram_username_submitted =
        upResp.data.userData.telegram_username_submitted;
      settelegram_username_submitted(
        _telegram_username_submitted === 1 ? true : false
      );
      setIsEmployee_Company(_employee_company);

      if (_employee_company === "") {
        const inputOptions = {
          2: "Soy dueño de mi propio negocio / Soy autónomo",
          1: "Soy empleado de una empresa",
        };

        const { value: employee_company } = await Swal.fire({
          title: "",
          text: "¿Cuál de las siguientes opciones describe mejor tu situación laboral actual? (Por favor, selecciona la opción que mejor te describa. Es importante que tu respuesta sea honesta y precisa, ya que influirá en el curso de este programa y no podrás cambiarla más adelante.",
          input: "radio",
          inputOptions: inputOptions,
          allowEscapeKey: false,
          allowOutsideClick: false,
          width: "42rem",
          customClass: "modalMandate",
          confirmButtonText: "Enviado",
          inputValidator: (value) => {
            if (!value) {
              return "Por favor, seleccione uno.";
            }
          },
        });

        if (employee_company) {
          const resp = await updateEmployeeType({ employee_company });
          const upResp = await getUserProfileDetails();

          setuserObject(upResp.data.userData);
          setIsEmployee_Company(parseInt(employee_company));
          onMandateEmpOrgSubmit(parseInt(employee_company));
          Swal.fire({
            icon: "success",
            text: "Enviado satisfactoriamente.",
          });
        }
      } else {
        setis_module_1_submitted(
          upResp.data.userData.is_module_1_submitted === 1 ? true : false
        );
        setis_module_2_submitted(
          upResp.data.userData.is_module_2_submitted === 1 ? true : false
        );
        setis_module_3_submitted(
          upResp.data.userData.is_module_3_submitted === 1 ? true : false
        );
        setis_module_4_submitted(
          upResp.data.userData.is_module_4_submitted === 1 ? true : false
        );
        setis_module_5_submitted(
          upResp.data.userData.is_module_5_submitted === 1 ? true : false
        );
        setis_module_6_submitted(
          upResp.data.userData.is_module_6_submitted === 1 ? true : false
        );
        setis_module_7_submitted(
          upResp.data.userData.is_module_7_submitted === 1 ? true : false
        );
        setis_module_8_submitted(
          upResp.data.userData.is_module_8_submitted === 1 ? true : false
        );
        setis_module_9_submitted(
          upResp.data.userData.is_module_9_submitted === 1 ? true : false
        );
        setis_module_10_submitted(
          upResp.data.userData.is_module_10_submitted === 1 ? true : false
        );
        setis_module_11_submitted(
          upResp.data.userData.is_module_11_submitted === 1 ? true : false
        );
        setis_module_12_submitted(
          upResp.data.userData.is_module_12_submitted === 1 ? true : false
        );
        setis_module_13_submitted(
          upResp.data.userData.is_module_13_submitted === 1 ? true : false
        );
        setis_module_14_submitted(
          upResp.data.userData.is_module_14_submitted === 1 ? true : false
        );
      }
    }
  };
  const handleMandateFormSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setMandateformvalidated(true);

      event.preventDefault();
      event.stopPropagation();
      return;
    }
    event.preventDefault();
    setMandateformvalidated(true);
    let _formQuestions = [];
    if (!is_module_1_submitted) {
      _formQuestions =
        isEmployee_Company === 1
          ? mandateData.module1.option1
          : mandateData.module1.option2;
    }
    if (is_module_1_submitted && !is_module_2_submitted) {
      _formQuestions =
        isEmployee_Company === 1
          ? mandateData.module2.option1
          : mandateData.module2.option2;
    } else if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      !is_module_3_submitted
    ) {
      _formQuestions =
        isEmployee_Company === 1
          ? mandateData.module3.option1
          : mandateData.module3.option2;
    } else if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      !is_module_4_submitted
    ) {
      _formQuestions =
        isEmployee_Company === 1
          ? mandateData.module4.option1
          : mandateData.module4.option2;
    } else if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      !is_module_5_submitted
    ) {
      _formQuestions =
        isEmployee_Company === 1
          ? mandateData.module5.option1
          : mandateData.module5.option2;
    } else if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      !is_module_6_submitted
    ) {
      _formQuestions =
        isEmployee_Company === 1
          ? mandateData.module6.option1
          : mandateData.module6.option2;
    } else if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      is_module_6_submitted &&
      !is_module_7_submitted
    ) {
      _formQuestions =
        isEmployee_Company === 1
          ? mandateData.module7.option1
          : mandateData.module7.option2;
    } else if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      is_module_6_submitted &&
      is_module_7_submitted &&
      !is_module_8_submitted
    ) {
      _formQuestions =
        isEmployee_Company === 1
          ? mandateData.module8.option1
          : mandateData.module8.option2;
    } else if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      is_module_6_submitted &&
      is_module_7_submitted &&
      is_module_8_submitted &&
      !is_module_9_submitted
    ) {
      _formQuestions =
        isEmployee_Company === 1
          ? mandateData.module9.option1
          : mandateData.module9.option2;
    } else if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      is_module_6_submitted &&
      is_module_7_submitted &&
      is_module_8_submitted &&
      is_module_9_submitted &&
      !is_module_10_submitted
    ) {
      _formQuestions =
        isEmployee_Company === 1
          ? mandateData.module10.option1
          : mandateData.module10.option2;
    } else if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      is_module_6_submitted &&
      is_module_7_submitted &&
      is_module_8_submitted &&
      is_module_9_submitted &&
      is_module_10_submitted &&
      !is_module_11_submitted
    ) {
      _formQuestions =
        isEmployee_Company === 1
          ? mandateData.module11.option1
          : mandateData.module11.option2;
    } else if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      is_module_6_submitted &&
      is_module_7_submitted &&
      is_module_8_submitted &&
      is_module_9_submitted &&
      is_module_10_submitted &&
      is_module_11_submitted &&
      !is_module_12_submitted
    ) {
      _formQuestions =
        isEmployee_Company === 1
          ? mandateData.module12.option1
          : mandateData.module12.option2;
    } else if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      is_module_6_submitted &&
      is_module_7_submitted &&
      is_module_8_submitted &&
      is_module_9_submitted &&
      is_module_10_submitted &&
      is_module_11_submitted &&
      is_module_12_submitted &&
      !is_module_13_submitted
    ) {
      _formQuestions =
        isEmployee_Company === 1
          ? mandateData.module13.option1
          : mandateData.module13.option2;
    } else if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      is_module_6_submitted &&
      is_module_7_submitted &&
      is_module_8_submitted &&
      is_module_9_submitted &&
      is_module_10_submitted &&
      is_module_11_submitted &&
      is_module_12_submitted &&
      is_module_13_submitted &&
      !is_module_14_submitted
    ) {
      _formQuestions =
        isEmployee_Company === 1
          ? mandateData.module14.option1
          : mandateData.module14.option2;
    }

    let iFormCount = _formQuestions.length;

    const _formKeyValues = {};
    for (let index = 0; index < iFormCount; index++) {
      const fname = form[index].name;
      const fvalue = form[index].value;

      console.log(fname, fvalue);
      Object.assign(_formKeyValues, {
        [form[index].name.trimEnd()]: form[index].value,
      });
    }

    const req = {
      Name: userObj.name,
      Email: userObj.email,
      Phone_No: userObj.phone_number,
      ..._formKeyValues,
    };

    setshowLoader(true);
    const resp = await addMandateQAToGoogleSheet(req);
    if (!is_module_1_submitted) {
      const respMQA = await updateMandateQA({ is_module_1_submitted: 1 });
    }
    if (is_module_1_submitted && !is_module_2_submitted) {
      const respMQA = await updateMandateQA({ is_module_2_submitted: 1 });
    }
    if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      !is_module_3_submitted
    ) {
      const respMQA = await updateMandateQA({ is_module_3_submitted: 1 });
    }
    if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      !is_module_4_submitted
    ) {
      const respMQA = await updateMandateQA({ is_module_4_submitted: 1 });
    }
    if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      !is_module_5_submitted
    ) {
      const respMQA = await updateMandateQA({ is_module_5_submitted: 1 });
    }
    if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      !is_module_6_submitted
    ) {
      const respMQA = await updateMandateQA({ is_module_6_submitted: 1 });
    }

    if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      is_module_6_submitted &&
      !is_module_7_submitted
    ) {
      const respMQA = await updateMandateQA({ is_module_7_submitted: 1 });
    }

    if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      is_module_6_submitted &&
      is_module_7_submitted &&
      !is_module_8_submitted
    ) {
      const respMQA = await updateMandateQA({ is_module_8_submitted: 1 });
    }

    if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      is_module_6_submitted &&
      is_module_7_submitted &&
      is_module_8_submitted &&
      !is_module_9_submitted
    ) {
      const respMQA = await updateMandateQA({ is_module_9_submitted: 1 });
    }

    if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      is_module_6_submitted &&
      is_module_7_submitted &&
      is_module_8_submitted &&
      is_module_9_submitted &&
      !is_module_10_submitted
    ) {
      const respMQA = await updateMandateQA({ is_module_10_submitted: 1 });
    }

    if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      is_module_6_submitted &&
      is_module_7_submitted &&
      is_module_8_submitted &&
      is_module_9_submitted &&
      is_module_10_submitted &&
      !is_module_11_submitted
    ) {
      const respMQA = await updateMandateQA({ is_module_11_submitted: 1 });
    }

    if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      is_module_6_submitted &&
      is_module_7_submitted &&
      is_module_8_submitted &&
      is_module_9_submitted &&
      is_module_10_submitted &&
      is_module_11_submitted &&
      !is_module_12_submitted
    ) {
      const respMQA = await updateMandateQA({ is_module_12_submitted: 1 });
    }

    if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      is_module_6_submitted &&
      is_module_7_submitted &&
      is_module_8_submitted &&
      is_module_9_submitted &&
      is_module_10_submitted &&
      is_module_11_submitted &&
      is_module_12_submitted &&
      !is_module_13_submitted
    ) {
      const respMQA = await updateMandateQA({ is_module_13_submitted: 1 });
    }
    if (
      is_module_1_submitted &&
      is_module_2_submitted &&
      is_module_3_submitted &&
      is_module_4_submitted &&
      is_module_5_submitted &&
      is_module_6_submitted &&
      is_module_7_submitted &&
      is_module_8_submitted &&
      is_module_9_submitted &&
      is_module_10_submitted &&
      is_module_11_submitted &&
      is_module_12_submitted &&
      is_module_13_submitted &&
      !is_module_14_submitted
    ) {
      const respMQA = await updateMandateQA({ is_module_14_submitted: 1 });
    }

    setshowLoader(false);
    Swal.fire({
      icon: "success",
      text: "Enviado satisfactoriamente",
    });
    mainPageReload();
    pageLoad();
  };

  const handleRegisterTelegram = async () => {
    const { value: userName } = await Swal.fire({
      title: "Enter valid Telegram user name",
      input: "text",
      inputValidator: (userName) => {
        if (!userName) {
          return "Enter telegram username!";
        }
      },
      inputPlaceholder: "Enter valid Telegram user name",
    });

    if (userName) {
      const req = {
        name: userObj.name,
        email: userObj.email,
        telegram_username: userName,
      };

      const resp = await addTelegramUserToGoogleSheet(req);
      const respBackend = await updateTelegramSubmitted({
        telegram_username_submitted: 1,
      });
      settelegram_username_submitted(true);
      const url = "https://t.me/+at7nFXaRcv00Yjc8";
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    }
  };

  const handleContactWhatsApp = async () => {
    const url = "https://wa.me/971588163253";
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  return (
    <Fragment>
      <LoadingSpinner showLoading={showLoader} />
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Formulario #1&nbsp;
            {is_module_1_submitted && (
              <Badge pill bg="success">
                Enviado
              </Badge>
            )}
          </Accordion.Header>
          <Accordion.Body>
            {!is_module_1_submitted ? (
              <MandateForm
                handleMandateFormSubmit={handleMandateFormSubmit}
                mandateformvalidated={mandateformvalidated}
                data={mandateData.module1}
                isEmployee_Company={isEmployee_Company}
              />
            ) : (
              <Alert variant={"success"}>¡Enviado satisfactoriamente</Alert>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            Formulario #2&nbsp;
            {is_module_2_submitted && (
              <Badge pill bg="success">
                Enviado
              </Badge>
            )}
          </Accordion.Header>
          <Accordion.Body>
            {is_module_1_submitted && !is_module_2_submitted && (
              <MandateForm
                handleMandateFormSubmit={handleMandateFormSubmit}
                mandateformvalidated={mandateformvalidated}
                data={mandateData.module2}
                isEmployee_Company={isEmployee_Company}
              />
            )}
            {is_module_2_submitted && (
              <Alert variant={"success"}>¡Enviado satisfactoriamente</Alert>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Formulario #3&nbsp;
            {is_module_3_submitted && (
              <Badge pill bg="success">
                Enviado
              </Badge>
            )}
          </Accordion.Header>
          <Accordion.Body>
            {is_module_1_submitted &&
              is_module_2_submitted &&
              !is_module_3_submitted && (
                <MandateForm
                  handleMandateFormSubmit={handleMandateFormSubmit}
                  mandateformvalidated={mandateformvalidated}
                  data={mandateData.module3}
                  isEmployee_Company={isEmployee_Company}
                />
              )}
            {is_module_3_submitted && (
              <Alert variant={"success"}>¡Enviado satisfactoriamente</Alert>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            Formulario #4&nbsp;
            {is_module_4_submitted && (
              <Badge pill bg="success">
                Enviado
              </Badge>
            )}
          </Accordion.Header>
          <Accordion.Body>
            {is_module_1_submitted &&
              is_module_2_submitted &&
              is_module_3_submitted &&
              !is_module_4_submitted && (
                <MandateForm
                  handleMandateFormSubmit={handleMandateFormSubmit}
                  mandateformvalidated={mandateformvalidated}
                  data={mandateData.module4}
                  isEmployee_Company={isEmployee_Company}
                />
              )}
            {is_module_4_submitted && (
              <Alert variant={"success"}>¡Enviado satisfactoriamente</Alert>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            Formulario #5&nbsp;
            {is_module_5_submitted && (
              <Badge pill bg="success">
                Enviado
              </Badge>
            )}
          </Accordion.Header>
          <Accordion.Body>
            {is_module_1_submitted &&
              is_module_2_submitted &&
              is_module_3_submitted &&
              is_module_4_submitted &&
              !is_module_5_submitted && (
                <MandateForm
                  handleMandateFormSubmit={handleMandateFormSubmit}
                  mandateformvalidated={mandateformvalidated}
                  data={mandateData.module5}
                  isEmployee_Company={isEmployee_Company}
                />
              )}
            {is_module_5_submitted && (
              <Alert variant={"success"}>¡Enviado satisfactoriamente</Alert>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            Formulario #6&nbsp;
            {is_module_6_submitted && (
              <Badge pill bg="success">
                Enviado
              </Badge>
            )}
          </Accordion.Header>
          <Accordion.Body>
            {is_module_1_submitted &&
              is_module_2_submitted &&
              is_module_3_submitted &&
              is_module_4_submitted &&
              is_module_5_submitted &&
              !is_module_6_submitted && (
                <MandateForm
                  handleMandateFormSubmit={handleMandateFormSubmit}
                  mandateformvalidated={mandateformvalidated}
                  data={mandateData.module6}
                  isEmployee_Company={isEmployee_Company}
                />
              )}
            {is_module_6_submitted && (
              <Alert variant={"success"}>¡Enviado satisfactoriamente</Alert>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>
            Formulario #7&nbsp;
            {is_module_7_submitted && (
              <Badge pill bg="success">
                Enviado
              </Badge>
            )}
          </Accordion.Header>
          <Accordion.Body>
            {is_module_1_submitted &&
              is_module_2_submitted &&
              is_module_3_submitted &&
              is_module_4_submitted &&
              is_module_5_submitted &&
              is_module_6_submitted &&
              !is_module_7_submitted && (
                <MandateForm
                  handleMandateFormSubmit={handleMandateFormSubmit}
                  mandateformvalidated={mandateformvalidated}
                  data={mandateData.module7}
                  isEmployee_Company={isEmployee_Company}
                />
              )}
            {is_module_7_submitted && (
              <Alert variant={"success"}>¡Enviado satisfactoriamente</Alert>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
          <Accordion.Header>
            Formulario #8&nbsp;
            {is_module_8_submitted && (
              <Badge pill bg="success">
                Enviado
              </Badge>
            )}
          </Accordion.Header>
          <Accordion.Body>
            {is_module_1_submitted &&
              is_module_2_submitted &&
              is_module_3_submitted &&
              is_module_4_submitted &&
              is_module_5_submitted &&
              is_module_6_submitted &&
              is_module_7_submitted &&
              !is_module_8_submitted && (
                <MandateForm
                  handleMandateFormSubmit={handleMandateFormSubmit}
                  mandateformvalidated={mandateformvalidated}
                  data={mandateData.module8}
                  isEmployee_Company={isEmployee_Company}
                />
              )}
            {is_module_8_submitted && (
              <Alert variant={"success"}>¡Enviado satisfactoriamente</Alert>
            )}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="8">
          <Accordion.Header>
            Formulario #9&nbsp;
            {is_module_9_submitted && (
              <Badge pill bg="success">
                Enviado
              </Badge>
            )}
          </Accordion.Header>
          <Accordion.Body>
            {is_module_1_submitted &&
              is_module_2_submitted &&
              is_module_3_submitted &&
              is_module_4_submitted &&
              is_module_5_submitted &&
              is_module_6_submitted &&
              is_module_7_submitted &&
              is_module_8_submitted &&
              !is_module_9_submitted && (
                <MandateForm
                  handleMandateFormSubmit={handleMandateFormSubmit}
                  mandateformvalidated={mandateformvalidated}
                  data={mandateData.module9}
                  isEmployee_Company={isEmployee_Company}
                />
              )}
            {is_module_9_submitted && (
              <Alert variant={"success"}>¡Enviado satisfactoriamente</Alert>
            )}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="9">
          <Accordion.Header>
            Formulario #10&nbsp;
            {is_module_10_submitted && (
              <Badge pill bg="success">
                Enviado
              </Badge>
            )}
          </Accordion.Header>
          <Accordion.Body>
            {is_module_1_submitted &&
              is_module_2_submitted &&
              is_module_3_submitted &&
              is_module_4_submitted &&
              is_module_5_submitted &&
              is_module_6_submitted &&
              is_module_7_submitted &&
              is_module_8_submitted &&
              is_module_9_submitted &&
              !is_module_10_submitted && (
                <MandateForm
                  handleMandateFormSubmit={handleMandateFormSubmit}
                  mandateformvalidated={mandateformvalidated}
                  data={mandateData.module10}
                  isEmployee_Company={isEmployee_Company}
                />
              )}
            {is_module_10_submitted && (
              <Alert variant={"success"}>¡Enviado satisfactoriamente</Alert>
            )}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="10">
          <Accordion.Header>
            Formulario #11&nbsp;
            {is_module_11_submitted && (
              <Badge pill bg="success">
                Enviado
              </Badge>
            )}
          </Accordion.Header>
          <Accordion.Body>
            {is_module_1_submitted &&
              is_module_2_submitted &&
              is_module_3_submitted &&
              is_module_4_submitted &&
              is_module_5_submitted &&
              is_module_6_submitted &&
              is_module_7_submitted &&
              is_module_8_submitted &&
              is_module_9_submitted &&
              is_module_10_submitted &&
              !is_module_11_submitted && (
                <MandateForm
                  handleMandateFormSubmit={handleMandateFormSubmit}
                  mandateformvalidated={mandateformvalidated}
                  data={mandateData.module11}
                  isEmployee_Company={isEmployee_Company}
                />
              )}
            {is_module_11_submitted && (
              <Alert variant={"success"}>¡Enviado satisfactoriamente</Alert>
            )}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="11">
          <Accordion.Header>
            Formulario #12&nbsp;
            {is_module_12_submitted && (
              <Badge pill bg="success">
                Enviado
              </Badge>
            )}
          </Accordion.Header>
          <Accordion.Body>
            {is_module_1_submitted &&
              is_module_2_submitted &&
              is_module_3_submitted &&
              is_module_4_submitted &&
              is_module_5_submitted &&
              is_module_6_submitted &&
              is_module_7_submitted &&
              is_module_8_submitted &&
              is_module_9_submitted &&
              is_module_10_submitted &&
              is_module_11_submitted &&
              !is_module_12_submitted && (
                <MandateForm
                  handleMandateFormSubmit={handleMandateFormSubmit}
                  mandateformvalidated={mandateformvalidated}
                  data={mandateData.module12}
                  isEmployee_Company={isEmployee_Company}
                />
              )}
            {is_module_12_submitted && (
              <Alert variant={"success"}>¡Enviado satisfactoriamente</Alert>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="12">
          <Accordion.Header>
            Formulario #13&nbsp;
            {is_module_13_submitted && (
              <Badge pill bg="success">
                Enviado
              </Badge>
            )}
          </Accordion.Header>
          <Accordion.Body>
            {is_module_1_submitted &&
              is_module_2_submitted &&
              is_module_3_submitted &&
              is_module_4_submitted &&
              is_module_5_submitted &&
              is_module_6_submitted &&
              is_module_7_submitted &&
              is_module_8_submitted &&
              is_module_9_submitted &&
              is_module_10_submitted &&
              is_module_11_submitted &&
              is_module_12_submitted &&
              !is_module_13_submitted && (
                <MandateForm
                  handleMandateFormSubmit={handleMandateFormSubmit}
                  mandateformvalidated={mandateformvalidated}
                  data={mandateData.module13}
                  isEmployee_Company={isEmployee_Company}
                />
              )}
            {is_module_13_submitted && (
              <Alert variant={"success"}>¡Enviado satisfactoriamente</Alert>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="13">
          <Accordion.Header>
            Formulario #14&nbsp;
            {is_module_14_submitted && (
              <Badge pill bg="success">
                Enviado
              </Badge>
            )}
          </Accordion.Header>
          <Accordion.Body>
            {is_module_1_submitted &&
              is_module_2_submitted &&
              is_module_3_submitted &&
              is_module_4_submitted &&
              is_module_5_submitted &&
              is_module_6_submitted &&
              is_module_7_submitted &&
              is_module_8_submitted &&
              is_module_9_submitted &&
              is_module_10_submitted &&
              is_module_11_submitted &&
              is_module_12_submitted &&
              is_module_13_submitted &&
              !is_module_14_submitted && (
                <MandateForm
                  handleMandateFormSubmit={handleMandateFormSubmit}
                  mandateformvalidated={mandateformvalidated}
                  data={mandateData.module14}
                  isEmployee_Company={isEmployee_Company}
                />
              )}
            {is_module_14_submitted && (
              <Alert variant={"success"}>¡Enviado satisfactoriamente</Alert>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Fragment>
  );
};

export default MandateForms;
