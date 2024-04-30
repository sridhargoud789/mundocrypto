// import node module libraries
import { Fragment, useContext } from "react";
import {
  Accordion,
  AccordionContext,
  Button,
  ListGroup,
  ProgressBar,
  useAccordionButton,
} from "react-bootstrap";

import BottomNavigation from "@mui/material/BottomNavigation";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
// import MDI icons
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import { claimMCRewards } from "services/nodeapi";
import Swal from "sweetalert2";
import RewardTab from "../../components/CourseInit/Rewards";
import GKAccordionSubProgress from "./GKAccordionSubProgress";
const GKAccordionProgress = ({
  accordionItems,
  defaultActiveKey,
  requestCompletedLecture,
  handleshowExam,
  handleshowIntroExam,
  isFreeCourse,
  userExamHistory,
  pageLoad,
  rewards,
  cldObj,
  setselectedGroupName,
  selectedGroup,
}) => {
  const data = [];

  accordionItems.map((item, index) => {
    const grouped = _.groupBy(item.topics, "sub_module_name");
    const subModules = [];
    Object.keys(grouped).map((key, i) => {
      const groupName = key;
      const lItems = grouped[key];
      subModules.push({ groupName, lItems });
    });
    data.push({ ...item, subModules });
  });
  console.log(data);
  const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = useContext(AccordionContext);
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );
    const isCurrentEventKey = activeEventKey === eventKey;
    return (
      <Fragment>
        <a
          type="button"
          onClick={decoratedOnClick}
          aria-expanded={isCurrentEventKey}
          className="h4 mb-0 d-flex align-items-center text-inherit text-decoration-none py-3 px-4 collapsed "
          data-bs-toggle="collapse"
          role="button"
          aria-controls="courseTwo"
        >
          <div className={`me-auto cr-ModuleTitle`}>{children.title}</div>
          <span className=" ms-4">
            <i
              className={`fe fe-chevron-${
                isCurrentEventKey ? "down" : "right"
              } fs-4`}
            ></i>
          </span>
        </a>
      </Fragment>
    );
  };
  const handleLectureClick = (mid, lid, status) => {
    //if (status === "finished" || status === "continue") {
    requestCompletedLecture(mid, lid);
    handleshowExam(false);
    handleshowIntroExam(mid, false);
    //}
  };

  const handleClaimMCrewards = async () => {
    const resp = await claimMCRewards({
      examId: userExamHistory[0].exam_id,
      insta_user_id: "",
    });

    const { data } = resp.data;
    toast.success(
      `You have successfully earned ${data.totalReward} MC Tokens.`
    );
    pageLoad();
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
      <Accordion defaultActiveKey={defaultActiveKey} className="bg-lightblue">
        <ListGroup
          as="ul"
          variant="flush"
          style={{ cursor: "pointer" }}
          className="bg-lightblue"
        >
          {data.map((item, index) => {
            if (item.topics.length === 0) {
              return (
                <ListGroup.Item
                  key={index}
                  as="li"
                  className="p-0 bg-lightblue"
                  moduleId={item.id}
                >
                  <ContextAwareToggle eventKey={item.id}>
                    {item}
                  </ContextAwareToggle>
                  <Accordion.Collapse
                    eventKey={item.id}
                    className="bg-lightblue"
                  >
                    <ListGroup variant="flush">
                      <ListGroup.Item className="fs-5  rounded-3 bg-lightblue">
                        {item.summary}
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup.Item>
              );
            } else {
              return (
                <ListGroup.Item
                  key={index}
                  as="li"
                  className="p-0 bg-lightblue"
                  moduleId={item.id}
                >
                  <ContextAwareToggle eventKey={item.id}>
                    {item}
                  </ContextAwareToggle>
                  <Accordion.Collapse
                    eventKey={item.id}
                    className="bg-lightblue"
                  >
                    <ListGroup variant="flush">
                      <ListGroup.Item className="border-top-0 bg-lightblue">
                        <ProgressBar
                          variant="success"
                          className="mb-2 progress bg-lightblue"
                          now={item.completed}
                          style={{ height: "6px" }}
                        />
                        <small>{item.completed}% Completed</small>
                      </ListGroup.Item>
                      <GKAccordionSubProgress
                        accordionItems={item.subModules}
                        //defaultActiveKey={defaultActiveKey}
                        requestCompletedLecture={requestCompletedLecture}
                        handleshowExam={handleshowExam}
                        handleshowIntroExam={handleshowIntroExam}
                        isFreeCourse={isFreeCourse}
                        userExamHistory={userExamHistory}
                        pageLoad={pageLoad}
                        rewards={rewards}
                        itemclassName="px-0 pt-2"
                        handleLectureClick={handleLectureClick}
                        module_id={item.id}
                        cldObj={cldObj}
                        selectedGroup={selectedGroup}
                        setselectedGroupName={setselectedGroupName}
                      />
                      {/* {item.topics.map((subitem, index) => (
                        <ListGroup.Item
                          moduleId={item.id}
                          lectureId={subitem.id}
                          key={index}
                          active={subitem.status === "continue"}
                          // disabled={subitem.locked}
                          className="lgLectureDetail bg-lightblue"
                        >
                          <a
                            className={`d-flex justify-content-between align-items-center text-inherit text-decoration-none`}
                            onClick={() =>
                              handleLectureClick(
                                item.id,
                                subitem.id,
                                subitem.status
                              )
                            }
                          >
                            <div className=" ">
                              <span className="me-2">
                                <Icon path={mdiPlay} size={1} />
                                &nbsp;{" "}
                              </span>
                              <span className="cr-lectureTitle">
                                {subitem.topic}
                              </span>
                            </div>
                            <div className=" fs-5">
                              <span>{subitem.duration}</span>
                            </div>
                          </a>
                        </ListGroup.Item>
                      ))} */}

                      {!item.isExamCompleted && !_.isEmpty(item.examData) && (
                        <>
                          {item.examData.is_disabled === 0 && (
                            <RewardTab
                              {...item.examData}
                              isFreeCourse={isFreeCourse}
                              handleClick={() => {
                                item.status
                                  ? handleshowIntroExam(
                                      item.id,
                                      true,
                                      item.examData
                                    )
                                  : Swal.fire({
                                      icon: "error",
                                      title:
                                        "Por favor completa todas las conferencias.",
                                      text: "en el módulo actual para comenzar el examen.",
                                    });
                              }}
                            />
                          )}
                        </>
                      )}
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup.Item>
              );
            }
          })}
        </ListGroup>
      </Accordion>

      {isFreeCourse && !accordionItems[0].isExamCompleted && (
        <Box sx={{ pb: 2 }}>
          <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0, pb: 5 }}
          >
            <BottomNavigation showLabels>
              <div className="d-grid pt-4">
                <Button
                  className="btn btn-primary mb-2"
                  onClick={() =>
                    handleshowIntroExam(
                      accordionItems[0].id,
                      true,
                      accordionItems[0].examData
                    )
                  }
                >
                  HACER EL EXAMEN
                </Button>
              </div>
            </BottomNavigation>
          </Paper>
        </Box>
      )}
      {isFreeCourse &&
        accordionItems[0].isExamCompleted &&
        userExamHistory &&
        userExamHistory[0].is_point_collected === 0 && (
          <Box sx={{ pb: 2 }}>
            <Paper
              sx={{ position: "fixed", bottom: 0, left: 0, right: 0, pb: 5 }}
            >
              <BottomNavigation showLabels>
                <div className="d-grid pt-4">
                  <Button
                    className="btn btn-primary mb-2"
                    onClick={handleClaimMCrewards}
                  >
                    Reclamar ${rewards}
                  </Button>
                </div>
              </BottomNavigation>
            </Paper>
          </Box>
        )}
    </>
  );
};

export default GKAccordionProgress;
