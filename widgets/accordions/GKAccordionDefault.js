// import node module libraries
import Link from "next/link";
import { Fragment, useContext, useState } from "react";
import {
  Accordion,
  AccordionContext,
  ListGroup,
  useAccordionButton,
} from "react-bootstrap";
import RewardTab from "../../components/CourseInit/Rewards";
import GKAccordianSubModules from "./GKAccordianSubModules";

const GKAccordionDefault = ({ accordionItems, itemClass, handleshowExam }) => {
  const [showExam, setShowExam] = useState(false);

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
              {children.title}
            </div>
          </a>
        </Link>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Accordion defaultActiveKey={accordionItems[0].id}>
        <ListGroup as="ul" variant="flush">
          {data.map((item, index) => {
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
                  <ContextAwareToggle eventKey={item.id}>
                    {item}
                  </ContextAwareToggle>
                  <Accordion.Collapse eventKey={item.id} className="test">
                    <ListGroup className="py-4 " as="ul">
                      <GKAccordianSubModules
                        accordionItems={item.subModules}
                        itemclassName="px-0 pt-2"
                      />

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
              </>
            );
          })}
        </ListGroup>
      </Accordion>
    </Fragment>
  );
};

export default GKAccordionDefault;
