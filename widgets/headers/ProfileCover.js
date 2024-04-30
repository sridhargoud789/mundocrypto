// import node module libraries
import Link from "next/link";
import { Col, Image, Row } from "react-bootstrap";

// import custom components
import LevelIconWithTooltip from "widgets/miscellaneous/LevelIcon";

const ProfileCover = ({ dashboardData }) => {
  return (
    <Row className="align-items-center">
      <Col xl={12} lg={12} md={12} sm={12}>
        {/* <!-- Bg --> */}
        <div
          className="pt-16 rounded-top-md"
          style={{
            background: `url('/images_optimized/background/profile-bg.jpg')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {" "}
        </div>
        <div className="d-flex align-items-end justify-content-between bg-white px-4 pt-2 pb-4 rounded-none rounded-bottom-md shadow-sm">
          <div className="d-flex align-items-center">
            <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
              <Image
                src={dashboardData.avatar}
                className="avatar-xl rounded-circle border border-4 border-white position-relative"
                alt=""
              />
              {dashboardData.verified ? (
                <Link href="#">
                  <a
                    className="position-absolute top-0 end-0"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-original-title="Verified"
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
            <div className="lh-1">
              <h2 className="mb-0">
                {dashboardData.name}{" "}
                <LevelIconWithTooltip level={dashboardData.level} />{" "}
              </h2>
              <p className="mb-0 d-block">{dashboardData.username}</p>
            </div>
          </div>
          {/* <div>
						<Link href={dashboardData.link}>
							<a className={`btn btn${dashboardData.outlinebutton ? '-outline' : ''
								}-primary btn-sm d-none d-md-block`}
							>
								{dashboardData.linkname}
							</a>
						</Link>
					</div> */}
        </div>
      </Col>
    </Row>
  );
};

export default ProfileCover;
