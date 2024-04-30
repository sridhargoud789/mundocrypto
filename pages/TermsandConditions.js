// import node module libraries

import { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import i18 from "../next-i18next.config";

// import widget/custom components
import { GeeksSEO } from "widgets";
// import data files
import TermsandConditions_EN from "components/TermsandConditions/en";
import TermsandConditions_ES from "components/TermsandConditions/es";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const TermsandConditions = ({ pagedata }) => {
  const dashboardData = {
    avatar: "/images_optimized/avatar/defaultuser.png",
    name: "User",
    username: "@User",
    linkname: "Account Setting",
    link: "/privatearea/edit-profile",
    verified: false,
    outlinebutton: false,
    level: "Beginner",
  };
  const { locale: activeLocale, locales, asPath } = useRouter();
  useEffect(() => {
    document.body.style.backgroundColor = "#f5f4f8";
  });

  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Terms and Conditions | MundoCrypto" />

      <div className="pt-5 pb-5">
        <Container>
          {/* User info */}

          {activeLocale === "es" ? (
            <TermsandConditions_ES />
          ) : (
            <TermsandConditions_EN />
          )}
        </Container>
      </div>
    </Fragment>
  );
};
export default TermsandConditions;

export async function getStaticProps({ locale }) {
  const language = locale.toUpperCase();

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
