// import node module libraries
import Link from "next/link";
import { Col, Image, Row } from "react-bootstrap";

const NavbarBrandOnly = () => {
  return (
    <Row>
      <Col xl={{ offset: 1, span: 2 }} lg={12} md={12}>
        <div className="mt-4">
          <Link href="/" passHref>
            <a>
              <Image
                src="/images_optimized/mc_black_blue.png"
                alt=""
                style={{ width: "160px" }}
              />
            </a>
          </Link>
        </div>
      </Col>
    </Row>
  );
};
export default NavbarBrandOnly;
