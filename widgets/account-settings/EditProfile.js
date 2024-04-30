// import node module libraries
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

// import widget/custom components
import _ from "lodash";
import { useRecoilState } from "recoil";
import {
  edit_Profile,
  getUserProfileDetails,
  uploadProfilePic,
} from "services/nodeapi";
import { userObject, userProfileObject } from "../../services/states";

import LoadingSpinner from "components/bootstrap/loadingspinner";
import FormData from "form-data";
import * as formik from "formik";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import * as Yup from "yup";

const EditProfile = () => {
  const router = useRouter();

  const [showLoader, setshowLoader] = useState(false);

  const [userObj, setuserObject] = useRecoilState(userObject);
  const [userProfileObj, setUserProfileObject] =
    useRecoilState(userProfileObject);

  const location = useRouter();
  const [uploadedFile, setUploadedFile] = useState(null);

  const [uploadedFileURL, setuploadedFileURL] = useState(
    "/images_optimized/avatar/defaultuser.png"
  );

  const { t } = useTranslation();
  const { Formik } = formik;
  useEffect(() => {
    pageLoad();
  }, []);
  const pageLoad = async () => {
    if (!_.isEmpty(userProfileObj)) {
      setuploadedFileURL(userProfileObj.avatar);
    }
  };
  const statelist = [
    { value: "1", label: "Madrid" },
    { value: "2", label: "Barcelona" },
    { value: "3", label: "A Coruña" },
  ];
  const countrylist = [
    { value: "1", label: "Spain" },
    { value: "2", label: "UK" },
    { value: "3", label: "USA" },
    { value: "4", label: "India" },
  ];
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setuploadedFileURL(URL.createObjectURL(fileUploaded));
    setUploadedFile(fileUploaded);
  };

  const handleUpdateProfilePic = async () => {
    try {
      setshowLoader(true);
      var data = new FormData();
      data.append("profile_picture", uploadedFile);
      const resp = await uploadProfilePic(data);
      const upResp = await getUserProfileDetails();
      setUserProfileObject(upResp.data.userData);
      setshowLoader(false);
      toast.success("Profile pic updated successfully.");
    } catch (e) {
      setshowLoader(false);
    }
  };
  const [errorMessage, setErrorMessage] = useState("");

  const phoneRegExp =
    /^\+?((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const fullNameRegExp = /^[aA-zZ\s]+$/;
  const schema = Yup.object().shape({
    name: Yup.string()
      .required(t("error.firstname_required"))
      .matches(fullNameRegExp, t("error.invalid_firstname")),
    last_name: Yup.string()
      .matches(fullNameRegExp, t("error.invalid_lastname"))
      .required(t("error.invalid_lastname")),
    date_birth: Yup.string(),

    address_line1: Yup.string().required(t("error.address_line_1_required")),
    address_line2: Yup.string(),
    state: Yup.string()
      .required(t("error.state_required"))
      .matches(fullNameRegExp, t("error.invalid_state")),
    country: Yup.string()
      .required(t("error.country_required"))
      .matches(fullNameRegExp, t("error.invalid_country")),
    phone_number: Yup.string()
      .min(6, t("error.invalid_phone"))
      .max(15, t("error.invalid_phone"))
      .required(t("error.phone_required"))
      .matches(phoneRegExp, t("error.invalid_phone")),
  });

  const handleSubmit = async (req) => {
    try {
      setshowLoader(true);

      const resp = await edit_Profile(req);

      setshowLoader(false);
      if (resp.status === 200) {
        const d = resp.data;
        if (!d.isSuccess) {
          setErrorMessage(d.message);
        } else {
          //setuserObject(d.data);
          const upResp = await getUserProfileDetails();
          setUserProfileObject(upResp.data.userData);

          Swal.fire({
            icon: "success",
            title: t("error.success"),
            text: t("error.update_success"),
          }).then((result) => {
            router.push("/");
          });
        }
      } else {
        setErrorMessage(t("error.sometime"));
      }
    } catch (error) {
      setshowLoader(false);
      setErrorMessage(t("error.sometime"));
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <LoadingSpinner showLoading={showLoader} />
      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">{t("profile_details")}</h3>
            <p className="mb-0">{t("profile_details_subtitle")}</p>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="d-lg-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <img
                src={uploadedFileURL}
                id="img-uploaded"
                className="avatar-xl rounded-circle"
                alt=""
              />
              <div className="ms-3">
                <h4 className="mb-0">{t("your_avatar")}</h4>
                <p className="mb-0">{t("your_avatar_subtitle")}</p>
              </div>
            </div>
            <div>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: "none" }}
              />
              <Button variant="outline-white" size="sm" onClick={handleClick}>
                {t("upload")}
              </Button>{" "}
              <Button
                variant="outline-white"
                size="sm"
                onClick={handleUpdateProfilePic}
              >
                {t("update")}
              </Button>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <h4 className="mb-0">{t("personal_details")}</h4>
            <p className="mb-4">{t("personal_details_subtitle")}</p>
            {/* Form */}
            <Formik
              noValidate
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={schema}
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              initialValues={userProfileObj}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col lg={6} md={6} sm={12} className="mb-3">
                      <Form.Label>{t("checkout.first_name")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.name}
                        isValid={touched.name && !errors.name}
                        id="name"
                        placeholder={t("checkout.first_name_placeholder")}
                        autoComplete="new-password"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Col>
                    <Col lg={6} md={6} sm={12} className="mb-3">
                      <Form.Label>{t("checkout.last_name")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="last_name"
                        value={values.last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.last_name}
                        isValid={touched.last_name && !errors.last_name}
                        id="last_name"
                        placeholder={t("checkout.last_name_placeholder")}
                        autoComplete="new-password"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.last_name}
                      </Form.Control.Feedback>
                    </Col>
                    <Col lg={6} md={6} sm={12} className="mb-3">
                      <Form.Label>{t("error.date_birth")}</Form.Label>
                      <Form.Control
                        type="date"
                        max={moment(new Date()).format("YYYY-MM-DD")}
                        name="date_birth"
                        value={values.date_birth}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.date_birth}
                        isValid={touched.date_birth && !errors.date_birth}
                        id="date_birth"
                        autoComplete="new-password"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.date_birth}
                      </Form.Control.Feedback>
                    </Col>
                    <Col lg={6} md={6} sm={12} className="mb-3">
                      {/* User Name */}
                      <Form.Label>{t("signup.phone_no")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone_number"
                        id="phone_number"
                        value={values.phone_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.phone_number}
                        isValid={touched.phone_number && !errors.phone_number}
                        placeholder={t("signup.phone_no_place_holder")}
                        autoComplete="new-password"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone_number}
                      </Form.Control.Feedback>
                    </Col>
                    <Col lg={6} md={6} sm={12} className="mb-3">
                      {/* User Name */}
                      <Form.Label>{t("checkout.address_line_1")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="address_line1"
                        id="address_line1"
                        value={values.address_line1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.address_line1}
                        isValid={touched.address_line1 && !errors.address_line1}
                        placeholder={t("checkout.address_line_1")}
                        autoComplete="new-password"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address_line1}
                      </Form.Control.Feedback>
                    </Col>
                    <Col lg={6} md={6} sm={12} className="mb-3">
                      {/* User Name */}
                      <Form.Label>{t("checkout.address_line_2")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="address_line2"
                        id="address_line2"
                        value={values.address_line2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.address_line2}
                        isValid={touched.address_line2 && !errors.address_line2}
                        placeholder={t("checkout.address_line_2")}
                        autoComplete="new-password"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address_line2}
                      </Form.Control.Feedback>
                    </Col>
                    <Col lg={6} md={6} sm={12} className="mb-3">
                      {/* User Name */}
                      <Form.Label>{t("checkout.state")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        id="state"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.state}
                        isValid={touched.state && !errors.state}
                        placeholder={t("checkout.state_placeholder")}
                        autoComplete="new-password"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.state}
                      </Form.Control.Feedback>
                    </Col>
                    <Col lg={6} md={6} sm={12} className="mb-3">
                      {/* User Name */}
                      <Form.Label>{t("checkout.country")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="country"
                        id="country"
                        value={values.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.country}
                        isValid={touched.country && !errors.country}
                        placeholder={t("checkout.country_placeholder")}
                        autoComplete="new-password"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.country}
                      </Form.Control.Feedback>
                    </Col>

                    {errorMessage && (
                      <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                        <span style={{ color: "red" }}>{errorMessage}</span>
                      </Col>
                    )}
                    <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                      {/* Button */}
                      <Button variant="primary" type="submit">
                        {t("error.update")}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default EditProfile;
