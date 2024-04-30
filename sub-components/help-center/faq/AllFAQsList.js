// import node module libraries
import { Col, Container, Row } from "react-bootstrap";

// import widget/custom components
import { GKAccordionBox } from "widgets";

// import data files
import {
  GeneralInquiriesFAQs,
  MostAskedFAQs,
  SupportFAQs,
} from "data/marketing/help-center/HelpCenterFAQsData";

const AllFAQsList = () => {
  return (
    <div className="py-10">
      <Container>
        {/* most asked faqs accordion  */}
        <Row>
          <Col md={{ offset: 2, span: 8 }} xs={12}>
            <div className="mb-4">
              <h2 className="mb-0 fw-semi-bold">Most asked</h2>
            </div>
            <GKAccordionBox
              accordionItems={MostAskedFAQs}
              item
              className="px-0"
            />
          </Col>
        </Row>

        {/* general inquiries faqs accordion  */}
        <Row>
          <Col md={{ offset: 2, span: 8 }} xs={12}>
            <div className="mb-4 mt-6">
              <h2 className="mb-0 fw-semi-bold">General inquiries</h2>
            </div>
            <GKAccordionBox
              accordionItems={GeneralInquiriesFAQs}
              item
              className="px-0"
            />
          </Col>
        </Row>

        {/* support faqs accordion  */}
        <Row>
          <Col md={{ offset: 2, span: 8 }} xs={12}>
            <div className="mb-4 mt-6">
              <h2 className="mb-0 fw-semi-bold">Support</h2>
            </div>
            <GKAccordionBox
              accordionItems={SupportFAQs}
              item
              className="px-0"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default AllFAQsList;
