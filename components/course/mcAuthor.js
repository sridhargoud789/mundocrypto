import Link from "next/link";
import { Card, Col, Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const MCAuthor = () => {
  const { t } = useTranslation();

  return (
    <Card>
      {/* Card body */}
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="position-relative">
            <Image
              src="/images_optimized/mclogo_price.svg"
              alt=""
              className="rounded-circle avatar-xl"
            />
            <Link href="#">
              <a
                className="position-absolute mt-2 ms-n3"
                data-bs-toggle="tooltip"
                data-placement="top"
                title="Verifed"
              >
                <Image
                  src="/images_optimized/svg/checked-mark.svg"
                  alt=""
                  height="30"
                  width="30"
                />
              </a>
            </Link>
          </div>
          <div className="ms-4">
            <h4 className="mb-0 cd-authorTitle">MundoCrypto Academy</h4>
            <p className="mb-1 cd-authorSubTitle">{t("pages.crypto_web3")}</p>
            <span className="cd-authorSubTitle">
              <span className="text-warning">4.5</span>
              <span className="mdi mdi-star text-warning me-2"></span>
              {t("pages.ratings")}
            </span>
          </div>
        </div>
        <Row className="border-top mt-3 border-bottom mb-3 g-0">
          <Col>
            <div className="pe-1 ps-2 py-3">
              <h5 className="mb-0 cd-authorCounts">57.000</h5>
              <span>{t("pages.students")}</span>
            </div>
          </Col>
          <Col className="border-start">
            <div className="pe-1 ps-3 py-3">
              <h5 className="mb-0 cd-authorCounts">32</h5>
              <span>Cursos</span>
            </div>
          </Col>
          <Col className="border-start">
            <div className="pe-1 ps-3 py-3">
              <h5 className="mb-0 cd-authorCounts">1321</h5>
              <span>Reviews</span>
            </div>
          </Col>
        </Row>
        <p className="cd-authorDesc">{t("pages.mundo_desc")}</p>
      </Card.Body>
    </Card>
  );
};
export default MCAuthor;
