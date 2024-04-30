// import node module libraries
import { Fragment } from "react";
import Link from "next/link";
import { Row, Col, Image, Container, Card, Badge } from "react-bootstrap";

// import MDI icons
import Icon from "@mdi/react";
import {
  mdiFacebook,
  mdiTwitter,
  mdiYoutube,
  mdiLinkVariant,
  mdiInstagram,
} from "@mdi/js";

const ProfileCoverFull = ({ dashboardData }) => {
  return (
    <Fragment>
      {/* Bg */}
      <div
        className="py-20"
        style={{
          background: `url('/images_optimized/background/profile-bg.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      ></div>
      {/* User info */}
      <Card className="p-lg-2 pt-2 pt-lg-0 rounded-0 border-0">
        <Container>
          <Row className="align-items-center">
            <Col lg={8} md={8} sm={12}>
              <div className="d-flex align-items-center">
                <div className="position-relative mt-n9">
                  <Image
                    src={dashboardData.avatar}
                    alt=""
                    className="rounded-circle avatar-xxl border-white border border-4 position-relative"
                  />
                  {dashboardData.verified ? (
                    <Link href="#">
                      <a
                        className="position-absolute top-0 end-0 me-2"
                        data-bs-toggle="tooltip"
                        data-placement="top"
                        title="Verified"
                      >
                        <Image
                          src="/images_optimized/svg/checked-mark.svg"
                          alt=""
                          height="30"
                          width="30"
                        />
                      </a>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
                <div className="ms-3">
                  <div className="d-flex align-items-center">
                    <h3 className="mb-0 fw-bold me-2">{dashboardData.name}</h3>
                    <Badge
                      bg="secondary"
                      className="bg-light-primary text-primary"
                    >
                      {dashboardData.badge}
                    </Badge>
                  </div>
                  <span className="fs-6">{dashboardData.skills}</span>
                </div>
              </div>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <div className="fs-4 mt-4 mt-lg-0 pb-2 pb-lg-0 d-lg-flex justify-content-end">
                <Link href={dashboardData.youtube}>
                  <a>
                    <Icon
                      path={mdiYoutube}
                      size={0.6}
                      className="text-muted me-2"
                    />
                  </a>
                </Link>
                <Link href={dashboardData.link}>
                  <a>
                    <Icon
                      path={mdiLinkVariant}
                      size={0.6}
                      className="text-muted me-2"
                    />
                  </a>
                </Link>
                <Link href={dashboardData.instagram}>
                  <a>
                    <Icon
                      path={mdiInstagram}
                      size={0.6}
                      className="text-muted me-2"
                    />
                  </a>
                </Link>
                <Link href={dashboardData.facebook}>
                  <a>
                    <Icon
                      path={mdiFacebook}
                      size={0.6}
                      className="text-muted me-2"
                    />
                  </a>
                </Link>
                <Link href={dashboardData.twitter}>
                  <a>
                    <Icon
                      path={mdiTwitter}
                      size={0.6}
                      className="text-muted me-2"
                    />
                  </a>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </Card>
    </Fragment>
  );
};

export default ProfileCoverFull;
