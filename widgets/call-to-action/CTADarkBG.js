// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';
import Link from 'next/link';

const CTADarkBG = ({ title, subtitle, description, btntext, btnlink }) => {
	return (
		<div className="py-14 bg-dark">
			<Container>
				<Row>
					<Col
						lg={{ span: 8, offset: 2 }}
						md={12}
						xs={12}
						className="text-center"
					>
						<span className="fs-4 text-warning ls-md text-uppercase fw-semi-bold">
							{subtitle}
						</span>
						{/* heading  */}
						<h2 className="display-3 mt-4 mb-3 text-white fw-bold">{title}</h2>
						{/* para  */}
						<p className="lead text-white-50 px-lg- 8 mb-6">{description}.</p>
						<Link href={btnlink}>
							<a className="btn btn-primary">
								{btntext}
							</a>
						</Link>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
export default CTADarkBG;
