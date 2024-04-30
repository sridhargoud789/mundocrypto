// import node module libraries
import { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import i18 from "../next-i18next.config";

// import widget/custom components
import { GeeksSEO } from "widgets";

// import widget/custom components

// import sub components
// import PopularInstructorCard from './PopularInstructorCard';
// import sub components
import { useRouter } from "next/router";

// import data files
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useTranslation } from "react-i18next";

const Jobs = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [obj, setOBJ] = useState([]);
  const [catName, setCatName] = useState("");

  useEffect(() => {
    setIsLoading(true);
    pageLoad();
  }, [router]);

  const pageLoad = async () => {
    const { category } = router.query;
  };
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title={`Jobs | MundoCrypto`} />

      {/* Page header */}

      <div className="pt-6 pb-6 divJobs" style={{ backgroundColor: "#F9F9F9" }}>
        <Container fluid>
          <iframe
            src="https://app.hirevibes.io/widget/faa205f6-0747-44fd-86dd-0f6be3da60e9"
            title="mundocrypto"
            id="myIframe"
            frameBorder="0"
            width="100%"
            height="1000"
            data-gtm-yt-inspected-6="true"
          ></iframe>
        </Container>
      </div>
    </Fragment>
  );
};

export default Jobs;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
