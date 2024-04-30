import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Avatar } from "@mui/material";
import _ from "lodash";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { addAnnouncementComments, getAnnouncements } from "services/nodeapi";
import Swal from "sweetalert2";

const Announcements = ({ courseId }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [obj, setobj] = useState(1);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionFormvalidated, setQuestionFormvalidated] = useState(false);
  const [commentsFormvalidated, setCommentsFormvalidated] = useState(false);

  useEffect(() => {
    pageLoad();
  }, []);

  const pageLoad = async () => {
    const resp = await getAnnouncements({ courseId });
    setobj(resp.data.list);
  };

  const handleSubmitComments = async (event, announcement_id) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();

      const resp = await addAnnouncementComments({
        announcement_id,
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

  return (
    <Fragment>
      <div className={`mb-3  ${!isMobile ? "pt-0 p-6" : "p-4"}`}>
        {!_.isEmpty(obj) &&
          obj.map((item, index) => (
            <div key={index} className="d-flex  pb-4 mb-4">
              <Avatar sx={{ bgcolor: "#00629B" }}>
                <PersonOutlineIcon />
              </Avatar>
              <div className=" ms-3">
                <h4 className="mb-1">
                  <span className="ms-1 qa-allquestionTitle">
                    {item.createdBy_username}
                  </span>
                </h4>
                <h4 className="mb-1">
                  <span className="ms-1 qa-postedOn">
                    posted an announcement on&nbsp;
                    {moment(item.created_at).format("DD-MMM-YYYY")}
                  </span>
                </h4>{" "}
                <Card
                  className="noBorderCard"
                  style={{ marginLeft: isMobile ? "-23%" : "-2%" }}
                >
                  <Card.Header className="announcementsTitle noBorderCard">
                    {item.title}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}
                      />
                    </Card.Text>
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
                    {false && (
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
                              <Form.Label>Comments</Form.Label>
                              <Form.Control
                                as="textarea"
                                required
                                rows={2}
                                placeholder="Enter comments"
                                name="comments"
                              />
                            </Form.Group>
                            <div className=" text-end">
                              <Button
                                variant="primary"
                                size="small"
                                className="btn-sm"
                                type="submit"
                              >
                                Submit
                              </Button>
                            </div>
                          </Form>
                        </Col>
                      </Row>
                    )}
                  </Card.Body>
                </Card>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default Announcements;
