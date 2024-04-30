import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import CourseDetails from "../components/course/details";
import i18 from "../next-i18next.config";

const CourseDetail = (props) => {
  const router = useRouter();

  const [courseId, setcourseId] = useState(50);
  const [cdOBJ, setcdOBJ] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Fragment>
      {courseId !== 0 && <CourseDetails courseId={`${courseId}`} />}
    </Fragment>
  );
};
export default CourseDetail;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
