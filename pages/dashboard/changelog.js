// import node module libraries
import { Fragment } from 'react';
import { Col, Row, Card } from 'react-bootstrap';

const ChangeLog = () => {

    
const Version_01_00_00 = () => {
	return (
		<Row>
			<Col lg={7} md={12} sm={12}>
				<Card>
					<Card.Body>
						<Row className="g-0">
							<Col lg={3} md={4} sm={12}>
								<div id="initial">
									<h5 className="mb-3 fwsemi--bold">
										<code>v1.0.0</code> - Aug 18, 2022
									</h5>
								</div>
							</Col>
							<Col lg={9} md={8} sm={12}>
								<div>
									<h4 className="mb-1 fw-semi-bold">
										Initial Release of Geeks NextJS
									</h4>
									<p className="mb-0">Geeks theme nextjs version.</p>
								</div>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

	return (
		<Fragment>
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="border-bottom pb-4 mb-4 d-md-flex justify-content-between align-items-center">
						<div className="mb-3 mb-md-0">
							<h1 className="mb-0 h2 fw-bold">Changelog</h1>
							<p className="mb-0">
								We’re constantly improving & updating Geeks. See the latest
								features and improvements.
							</p>
						</div>
					</div>
				</Col>
			</Row>

			
			<Version_01_00_00 />
		</Fragment>
	);
};

export default ChangeLog;
