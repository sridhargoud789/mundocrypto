// import node module libraries
import React, { Fragment } from 'react';
import Link from 'next/link';
import { Col, Row, Container, Breadcrumb } from 'react-bootstrap';

// import hooks
import useMounted from 'hooks/useMounted';

const HeaderBreadcrumb = ({ title, breadcrumb }) => {
	const hasMounted = useMounted();
	return (
		<Fragment>
			{/* page title  */}
			<div className="py-8 bg-colors-gradient">
				<Container>
					<Row>
						<Col md={{ offset: 2, span: 8 }} xs={12}>
							<h1 className="fw-bold mb-0 display-4">{title}</h1>
						</Col>
					</Row>
				</Container>
			</div>

			{/* breadcrumb  */}
			<div className="pt-3">
				<Container>
					<Row>
						<Col md={{ offset: 2, span: 8 }} xs={12}>
							<Breadcrumb>
								{hasMounted && breadcrumb.map((item, index) => {
									return (
											<Breadcrumb.Item active={index === breadcrumb.length - 1 ? true : false}>
											{index === breadcrumb.length - 1 ? (
												item.page
											) : (
												<Link href={item.link}><a>{item.page}</a></Link>
											)}
										</Breadcrumb.Item>
									) 
								})}
							</Breadcrumb>
						</Col>
					</Row>
				</Container>
			</div>
		</Fragment>
	);
};
export default HeaderBreadcrumb;
