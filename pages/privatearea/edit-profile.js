// import node module libraries
import { useRouter } from "next/router";

// import profile layout wrapper
import ProfileLayout from "layouts/marketing/student/ProfileLayout";

// import widget/custom components
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ACEditProfilePage, GeeksSEO } from "widgets";
import i18 from "../../next-i18next.config";
const EditProfile = () => {
  const location = useRouter();
  return (
    <ProfileLayout>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Profile Edit | MundoCrypto" />

      <ACEditProfilePage />
    </ProfileLayout>
  );
};

export default EditProfile;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
