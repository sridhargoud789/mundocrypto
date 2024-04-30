// import node module libraries
import { Fragment } from 'react';
import Link from 'next/link';

// import data files
import { Transcripts } from 'data/courses/CourseIndexData';

const TranscriptTab = () => {
	return (
		<Fragment>
			<h3 className="mb-3">Transcript from the "Introduction" Lesson</h3>
			{Transcripts.map((item, index) => (
				<div className="mb-4" key={index}>
					<h4>
						{item.title}{' '}
						<Link href="#"> 
							<a className="text-primary ms-2 h4">
								{item.duration}
							</a>
						</Link>
					</h4>
					<div
						dangerouslySetInnerHTML={{
							__html: item.description
						}}
					/>
				</div>
			))}
		</Fragment>
	);
};
export default TranscriptTab;
