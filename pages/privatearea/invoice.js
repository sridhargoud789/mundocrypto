// import node module libraries
import Link from "next/link";
import { Badge, Card, Table } from "react-bootstrap";

// import widget/custom components
import { GeeksSEO } from "widgets";
import i18 from "../../next-i18next.config";
// import data files
import InvoiceData from "data/student/InvoiceData";

// import profile layout wrapper
import ProfileLayout from "layouts/marketing/student/ProfileLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Invoice = () => {
  return (
    <ProfileLayout>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Invoice | MundoCrypto" />

      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Invoices</h3>
            <p className="mb-0">You can find all of your order Invoices.</p>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          {/* Table */}
          <div className="table-invoice table-responsive border-0">
            <Table className="table mb-0 text-nowrap">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="border-bottom-0">
                    ORDER ID
                  </th>
                  <th scope="col" className="border-bottom-0">
                    DATE
                  </th>
                  <th scope="col" className="border-bottom-0">
                    AMOUNT
                  </th>
                  <th scope="col" className="border-bottom-0">
                    STATUS
                  </th>
                  <th scope="col" className="border-bottom-0"></th>
                </tr>
              </thead>
              <tbody>
                {InvoiceData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Link href="/privatearea/invoice-details">
                        <a>#{item.id}</a>
                      </Link>
                    </td>
                    <td>{item.invoicedate}</td>
                    <td>{item.amount}</td>
                    <td>
                      <Badge bg={item.status === "Due" ? "danger" : "success"}>
                        {item.status}
                      </Badge>
                    </td>
                    <td>
                      <Link href={item.pdf}>
                        <a
                          target="_blank"
                          className="fe fe-download"
                          download
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </ProfileLayout>
  );
};

export default Invoice;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
