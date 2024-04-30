// import node module libraries
import { Fragment } from 'react';
import Link from 'next/link';
import { Col, Row, Breadcrumb, Card } from 'react-bootstrap';

// import sub components
import { CreateProjectForm }  from 'sub-components';

const CreateProject = () => {
	return (
		<Fragment>
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
						<div className="mb-3 mb-md-0">
							<h1 className="mb-1 h2 fw-bold">Create New Project</h1>
							<Breadcrumb>
								<Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
								<Breadcrumb.Item href="#">Project</Breadcrumb.Item>
								<Breadcrumb.Item active>Create Project</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<div>
							<Link href="/dashboard/projects/grid">
								<a className="btn btn-primary">
									Back to Project
								</a>
							</Link>
						</div>
					</div>
				</Col>
			</Row>

			{/* create project form  */}
			<div className="py-6">
				{/* row */}
				<Row>
					<Col xl={{ offset: 3, span: 6 }} md={12} xs={12}>
						<Card>
							{/* card body */}
							<Card.Body className="p-lg-6">
								<CreateProjectForm />
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
		</Fragment>
	);
};

export default CreateProject;
