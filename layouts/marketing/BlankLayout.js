// import node module libraries
import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import { Fragment } from "react";

const BlankLayout = (props) => {
  return (
    <Fragment>
      <NavbarDefault />
      {props.children}
    </Fragment>
  );
};

export default BlankLayout;
