// import node module libraries
import React from 'react';
import Link from 'next/link';
import { Dropdown } from 'react-bootstrap';

// import sub custom components
import SendMessage from './SendMessage';

// import bootstrap icons
import { EmojiSmile, Paperclip, Mic } from 'react-bootstrap-icons';

const ChatFooter = () => {
	const ToggleActions = React.forwardRef(({ children, onClick }, ref) => (
		<Link href="#">
			<a className="text-link fs-4"
				ref={ref}
				onClick={(e) => {
					e.preventDefault();
					onClick(e);
				}}
			>
				{children}
			</a>
		</Link>
	));

	ToggleActions.displayName = 'ToggleActions';

	return (
		<div className="bg-light px-4 py-3 chat-footer">
			<SendMessage />
			<div className="mt-3 d-flex">
				<div>
					<Link href="#">
						<a className="text-link me-2">						
							<EmojiSmile size={16} />
						</a>
					</Link>
					<Link href="#">
						<a className="text-link me-2">						
							<Paperclip size={16} />
						</a>
					</Link>
					<Link href="#">
						<a className="text-link me-2">						
							<Mic size={16} />
						</a>
					</Link>
				</div>
				<Dropdown>
					<Dropdown.Toggle as={ToggleActions}>
						<i className="fe fe-more-horizontal"></i>
					</Dropdown.Toggle>
					<Dropdown.Menu as="ul">
						{['Action', 'Another action', 'Something else here'].map(
							(item, index) => {
								return (
									<Dropdown.Item eventKey="1" as="li" bsPrefix=" " key={index}>
										<Link href="#">
											<a className="dropdown-item">
												{item}
											</a>
										</Link>
									</Dropdown.Item>
								);
							}
						)}
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</div>
	);
};
export default ChatFooter;
