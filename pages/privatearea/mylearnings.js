// import node module libraries
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Card, Col } from "react-bootstrap";
import i18 from "../../next-i18next.config";
// import widget/custom components
import { GeeksSEO } from "widgets";

// import profile layout wrapper
import ProfileLayout from "layouts/marketing/student/ProfileLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Swal from "sweetalert2";
import { CourseCard } from "widgets";
import { getMyCourses } from "../../services/nodeapi";

import { useTranslation } from "react-i18next";

const Subscriptions = () => {
  const { t } = useTranslation("");
  const [AutoRenewalState, setAutoRenewalState] = useState(true);

  const router = useRouter();

  const [clOBJ, setclOBJ] = useState([]);
  const [catOBJ, setCatOBJ] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    pageLoad();
  }, []);

  const pageLoad = async () => {
    setIsLoading(true);
    try {
      const clresp = await getMyCourses();

      if (clresp.status === 200) {
        setclOBJ(clresp.data.list);
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
        router.push("/");
      });
    }
  };
  return (
    <ProfileLayout>
      <GeeksSEO title="MyLearnings | MundoCrypto" />

      <Card className="border-0">
        <Card.Header className="d-lg-flex justify-content-between align-items-center">
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">{t("private_area.my_learnings")}</h3>
          </div>
        </Card.Header>
        <Card.Body>
          {clOBJ &&
            clOBJ.map((item, index) => (
              <Col lg={12} md={12} sm={12} key={index}>
                <CourseCard
                  viewby="list"
                  showprogressbar={true}
                  progress={item.progress}
                  item={item.courseData}
                  isMyCourse={true}
                  purchaseData={item.purchaseData}
                  is_partial_payment={
                    item.purchaseData &&
                    item.purchaseData.is_partial_payment === 1
                      ? true
                      : false
                  }
                />
              </Col>
            ))}
          {clOBJ && clOBJ.length === 0 && (
            <Alert variant="info">
              {t("pages.no_courses_my_learning")}{" "}
              <Link href="/CourseList">{t("pages.no_courses_cart_2")}</Link>
            </Alert>
          )}
        </Card.Body>
      </Card>
    </ProfileLayout>
  );
};

export default Subscriptions;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
