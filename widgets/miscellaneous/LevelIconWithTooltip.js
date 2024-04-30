// import node module libraries
import Link from 'next/link';

// import sub components
import LevelIcon from './LevelIcon';

// import tippy tooltip
import Tippy from '@tippyjs/react';
import 'tippy.js/animations/scale.css';

const LevelIconWithTooltip = ({ level }) => {
	if (level === 'Beginner' || level === 'Intermediate' || level === 'Advance') {
		return (
			<Link href="#">
				<Tippy content={level}>
					<a>
						<LevelIcon level={level} />
					</a>
				</Tippy>
			</Link>
		);
	} else {
		return '';
	}
};
export default LevelIconWithTooltip;
