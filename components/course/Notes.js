// @ts-ignore
// @ts-nocheck

import awsHelper from "helper/aws.helper";
import _ from "lodash";
import { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { addNotes, getNotes } from "services/nodeapi";
import Swal from "sweetalert2";
import { ReactQuillEditor } from "widgets";
const Notes = ({ courseId, lecture_id, currentTime }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [obj, setobj] = useState(1);
  const [showNoteForm, setshowNoteForm] = useState(false);
  const [noteFormvalidated, setnoteFormvalidated] = useState(false);
  const [commentsFormvalidated, setCommentsFormvalidated] = useState(false);

  const [content_note, setcontent_note] = useState("");
  useEffect(() => {
    pageLoad();
  }, []);

  const pageLoad = async () => {
    const resp = await getNotes({ courseId });
    setobj(resp.data.list);
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

  const handleSubmitNotes = async (event) => {
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

      if (!_.isEmpty(content_note)) {
        const _lectid = lecture_id === null ? 0 : lecture_id;
        const resp = await addNotes({
          course_id: courseId,
          lecture_id: _lectid,
          title: currentTime,
          description: content_note,
          image_url,
        });
        if (resp.status === 200) {
          pageLoad();
          Swal.fire({
            icon: "success",
            title: t("error.success"),
            text: "Añadido con éxito.",
          }).then(async (result) => {
            setshowNoteForm(false);
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: t("error.error"),
          text: "Por favor agregue notas.",
        });
      }
    }

    setnoteFormvalidated(true);
  };

  const onTextEditorChange = (data, name) => {
    setcontent_note(data);
  };
  return (
    <Fragment>
      <div className={`mb-3  ${!isMobile ? "pt-0 p-6" : "p-4"}`}>
        <div className="d-lg-flex align-items-center justify-content-between mb-5">
          {/* Reviews */}
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0 qa-allanswersTitle">
              Todas las notas de este curso ({obj.length})
            </h3>
          </div>
        </div>
        {/* Rating */}
        {!_.isEmpty(obj) &&
          obj.map((item, index) => (
            <div className="d-flex border-bottom pb-4 mb-4" key={index}>
              <div className=" ms-3 w-100">
                <Row>
                  <Col md={12}>
                    <h4 className="mb-1">
                      <span className="ms-1 qa-allquestionTitle">
                        {item.title === "NaN" ? "0.00" : item.title}
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
              </div>
            </div>
          ))}
        <Row>
          <Col>
            <a
              href="#"
              onClick={() => {
                setshowNoteForm(true);
              }}
              className="qa-btnaskquestion"
            >
              Añadir nueva nota
            </a>
          </Col>
        </Row>
      </div>

      <Modal
        show={showNoteForm}
        size="lg"
        onHide={() => setshowNoteForm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Añadir nueva nota</Modal.Title>
        </Modal.Header>
        <Form
          noValidate
          validated={noteFormvalidated}
          onSubmit={handleSubmitNotes}
        >
          <Modal.Body>
            {" "}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Descripción</Form.Label>
              <ReactQuillEditor
                initialValue={""}
                onTextEditorChange={onTextEditorChange}
                name="content_note"
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
            <Button variant="secondary" onClick={() => setshowNoteForm(false)}>
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

export default Notes;
