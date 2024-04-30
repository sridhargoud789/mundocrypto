// import node module libraries

import { Fragment, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import i18 from "../next-i18next.config";

// import widget/custom components
import { GeeksSEO } from "widgets";
// import data files
import LegalNotice_EN from "components/LegalNotice/en";
import LegalNotice_ES from "components/LegalNotice/es";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const LegalNotice = ({ pagedata }) => {
  const { locale: activeLocale, locales, asPath } = useRouter();

  useEffect(() => {
    document.body.style.backgroundColor = "#f5f4f8";
  });

  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Legal Notice | MundoCrypto" />

      <div className="pt-5 pb-5">
        <Container>
          {/* User info */}
          <Row className="mt-0 mt-md-4">
            {activeLocale === "es" ? <LegalNotice_ES /> : <LegalNotice_EN />}
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};
export default LegalNotice;

export async function getStaticProps({ locale }) {
  const language = locale.toUpperCase();

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
