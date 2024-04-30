// @ts-ignore
// @ts-nocheck
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import _ from "lodash";
import {
  Accordion,
  Card,
  CloseButton,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from "react-bootstrap";
import MUISkeleton from "../../../components/Common/MUISkeleton";
import CourseDetails from "../../../components/Course/CourseDetails";
import Footer from "../../../components/Footer/Footer";
import HeaderBlack from "../../../components/Header/HeaderBlack";
import {
  endLecture,
  getCourseInit,
  requestLecture,
  updateLastWatch,
} from "../../../services/nodeapi";

import React from "react";
import ExamIntro from "../../../components/CourseInit/ExamIntro";
import PlayItem from "../../../components/CourseInit/PlayItem";
import RewardTab from "../../../components/CourseInit/RewardTab";

const CourseInit = () => {
  const router = useRouter();
  const playerRef = useRef();
  const [iActiveTab, setiActiveTab] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [showExam, setShowExam] = useState(false);

  const videoPlayerRef = React.useRef<HTMLVideoElement>(null);

  const [obj, setobj] = useState<{ [key: string]: any }>({});

  const [courseObj, setcourseObj] = useState<{ [key: string]: any }>({}); //set course object
  const [courseModulesObj, setcourseModulesObj] = useState([]); // set course modules object
  const [cldObj, setcldObj] = useState<{ [key: string]: any }>({}); //set current lecture details
  const [ucdObj, setucdObj] = useState<{ [key: string]: any }>({}); //set user course details

  const [currentVideoURL, setCurrentVideoURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (router.query.id) {
      pageLoad();
    }
  }, [router]);

  const MINUTE_MS = 5000;

  useEffect(async () => {
    const interval = setInterval(() => {
      const ct = videoPlayerRef.current?.currentTime;
      setCurrentTime(ct);
      console.log("ct", ct);
      if (!_.isEmpty(obj) && ct > 0) {
        handleUpdateLastWatch(ct);
      }
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const handleUpdateLastWatch = async (ct) => {
    const { currentLectureData, userCourseData } = obj;

    const req = {
      userCourseHistoryId: userCourseData.id,
      lectureId: currentLectureData.id,
      moduleId: currentLectureData.module_id,
      videoDuration: ct,
    };
    const resp = await updateLastWatch(req);
  };

  const pageLoad = async () => {
    setIsLoading(true);

    const courseId = router.query.id;
    const cdresp = await getCourseInit({ courseId });
    if (cdresp.status === 200) {
      setobj(cdresp.data);
      const { course, currentLectureData, userCourseData } = cdresp.data;
      const { courseModules } = course;
      setcourseObj(course);
      setcourseModulesObj(courseModules);
      setcldObj(currentLectureData);
      setucdObj(userCourseData);
      setCurrentVideoURL(currentLectureData.video_url);
    }
    setIsLoading(false);
  };
  const onTimeUpdate = (e: any) => {
    console.log("currentTime-------->", e);
    const t1 = videoPlayerRef.current?.currentTime;
    const t2 = currentTime;

    if (t1 > t2) {
      videoPlayerRef.currentTime = currentTime;
    }
    console.log("onTimeUpdate-------->", e);
  };
  const onVideoPlaying = (e: any) => {
    console.log("onVideoPlaying-------->", e);
    setCurrentTime(e.playedSeconds);
  };

  const onVideoEnded = async (e: any) => {
    console.log("onVideoEnded-------->", e);
    const { id, module_id, module_index, lecture_index } = cldObj;
    const nextLecture_index = lecture_index + 1;
    const courseId = courseObj.id;
    const currentModule = _.filter(courseModulesObj, { module_index });
    const nextLecture = _.filter(currentModule[0].courseLectures, {
      lecture_index: nextLecture_index,
    });
    const lastWatchTime = videoPlayerRef.current?.duration;
    await handleUpdateLastWatch(lastWatchTime);
    const elResp = await endLecture({ lectureId: id, courseId });
    if (elResp.status === 200) {
      const rlResp = await requestLecture({
        courseId,
        lectureId: nextLecture[0].id,
        moduleId: nextLecture[0].module_id,
      });

      pageLoad();
    }
  };

  return (
    <>
      <HeaderBlack />
      <div className=" ">
        {!isLoading && !_.isEmpty(obj) ? (
          <Row className="h-200">
            <Col
              md={8}
              className="colVideo"
              style={{ paddingRight: "0px !important" }}
            >
              {!showExam && (
                <>
                  <Row>
                    <Col>
                      <div>
                        <video
                          ref={videoPlayerRef}
                          src={currentVideoURL}
                          autoPlay={false}
                          controls
                          disablePictureInPicture
                          disableRemotePlayback
                          controlsList="nodownload noplaybackrate"
                          width="100%"
                          style={{ maxHeight: "35rem" }}
                          onEnded={onVideoEnded}
                          onTimeUpdate={onTimeUpdate}
                        />
                      </div>

                      <ul className="nav nav-pills ciNavbar nav-justified h-10 pl-2">
                        <li className="nav-item">
                          <a
                            className={`nav-link rounded-0 py-0 ${
                              iActiveTab === 1 ? "active" : ""
                            }`}
                            aria-current="page"
                            href="#"
                            onClick={() => {
                              setiActiveTab(1);
                            }}
                          >
                            DESCRIPCIÓN GENERAL
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link rounded-0 py-0 ${
                              iActiveTab === 2 ? "active" : ""
                            }`}
                            href="#"
                            onClick={() => {
                              setiActiveTab(2);
                            }}
                          >
                            DOCUMENTOS
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link rounded-0 py-0 ${
                              iActiveTab === 3 ? "active" : ""
                            }`}
                            href="#"
                            onClick={() => {
                              setiActiveTab(3);
                            }}
                          >
                            ANNOUNCEMENTS
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link rounded-0 py-0 ${
                              iActiveTab === 4 ? "active" : ""
                            }`}
                            href="#"
                            onClick={() => {
                              setiActiveTab(4);
                            }}
                          >
                            NOTAS
                          </a>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {iActiveTab === 1 && (
                        <Row className="jumbotron py-5 p-md-2">
                          <Col md={12}>
                            <CourseDetails />
                          </Col>
                        </Row>
                      )}
                      {iActiveTab === 2 && (
                        <Row className="jumbotron py-5 p-md-2">
                          <Col md={12}>
                            <h1>Documents</h1>
                          </Col>
                        </Row>
                      )}
                      {iActiveTab === 3 && (
                        <Row className="jumbotron py-5 p-md-2">
                          <Col md={12}>
                            <h1>ANNOUNCEMENTS</h1>
                          </Col>
                        </Row>
                      )}
                      {iActiveTab === 4 && (
                        <Row className="jumbotron py-5 p-md-2">
                          <Col md={12}>
                            <h1>Notes</h1>
                          </Col>
                        </Row>
                      )}
                    </Col>
                  </Row>
                </>
              )}
              {showExam && (
                <Row style={{ marginTop: "10%" }}>
                  <Col>
                    <ExamIntro onSkip={() => setShowExam(false)} />
                  </Col>
                </Row>
              )}
            </Col>
            <Col md={4} className="colTabs">
              <Stack direction="horizontal" gap={3} className="ciTitleDiv">
                <div className="pl-3">{obj.course.name}</div>
                <div className="ms-auto  pr-4 ">
                  <CloseButton variant="white" />
                </div>
              </Stack>
              <Accordion alwaysOpen defaultActiveKey="0" className="bg-light">
                {!_.isEmpty(obj) &&
                  obj.course.courseModules.map((m: any, mi: number) => {
                    return (
                      <>
                        {m.courseLectures.length > 0 && (
                          <Accordion.Item eventKey={`${mi}`}>
                            <Accordion.Header>
                              <Card className="noBorderCard">
                                {" "}
                                <Card.Title>
                                  <span className="ciClassListHeader">
                                    {m.name}
                                  </span>
                                  <br />
                                  <span className="ciClassListHeader_dur">
                                    0/{m.courseLectures.length} - {m.duration}
                                    min
                                  </span>
                                </Card.Title>
                              </Card>
                            </Accordion.Header>
                            <Accordion.Body>
                              <Form>
                                {m.courseLectures.map((l: any, id: number) => {
                                  return <PlayItem {...l} key={id} />;
                                })}
                              </Form>
                              {!_.isEmpty(m.examData) && (
                                <Container fluid>
                                  <RewardTab
                                    {...m.examData}
                                    handleClick={() => {
                                      setShowExam(true);
                                    }}
                                  />
                                </Container>
                              )}
                            </Accordion.Body>
                          </Accordion.Item>
                        )}
                      </>
                    );
                  })}
              </Accordion>
            </Col>
          </Row>
        ) : (
          <>
            <MUISkeleton />
            <MUISkeleton />
            <MUISkeleton />
            <MUISkeleton />
            <MUISkeleton />
            <MUISkeleton />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CourseInit;
