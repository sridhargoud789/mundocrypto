// import node module libraries
import { Fragment } from "react";
import { Container } from "react-bootstrap";
import i18 from "../next-i18next.config";

// import widget/custom components
import { GeeksSEO } from "widgets";

// import sub components
import {
  CTAButton,
  FeaturesList,
  HeroContent,
  JustifiedGallery,
  Stat,
  TeamGridRoundImages,
} from "sub-components";

// import layouts
import FooterWithLinks from "layouts/marketing/footers/FooterWithLinks";
import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";

// import your layout to override default layout
import BlankLayout from "layouts/marketing/BlankLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const About = () => {
  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="About us | MundoCrypto" />

      {/* Default Navbar */}
      <NavbarDefault login />

      <div className="py-10 bg-white">
        <Container>
          {/* Hero Title */}
          <HeroContent />

          {/* Justified Gallery Section */}
          <JustifiedGallery />

          {/* 4 Columns Stat */}
          <Stat />
        </Container>
      </div>

      {/* Three Columns Features Section */}
      <FeaturesList />

      {/* Team Section in Rounded Image with Grid Layout */}
      <TeamGridRoundImages />

      {/* Hero Call to Action */}
      <CTAButton />

      {/* Footer with links */}
      <FooterWithLinks />
    </Fragment>
  );
};

About.Layout = BlankLayout;

export default About;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
