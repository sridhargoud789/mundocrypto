// import node module libraries
import React from 'react';
import Link from 'next/link';
import { Col, Row, Card, ListGroup, Dropdown, Image } from 'react-bootstrap';

// import data files
import { allcourses } from 'data/courses/AllCoursesData';

const RecentCourses = ({ title }) => {
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<Link href="">
			<a ref={ref}
				onClick={(e) => {
					e.preventDefault();
					onClick(e);
				}}
			>
				{children}
			</a>
		</Link>
	));
	CustomToggle.displayName = 'CustomToggle';
	
	const ActionMenu = () => {
		return (
			<div>
				<Dropdown>
					<Dropdown.Toggle as={CustomToggle}>
						<i className="fe fe-more-vertical text-muted"></i>
					</Dropdown.Toggle>
					<Dropdown.Menu align="end">
						<Dropdown.Header>SETTINGS</Dropdown.Header>
						<Dropdown.Item eventKey="1">
							<i className="fe fe-edit dropdown-item-icon"></i> Edit
						</Dropdown.Item>
						<Dropdown.Item eventKey="2">
							<i className="fe fe-trash dropdown-item-icon"></i> Remove
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		);
	};

	return (
		<Card className="h-100">
			<Card.Header className="d-flex align-items-center justify-content-between card-header-height">
				<h4 className="mb-0">{title}</h4>
				<Link href="#">
					<a className="btn btn-outline-white btn-sm">
						View all
					</a>
				</Link>
			</Card.Header>
			<Card.Body>
				<ListGroup variant="flush">
					{allcourses.slice(0, 4).map((item, index) => (
						<ListGroup.Item
							className={`px-0 ${index === 0 ? 'pt-0' : ''}`}
							key={index}
						>
							<Row>
								<Col className="col-auto">
									<Link href="#">
										<a>
											<Image
												src={item.image}
												alt=""
												className="img-fluid rounded img-4by3-lg"
											/>
										</a>
									</Link>
								</Col>
								<Col className="ps-0">
									<Link href="#">
										<a><h5 className="text-primary-hover">{item.title}</h5></a>
									</Link>
									<div className="d-flex align-items-center">
										<Image
											src={item.instructor_image}
											alt=""
											className="rounded-circle avatar-xs me-2"
										/>
										<span className="fs-6">{item.instructor_name}</span>
									</div>
								</Col>
								<Col className="col-auto">
									<ActionMenu />
								</Col>
							</Row>
						</ListGroup.Item>
					))}
				</ListGroup>
			</Card.Body>
		</Card>
	);
};
export default RecentCourses;
