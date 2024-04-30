// import node module libraries
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

const FooterCenter = () => {
	return (
		<div className="py-lg-10 py-5 bg-white">
			<Container>
				<Row className="justify-content-center text-center  ">
					<Col xl={8} md={12} sm={12} className="px-0 ">
						<nav className="nav nav-footer justify-content-center">
							<Link href="#">
								<a className="nav-link">
									About
								</a>
							</Link>
							<Link href="#">
								<a className="nav-link">
									Blog
								</a>
							</Link>
							<Link href="#">
								<a className="nav-link">
									Send feedback
								</a>
							</Link>
							<Link href="#">
								<a className="nav-link">
									Terms & Conditions
								</a>
							</Link>
							<Link href="#">
								<a className="nav-link">
									Get Support
								</a>
							</Link>
						</nav>
					</Col>
					{/*  Desc  */}
					<Col lg={8} md={12} sm={12}>
						<div className="my-6">
							{/* Facebook */}
							<Link href="#!">
								<a className="text-muted me-4">
									<i className="fab fa-facebook fs-3"></i>
								</a>
							</Link>
							{/* Twitter */}
							<Link href="#!">
								<a className="text-muted me-4">
									<i className="fab fa-twitter fs-3"></i>
								</a>
							</Link>
							{/* LinkedIn */}
							<Link href="#!">
								<a className="text-muted me-4">
									<i className="fab fa-linkedin fs-3"></i>
								</a>
							</Link>
							{/* GitHub */}
							<Link href="#!">
								<a className="text-muted me-4">
									<i className="fab fa-github fs-3"></i>
								</a>
							</Link>
							{/* GitHub */}
							<Link href="#!">
								<a className="text-muted">
									<i className="fab fa-twitch fs-3"></i>
								</a>
							</Link>
						</div>
					</Col>
					<Col lg={8} md={12} sm={12}>
						<span>© 2022 Geeks-UI, Inc. All Rights Reserved</span>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default FooterCenter;
