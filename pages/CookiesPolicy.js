// import node module libraries

import { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import i18 from "../next-i18next.config";

// import widget/custom components
import { GeeksSEO } from "widgets";
// import data files
import Cookies_Policies_EN from "components/CookiesPolicies/en";
import Cookies_Policies_ES from "components/CookiesPolicies/es";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const CookiesPolicy = ({ pagedata }) => {
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
  const { t } = useTranslation();
  const { locale: activeLocale, locales, asPath } = useRouter();

  useEffect(() => {
    document.body.style.backgroundColor = "#f5f4f8";
  });

  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Cookies Policy | MundoCrypto" />

      <div className="pt-5 pb-5">
        <Container>
          {activeLocale === "es" ? (
            <Cookies_Policies_ES />
          ) : (
            <Cookies_Policies_EN />
          )}
        </Container>
      </div>
    </Fragment>
  );
};
export default CookiesPolicy;

export async function getStaticProps({ locale }) {
  const language = locale.toUpperCase();

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
