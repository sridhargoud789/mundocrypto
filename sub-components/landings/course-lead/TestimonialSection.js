// import node module libraries
import { Col, Container, Row } from 'react-bootstrap';

// import widget/custom components
import { SectionHeadingCenter, TestimonialColorCard } from 'widgets';

// import data files
import { TestimonialsList } from 'data/testimonials/TestimonialsList';

const TestimonialSection = () => {
	const title = 'What our learners are saying';
	const subtitle = 'Testimonials';
	const description = `12+ million people are already learning on mundocrypto`;

	return (
		<div className="py-8 py-lg-18 bg-light">
			<Container>
				<SectionHeadingCenter
					title={title}
					description={description}
					subtitle={subtitle}
				/>
				<Row>
					{TestimonialsList.slice(0, 2).map((item, index) => (
						<Col md={6} sm={12} key={index}>
							<TestimonialColorCard item={item} />
						</Col>
					))}
				</Row>
			</Container>
		</div>
	);
};
export default TestimonialSection;
