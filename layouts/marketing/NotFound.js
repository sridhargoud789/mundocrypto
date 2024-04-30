// import node module libraries
import { useEffect } from "react";
import { Container } from "react-bootstrap";

// import layouts
import NavbarBrandOnly from "layouts/marketing/navbars/NavbarBrandOnly";

const NotFound = (props) => {
  useEffect(() => {
    document.body.style.backgroundColor = "white";
  });

  return (
    <div id="db-wrapper" className="bg-white">
      <Container className="d-flex flex-column">
        <NavbarBrandOnly />
        {props.children}
        {/* <FooterWithLinks /> */}
      </Container>
    </div>
  );
};

export default NotFound;
