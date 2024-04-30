// import node module libraries
import Link from "next/link";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";

// import layouts
import DocumentMenu from "layouts/marketing/navbars/DocumentMenu";

// import data files
import NavDropdownMain from "layouts/marketing/navbars/NavDropdownMain";
import NavbarDefaultRoutes from "routes/marketing/NavbarDefault";

// import hooks
import useMounted from "hooks/useMounted";

const NavbarLanding = ({ transparent }) => {
  const [expandedMenu, setExpandedMenu] = useState(false);
  const hasMounted = useMounted();

  return (
    <Fragment>
      <Navbar
        onToggle={(collapsed) => setExpandedMenu(collapsed)}
        expanded={expandedMenu}
        expand="lg"
        className={`navbar navbar-default shadow-none ${
          transparent ? "navbar-transparent" : ""
        }`}
      >
        <Container className="px-0">
          <Navbar.Brand as={Link} href="/">
            <a className="navbar-brand">
              <Image src="/images_optimized/mc_black_blue.png" alt="" />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="icon-bar top-bar mt-0"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              {NavbarDefaultRoutes.slice(1, 4).map((item, index) => {
                if (item.children === undefined) {
                  return (
                    <Nav.Link key={index} as={Link} href={item.link}>
                      <a>{item.menuitem}</a>
                    </Nav.Link>
                  );
                } else if (hasMounted) {
                  return (
                    <NavDropdownMain
                      item={item}
                      key={index}
                      onClick={(value) => setExpandedMenu(value)}
                    />
                  );
                } else {
                  return null;
                }
              })}
              {hasMounted ? <DocumentMenu /> : null}
            </Nav>
            <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
              <div className={`mt-3 mt-lg-0`}>
                <Nav.Link
                  href="https://themes.getbootstrap.com/store/codescandy/"
                  target="_blank"
                  bsPrefix="btn"
                  className="btn btn-primary"
                >
                  Buy Now
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

// Specifies the default values for props
NavbarLanding.defaultProps = {
  transparent: false,
};

// Typechecking With PropTypes
NavbarLanding.propTypes = {
  transparent: PropTypes.bool,
};

export default NavbarLanding;
