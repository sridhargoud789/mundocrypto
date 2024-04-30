// import node module libraries
import { Fragment, useContext } from "react";
import {
  Accordion,
  AccordionContext,
  ListGroup,
  useAccordionButton,
} from "react-bootstrap";

// import MDI icons
import { mdiCheckCircleOutline, mdiPlay } from "@mdi/js";
import Icon from "@mdi/react";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import { claimMCRewards } from "services/nodeapi";
const GKAccordionSubProgress = ({
  accordionItems,
  defaultActiveKey,
  requestCompletedLecture,
  handleshowExam,
  handleshowIntroExam,
  isFreeCourse,
  userExamHistory,
  pageLoad,
  rewards,
  handleLectureClick,
  module_id,
  cldObj,
  setselectedGroupName,
  selectedGroup,
}) => {
  const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = useContext(AccordionContext);
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );
    const isCurrentEventKey =
      eventKey === selectedGroup ? true : activeEventKey === eventKey;
    return (
      <Fragment>
        <a
          type="button"
          eventKey={eventKey}
          activeEventKey={activeEventKey}
          selectedGroup={selectedGroup}
          onClick={decoratedOnClick}
          aria-expanded={isCurrentEventKey}
          className="h4 mb-0 d-flex align-items-center text-inherit text-decoration-none py-3 px-4 collapsed "
          data-bs-toggle="collapse"
          role="button"
          aria-controls="courseTwo"
        >
          <div className={`me-auto cr-ModuleTitle px-4`}>
            {children.groupName}
          </div>
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
      <Accordion className="bg-lightblue">
        <ListGroup
          as="ul"
          variant="flush"
          style={{ cursor: "pointer" }}
          className="bg-lightblue"
        >
          {accordionItems.map((item, index) =>
            !_.isEmpty(item.groupName) ? (
              <ListGroup.Item
                key={item.groupName}
                as="li"
                className="p-0 bg-lightblue"
                moduleId={module_id}
              >
                {!_.isEmpty(item.groupName) && (
                  <ContextAwareToggle eventKey={item.groupName}>
                    {item}
                  </ContextAwareToggle>
                )}
                <Accordion.Collapse
                  eventKey={item.groupName}
                  className={`bg-lightblue ${
                    selectedGroup === item.groupName ? "show" : ""
                  }`}
                  test={"test"}
                >
                  <ListGroup variant="flush">
                    {item.lItems.map((subitem, subindex) => {
                      return (
                        <ListGroup.Item
                          moduleId={module_id}
                          lectureId={subitem.id}
                          key={subitem.sub_module_id}
                          submoduleId={subitem.sub_module_id}
                          active={subitem.status === "continue"}
                          // disabled={subitem.locked}
                          className={`lgLectureDetail bg-lightblue ${
                            cldObj && cldObj.id === subitem.id
                              ? "bg-lighgreen"
                              : ""
                          }`}
                        >
                          <a
                            className={`d-flex justify-content-between align-items-center text-inherit text-decoration-none`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setselectedGroupName(item.groupName);
                              handleLectureClick(
                                module_id,
                                subitem.id,
                                subitem.status
                              );
                            }}
                          >
                            <div
                              className={`${
                                !_.isEmpty(item.groupName) ? "px-4" : ""
                              }`}
                            >
                              {subitem.status === "finished" && (
                                <span className="me-2">
                                  <Icon
                                    path={mdiCheckCircleOutline}
                                    color="green"
                                    size={0.8}
                                  />
                                </span>
                              )}
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
                      );
                    })}
                  </ListGroup>
                </Accordion.Collapse>
              </ListGroup.Item>
            ) : (
              <>
                <ListGroup variant="flush">
                  {item.lItems.map((subitem, subindex) => {
                    return (
                      <ListGroup.Item
                        moduleId={module_id}
                        lectureId={subitem.id}
                        key={subindex}
                        active={subitem.status === "continue"}
                        // disabled={subitem.locked}
                        className={`lgLectureDetail bg-lightblue ${
                          cldObj && cldObj.id === subitem.id
                            ? "bg-lighgreen"
                            : ""
                        }`}
                      >
                        <a
                          className={`d-flex justify-content-between align-items-center text-inherit text-decoration-none`}
                          onClick={() =>
                            handleLectureClick(
                              module_id,
                              subitem.id,
                              subitem.status
                            )
                          }
                        >
                          <div
                            className={`${
                              !_.isEmpty(item.groupName) ? "px-4" : ""
                            }`}
                          >
                            {subitem.status === "finished" && (
                              <span className="me-2">
                                <Icon
                                  path={mdiCheckCircleOutline}
                                  color="green"
                                  size={0.8}
                                />
                              </span>
                            )}
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
                    );
                  })}
                </ListGroup>
              </>
            )
          )}
        </ListGroup>
      </Accordion>
    </>
  );
};

export default GKAccordionSubProgress;
