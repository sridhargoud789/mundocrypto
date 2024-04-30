// import node module libraries
import { Fragment } from "react";

// import layouts
import { Box } from "@mui/material";
import ContactUsFloating from "components/bootstrap/ContactUsFloating";
import RewardsFloating from "components/bootstrap/RewardsFloating";
import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import _ from "lodash";
import { useRecoilValue } from "recoil";
import { userObject } from "services/states";
import FooterWithLinks from "./footers/FooterWithLinks";
import FooterWithSocialIcons from "./footers/FooterWithSocialIcons";

const DefaultLayout = (props) => {
  const userObj = useRecoilValue(userObject);

  return (
    <Fragment>
      <NavbarDefault />
      {props.children}
      <FooterWithLinks />
      <FooterWithSocialIcons />
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <ContactUsFloating />
        {false && !_.isEmpty(userObj) && <RewardsFloating />}
      </Box>
    </Fragment>
  );
};

export default DefaultLayout;
