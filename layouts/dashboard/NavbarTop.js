// import node module libraries
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Container, NavDropdown, Navbar, ProgressBar } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
// import simple bar scrolling used for notification item scrolling
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { courseInitObject } from "services/states";
import "simplebar/dist/simplebar.min.css";
import { Ratings } from "widgets";
const NavbarTop = (props) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const router = useRouter();
  const ciObj = useRecoilValue(courseInitObject);

  return (
    <Fragment>
      <Navbar expand="md" className="navbar-default py-2 courseresumeHeader">
        <Container fluid="lg" className="">
          {isMobile && (
            <Navbar.Text className="mb-1">
              <Link href="/MyLearnings">
                <a>
                  <i className="fe fe-arrow-left text-white"></i>
                  &nbsp;&nbsp;
                </a>
              </Link>
            </Navbar.Text>
          )}
          <Navbar.Text className="me-auto">
            <h3 className={`cr-navtitle${isMobile ? "_mobile" : ""}`}>
              {props.name}
            </h3>
          </Navbar.Text>
          {!isMobile && (
            <>
              <Navbar className="">
                <span className="text-warning">
                  <span className="mt-2">
                    <Ratings rating={5} starSize="20px" />
                  </span>
                  &nbsp;
                  <span
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    5.0
                  </span>
                </span>
              </Navbar>
              <Navbar.Text>
                <h3 className="cr-navprogressddl mt-2">Clasificaciones</h3>
              </Navbar.Text>
              <Navbar>
                <NavDropdown
                  className={`me-2 cr-navprogressddl`}
                  title={
                    <>
                      <span
                        className={`icon-shape cr-navprogresscircle  icon-sm rounded-circle me-2`}
                      >
                        <img
                          src="/images_optimized/myprogressbadge.png"
                          width={20}
                        />
                      </span>
                      &nbsp;
                      <span className="cr-navprogressddl">Tu progreso</span>
                    </>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item>
                    <ProgressBar
                      variant="success"
                      className="mb-2 progress "
                      now={props.progress}
                      style={{ height: "6px" }}
                    />
                    <small>{props.progress}% completado</small>
                  </NavDropdown.Item>
                </NavDropdown>
              </Navbar>
              {/* <Navbar>
                <Button variant="outline-light" size="sm">
                  Compartir &nbsp;
                  <Icon path={mdiShare} size={0.8} />
                </Button>{" "}
              </Navbar> */}
            </>
          )}
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default NavbarTop;
