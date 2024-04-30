// import node module libraries
import React from 'react';
import Link from 'next/link';
import { Card, Image, Dropdown } from 'react-bootstrap';

// import widget/custom components
import { GKTooltip } from 'widgets';

const TeamGridCard = ({ item }) => {
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<Link href="">
			<a className="text-muted text-decoration-none"
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
	CustomToggle.displayName = 'CustomToggle';

	const ActionMenu = () => {
		return (
			<Dropdown as="span">
				<Dropdown.Toggle as={CustomToggle}>
					<i className="fe fe-more-horizontal fs-4"></i>
				</Dropdown.Toggle>
				<Dropdown.Menu align="start">
					<Dropdown.Header>SETTINGS</Dropdown.Header>
					<Dropdown.Item eventKey="1">
						<i className="fe fe-trash-2 dropdown-item-icon"></i>Remove
					</Dropdown.Item>
					<Dropdown.Item eventKey="2">
						<i className="fe fe-edit dropdown-item-icon"></i>Edit
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	};

	return (
		<Card className="mb-4">
			<Card.Body>
				<div className="d-flex align-items-center">
					<div className="avatar avatar-lg">
						<Image src={item.image} className="rounded-circle" alt="" />
					</div>
					<div className="ms-3">
						<h4 className="mb-0">
							<Link href="#">
								<a className="text-inherit">
									{item.name}
								</a>
							</Link>
						</h4>
						<p className="mb-0 text-muted">{item.topic}</p>
					</div>
				</div>

				<div className="mt-4 lh-1">
					<GKTooltip
						toolTipText="Voice Call"
						className="me-3 text-muted"
					>
						<i className="fe fe-phone-call fs-4"></i>
					</GKTooltip>

					<GKTooltip
						toolTipText="Video Call"
						className="me-3 text-muted"
					>
						<i className="fe fe-video fs-4"></i>
					</GKTooltip>

					<ActionMenu />
				</div>
			</Card.Body>
		</Card>
	);
};

export default TeamGridCard;
