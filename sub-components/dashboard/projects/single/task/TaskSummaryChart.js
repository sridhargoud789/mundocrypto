// import node module libraries
import React from 'react';
import Link from 'next/link';
import { Card, Dropdown } from 'react-bootstrap';

// import widget/custom components
import { ApexCharts }  from 'widgets';

// import data files
import {
	TaskSummaryChartSeries,
	TaskSummaryChartOptions
} from 'data/charts/ChartData';

const TaskSummaryChart = () => {
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
			<Dropdown>
				<Dropdown.Toggle as={CustomToggle}>
					<i className="fe fe-more-vertical text-muted"></i>
				</Dropdown.Toggle>
				<Dropdown.Menu align="end">
					<Dropdown.Header>Settings</Dropdown.Header>
					<Dropdown.Item eventKey="1">Action</Dropdown.Item>
					<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
					<Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	};

	return (
		<Card>
			<Card.Body>
				<div className="d-flex justify-content-between">
					<div>
						<h4 className="mb-0">Task Summary</h4>
					</div>
					<div>
						<ActionMenu />
					</div>
				</div>
				<p className="mt-4 mb-0">New vs. Closed</p>
				{/* task summary chart  */}
				<ApexCharts
					options={TaskSummaryChartOptions}
					series={TaskSummaryChartSeries}
					type="line"
					height={350}
				/>
			</Card.Body>
		</Card>
	);
};
export default TaskSummaryChart;
