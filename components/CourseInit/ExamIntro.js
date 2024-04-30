import * as React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ExamIntro = (props) => {
  const { t } = useTranslation();
  const { name, instruction, duration, reward, id, isFreeCourse } = props;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="noBorderCard shadow examIntroSize">
      <Card.Body>
        <div className="d-flex justify-content-center align-items-center">
          <img src="/images_optimized/quiz_image.png" width="120px" />{" "}
          <Row className="px-5">
            <Col className="d-flex justify-content-center flex-column">
              <Card.Title className="fw-semi-bold fs-3">
                {props.examData.name}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Duración total: {props.examData.duration} mins
              </Card.Subtitle>
            </Col>
          </Row>
        </div>

        <Col className="pt-2">
          <Col className="d-flex align-items-center justify-content-center">
            <Row>
              <Col className="py-2">
                <div className="d-grid gap-2">
                  <Button
                    type="button"
                    onClick={props.onStartExam}
                    className="btn btn-primary"
                    style={{ width: "200px" }}
                  >
                    {t("course_resume.instructions.start")}
                  </Button>
                </div>
              </Col>
              <Col className="py-2">
                <div className="d-grid gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="btn btn-outline-primary"
                    onClick={props.onSkip}
                    style={{ width: "200px" }}
                  >
                    {t("course_resume.instructions.skip")}
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Col>
      </Card.Body>
    </Card>
  );
};

export default ExamIntro;
