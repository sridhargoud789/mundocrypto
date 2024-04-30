// import node module libraries
import Link from "next/link";
import { useRef } from "react";
import { Card } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import i18 from "../../next-i18next.config";
// import widget/custom components
import { GeeksSEO } from "widgets";

// import sub components
import PrintInvoiceDetails from "./PrintInvoiceDetails";

// import profile layout wrapper
import ProfileLayout from "layouts/marketing/student/ProfileLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const InvoiceDetails = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <ProfileLayout>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Invoice Details | MundoCrypto" />

      <Card>
        <Link href="#">
          <a
            className="text-muted print-link no-print text-end me-5 mt-3 "
            onClick={handlePrint}
          >
            <i className="fe fe-printer"></i> Print
          </a>
        </Link>
        <PrintInvoiceDetails ref={componentRef} />
      </Card>
    </ProfileLayout>
  );
};

export default InvoiceDetails;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
