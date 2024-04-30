// import node module libraries
import React, { Fragment, useMemo } from 'react';
import Link from 'next/link';
import { Col, Row, Dropdown, Table, Card, Image } from 'react-bootstrap';
import { MoreVertical } from 'react-feather';
import {
	useTable,
	useFilters,
	useGlobalFilter,
	usePagination
} from 'react-table';

// import bootstrap icons
import {
	FileImage,
	FileWord,
	FileEarmarkSpreadsheet,
	FilePpt,
	FileText,
	FileEarmarkSlides,
	Exclamation
} from 'react-bootstrap-icons';

// import widget/custom components
import { GlobalFilter, Pagination  } from 'widgets';

// import custom components
import { Avatar } from 'components/bootstrap/Avatar';

// import data files
import { filesdata } from 'data/dashboard/projects/FilesData';

// import utility file
import { getFileExtension, getRandomNo } from 'helper/utils';

const FilesTable = () => {
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<Link href="">
			<a	ref={ref}
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
				<Dropdown.Menu align={'end'}>
					<Dropdown.Header>SETTINGS</Dropdown.Header>
					<Dropdown.Item eventKey="1">Action</Dropdown.Item>
					<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
					<Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	};

	const getFileTypeIcon = (value) => {
		let color = null;
		let extension = getFileExtension(value);
		extension === 'xlsx'
			? (color = 'primary')
			: extension === 'jpeg'
			? (color = 'info')
			: extension === 'doc'
			? (color = 'success')
			: extension === 'ppt'
			? (color = 'danger')
			: extension === 'txt'
			? (color = 'warning')
			: extension === 'mov'
			? (color = 'danger')
			: (color = 'danger');

		return (
			<div className={`icon-shape icon-lg rounded-3 bg-light-${color}`}>
				<Link href="#"><a>
					{extension === 'xlsx' ? (
						<FileEarmarkSpreadsheet size={24} className="text-primary" />
					) : extension === 'jpeg' ? (
						<FileImage size={24} className="text-info" />
					) : extension === 'doc' ? (
						<FileWord size={24} className="text-success" />
					) : extension === 'ppt' ? (
						<FilePpt size={24} className="text-danger" />
					) : extension === 'txt' ? (
						<FileText size={24} className="text-warning" />
					) : extension === 'mov' ? (
						<FileEarmarkSlides size={24} className="text-danger" />
					) : (
						<Exclamation size={24} className="text-danger" />
					)}</a>
				</Link>
			</div>
		);
	};

	const columns = useMemo(
		() => [
			{ accessor: 'id', Header: 'ID', show: false },
			{
				accessor: 'filename',
				Header: 'Name',
				Cell: ({ value }) => {
					return (
						<div className="d-flex align-items-center">
							{getFileTypeIcon(value)}
							<div className="ms-3">
								<h5 className="mb-0">
									<Link href="#">
										<a className="text-inherit">
											{value}
										</a>
									</Link>
								</h5>
							</div>
						</div>
					);
				}
			},

			{ accessor: 'filesize', Header: 'File Size' },
			{ accessor: 'date_modified', Header: 'MODIFIED' },
			{
				accessor: 'avatar',
				Header: 'UPLOADED BY',
				Cell: ({ value, row }) => {
					const bgColor = [
						'primary',
						'secondary',
						'info',
						'success',
						'danger',
						'warning',
						'danger',
						'dark'
					];
					return value === null ? (
						<Avatar
							size="sm"
							type="initial"
							name={row.original.uploadedby}
							className={`rounded-circle bg-${bgColor[getRandomNo(0, 7)]}`}
						/>
					) : (
						<Image
							src={value}
							alt=""
							className="rounded-circle avatar avatar-sm"
						/>
					);
				}
			},

			{
				accessor: 'options',
				Header: 'OPTIONS',
				Cell: () => {
					return (
						<Fragment>
							<Link href="#">
								<a className="text-muted text-primary-hover">
									<i className="fe fe-download fs-5"></i>
								</a>
							</Link>
							<Link href="#">
								<a className="text-muted text-primary-hover ms-3"
									data-template="six"
								>
									<i className="fe fe-link fs-5"></i>
								</a>
							</Link>
						</Fragment>
					);
				}
			},
			{
				accessor: 'action',
				Header: '',
				Cell: () => {
					return <ActionMenu />;
				}
			}
		],
		[]
	);

	const data = useMemo(() => filesdata, []);

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
			{/* search filename */}
			<Row>
				<Col xxl={2} lg={3} md={12} xs={12} className="mb-4">
					<GlobalFilter
						filter={globalFilter}
						setFilter={setGlobalFilter}
						placeholder="Search Filename"
					/>
				</Col>
			</Row>

			<Row>
				<Col lg={12} md={12} sm={12}>
					<Card>
						<Card.Header>
							<h4 className="mb-0">Files</h4>
						</Card.Header>
						<Card.Body className="p-0">
							<div className="table-responsive border-0 overflow-y-hidden">
								<Table {...getTableProps()} className="text-nowrap" hover>
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
															<td
																{...cell.getCellProps()}
																className="align-middle"
															>
																{cell.render('Cell')}
															</td>
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
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default FilesTable;
