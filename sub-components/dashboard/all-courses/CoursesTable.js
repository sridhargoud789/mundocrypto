// import node module libraries
import React, { Fragment, useMemo } from 'react';
import {
	useTable,
	useFilters,
	useGlobalFilter,
	usePagination
} from 'react-table';
import Link from 'next/link';
import { Col, Row, Button, Image, Dropdown, Table } from 'react-bootstrap';
import { XCircle, MoreVertical } from 'react-feather';

// import widget/custom components
import { GlobalFilter, Pagination  } from 'widgets';

// import custom components
import DotBadge from 'components/bootstrap/DotBadge';

const CoursesTable = ({ courses_data }) => {
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<Link href="#">
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
					<MoreVertical size="15px" className="text-secondary" />
				</Dropdown.Toggle>
				<Dropdown.Menu align="end">
					<Dropdown.Header>SETTINGS</Dropdown.Header>
					<Dropdown.Item eventKey="1">
						{' '}
						<XCircle size="18px" /> Reject with Feedback
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	};

	const columns = useMemo(
		() => [
			{ accessor: 'id', Header: 'ID', show: false },
			{
				accessor: 'title',
				Header: 'COURSES',
				Cell: ({ value, row }) => {
					return (
						<Link href="#">
							<a className="text-inherit" >
								<div className="d-lg-flex align-items-center">
									<div>
										<Image
											src={row.original.image}
											alt=""
											className="img-4by3-lg rounded"
										/>
									</div>
									<div className="ms-lg-3 mt-2 mt-lg-0">
										<h4 className="mb-1 text-primary-hover">{value}...</h4>
										<span className="text-inherit">
											{row.original.date_added}
										</span>
									</div>
								</div>
							</a>
						</Link>
					);
				}
			},
			{ accessor: 'date_added', Header: '', show: false },
			{
				accessor: 'instructor_name',
				Header: 'INSTRUCTOR',
				Cell: ({ value, row }) => {
					return (
						<div className="d-flex align-items-center">
							<Image
								src={row.original.instructor_image}
								alt=""
								className="rounded-circle avatar-xs me-2"
							/>
							<h5 className="mb-0">{value}</h5>
						</div>
					);
				}
			},
			{
				accessor: 'status',
				Header: 'STATUS',

				Cell: ({ value, row }) => {
					value = value.toLowerCase();
					return (
						<Fragment>
							<DotBadge
								bg={
									value === 'pending'
										? 'warning'
										: value === 'live'
										? 'success'
										: ''
								}
							></DotBadge>
							{value.charAt(0).toUpperCase() + value.slice(1)}
						</Fragment>
					);
				}
			},
			{
				accessor: 'action',
				Header: 'ACTION',
				Cell: ({ value }) => {
					if (value === 2) {
						return (
							<Fragment>
								<Button
									href="#"
									variant="outline"
									className="btn-outline-white btn-sm"
								>
									Reject
								</Button>{' '}
								<Button href="#" variant="success" className="btn-sm">
									Approved
								</Button>
							</Fragment>
						);
					}
					if (value === 1) {
						return (
							<Button href="#" variant="secondary" className="btn-sm">
								Change Status
							</Button>
						);
					}
				}
			},
			{
				accessor: 'shortcutmenu',
				Header: '',
				Cell: () => {
					return <ActionMenu />;
				}
			}
		],
		[]
	);

	const data = useMemo(() => courses_data, [courses_data]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		state,
		gotoPage,
		pageCount,
		prepareRow,
		setGlobalFilter
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageSize: 10,
				hiddenColumns: columns.map((column) => {
					if (column.show === false) return column.accessor || column.id;
					else return false;
				})
			}
		},
		useFilters,
		useGlobalFilter,
		usePagination
	);

	const { pageIndex, globalFilter } = state;

	return (
		<Fragment>
			<div className=" overflow-hidden">
				<Row>
					<Col lg={12} md={12} sm={12} className="mb-lg-0 mb-2 py-4 px-5 ">
						<GlobalFilter
							filter={globalFilter}
							setFilter={setGlobalFilter}
							placeholder="Search Course"
						/>
					</Col>
				</Row>
			</div>

			<div className="table-responsive border-0 overflow-y-hidden">
				<Table {...getTableProps()} className="text-nowrap">
					<thead className="table-light">
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>

			{/* Pagination @ Footer */}
			<Pagination
				previousPage={previousPage}
				pageCount={pageCount}
				pageIndex={pageIndex}
				gotoPage={gotoPage}
				nextPage={nextPage}
			/>
		</Fragment>
	);
};

export default CoursesTable;
