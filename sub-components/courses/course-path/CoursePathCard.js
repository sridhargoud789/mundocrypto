// import node module libraries
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Image, Card } from 'react-bootstrap';

const CoursePathCard = ({ item }) => {
	return (
		<Card className="mb-4 card-hover">
			<div className="d-flex justify-content-between align-items-center p-4">
				<div className="d-flex">
					<Link href="/marketing/courses/course-path-single/">
						<a><Image src={item.logo} alt="" className="avatar-md" /></a>
					</Link>
					<div className="ms-3">
						<h4 className="mb-1">
							<Link href="/marketing/courses/course-path-single/">
								<a className="text-inherit">
									{item.title}
								</a>
							</Link>
						</h4>
						<p className="mb-0 fs-6">
							<span className="me-2">
								<span className="text-dark fw-medium">{item.courses} </span>
								Courses
							</span>
							<span>
								<span className="text-dark fw-medium">{item.hours} </span>
								Hours
							</span>
						</p>
					</div>
				</div>
			</div>
		</Card>
	);
};

// Typechecking With PropTypes
CoursePathCard.propTypes = {
	item: PropTypes.object.isRequired
};

export default CoursePathCard;
