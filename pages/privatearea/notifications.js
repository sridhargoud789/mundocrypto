// import node module libraries
import { useRouter } from "next/router";

// import profile layout wrapper
import ProfileLayout from "layouts/marketing/student/ProfileLayout";
import i18 from "../../next-i18next.config";
// import widget/custom components
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ACNotificationsPage, GeeksSEO } from "widgets";

const Notifications = () => {
  const location = useRouter();
  return (
    <ProfileLayout pathpara={location.pathname}>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Notifications | MundoCrypto" />

      <ACNotificationsPage />
    </ProfileLayout>
  );
};

export default Notifications;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
