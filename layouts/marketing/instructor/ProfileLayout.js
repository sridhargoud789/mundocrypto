// import node module libraries
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";

// import widget/custom components
import { ProfileCover } from "widgets";

// import routes file
import {
  AccountSettingsMenu,
  DashboardMenu,
} from "routes/marketing/InstructorDashboard";

const ProfileLayout = (props) => {
  const location = useRouter();
  useEffect(() => {
    document.body.style.backgroundColor = "#f5f4f8";
  });

  const dashboardData = {
    avatar: "/images_optimized/avatar/defaultuser.png",
    name: "Jenny Wilson",
    username: "@Jennywilson",
    linkname: "Create New Course",
    link: "/marketing/instructor/add-new-course/",
  };

  return (
    <Fragment>
      <div className="pt-5 pb-5">
        <Container>
          {/* User info */}
          <ProfileCover dashboardData={dashboardData} />

          {/* Content */}
          <Row className="mt-0 mt-md-4">
            <Col lg={3} md={4} sm={12}>
              <Navbar
                expand="lg"
                className="navbar navbar-expand-md navbar-light shadow-sm mb-4 mb-lg-0 sidenav"
              >
                <Link href="#">
                  <a className="d-xl-none d-lg-none d-md-none text-inherit fw-bold fs-5 float-start py-1">
                    Menu
                  </a>
                </Link>
                <Navbar.Toggle
                  aria-controls="basic-navbar-nav"
                  className="p-0 focus-none border-0"
                  label="Responsive Menu"
                >
                  <span
                    className="navbar-toggler d-md-none icon-shape icon-sm rounded bg-primary p-0 text-white float-end"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidenav"
                    aria-controls="sidenav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="fe fe-menu"></span>
                  </span>
                </Navbar.Toggle>

                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto flex-column" as="ul">
                    <Nav.Item className="navbar-header" as="li">
                      Dashboard
                    </Nav.Item>
                    {DashboardMenu.map((item, index) => (
                      <Nav.Item
                        as="li"
                        key={index}
                        className={`${
                          item.link === location.pathname ? "active" : ""
                        }`}
                      >
                        <Link href={item.link}>
                          <a className="nav-link">
                            <i className={`fe fe-${item.icon} nav-icon`}></i>
                            {item.title}
                          </a>
                        </Link>
                      </Nav.Item>
                    ))}
                    <Nav.Item className="navbar-header mt-4" as="li">
                      ACCOUNT SETTINGS
                    </Nav.Item>
                    {AccountSettingsMenu.map((item, index) => (
                      <Nav.Item
                        as="li"
                        key={index}
                        className={`${
                          item.link === location.pathname ? "active" : ""
                        }`}
                      >
                        <Link href={item.link}>
                          <a className="nav-link">
                            <i className={`fe fe-${item.icon} nav-icon`}></i>
                            {item.title}
                          </a>
                        </Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>

            <Col lg={9} md={8} sm={12}>
              {props.children}
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};
export default ProfileLayout;
