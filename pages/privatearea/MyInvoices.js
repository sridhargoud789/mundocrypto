// import node module libraries
import { Card, Col, Row, Table } from "react-bootstrap";

// import widget/custom components
import { useMediaQuery } from "react-responsive";
import { GeeksSEO } from "widgets";
import i18 from "../../next-i18next.config";

// import profile layout wrapper
import LoadingSpinner from "components/bootstrap/loadingspinner";
import ProfileLayout from "layouts/marketing/student/ProfileLayout";
import moment from "moment";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getMyInvoices } from "services/nodeapi";
import Swal from "sweetalert2";

const style = {
  height: 200,
};
const MyInvoices = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    pageLoad();
  }, []);

  const pageLoad = async () => {
    setIsLoading(true);
    try {
      const resp = await getMyInvoices();

      if (resp.status === 200) {
        setInvoices(resp.data.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error occured",
        text: "Please try again after sometime.",
      }).then((result) => {
        //  router.push("/");
      });
    }
  };

  return (
    <ProfileLayout>
      {/* Geeks SEO settings  */}
      <GeeksSEO title={`My ${t("invoices")} | MundoCrypto`} />
      <LoadingSpinner showLoading={isLoading} />

      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">My {t("invoices")}</h3>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <Table striped hover className="noTableBG">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Course Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Invoice</th>
                <th scope="col">Created On</th>
              </tr>
            </thead>
            <tbody>
              {invoices &&
                invoices.map((d, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{d.course_name}</td>
                    <td>${d.amount}</td>
                    <td>
                      <a
                        href={d.invoice_pdf_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        view / download
                      </a>
                    </td>
                    <td>{moment(d.created_at).format("DD-MMM-YYYY")}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Row>
        <Col></Col>
      </Row>
    </ProfileLayout>
  );
};

export default MyInvoices;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
