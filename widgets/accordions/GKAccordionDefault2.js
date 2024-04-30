// import node module libraries
import { mdiPlay } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { Fragment, useContext, useState } from "react";
import {
  Accordion,
  AccordionContext,
  ListGroup,
  useAccordionButton,
} from "react-bootstrap";
import RewardTab from "../../components/CourseInit/Rewards";

const GKAccordionDefault2 = ({ accordionItems, itemClass, handleshowExam }) => {
  const [showExam, setShowExam] = useState(false);

  const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
      <Fragment>
        <Link href="#!">
          <a
            // onClick={decoratedOnClick}
            aria-expanded={isCurrentEventKey}
            className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0"
            data-bs-toggle="collapse"
            aria-controls="courseTwo"
          >
            <div className="me-auto">{children.title}</div>
            <span className="chevron-arrow ms-4">
              <i className="fe fe-chevron-down fs-4"></i>
            </span>
          </a>
        </Link>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Accordion defaultActiveKey={accordionItems[0].id}>
        <ListGroup as="ul" variant="flush">
          {accordionItems.map((item, index) => {
            return (
              <ListGroup.Item
                key={index}
                as="li"
                className={`${itemClass ? itemClass : ""}`}
              >
                <ContextAwareToggle eventKey={item.id}>
                  {item}
                </ContextAwareToggle>
                <Accordion.Collapse eventKey={item.id} className="test">
                  <ListGroup className="py-4" as="ul">
                    {item.topics.map((subitem, subindex) => (
                      <ListGroup.Item
                        key={subindex}
                        as="li"
                        disabled={false}
                        className="px-0 py-1 border-0"
                      >
                        <Link href="#!">
                          <a
                            className={`d-flex justify-content-between align-items-center text-inherit text-decoration-none`}
                          >
                            <div className="text-truncate ">
                              <span
                                className={`icon-shape bg-light text-primary icon-sm rounded-circle me-2`}
                              >
                                <Icon path={mdiPlay} size={0.8} />2
                              </span>
                              <span className="fs-5">{subitem.topic}</span>
                            </div>
                            <div className="text-truncate">
                              <span>{subitem.duration}m</span>
                            </div>
                          </a>
                        </Link>
                      </ListGroup.Item>
                    ))}

                    {!_.isEmpty(item.examData) && (
                      <RewardTab
                        {...item.examData}
                        handleClick={() => {
                          handleshowExam(true);
                        }}
                      />
                    )}
                  </ListGroup>
                </Accordion.Collapse>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Accordion>
    </Fragment>
  );
};

export default GKAccordionDefault2;
