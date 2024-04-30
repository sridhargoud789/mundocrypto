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

const GKAccordianSubModules = ({ accordionItems, itemClass }) => {
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
        <Link href="#!" className="accordian_header">
          <a
            onClick={decoratedOnClick}
            aria-expanded={isCurrentEventKey}
            className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0"
            data-bs-toggle="collapse"
            aria-controls="courseTwo"
          >
            <span className="chevron-arrow ms-0">
              <i className="fe fe-chevron-down fs-4 accordian_header_text"></i>
            </span>
            &nbsp;
            <div className="me-auto accordian_header_text">
              {children.groupName}
            </div>
          </a>
        </Link>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Accordion defaultActiveKey={0}>
        <ListGroup as="ul" variant="flush">
          {accordionItems.map((item, index) => {
            return (
              <>
                {" "}
                <ListGroup.Item
                  key={index}
                  as="li"
                  className={`${
                    itemClass ? itemClass : ""
                  } accordian_header mb-2`}
                >
                  {!_.isEmpty(item.groupName) && (
                    <ContextAwareToggle eventKey={index}>
                      {item}
                    </ContextAwareToggle>
                  )}
                  <Accordion.Collapse eventKey={index} className="test">
                    <ListGroup
                      className={`${
                        !_.isEmpty(item.groupName) ? "py-4" : "py-0"
                      }`}
                      as="ul"
                    >
                      {item.lItems.map((subitem, subindex) => (
                        <ListGroup.Item
                          key={subindex}
                          as="li"
                          disabled={false}
                          className="px-0 py-1 ms-4 pb-2 border-0 accordian_header"
                        >
                          <Link href="#!">
                            <a
                              className={`d-flex justify-content-between align-items-center text-inherit text-decoration-none`}
                            >
                              <div className=" ">
                                <Icon path={mdiPlay} size={1} />
                                &nbsp;{" "}
                                <span className="fs-5">{subitem.title}</span>
                              </div>
                            </a>
                          </Link>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup.Item>
              </>
            );
          })}
        </ListGroup>
      </Accordion>
    </Fragment>
  );
};

export default GKAccordianSubModules;
