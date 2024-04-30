import { Fragment } from "react";

// import sub components
import NavbarTop from "./NavbarTop";

const DashboardIndex = (props) => {
  return (
    <Fragment>
      <NavbarTop />
      {props.children}
    </Fragment>
  );
};
export default DashboardIndex;
