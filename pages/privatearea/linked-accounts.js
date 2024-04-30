// import node module libraries
import Link from "next/link";
import { Card } from "react-bootstrap";

// import MDI icons
import { mdiFacebook, mdiGithub, mdiGoogle, mdiTwitter } from "@mdi/js";
import Icon from "@mdi/react";
import i18 from "../../next-i18next.config";
// import widget/custom components
import { GeeksSEO } from "widgets";

// import profile layout wrapper
import ProfileLayout from "layouts/marketing/student/ProfileLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const LinkedAccounts = () => {
  return (
    <ProfileLayout>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Linked Accounts | MundoCrypto" />

      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Linked Accounts</h3>
            <p className="mb-0">
              You can link your social accounts into your geeks accounts & also
              access your history of linked accounts and manage your accounts in
              this sections.
            </p>
          </div>
        </Card.Header>

        {/*  Card body  */}
        <Card.Body>
          <div className="mb-5 d-md-flex">
            {/*  facebook  */}
            <div>
              <Icon
                path={mdiFacebook}
                className="me-3 h1 color-facebook "
                size={1.4}
              />
            </div>
            <div className="mt-1">
              <h3 className="mb-0">Facebook</h3>
              <p>
                Enable one-click login and receive more personalized course
                recommendations.
              </p>
              <Link href="#">
                <a className="btn btn-primary btn-sm">
                  Remove my Facebook Account
                </a>
              </Link>
            </div>
          </div>
          {/*  Google  */}
          <div className="mb-5 d-md-flex border-top pt-5">
            <div>
              <Icon
                path={mdiGoogle}
                className="me-3 h1 color-google "
                size={1.4}
              />
            </div>
            <div className="mt-1">
              <h3 className="mb-0">Google</h3>
              <p>
                Enable one-click login and receive more personalized course
                recommendations.
              </p>
              <Link href="#">
                <a className="btn btn-outline-secondary btn-sm">
                  Link my Google Account
                </a>
              </Link>
            </div>
          </div>

          {/*  github  */}
          <div className="mb-5 d-md-flex border-top pt-5">
            <div>
              <Icon
                path={mdiGithub}
                className="me-3 h1 color-github "
                size={1.4}
              />
            </div>
            <div className="mt-1">
              <h3 className="mb-0">Github</h3>
              <p>
                Enable one-click login and receive more personalized course
                recommendations.
              </p>
              <Link href="#">
                <a className="btn btn-outline-secondary btn-sm">
                  Link my Github Account
                </a>
              </Link>
            </div>
          </div>

          {/*  twitter  */}
          <div className="mb-5 d-md-flex border-top pt-5">
            <div>
              <Icon
                path={mdiTwitter}
                className="me-3 h1 color-twitter "
                size={1.4}
              />
            </div>
            <div className="mt-1">
              <h3 className="mb-0">Twitter</h3>
              <p>
                Enable one-click login and receive more personalized course
                recommendations.
              </p>
              <Link href="#">
                <a className="btn btn-outline-secondary btn-sm">
                  Link my Twitter Account
                </a>
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </ProfileLayout>
  );
};

export default LinkedAccounts;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
