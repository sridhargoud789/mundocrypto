// import node module libraries
import { useRouter } from "next/router";

// import profile layout wrapper
import ProfileLayout from "layouts/marketing/student/ProfileLayout";
import i18 from "../../next-i18next.config";
// import widget/custom components
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ACSocialProfilesPage, GeeksSEO } from "widgets";

const SocialProfiles = () => {
  const location = useRouter();
  return (
    <ProfileLayout>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Social Profiles | MundoCrypto" />

      <ACSocialProfilesPage />
    </ProfileLayout>
  );
};

export default SocialProfiles;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
