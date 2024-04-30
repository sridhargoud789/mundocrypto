import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import Courses from "../components/Course/Courses";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import AcademicModel from "../components/Home/AcademicModel";
import BecomeInstructor from "../components/Home/BecomeInstructor";
import FAQS from "../components/Home/FAQS";
import HomeHeader from "../components/Home/HomeHeader";
import SubHeader from "../components/Home/SubHeader";
import Testimonials from "../components/Home/Testimonials";
import TrustedBy from "../components/Home/TrustedBy";

const Home = () => {
  return (
    <>
      <Header />
      <SubHeader />
      <main>
        <section className="py-5  container">
          <HomeHeader />
          <Courses title="Let´s start learning today" key={"0"} />
          <Row className="py-5">
            <Col>
              <Testimonials />
            </Col>
          </Row>
          <Row className="py-5">
            <Col>
              <BecomeInstructor />
            </Col>
          </Row>
          <Row className="py-5">
            <Col>
              <Courses title="Popular for aspiring Cryptousers" key={"1"} />
            </Col>
          </Row>
          <Row>
            <Col>
              <TrustedBy />
            </Col>
          </Row>
          <Row>
            <Col>
              <AcademicModel />
            </Col>
          </Row>
          <Row className="py-5">
            <Col>
              <Courses title="Popular for aspiring Cryptousers" key={"2"} />
            </Col>
          </Row>
          <FAQS />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
