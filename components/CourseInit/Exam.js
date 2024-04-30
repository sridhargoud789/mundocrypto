/* eslint-disable */

import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import {
  claimMCRewards,
  claimRewards,
  completeExam,
  getExamResult,
  getUserProfileDetails,
  requestExam,
  saveProctoringReport,
  startExam,
  submitAnswer,
} from "../../services/nodeapi";
import { userObject, userProfileObject } from "../../services/states";
import Timer from "./Timer";

const Exam = (props) => {
  const { t } = useTranslation();
  const videoPlayerRef = useRef(null);
  const router = useRouter();
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
  const [userProfileObj, setUserProfileObject] =
    useRecoilState(userProfileObject);
  const [isProctoringFair, setIsProctoringFair] = useState(false);
  const [procSharedURL, setprocSharedURL] = useState("");
  const [showTimer, setShowTimer] = useState(false);
  const [duration, setDuration] = useState();
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [userObj, setuserObject] = useRecoilState(userObject);
  const [mctTokens, SetmctTokens] = useState(0);
  const [insta_user_id, setinsta_user_id] = useState("");
  const [showDemoVideo, setshowDemoVideo] = useState(false);
  const [rewardsCollected, setrewardsCollected] = useState(false);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const Ref = useRef(null);

  useEffect(() => {
    examLoad();
  }, []);
  useEffect(() => {
    if (Ref.current) clearInterval(Ref.current);
    if (!props.isFreeCourse) {
      const id = setInterval(() => {
        let deadline = new Date();
        if (!isExamFinished && duration && deadline >= duration) {
          setShowTimer(false);
          setIsExamFinished(true);
          setDuration(null);
          closeExam();
        }
      }, 1000);
      Ref.current = id;
    }
  }, [duration, isExamFinished]);

  const callReport = async () => {
    const groupName =
      "courseId_" + props.courseId + "_moduleId_" + props.moduleId;
    const data = {
      userId: userObj.id,
      groupName,
      name: userObj.name,
      email: userObj.email,
    };

    var config = {
      method: "post",
      url: window.location.origin + "/api/proctorreport",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios(config);
    return response.data;
  };
  const examLoad = async () => {
    setIsLoading(true);

    const resp = await requestExam({
      courseId: props.courseId,
      moduleId: props.moduleId,
    });

    if (resp.status === 200) {
      const data = resp.data.exam;
      setIsLoading(false);

      if (!_.isEmpty(data)) {
        setExamDetails(data);

        let deadline = new Date();

        deadline.setMinutes(deadline.getMinutes() + parseFloat(data.duration));
        //deadline.setMinutes(deadline.getMinutes() + parseFloat(1));
        setDuration(deadline);
        const startExamResp = await startExam({ examId: data.id });
        setQuestions(data.questions);

        setCurrentQuestion(data.questions[0]);
        setCurrentQuestionId(data.questions[0].id);
        setCurrentQuestionIndex(0);
        setCurrentQuestionNo(1);
        setShowTimer(true);
      } else {
        props.cancelExam();
      }
    }
  };

  const handleClaimMCrewards = async () => {
    const resp = await claimMCRewards({
      examId: examDetails.id,
      insta_user_id,
    });
    setrewardsCollected(true);
    const { data } = resp.data;
    toast.success(
      `You have successfully earned ${data.totalReward} MC Tokens.`
    );
    setshowDemoVideo(true);
    videoPlayerRef.current?.play();
  };
  const handleClaimrewards = async () => {
    const resp = await claimRewards();
    if (resp.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: resp.data.message,
      }).then((result) => {
        props.onExamComplete();
        router.reload();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error occured. Please try again.",
      });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (value === "") {
      setHelperText(t("exam.choose_answer"));
    } else {
      const resp = await submitAnswer({
        examId: examDetails.id,
        questionId: currentQuestionId,
        userAnswer: value,
      });
      if (questions.length === currentQuestionNo) {
        await closeExam();
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
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const closeExam = async () => {
    try {
      props.showLoading(true);

      let _isFair = true;
      if (!props.isFreeCourse) {
        props.stopProctorring();

        await delay(10000);
        //const reprtdata = await callReport();

        _isFair = true;
        setIsProctoringFair(_isFair);
        setprocSharedURL("");
        const saveExamReportResp = await saveProctoringReport({
          exam_id: examDetails.id,
          report_data: {},
          report_shared_url: "",
          ci_score: 100,
          ci_index: "HIGH",
        });
      }
      const completeExamResp = await completeExam({
        examId: examDetails.id,
        moduleId: props.moduleId,
        isProctoringFair: _isFair,
      });

      if (completeExamResp.status === 200) {
        const examResultResp = await getExamResult({
          examId: examDetails.id,
        });
        if (examResultResp.status === 200) {
          setShowResult(true);
          setExamResult(examResultResp.data);
          const { is_passed, exam_reward, reword_points } =
            examResultResp.data.data;
          if (_isFair && is_passed === 1) {
            if (!props.isFreeCourse) {
              toast.success(
                `You have ${reword_points} Un Claimed reward points`
              );
            } else {
              SetmctTokens(exam_reward);
            }
            const upResp = await getUserProfileDetails();
            setUserProfileObject(upResp.data.userData);
          }
        }
      }
      props.showLoading(false);
    } catch (e) {
      console.log(e);
      props.showLoading(false);
    }
  };
  const getDuration = (sd, ed) => {
    const startDate = moment(sd);
    const timeEnd = moment(ed);
    const diff = timeEnd.diff(startDate);
    const diffDuration = moment.duration(diff);
    return diffDuration;
  };

  const DataIfPassed = () => {
    return (
      <Col className="pt-2 d-flex align-items-center justify-content-center flex-column">
        <Card.Title className="d-flex">
          <div className="mx-2 d-flex align-items-center justify-content-center">
            <img src="/images_optimized/congrats_icon.png" />{" "}
          </div>
          <h2 className="mb-0">{t("exam.passed")}</h2>
        </Card.Title>
        <Card.Subtitle>
          <h5 className="mb-0">{t("exam.passed_sub")}</h5>
        </Card.Subtitle>
        <div className="my-4 examResultPassed d-flex align-items-center justify-content-center">
          <span className="fs-3 fw-bold" style={{ color: "#139A74" }}>
            {examResult.data.percentage}%
          </span>
        </div>
      </Col>
    );
  };

  const DataIfFailed = () => {
    return (
      <Col className="pt-2 d-flex align-items-center justify-content-center flex-column">
        <Card.Title>
          <h2 className="mb-0">{t("exam.failed")}</h2>
        </Card.Title>
        <Card.Subtitle>
          <h5 className="mb-0">{t("exam.failed_sub")}</h5>
        </Card.Subtitle>
        <div className="my-4 examResultFailed d-flex align-items-center justify-content-center">
          <span className="fs-3 fw-bold" style={{ color: "#E53F3C" }}>
            {examResult.data.percentage}%
          </span>
        </div>
      </Col>
    );
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
      <Card className="noBorderCard shadow">
        {!isLoading &&
          !showResult &&
          !_.isEmpty(examDetails) &&
          !_.isEmpty(questions) && (
            <>
              <Card.Header>
                <h3 className="mb-0">
                  {examDetails.name}
                  {showTimer && (
                    <div style={{ float: "right" }}>
                      <Timer
                        duration={parseFloat(examDetails.duration)}
                        closeExam={closeExam}
                        //duration={1}
                      />
                    </div>
                  )}
                </h3>
                <span className="pt-2">
                  {t("exam.question")} {currentQuestionNo} {t("exam.of")}{" "}
                  {questions.length}
                </span>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col sm={12}>
                    <Card.Title>
                      <h2 className="mb-0">{currentQuestion.question}</h2>
                    </Card.Title>
                  </Col>
                  <Col sm={12}>
                    <p>{t("exam.select")}</p>
                    <form onSubmit={handleSubmit}>
                      <FormControl error={error} variant="filled" fullWidth>
                        <RadioGroup
                          aria-labelledby="demo-error-radios"
                          name="quiz"
                          value={value}
                          onChange={handleRadioChange}
                        >
                          <div className="border px-4 py-1 mb-4">
                            <FormControlLabel
                              id={`ckbAnswerId-1`}
                              key={`ckbAnswerId-1`}
                              value={1}
                              control={<Radio />}
                              label={
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: currentQuestion.option1,
                                  }}
                                ></span>
                              }
                            />
                          </div>

                          <div className="border px-4 py-1 mb-4">
                            <FormControlLabel
                              id={`ckbAnswerId-2`}
                              key={`ckbAnswerId-2`}
                              value={2}
                              control={<Radio />}
                              label={
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: currentQuestion.option2,
                                  }}
                                ></span>
                              }
                            />
                          </div>

                          <div className="border px-4 py-1 mb-4">
                            <FormControlLabel
                              id={`ckbAnswerId-3`}
                              key={`ckbAnswerId-3`}
                              value={3}
                              control={<Radio />}
                              label={
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: currentQuestion.option3,
                                  }}
                                ></span>
                              }
                            />
                          </div>
                          {!_.isEmpty(currentQuestion.option4) && (
                            <div className="border px-4 py-1 mb-4">
                              <FormControlLabel
                                id={`ckbAnswerId-4`}
                                key={`ckbAnswerId-4`}
                                value={4}
                                control={<Radio />}
                                label={
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: currentQuestion.option4,
                                    }}
                                  ></span>
                                }
                              />
                            </div>
                          )}
                          {/* {currentQuestion.answers.map((answer, index) => {
                            return (
                              <>
                                <div className="border px-4 py-1 mb-4">
                                  <FormControlLabel
                                    id={`ckbAnswerId-${index}`}
                                    key={`ckbAnswerId-${index}`}
                                    value={index + 1}
                                    control={<Radio />}
                                    label={answer}
                                  />
                                </div>
                              </>
                            );
                          })} */}
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
                              variant="contained"
                            >
                              {t("exam.next")}
                            </Button>
                          </Col>
                        </Row>
                      </FormControl>
                    </form>
                  </Col>
                </Row>
              </Card.Body>
            </>
          )}
        {!isLoading &&
          showResult &&
          props.courseId === 38 &&
          !_.isEmpty(examResult) && (
            <>
              <Card.Header>
                <h3 className="mb-0 text-center">
                  Examen completado con éxito. Los resultados serán notificados
                  en breve.
                </h3>
              </Card.Header>
              <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                <Col className="d-flex align-items-center justify-content-center pt-5">
                  <div className="mx-2">
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={props.onExamComplete}
                    >
                      {t("exam.continue")}
                    </Button>
                  </div>
                </Col>
              </Card.Body>
            </>
          )}
        {!isLoading &&
          showResult &&
          props.courseId !== 38 &&
          !_.isEmpty(examResult) && (
            <>
              <Card.Header>
                <h3 className="mb-0">{examDetails.name}</h3>
              </Card.Header>
              <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                {examResult.data.is_passed === 0 ? (
                  <DataIfFailed />
                ) : (
                  <DataIfPassed />
                )}
                <Col className="d-flex align-items-center justify-content-center flex-column">
                  <p>
                    {t("exam.score")} <b>{examResult.data.percentage}%</b>
                  </p>
                  <p>
                    {t("exam.passing_score")}{" "}
                    <b>{props.isFreeCourse ? "50" : "70"}%</b>
                  </p>
                </Col>
                {!props.isFreeCourse && (
                  <Col className="d-flex align-items-center justify-content-center">
                    {isProctoringFair && (
                      <>
                        <div className="examDataContainer">
                          <span className="fw-bold">{t("exam.correct")}</span>
                          <span
                            className="fs-2 fw-bold"
                            style={{ color: "#139A74" }}
                          >
                            {examResult.questionAnsData
                              ? examResult.questionAnsData.correct_answers
                              : 0}
                          </span>
                        </div>
                        <div className="examDataContainer">
                          <span className="fw-bold">{t("exam.incorrect")}</span>
                          <span
                            className="fs-2 fw-bold"
                            style={{ color: "#E53F3C" }}
                          >
                            {examResult.questionAnsData
                              ? examResult.questionAnsData.wrong_answers
                              : 0}
                          </span>
                        </div>
                      </>
                    )}
                    {!isProctoringFair && (
                      <>
                        <div className="examDataContainer">
                          <span className="fw-bold">
                            {t("exam.unfair")}
                            <br /> {t("exam.result")}{" "}
                            <a href={procSharedURL} target="_blank">
                              {t("exam.here")}
                            </a>
                          </span>
                        </div>
                      </>
                    )}
                    <div className="examDataContainer">
                      <span className="fw-bold">
                        {t("exam.reward_obtained")}
                      </span>
                      <div className="mx-2 d-flex align-items-center justify-content-center">
                        <img
                          src="/images_optimized/coin_blue.png"
                          width="30px"
                        />{" "}
                        <span className="fs-2 fw-bold text-primary px-2">
                          {examResult.data.reword_points}
                        </span>
                      </div>
                    </div>
                  </Col>
                )}
                {props.isFreeCourse &&
                  !rewardsCollected &&
                  examResult.data.is_passed && (
                    <>
                      <Row className="d-flex justify-content-center text-center mb-4">
                        <Col md={12} sm={12}>
                          <h4>
                            Comparte esta foto en tu historia de Instagram,
                            etiqueta a @Mundocryptooficial y marca la casilla
                            completado
                          </h4>
                        </Col>
                      </Row>
                      <Row className="d-flex justify-content-center text-center">
                        <Col
                          md={12}
                          sm={12}
                          className="d-flex justify-content-center text-center"
                        >
                          <Stack direction="horizontal" gap={1}>
                            <div>
                              <Form.Check
                                size="lg"
                                style={{
                                  fontSize: "25px",
                                  marginRight: "0rem",
                                  marginTop: "-1rem",
                                }}
                                inline
                                label=""
                                name="group1"
                                type={"checkbox"}
                              />{" "}
                            </div>
                            <div>
                              <InputGroup className="mb-3">
                                <Form.Control
                                  style={{ width: "18rem" }}
                                  onChange={(e) =>
                                    setinsta_user_id(e.target.value)
                                  }
                                  placeholder="Escribe tu usuario de Instagram aquí"
                                  aria-label="Escribe tu usuario de Instagram aquí"
                                  aria-describedby="basic-addon2"
                                  value={insta_user_id}
                                />
                                <InputGroup.Text
                                  id="basic-addon2"
                                  as="button"
                                  onClick={() => {
                                    window.open(
                                      "https://www.instagram.com/mundocryptooficial/",
                                      "_blank"
                                    );
                                  }}
                                  href="https://www.instagram.com/mundocryptooficial/"
                                  target="_blank"
                                >
                                  <img
                                    src="/images_optimized/instagram.svg"
                                    width={30}
                                  />
                                  &nbsp; Compartir
                                </InputGroup.Text>
                              </InputGroup>
                            </div>
                          </Stack>
                        </Col>
                      </Row>
                    </>
                  )}
                <Modal
                  show={showDemoVideo}
                  onHide={() => setshowDemoVideo(false)}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <video
                      ref={videoPlayerRef}
                      src={
                        "https://mundocrypto-files.s3.eu-central-1.amazonaws.com/course_video_thumbnail/Video_after_exam.mp4"
                      }
                      autoPlay={false}
                      controls
                      disablePictureInPicture
                      disableRemotePlayback
                      controlsList="nodownload noplaybackrate"
                      width="100%"
                      onContextMenu={(e) => e.preventDefault()}

                      // height="600"
                    />
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                </Modal>
                <Col className="d-flex align-items-center justify-content-center pt-5">
                  {!props.isFreeCourse &&
                    examResult.data.reword_points !== 0 && (
                      <div className="mx-2">
                        <Button
                          color="success"
                          disabled={
                            examResult.data.reword_points === 0 ? true : false
                          }
                          onClick={handleClaimrewards}
                          variant="outlined"
                          type="button"
                          className="btn btn-sm rounded-1"
                        >
                          {t("exam.claim_reward")}
                        </Button>
                      </div>
                    )}
                  {props.isFreeCourse &&
                    !rewardsCollected &&
                    examResult.data.is_passed !== 0 && (
                      <div className="mx-2">
                        <Button
                          disabled={_.isEmpty(insta_user_id) ? true : false}
                          onClick={handleClaimMCrewards}
                          variant="contained"
                          type="button"
                        >
                          Reclamar $1000
                        </Button>
                      </div>
                    )}

                  <div className="mx-2">
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={props.onExamComplete}
                    >
                      {t("exam.continue")}
                    </Button>
                  </div>
                </Col>
              </Card.Body>
            </>
          )}
      </Card>
    </>
  );
};

export default Exam;
