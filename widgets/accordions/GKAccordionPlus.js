// import node module libraries
import Link from "next/link";
import { Fragment, useContext } from "react";
import {
  Accordion,
  AccordionContext,
  ListGroup,
  useAccordionButton,
} from "react-bootstrap";

const GKAccordionPlus = ({ accordionItems, itemClass }) => {
  const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );
    const isCurrentEventKey = currentEventKey === eventKey;
    return (
      <Link href="#!">
        <a
          onClick={decoratedOnClick}
          aria-expanded={isCurrentEventKey}
          className="d-flex align-items-center text-inherit text-decoration-none shadow-none justify-content-between "
        >
          <span
            className={`me-auto fs-4 ${
              isCurrentEventKey ? "text-primary" : ""
            }`}
          >
            {children}
          </span>
          <span className="collapse-toggle">
            <i className="fe fe-plus text-primary"></i>
          </span>
        </a>
      </Link>
    );
  };

  return (
    <Fragment>
      <Accordion defaultActiveKey={1}>
        <ListGroup variant="flush">
          {accordionItems.map((item, index) => (
            <Fragment key={index}>
              <ListGroup.Item className={`${itemClass ? itemClass : ""}`}>
                <h3 className="mb-0 fw-semi-bold fs-4">
                  <ContextAwareToggle eventKey={item.id}>
                    {item.title}
                  </ContextAwareToggle>
                </h3>
              </ListGroup.Item>
              <Accordion.Collapse eventKey={item.id}>
                <div
                  className={`bg-white py-3 fs-4 ${
                    itemClass ? itemClass : "px-4"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: item.content,
                  }}
                ></div>
              </Accordion.Collapse>
            </Fragment>
          ))}
        </ListGroup>
      </Accordion>
    </Fragment>
  );
};

export default GKAccordionPlus;
