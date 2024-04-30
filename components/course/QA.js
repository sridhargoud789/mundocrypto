// @ts-ignore
// @ts-nocheck
//updated
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Avatar } from "@mui/material";
import awsHelper from "helper/aws.helper";
import _ from "lodash";
import moment from "moment";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";
import { useRecoilValue } from "recoil";
import {
  addQAComments,
  addQALikes,
  addQuestionsAnswers,
  deleteQA,
  getCourseLectures,
  getQuestionsAnswers,
} from "services/nodeapi";
import { userObject } from "services/states";
import Swal from "sweetalert2";

const QA = ({ courseId, lecture_id }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const userObj = useRecoilValue(userObject);
  const [obj, setobj] = useState(1);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionFormvalidated, setQuestionFormvalidated] = useState(false);
  const [commentsFormvalidated, setCommentsFormvalidated] = useState(false);
  const [questionsCreatedByUser, setquestionsCreatedByUser] = useState(0);
  const [lectures, setLectures] = useState([]);
  const [selectedLectureId, setselectedLectureId] = useState(0);

  useEffect(() => {
    pageLoad();
  }, [lecture_id]);

  const pageLoad = async () => {
    await loaddata(lecture_id);
    const lResp = await getCourseLectures(courseId);
    setLectures(lResp.data.data);
  };

  const loaddata = async (id) => {
    setselectedLectureId(id);
    const resp = await getQuestionsAnswers({ courseId, lecture_id: id });
    const unapprovedOBJ = _.filter(resp.data.list, {
      is_approved: null,
      created_by: userObj.id,
    });

    const approvedOBJ = _.filter(resp.data.list, {
      is_approved: 1,
    });

    const obj = [...approvedOBJ, ...unapprovedOBJ];
    const _uCount = obj.length;
    const sortedOBJ = _.orderBy(
      obj,
      ["totalLikes", "totalComments"],
      ["desc", "desc"]
    );
    setquestionsCreatedByUser(_uCount);
    setobj(sortedOBJ);
  };

  const uploadFile = async (file) => {
    const uploadDoc = await awsHelper.fileUpload(
      file,
      `users`,
      file.name,
      file.type
    );
    console.log(uploadDoc);
    return uploadDoc.data.Location;
  };
  const handleSubmitQuestion = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      let image_url = "";
      if (event.target.image_url.files.length > 0) {
        const image_url_file = event.target.image_url.files[0];
        image_url = await uploadFile(image_url_file);
      }

      if (lecture_id === 0) {
        Swal.fire(
          "Error",
          "¡Por favor seleccione una conferencia primero!",
          "error"
        );
      } else {
        const resp = await addQuestionsAnswers({
          course_id: courseId,
          title: form.title.value,
          description: form.description.value,
          lecture_id,
          image_url,
        });
        if (resp.status === 200) {
          pageLoad();
          Swal.fire({
            icon: "success",
            title: t("error.success"),
            text: "Añadido con éxito.",
          }).then(async (result) => {
            setShowQuestionForm(false);
          });
        }
      }
    }

    setQuestionFormvalidated(true);
  };

  const handleSubmitComments = async (event, question_id) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();

      const resp = await addQAComments({
        question_id,
        comments: form.comments.value,
        comments_by: 0,
      });
      if (resp.status === 200) {
        pageLoad();
        form.reset();
        Swal.fire({
          icon: "success",
          title: t("error.success"),
          text: "Añadido con éxito.",
        }).then(async (result) => {});
      }
    }

    setCommentsFormvalidated(true);
  };

  const handleLikeQuestion = async (question_id, likes) => {
    const _uCount = _.filter(likes, {
      created_by: userObj.id,
    }).length;
    if (_uCount === 0) {
      const resp = await addQALikes({ question_id, like_dislike: 1 });
      pageLoad();
    }
  };

  const handleLectureChange = async (e) => {
    const id = e.id;
    await loaddata(id);
  };

  const handleDeleteQA = async (question_id) => {
    const resp = await deleteQA({
      question_id,
    });
    if (resp.status === 200) {
      loaddata(selectedLectureId);
      Swal.fire({
        icon: "success",
        title: t("error.success"),
        text: "Borrado exitosamente.",
      }).then(async (result) => {});
    }
  };
  return (
    <Fragment>
      {/* <Row className={`p-6 ${!isMobile ? "pt-0" : ""}`}>
        <Col md={10} sm={12} lg={10}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="All lectures"
              aria-label="All lectures"
              aria-describedby="basic-addon2"
            />
            <Button
              variant="primary"
              id="button-addon2"
              className="btn-dark-blue"
            >
              <Icon path={mdiMagnify} size={1} />
            </Button>
          </InputGroup>
        </Col>
      </Row> */}
      {true && (
        <Row className="p-6 pt-0">
          <Col md={9} sm={12} lg={9}>
            <Form>
              <Row className="mb-3">
                <Col md={12} sm={12} xs={12}>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className="qa-formlabel">Filters</Form.Label>
                    <Select
                      className="form-control"
                      classNamePrefix="select"
                      value={lectures.filter(
                        (option) => option.id === selectedLectureId
                      )}
                      isSearchable={true}
                      onChange={(e) => handleLectureChange(e)}
                      name="name"
                      getOptionValue={(option) => `${option.id}`}
                      getOptionLabel={(option) => `${option.name}`}
                      options={lectures}
                    />
                    {/* <Form.Select defaultValue="All Lectures">
                      <option>All Lectures</option>
                      {!_.isEmpty(lectures) &&
                        lectures.map((l, i) => (
                          <option key={i} id={l.id}>
                            {l.name}
                          </option>
                        ))}
                    </Form.Select> */}
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      )}
      <div className={`mb-3  pt-0 ${isMobile ? "p-4" : "p-6"}`}>
        <div className="d-lg-flex align-items-center justify-content-between mb-5">
          {/* Reviews */}
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0 qa-allanswersTitle">
              Todas las preguntas de este curso ({obj.length})
            </h3>
          </div>
        </div>
        {/* Rating */}
        {!_.isEmpty(obj) &&
          obj.map((item, index) => (
            <div className="d-flex border-bottom pb-4 mb-4" key={index}>
              <Avatar sx={{ bgcolor: "#00629B" }}>
                <PersonOutlineIcon />
              </Avatar>
              <div className=" ms-3 w-100">
                <Row>
                  <Col md={12}>
                    <h4 className="mb-1">
                      <span className="ms-1 qa-allquestionTitle">
                        {item.title}
                      </span>
                    </h4>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />
                  </Col>
                </Row>
                {!_.isEmpty(item.image_url) && (
                  <Row>
                    <Col md={12}>
                      <Image src={item.image_url} />
                    </Col>
                  </Row>
                )}
                <Row className="pt-4">
                  <Col md={6} sm={6}>
                    <h4 className="mb-1">
                      <span className="qa-postedBy">
                        {item.createdBy_username}:
                      </span>
                      <span className="ms-1 qa-postedOn">
                        {moment(item.created_at).format("DD-MMM-YYYY")}
                      </span>
                    </h4>{" "}
                  </Col>
                  <Col md={6} sm={6} className="text-end">
                    <span
                      className="qa-allquestionTitle"
                      onClick={() => handleLikeQuestion(item.id, item.likes)}
                    >
                      {item.likes.length} {"  "}
                      <img src="/images_optimized/thumbup.png" width={20} />
                    </span>
                    <Link href="#">
                      <a className="qa-allquestionTitle">
                        {item.comments.length} {"  "}
                        <img src="/images_optimized/comments.png" width={20} />
                      </a>
                    </Link>{" "}
                  </Col>
                </Row>
                {!_.isEmpty(item.answer) && (
                  <Row
                    style={{ backgroundColor: "var(--highlight-bg)" }}
                    className="pt-4"
                  >
                    <Col md={12}>
                      <h3>Respuesta</h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.answer,
                        }}
                      />
                      <h4 className="mb-1 pt-2">
                        <span className="qa-postedBy">
                          {item.answeredBy_username}:
                        </span>
                        <span className="ms-1 qa-postedOn">
                          {moment(item.answered_at).format("DD-MMM-YYYY")}
                        </span>
                      </h4>{" "}
                    </Col>
                  </Row>
                )}

                {item.comments.map((c, i) => (
                  <div className="d-flex pb-2 mb-2 pt-4" key={i}>
                    <Avatar sx={{ bgcolor: "#00629B" }}>
                      <PersonOutlineIcon />
                    </Avatar>
                    <div className=" ms-3 w-100">
                      <Row className="pt-2">
                        <Col md={12}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: c.comments,
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="pt-4">
                        <Col md={12} sm={12} className="text-end">
                          <h4 className="mb-1">
                            <span className="qa-postedBy">
                              {c.createdBy_username}:
                            </span>
                            <span className="ms-1 qa-postedOn">
                              {moment(c.created_at).format("DD-MMM-YYYY")}
                            </span>
                          </h4>{" "}
                        </Col>
                      </Row>
                    </div>
                  </div>
                ))}
                <Row>
                  <Col md={12} sm={12}>
                    <Form
                      noValidate
                      validated={commentsFormvalidated}
                      onSubmit={(e) => handleSubmitComments(e, item.id)}
                    >
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Comentarios</Form.Label>
                        <Form.Control
                          as="textarea"
                          required
                          rows={2}
                          placeholder="Enter Comentarios"
                          name="comments"
                        />
                      </Form.Group>
                      <div className=" text-end">
                        {item.is_approved === null &&
                          item.created_by === userObj.id && (
                            <Button
                              variant="danger"
                              size="small"
                              className="btn-sm"
                              type="button"
                              onClick={() => handleDeleteQA(item.id)}
                            >
                              Delete
                            </Button>
                          )}
                        &nbsp;&nbsp;
                        <Button
                          variant="primary"
                          size="small"
                          className="btn-sm"
                          type="submit"
                        >
                          Enviar
                        </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </div>
            </div>
          ))}
        {questionsCreatedByUser < 10 && (
          <Row>
            <Col>
              <a
                href="#"
                onClick={() => {
                  setShowQuestionForm(true);
                }}
                className="qa-btnaskquestion"
              >
                Hacer una nueva pregunta
              </a>
            </Col>
          </Row>
        )}
      </div>

      <Modal
        show={showQuestionForm}
        size="lg"
        onHide={() => setShowQuestionForm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Hacer una nueva pregunta</Modal.Title>
        </Modal.Header>
        <Form
          noValidate
          validated={questionFormvalidated}
          onSubmit={handleSubmitQuestion}
        >
          <Modal.Body>
            {" "}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Título </Form.Label>
              <Form.Control type="text" name="title" required />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                required
                rows={5}
                name="description"
              />
            </Form.Group>
            <Form.Group controlId="image_url_en" className="mb-3">
              <Form.Label className="fw-bold ">Adjuntar archivo</Form.Label>
              <Form.Control
                type="file"
                name={"image_url"}
                accept="image/png, image/gif, image/jpeg"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowQuestionForm(false)}
            >
              Cerrar
            </Button>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default QA;
