// @ts-ignore
// @ts-nocheck
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import _ from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import {
  completeExam,
  getExamResult,
  requestExam,
  startExam,
  submitAnswer,
} from "../../services/nodeapi";

const ExamResult = (props) => {
  const [validated, setValidated] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [examDetails, setExamDetails] = useState({});
  const [questions, setQuestions] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionNo, setCurrentQuestionNo] = useState(0);

  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");

  const [showResult, setShowResult] = useState(false);
  const [examResult, setExamResult] = useState(false);
  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    examLoad();
  }, []);

  const examLoad = async () => {
    setIsLoading(true);

    const resp = await requestExam({
      courseId: props.courseId,
      moduleId: props.moduleId,
    });

    if (resp.status === 200) {
      const data = resp.data.exam;
      setExamDetails(data);
      const startExamResp = await startExam({ examId: data.id });
      setQuestions(data.questions);
      setCurrentQuestion(data.questions[0]);
      setCurrentQuestionId(data.questions[0].id);
      setCurrentQuestionIndex(0);
      setCurrentQuestionNo(1);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (value === "") {
      setHelperText("Choose one answer");
    } else {
      const resp = await submitAnswer({
        examId: examDetails.id,
        questionId: currentQuestionId,
        userAnswer: value,
      });
      if (questions.length === currentQuestionNo) {
        const completeExamResp = await completeExam({
          examId: examDetails.id,
          moduleId: props.moduleId,
        });

        const examResultResp = await getExamResult({ examId: examDetails.id });
        if (examResultResp.status === 200) {
          setShowResult(true);
          setExamResult(examResultResp.data);
        }
        //props.onExamComplete();
      } else {
        const nextindex = currentQuestionIndex + 1;
        const qno = currentQuestionNo + 1;
        setCurrentQuestion(questions[nextindex]);
        setCurrentQuestionId(questions[nextindex].id);
        setCurrentQuestionNo(qno);
        setCurrentQuestionIndex(nextindex);
        setValue("");
      }
    }
  };

  return (
    <Card className="noBorderCard shadow">
      {!isLoading && !_.isEmpty(examDetails) && !_.isEmpty(questions) && (
        <Card.Body>
          <Row>
            <Col md={6}>
              <Card.Title>{examDetails.name}</Card.Title>
              <Divider />
            </Col>
          </Row>
          <Row className="pt-4">
            <Col>
              <Card.Title className="pt-4">
                Question {currentQuestionNo} of {questions.length}
              </Card.Title>
              <Divider />
              <Card.Subtitle>{currentQuestion.question}</Card.Subtitle>
              <Row>
                <Col>
                  <form onSubmit={handleSubmit}>
                    <FormControl error={error} variant="filled" fullWidth>
                      <RadioGroup
                        aria-labelledby="demo-error-radios"
                        name="quiz"
                        value={value}
                        onChange={handleRadioChange}
                      >
                        {currentQuestion.answers
                          .split(",")
                          .map((answer, index) => {
                            return (
                              <>
                                <FormControlLabel
                                  id={`ckbAnswerId-${index}`}
                                  key={`ckbAnswerId-${index}`}
                                  value={answer}
                                  control={<Radio />}
                                  label={answer}
                                />
                              </>
                            );
                          })}
                      </RadioGroup>
                      {helperText && (
                        <FormHelperText style={{ color: "red" }}>
                          {helperText}
                        </FormHelperText>
                      )}
                      <Row>
                        <Col md={12}>
                          <Button
                            sx={{ mt: 1, mr: 1 }}
                            style={{ float: "right" }}
                            type="submit"
                            className="btn  btn-sm btnBlack  rounded-0"
                          >
                            Next Question
                          </Button>
                        </Col>
                      </Row>
                    </FormControl>
                  </form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      )}
    </Card>
  );
};

export default ExamResult;
