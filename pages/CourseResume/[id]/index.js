/* eslint-disable */
// import node module libraries
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";

import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Nav,
  Row,
  Stack,
  Tab,
  Table,
} from "react-bootstrap";
import i18 from "../../../next-i18next.config";

// import MDI icons

// import widget/custom components
import { ToastContainer } from "react-toastify";
import { GeeksSEO, GKAccordionProgress } from "widgets";
// import sub components
import { DescriptionTab, ReviewsTab } from "sub-components";

// import data files
// import hooks
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";

import useMounted from "hooks/useMounted";
import _ from "lodash";
import {
  addTelegramUserToGoogleSheet,
  endLecture,
  getCourseDetails,
  getCourseInit,
  getMyCourses,
  getUserProfileDetails,
  requestLecture,
  startCourseRequest,
  updateLastWatch,
  updateTelegramSubmitted,
} from "../../../services/nodeapi";

import {
  mdiFastForwardOutline,
  mdiLock,
  mdiLockOpenVariant,
  mdiMonitorShare,
} from "@mdi/js";
import Icon from "@mdi/react";

import LoadingSpinner from "components/bootstrap/loadingspinner";
import Announcements from "components/course/Announcements";
import Coursefulldetails from "components/course/coursefulldetails";
import Learningtools from "components/course/Learningtools";
import Notes from "components/course/Notes";
import QA from "components/course/QA";
import ScheduleCourse from "components/course/schedulecourse";
import LoadingSkeleton from "components/CourseInit/LoadingSkeleton";
import MandateForms from "components/CourseInit/MandateForms";
import NavbarTop from "layouts/dashboard/NavbarTop";
import moment from "moment";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useMediaQuery } from "react-responsive";
import FreeCourseDescriptionTab from "sub-components/courses/course-single/FreeCourseDescriptionTab";
import Swal from "sweetalert2";
import Exam from "../../../components/CourseInit/Exam";
import ExamIntro from "../../../components/CourseInit/ExamIntro";
import { courseInitObject, userObject } from "../../../services/states";
const CourseResume = () => {
  const { t } = useTranslation();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const ref = useRef();
  const hasMounted = useMounted();
  const router = useRouter();
  const playerRef = useRef();
  const [iActiveTab, setiActiveTab] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [ShowExamIntro, setShowExamIntro] = useState(false);
  const [ShowExamModuleId, setShowExamModuleId] = useState(0);
  const [ShowExamLectureId, setShowExamLectureId] = useState(0);
  const [ShowExam, setShowExam] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [lectureDocs, setLecturesDocs] = useState([]);
  const videoPlayerRef = useRef(null);
  const userObj = useRecoilValue(userObject);
  const [ciObj, setciObj] = useRecoilState(courseInitObject);
  const [obj, setobj] = useState({});

  const [courseObj, setcourseObj] = useState({}); //set course object
  const [courseModulesObj, setcourseModulesObj] = useState([]); // set course modules object
  const [cldObj, setcldObj] = useState({}); //set current lecture details
  const [ucdObj, setucdObj] = useState({}); //set user course details
  const [stopProctoring, setstopProctoring] = useState(false);
  const [currentVideoURL, setCurrentVideoURL] = useState("");
  const [currentVideoImageURL, setCurrentVideoImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setshowLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [examData, setExamData] = useState({});
  const [noForwardAlertShown, setnoForwardAlertShown] = useState(false);
  const [userExamHistory, setuserExamHistory] = useState([]);
  let timestamp = moment().format("D-MMM-YY-H-mm-ss");
  const [isFreeCourse, setIsFreeCourse] = useState(false);
  const [rewards, setrewards] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [totalVideosCount, settotalVideosCount] = useState(0);
  const [totalVideosDuration, settotalVideosDuration] = useState(0);
  const [isEmployee_Company, setIsEmployee_Company] = useState("");
  const [selectedGroup, setselectedGroupName] = useState("");
  const [istelegram_username_submitted, settelegram_username_submitted] =
    useState(false);
  useEffect(() => {
    if (router.query.id) {
      pageLoad();
    }
  }, [router]);

  const MINUTE_MS = 5000;

  useEffect(() => {
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
    try {
      const { currentLectureData, userCourseData } = obj;

      const req = {
        userCourseHistoryId: userCourseData.id,
        lectureId: currentLectureData.id,
        moduleId: currentLectureData.module_id,
        videoDuration: ct,
      };
      const resp = await updateLastWatch(req);
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleRegisterTelegram = async () => {
    const { value: userName } = await Swal.fire({
      title: "Ingrese un nombre de usuario válido de Telegram",
      input: "text",
      inputValidator: (userName) => {
        if (!userName) {
          return "¡Ingrese el nombre de usuario de Telegram!";
        }
      },
      inputPlaceholder: "Ingrese un nombre de usuario válido de Telegram",
    });

    if (userName) {
      const req = {
        name: userObj.name,
        email: userObj.email,
        telegram_username: userName,
        course_name: courseObj.name,
      };

      const googleSpeedSheetId =
        parseInt(router.query.id) === 55
          ? "1gCgqdJj4bnNolczZY92ReudHY4cFABSx9jEysHtqlek"
          : "17Tia6EYcVNh3Di_GQyu7sdI3_fMBHAIcK42Wge5jVzg";
      const resp = await addTelegramUserToGoogleSheet(req, googleSpeedSheetId);
      const respBackend = await updateTelegramSubmitted({
        telegram_username_submitted: 1,
        course_id: parseInt(router.query.id),
      });
      settelegram_username_submitted(true);
      const url =
        courseObj.id === 55
          ? "https://t.me/+at7nFXaRcv00Yjc8"
          : "https://t.me/+6q8_HfLyXDcyZWU0";
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    }
  };

  const handleContactWhatsApp = async () => {
    const url =
      courseObj.id === 55
        ? "https://wa.me/971588163253"
        : "https://wa.me/971555868924";

    //: "https://wa.me/34613368039";
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const pageLoad = async () => {
    setIsLoading(true);
    const courseId = router.query.id;
    const courseDetails = await getCourseDetails(courseId);
    setrewards(courseDetails.data.courseData.reward);
    const isPublic =
      courseDetails.data.courseData.is_public === 1 ? true : false;
    setIsFreeCourse(isPublic);
    const mc = await getMyCourses();

    const upResp = await getUserProfileDetails();
    const _employee_company = upResp.data.userData.employee_company;

    setIsEmployee_Company(_employee_company);

    const d = mc.data.list;
    let isPaymentExpired = true;
    d.map((c) => {
      if (
        c.course_id === parseInt(router.query.id) &&
        c.purchaseData !== null
      ) {
        const {
          is_partial_payment,
          remian_payments,
          next_payment_date,
          each_payment_amount,
          telegram_username_submitted,
        } = c.purchaseData;
        const _telegram_username_submitted =
          telegram_username_submitted === 1 ? true : false;

        settelegram_username_submitted(_telegram_username_submitted);
        let A = moment(next_payment_date);
        let B = moment(moment(new Date()).format("YYYY-MM-DD"));
        const remainingDays = A.diff(B, "days");

        if (remainingDays < 0) {
          Swal.fire({
            icon: "question",
            title: "Expired",
            text: "Renewal date expired. Please pay to continue learning.",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Pay Now",
            cancelButtonText: "Later",
          }).then((result) => {
            if (result.isConfirmed) {
              if (parseInt(courseId) === 55 || parseInt(courseId) === 56) {
                router.push(`/SpecialCheckout//${courseId}`);
              } else {
                router.push(`/SplitPaymentCheckout/${courseId}`);
              }
            } else {
              router.push("/MyLearnings");
            }
          });
          return;
        } else {
          isPaymentExpired = false;
        }
      } else {
        isPaymentExpired = false;
      }
    });

    if (!isPaymentExpired || isPublic) {
      const cdresp = await getCourseInit({ courseId });
      if (cdresp.status === 200) {
        setobj(cdresp.data);

        const { course, currentLectureData, userCourseData } = cdresp.data;
        const completed_lec_ids =
          userCourseData.completed_lec_ids &&
          userCourseData.completed_lec_ids.split(",");

        setciObj(course);
        setuserExamHistory(cdresp.data.userExamHistory);

        // if (
        //   userCourseData.started_at === null &&
        //   userCourseData.completed_md_ids === null &&
        //   userCourseData.completed_lec_ids === null
        // ) {
        //   if (!isPublic) {
        //     setOpen(true);
        //   } else {
        //     setOpen(false);
        //   }
        // }
        const { courseModules } = course;
        let objLect = [];
        let iTotalVideosCount = 0;
        let iTotalVideosDuration = 0;
        courseModules.map((m) => {
          let topics = [];
          let totalDuration = 0;
          let iModule_progress = 0;
          let iTotalLectInModule = m.courseLectures.length;
          let iLectureCompleted = 0;
          const completedExams =
            userCourseData.completed_exam_ids &&
            userCourseData.completed_exam_ids.split(",");
          let isExamCompleted = false;

          if (m.examData !== null) {
            isExamCompleted = _.find(completedExams, function (chr) {
              return parseInt(chr) === m.examData.id;
            });
          }
          m.courseLectures.map((l) => {
            completed_lec_ids &&
              completed_lec_ids.map((cl) => {
                if (parseInt(cl) === l.id) {
                  ++iLectureCompleted;
                }
              });
            if (
              !_.isEmpty(currentLectureData) &&
              l.id === currentLectureData.id
            ) {
              setLecturesDocs(l.documents);
            }
            const completedlectures =
              userCourseData.completed_lec_ids &&
              userCourseData.completed_lec_ids.split(",");

            const isLectureCompleted = _.find(
              completedlectures,
              function (chr) {
                return parseInt(chr) === l.id;
              }
            );

            const status = isPublic
              ? "finished"
              : currentLectureData === null
              ? "finished"
              : l.id === currentLectureData.id
              ? "continue"
              : isLectureCompleted !== undefined
              ? "finished"
              : "pending";
            totalDuration = totalDuration + l.duration;
            const duration = l.duration + "m";
            topics.push({
              id: l.id,
              topic: l.name,
              duration,
              status,
              locked: status === "pending" ? true : false,
              module_id: l.module_id,
              sub_module_id: l.sub_module_id,
              sub_module_name: !_.isEmpty(l.sub_modules)
                ? l.sub_modules.name
                : "",
            });
          });
          iModule_progress = parseFloat(
            (iLectureCompleted / iTotalLectInModule) * 100
          ).toFixed(2);

          const completedModules =
            userCourseData.completed_md_ids &&
            userCourseData.completed_md_ids.split(",");
          const isModuleCompleted = _.find(completedModules, function (chr) {
            return parseInt(chr) === m.id;
          });
          const boolMC = isPublic
            ? true
            : isModuleCompleted !== undefined
            ? true
            : false;

          let moduleProgress = boolMC ? 100 : 0;
          try {
            if (!boolMC) {
              const js = JSON.parse(userCourseData.module_progress);
              const mp = js[m.id];
              if (mp === undefined) {
                moduleProgress = boolMC ? 100 : 0;
              } else {
                moduleProgress = iModule_progress;
              }
            }
          } catch (e) {
            moduleProgress = 0;
            console.log(e);
          }
          objLect.push({
            id: m.id,
            title: m.name,
            total_videos: m.courseLectures.length,
            total_duratoin: totalDuration + "m",
            completed: moduleProgress,
            topics,
            examData: m.examData,
            status: isPublic
              ? true
              : isModuleCompleted !== undefined
              ? true
              : false,
            isExamCompleted: isExamCompleted !== undefined ? true : false,
          });
          moduleProgress = 0;
          iTotalVideosCount = iTotalVideosCount + m.courseLectures.length;
          iTotalVideosDuration = iTotalVideosDuration + totalDuration;
        });
        settotalVideosCount(iTotalVideosCount);
        settotalVideosDuration(iTotalVideosDuration);

        setLectures(objLect);
        setcourseObj(course);

        setcourseModulesObj(courseModules);
        setcldObj(currentLectureData);
        setucdObj(userCourseData);

        setCurrentVideoURL(
          currentLectureData === null ? "" : currentLectureData.video_url
        );
        setCurrentVideoImageURL(userCourseData.video_thumbnail);
      }
    }
    setIsLoading(false);
  };
  const onTimeUpdate = (e) => {
    if (!videoPlayerRef.current.seeking) {
      setCurrentTime(videoPlayerRef.current?.currentTime);
      console.log("currentTime----------->", currentTime);
      console.log(
        "videocurrentTime----------->",
        videoPlayerRef.current?.currentTime
      );
    }
  };

  const onVideoEnded = async (e) => {
    console.log("onVideoEnded-------->", e);
    await handleEndLecture();
  };

  const handleEndLecture = async () => {
    const { id, module_id, module_index, lecture_index } = cldObj;
    let nextModule_index = module_index + 1;
    let nextLecture_index = lecture_index + 1;

    const courseId = courseObj.id;
    let currentModule = _.filter(courseModulesObj, { module_index });
    const moduleHasExam =
      currentModule[0].examData === null
        ? false
        : currentModule[0].examData.is_disabled === 0
        ? true
        : false;
    let nextLecture = _.filter(currentModule[0].courseLectures, {
      lecture_index: nextLecture_index,
    });
    if (nextLecture.length === 0) {
      if (moduleHasExam) {
        setExamData(currentModule[0].examData);
        setShowExamModuleId(module_id);
        setShowExamIntro(true);
      }
      currentModule = _.filter(courseModulesObj, {
        module_index: nextModule_index,
      });
      try {
        nextLecture = _.filter(currentModule[0].courseLectures, {
          lecture_index: 1,
        });
      } catch (e) {
        console.log(e);
      }
    }

    const lastWatchTime = videoPlayerRef.current?.duration;
    await handleUpdateLastWatch(lastWatchTime);
    const elResp = await endLecture({ lectureId: id, courseId });
    if (elResp.status === 200) {
      try {
        const rlResp = await requestLecture({
          courseId,
          lectureId: nextLecture[0].id,
          moduleId: nextLecture[0].module_id,
        });

        const req = {
          userCourseHistoryId: ucdObj.id,
          lectureId: rlResp.data.id,
          moduleId: rlResp.data.module_id,
          videoDuration: 1,
        };
        const resp = await updateLastWatch(req);
        setcldObj(rlResp.data);
        setCurrentVideoURL(rlResp.data.video_url);
        setCurrentVideoImageURL(rlResp.data.video_thumbnail);
        videoPlayerRef.current?.play();
      } catch (e) {
        console.log(e);
      }
      pageLoad();
    }
  };

  const handleRemoteShare = async () => {
    await navigator.mediaDevices.getDisplayMedia();
  };
  const onVideoSeeking = async (e) => {
    const event = e;
    if (event.code === "ArrowRight") {
      videoPlayerRef.current.currentTime =
        videoPlayerRef.current?.currentTime + 10;
    } else if (event.code === "ArrowLeft") {
      videoPlayerRef.current.currentTime =
        videoPlayerRef.current?.currentTime - 10;
    }
    // var supposedCurrentTime = currentTime;
    // var delta = videoPlayerRef.current?.currentTime - supposedCurrentTime;
    // if (
    //   videoPlayerRef.current?.currentTime > currentTime &&
    //   obj.currentLectureData.id === cldObj.id
    // ) {
    //   if (!noForwardAlertShown) {
    //     toast.error("Cannot forward video.");
    //     setnoForwardAlertShown(true);
    //   }
    //   videoPlayerRef.current.currentTime = supposedCurrentTime;
    // }
  };

  const isLectureCompleted = (id) => {
    const d = _.filter(ucdObj.completed_lec_ids.split(","), id);
  };
  const handleStartCourse = async () => {
    const resp = await startCourseRequest({ courseId: router.query.id });
    setOpen(false);
    videoPlayerRef.current?.play();
  };
  const requestCompletedLecture = async (moduleId, lectureId) => {
    const completed_md_ids = obj.userCourseData.completed_md_ids;
    const completed_lec_ids = obj.userCourseData.completed_lec_ids;
    obj.course.courseModules.map((m) => {
      m.courseLectures.map((l) => {
        if (m.id === moduleId && l.id === lectureId) {
          setLecturesDocs(l.documents);
        }
      });
    });

    const rlResp = await requestLecture({
      courseId: courseObj.id,
      lectureId,
      moduleId,
    });
    if (rlResp.status === 200) {
      setcldObj(rlResp.data);
      setCurrentVideoURL(rlResp.data.video_url);
      setCurrentVideoImageURL(rlResp.data.video_thumbnail);

      videoPlayerRef.current?.play();
    }
  };

  const hanleExamIntroStartExam = () => {
    setShowExam(true);
    setShowExamIntro(false);
  };

  const CourseContent = () => {
    return (
      <Card className="bg-lightblue noBorderCard p-0">
        <Card.Header className="cr-accTitle noBorderCard ">
          Contenido
        </Card.Header>
        <Card.Text>
          <div className="p-2 ms-3">
            {lectures.length} sections • {totalVideosCount} lectures •{" "}
            {courseObj.custom_field_3}hrs Tiempo total
          </div>
        </Card.Text>
        <Card.Body className="p-0">
          {!_.isEmpty(lectures) && (
            <GKAccordionProgress
              rewards={rewards}
              userExamHistory={userExamHistory}
              isFreeCourse={isFreeCourse}
              requestCompletedLecture={requestCompletedLecture}
              accordionItems={lectures}
              defaultActiveKey={cldObj === null ? "" : cldObj.module_id}
              cldObj={cldObj}
              handleshowExam={(e) => setShowExam(e)}
              handleshowIntroExam={(mid, e, data) => {
                setShowExamModuleId(mid);
                setShowExamIntro(e);
                setExamData(data);
              }}
              pageLoad={() => pageLoad()}
              selectedGroup={selectedGroup}
              setselectedGroupName={setselectedGroupName}
            />
          )}
        </Card.Body>
      </Card>
    );
  };
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Course Resume | MundoCrypto" />
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
      <Modal
        backdrop="static"
        keyboard={false}
        show={open}
        onHide={() => setOpen(false)}
        size="lg"
      >
        <Modal.Header closeButton={false} className="d-flex flex-column">
          <img src="/images_optimized/quiz_image.png" width="120px" />{" "}
          <Modal.Title className="fw-bold fs-3">
            {t("course_resume.modal.title")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="examInstrContainer">
            <span className="fw-bold">{t("course_resume.modal.subtitle")}</span>
            <ol className="pt-2">
              <li>{t("course_resume.modal.l1")}</li>
              <li>{t("course_resume.modal.l2")}</li>
              <li>{t("course_resume.modal.l3")}</li>
              <li>{t("course_resume.modal.conversion")}</li>
              <li>{t("course_resume.modal.l4")}</li>
              <li>{t("course_resume.modal.l5")}</li>
              <li>{t("course_resume.modal.l6")}</li>
            </ol>
          </div>
        </Modal.Body>
        <Modal.Footer className="align-items-center justify-content-center">
          <Button
            variant="outline-primary"
            onClick={() => router.push("/MyLearnings")}
          >
            {t("course_resume.modal.later_btn")}
          </Button>
          <Button variant="primary" onClick={handleStartCourse}>
            {t("course_resume.modal.start_btn")}
          </Button>
        </Modal.Footer>
      </Modal>
      <LoadingSpinner showLoading={showLoader} />
      {!isLoading && !_.isEmpty(obj) && (
        <>
          {" "}
          <LoadingSpinner showLoading={isLoading} />
          {ShowExamIntro && !ShowExam && (
            <div className="py-lg-5 py-5">
              <Container fluid="lg">
                <Row>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="mb-5 d-flex align-items-center justify-content-center"
                  >
                    <ExamIntro
                      onSkip={() => setShowExamIntro(false)}
                      onStartExam={hanleExamIntroStartExam}
                      isFreeCourse={isFreeCourse}
                      examData={examData}
                    />
                  </Col>
                </Row>
              </Container>
            </div>
          )}
          {/* {userObj && (
            <Proctoring
              startExam={() => {
                setShowExam(true);
                setShowExamIntro(false);
              }}
              ref={ref}
              name={userObj.name}
              email={userObj.email}
              userId={userObj.id}
              groupName={`courseId_${courseObj.id}_moduleId_${ShowExamModuleId}`}
              showLoading={(e) => setshowLoader(e)}
            />
          )} */}
          {/* <Button onClick={() => ref.current.log("start")}>start</Button>
            <Button onClick={() => ref.current.log("stop")}>stop</Button> */}
          {ShowExam && !ShowExamIntro && (
            <div className="py-lg-5 py-5">
              <Container fluid="lg">
                <Row>
                  <Col lg={12} md={12} sm={12} className="mb-5">
                    <Exam
                      isFreeCourse={isFreeCourse}
                      courseId={courseObj.id}
                      moduleId={ShowExamModuleId}
                      timestamp={timestamp}
                      stopProctorring={() => ref.current.log("stop")}
                      onExamComplete={() => {
                        setShowExam(false);
                        pageLoad();
                      }}
                      userExamHistory={userExamHistory}
                      cancelExam={() => {
                        setShowExam(false);
                        setShowExamIntro(false);
                        ref.current.log("stop");
                      }}
                      showLoading={(e) => setshowLoader(e)}
                    />
                  </Col>
                </Row>
              </Container>
            </div>
          )}
          {!ShowExamIntro && !ShowExam && (
            <>
              {!_.isEmpty(ciObj) && (
                <NavbarTop
                  progress={obj.userCourseData.progress}
                  name={_.isEmpty(cldObj) ? courseObj.name : cldObj.name}
                />
              )}
              <Row>
                <Col
                  lg={8}
                  md={8}
                  sm={12}
                  className="mb-0"
                  style={{ paddingRight: "0" }}
                >
                  <div className="rounded-0 position-relative w-100 d-block overflow-hidden p-0">
                    <video
                      ref={videoPlayerRef}
                      src={currentVideoURL}
                      autoPlay={false}
                      controls
                      disablePictureInPicture
                      controlsList="nodownload"
                      width="100%"
                      onEnded={onVideoEnded}
                      onContextMenu={(e) => e.preventDefault()}
                      onTimeUpdate={onTimeUpdate}
                      onSeeking={onVideoSeeking}
                      data-setup='{"playbackRates": [0.25, 0.5, 1, 1.5, 2]}'
                      onKeyDown={onVideoSeeking}
                      poster={currentVideoImageURL}
                      // height="600"
                    />

                    <div className="video-controls">
                      <Icon
                        onClick={handleRemoteShare}
                        path={mdiMonitorShare}
                        size={1}
                        className="mb-1 "
                        color="white"
                      />
                    </div>
                  </div>
                  {hasMounted ? (
                    <Tab.Container
                      defaultActiveKey={isMobile ? "contents" : "overview"}
                      className="fluid"
                      fill
                    >
                      <Card className="rounded-3">
                        {/*  Card body  */}
                        <Card.Body className="p-0">
                          <Row>
                            <Col md={12}>
                              <Nav
                                className={`nav-lt-tab ${
                                  isMobile ? "" : "p-6 pt-0"
                                }`}
                              >
                                {isMobile && (
                                  <Nav.Item
                                    className={`cr-navtitle${
                                      isMobile ? "_mobile" : ""
                                    }`}
                                    style={{ minWidth: "8rem" }}
                                  >
                                    <Nav.Link
                                      href="#contents"
                                      eventKey="contents"
                                      className="mb-sm-3 mb-md-0"
                                    >
                                      <a>Course Content</a>
                                    </Nav.Link>
                                  </Nav.Item>
                                )}
                                <Nav.Item
                                  className={`cr-navtitle${
                                    isMobile ? "_mobile" : ""
                                  }`}
                                >
                                  <Nav.Link
                                    href="#overview"
                                    eventKey="overview"
                                    className="mb-sm-3 mb-md-0"
                                  >
                                    <a>Visión general</a>
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item
                                  className={`cr-navtitle${
                                    isMobile ? "_mobile" : ""
                                  }`}
                                >
                                  <Nav.Link
                                    href="#documents"
                                    eventKey="documents"
                                    className="mb-sm-3 mb-md-0"
                                  >
                                    <a>Documentos</a>
                                  </Nav.Link>
                                </Nav.Item>
                                {courseObj.id === 55 &&
                                  isEmployee_Company !== "" && (
                                    <Nav.Item
                                      className={`cr-navtitle${
                                        isMobile ? "_mobile" : ""
                                      }`}
                                      style={{ minWidth: "4rem" }}
                                    >
                                      <Nav.Link
                                        href={`#mandatequestions`}
                                        eventKey={`mandatequestions`}
                                        className="mb-sm-3 mb-md-0"
                                      >
                                        <a>
                                          Formularios&nbsp;{" "}
                                          <Icon
                                            path={mdiLock}
                                            size={0.7}
                                            className="mb-1"
                                          />
                                        </a>
                                      </Nav.Link>
                                    </Nav.Item>
                                  )}
                                <Nav.Item
                                  className={`cr-navtitle${
                                    isMobile ? "_mobile" : ""
                                  }`}
                                  style={{ minWidth: "4rem" }}
                                >
                                  <Nav.Link
                                    href="#QA"
                                    eventKey="QA"
                                    className="mb-sm-3 mb-md-0"
                                  >
                                    <a>
                                      P&R&nbsp;
                                      <Icon
                                        path={mdiLockOpenVariant}
                                        size={0.7}
                                        className="mb-1"
                                      />
                                    </a>
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item
                                  className={`cr-navtitle${
                                    isMobile ? "_mobile" : ""
                                  }`}
                                  style={{ minWidth: "5rem" }}
                                >
                                  <Nav.Link
                                    href="#notes"
                                    eventKey="notes"
                                    className="mb-sm-3 mb-md-0"
                                  >
                                    <a>
                                      Notas&nbsp;{" "}
                                      <Icon
                                        path={mdiLock}
                                        size={0.7}
                                        className="mb-1"
                                      />
                                    </a>
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item
                                  className={`cr-navtitle${
                                    isMobile ? "_mobile" : ""
                                  }`}
                                  style={{ minWidth: "10rem" }}
                                >
                                  <Nav.Link
                                    href="#announcements"
                                    eventKey="announcements"
                                    className="mb-sm-3 mb-md-0"
                                  >
                                    <a>
                                      {" "}
                                      Anuncios&nbsp;{" "}
                                      <Icon
                                        path={mdiLockOpenVariant}
                                        size={0.7}
                                        className="mb-1"
                                      />
                                    </a>
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item
                                  className={`cr-navtitle${
                                    isMobile ? "_mobile" : ""
                                  }`}
                                  style={{ minWidth: "6rem", display: "none" }}
                                >
                                  <Nav.Link
                                    href="#reviews"
                                    eventKey="reviews"
                                    className="mb-sm-3 mb-md-0"
                                  >
                                    <a>
                                      Reviews&nbsp;{" "}
                                      <Icon
                                        path={mdiLockOpenVariant}
                                        size={0.7}
                                        className="mb-1"
                                      />
                                    </a>
                                  </Nav.Link>
                                </Nav.Item>
                                {false && (
                                  <Nav.Item
                                    className={`cr-navtitle${
                                      isMobile ? "_mobile" : ""
                                    }`}
                                    style={{ minWidth: "10rem" }}
                                  >
                                    <Nav.Link
                                      href="#learningtools"
                                      eventKey="learningtools"
                                      className="mb-sm-3 mb-md-0"
                                    >
                                      <a>
                                        Herramientas
                                        <Icon
                                          path={mdiLock}
                                          size={0.7}
                                          className="mb-1"
                                        />
                                      </a>
                                    </Nav.Link>
                                  </Nav.Item>
                                )}
                                <Nav.Item
                                  className={`cr-navtitle${
                                    isMobile ? "_mobile" : ""
                                  }`}
                                  style={{ minWidth: "10rem" }}
                                >
                                  <Nav.Link
                                    href="#"
                                    className="mb-sm-3 mb-md-0"
                                  >
                                    <a
                                      variant="primary"
                                      size="sm"
                                      style={{ textDecoration: "underline" }}
                                      onClick={handleEndLecture}
                                    >
                                      Siguiente{" "}
                                      <Icon
                                        path={mdiFastForwardOutline}
                                        size={0.7}
                                        className="mb-1"
                                      />
                                    </a>
                                  </Nav.Link>
                                </Nav.Item>
                              </Nav>
                            </Col>
                          </Row>
                          <Row className="">
                            <Col
                              md={{ span: 6, offset: 6 }}
                              className=" text-end px-10 pb-2"
                            >
                              <Stack direction="vertical" className=" ">
                                {(courseObj.id === 55 ||
                                  courseObj.id === 56) && (
                                  <a
                                    href="#"
                                    role="button"
                                    className=" mt-2 d-md-block"
                                    onClick={handleContactWhatsApp}
                                  >
                                    <img
                                      src="/images_optimized/whatsapp_icon.png"
                                      width={30}
                                    />{" "}
                                    Soporte Whatapp
                                  </a>
                                )}
                                {(courseObj.id === 55 || courseObj.id === 56) &&
                                  !istelegram_username_submitted && (
                                    <>
                                      <a
                                        href="#"
                                        className=" mt-2 d-md-block"
                                        role="button"
                                        onClick={handleRegisterTelegram}
                                      >
                                        <img
                                          src="/images_optimized/telegram.svg"
                                          width={30}
                                        />{" "}
                                        Entra en Telegram
                                      </a>
                                    </>
                                  )}
                              </Stack>
                            </Col>
                          </Row>
                          <Tab.Content>
                            {isMobile && (
                              <Tab.Pane eventKey={"contents"}>
                                <CourseContent />
                              </Tab.Pane>
                            )}
                            <Tab.Pane eventKey="overview" className="pb-4 p-0">
                              <div className={!isMobile ? "p-6 pt-0" : ""}>
                                {false && <ScheduleCourse />}
                                {courseObj.id === 38 ||
                                courseObj.id === 55 ||
                                courseObj.id === 56 ||
                                courseObj.id === 57 ||
                                courseObj.id === 58 ||
                                courseObj.id === 59 ||
                                courseObj.id === 61 ? (
                                  <Coursefulldetails
                                    lectures={lectures}
                                    totalVideosCount={totalVideosCount}
                                    totalVideosDuration={totalVideosDuration}
                                    cdOBJ={courseObj}
                                    is_learning_page={true}
                                  />
                                ) : (
                                  <>
                                    {courseObj.isFreeCourse ? (
                                      <FreeCourseDescriptionTab
                                        data={JSON.parse(courseObj.description)}
                                      />
                                    ) : (
                                      <DescriptionTab
                                        description={courseObj.description}
                                        learning_points={
                                          courseObj.learning_points
                                        }
                                      />
                                    )}
                                  </>
                                )}
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey={"documents"}>
                              <Container>
                                <Row>
                                  <Col md={12} sm={12}>
                                    <Table bordered>
                                      <tbody>
                                        {lectureDocs.map((f, i) => {
                                          return (
                                            <>
                                              <tr>
                                                <td>
                                                  <a
                                                    key={i}
                                                    href={f.doc_url}
                                                    target="_blank"
                                                  >
                                                    {f.doc_name}
                                                  </a>
                                                </td>
                                              </tr>
                                            </>
                                          );
                                        })}
                                      </tbody>
                                    </Table>
                                  </Col>
                                </Row>
                              </Container>
                            </Tab.Pane>
                            <Tab.Pane eventKey={"QA"}>
                              <QA
                                courseId={courseObj.id}
                                lecture_id={_.isEmpty(cldObj) ? 0 : cldObj.id}
                              />
                            </Tab.Pane>
                            <Tab.Pane eventKey={"notes"}>
                              <Notes
                                courseId={courseObj.id}
                                lecture_id={cldObj && cldObj.id}
                                currentTime={parseFloat(
                                  videoPlayerRef.current?.currentTime
                                ).toFixed(2)}
                              />
                            </Tab.Pane>
                            <Tab.Pane eventKey={"announcements"}>
                              <Announcements courseId={courseObj.id} />
                            </Tab.Pane>
                            <Tab.Pane
                              eventKey="reviews"
                              className={`pb-4 ${!isMobile ? "p-4" : ""}`}
                            >
                              <ReviewsTab courseId={courseObj.id} />
                            </Tab.Pane>
                            <Tab.Pane eventKey={"learningtools"}>
                              <Learningtools course_id={courseObj.id} />
                            </Tab.Pane>
                            {courseObj.id === 55 && (
                              <Tab.Pane
                                eventKey="mandatequestions"
                                className="pb-4 pt-3 px-4"
                              >
                                <MandateForms
                                  onMandateEmpOrgSubmit={(e) =>
                                    setIsEmployee_Company(e)
                                  }
                                  mainPageReload={() => pageLoad()}
                                />
                              </Tab.Pane>
                            )}
                          </Tab.Content>
                        </Card.Body>
                      </Card>
                    </Tab.Container>
                  ) : null}
                </Col>
                {!isMobile && (
                  <Col
                    xl={4}
                    lg={4}
                    md={4}
                    sm={12}
                    style={{ paddingLeft: "0" }}
                  >
                    <CourseContent />
                  </Col>
                )}
              </Row>

              {/*  Content  */}
              <Row>
                <Col xl={8} lg={12} md={12} sm={12} className="mb-4 mb-xl-0">
                  {/*  Card  */}
                </Col>
              </Row>
            </>
          )}
        </>
      )}

      {isLoading && (
        <>
          <LoadingSkeleton />
        </>
      )}
    </Fragment>
  );
};

export default CourseResume;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
