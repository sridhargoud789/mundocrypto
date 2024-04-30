// import node module libraries
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
// import MDI icons
import { useMediaQuery } from "react-responsive";

const FooterWithSocialIcons = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <Row
      className="mx-0 text-white"
      style={{ backgroundColor: "rgba(28, 29, 31, 1)" }}
    >
      <Col xl={{ offset: 1, span: 10 }} lg={12} md={12}>
        <Row className="align-items-center g-0 border-top py-2">
          <Col
            md={2}
            xl={2}
            lg={2}
            xs={12}
            className="d-flex justify-content-center"
          >
            <p className="mb-0">©MundoCrypto 2023</p>
          </Col>
          <Col md={10} xl={10} lg={10} xs={12}>
            <nav className="nav nav-footer justify-content-center justify-content-md-end">
              <Link href="/LegalNotice">
                <a className="nav-link active ps-0 text-white">
                  {t("footer.legal_notice")}
                </a>
              </Link>
              <Link href="/CookiesPolicy">
                <a className="nav-link text-white">
                  {t("footer.cookies_policy")}
                </a>
              </Link>
              <Link href="/PrivacyPolicy">
                <a className="nav-link text-white">
                  {t("footer.privacy_policy")}
                </a>
              </Link>
              <Link href="/NoInvitationToInvest">
                <a className="nav-link text-white">
                  {t("footer.no_invitation_to_invest")}
                </a>
              </Link>
              <Link href="/TermsandConditions">
                <a className="nav-link text-white">
                  {t("footer.terms_and_conditions")}
                </a>
              </Link>
            </nav>
          </Col>
        </Row>
        {/* <Row>
          <Col md={8}></Col>
          <Col
            md={6}
            xl={4}
            lg={4}
            xs={12}
            className={`d-flex justify-content-${
              isDesktop || isLaptop ? "end" : "center"
            }`}
          >
            <Link href="https://www.youtube.com/channel/UCCcdO0Dn_6sG_C8bGsweLOQ">
              <a className="text-muted text-primary-hover me-3" target="_blank">
                <Icon path={mdiYoutube} size={1} />
              </a>
            </Link>
            <Link href="https://www.facebook.com/mundocryptooficial/">
              <a className="text-muted text-primary-hover me-3" target="_blank">
                <Icon path={mdiFacebook} size={1} />
              </a>
            </Link>
            <Link href="https://twitter.com/MundoCrypto_ES">
              <a className="text-muted text-primary-hover me-3" target="_blank">
                <Icon path={mdiTwitter} size={1} />
              </a>
            </Link>

            <Link href="https://www.linkedin.com/school/mundocryptoacademy/">
              <a className="text-muted text-primary-hover me-3" target="_blank">
                <Icon path={mdiLinkedin} size={1} />
              </a>
            </Link>

            <Link href="https://www.instagram.com/mundocryptooficial/">
              <a className="text-muted text-primary-hover me-3" target="_blank">
                <Icon path={mdiInstagram} size={1} />
              </a>
            </Link>

            <Link href="https://discord.gg/mundocryptocommunity">
              <a
                className="text-muted text-primary-hover me-3"
                style={{ marginTop: "-0.8rem", marginLeft: "-0.5rem" }}
                target="_blank"
              >
                <img
                  className="text-muted text-primary-hover "
                  src="/images_optimized/discord.svg"
                  width={50}
                />
              </a>
            </Link>
          </Col>
        </Row> */}
      </Col>
    </Row>
  );
};
export default FooterWithSocialIcons;
