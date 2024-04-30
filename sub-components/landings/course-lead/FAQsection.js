// import node module libraries
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
// import widget/custom components
import { GKAccordionPlus } from "widgets";
// import data files

const FAQsection = ({ data }) => {
  const { t } = useTranslation();
  const faqlst1 = [
    {
      id: 1,
      title: t("home_page.homepageFaq.faq1.title"),
      content: t("home_page.homepageFaq.faq1.description"),
    },
    {
      id: 2,
      title: t("home_page.homepageFaq.faq2.title"),
      content: t("home_page.homepageFaq.faq2.description"),
    },
    {
      id: 3,
      title: t("home_page.homepageFaq.faq3.title"),
      content: t("home_page.homepageFaq.faq3.description"),
    },
    {
      id: 4,
      title: t("home_page.homepageFaq.faq4.title"),
      content: t("home_page.homepageFaq.faq4.description"),
    },
  ];
  const faqlst2 = [
    ,
    {
      id: 5,
      title: t("home_page.homepageFaq.faq5.title"),
      content: t("home_page.homepageFaq.faq5.description"),
    },
    {
      id: 6,
      title: t("home_page.homepageFaq.faq6.title"),
      content: t("home_page.homepageFaq.faq6.description"),
    },
    {
      id: 7,
      title: t("home_page.homepageFaq.faq7.title"),
      content: t("home_page.homepageFaq.faq7.description"),
    },
    {
      id: 8,
      title: t("home_page.homepageFaq.faq8.title"),
      content: t("home_page.homepageFaq.faq8.description"),
    },
  ];
  return (
    <div className="py-12 py-lg-6 bg-white">
      <Container fluid>
        <Row>
          <Col md={{ span: 10, offset: 1 }} sm={12}>
            <div className="mb-5">
              <h1 className="mb-1 text-center h1titles">
                {t("home_page.homepageFaq.faqTitle")}
              </h1>
              <p className="mb-0 h1SubTitles">
                {t("home_page.homepageFaq.faqSubTitle")}
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={6} md={6} sm={12}>
            <GKAccordionPlus accordionItems={faqlst1} item className="px-0" />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <GKAccordionPlus accordionItems={faqlst2} item className="px-0" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default FAQsection;
