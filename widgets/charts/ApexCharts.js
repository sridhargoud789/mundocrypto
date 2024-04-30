// import node module libraries
import { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ApexCharts = (props) => {
	// ** Props
	const { options, series, width, type, height } = props;
	const [windowDefined, setWindowDefined] = useState('blue')
	useEffect(() => setWindowDefined(true), [])
	return (
		<Fragment>
			{windowDefined && <Chart options={options} series={series} type={type} width={width} height={height} />}		
		</Fragment>
	);
};

// ** PropTypes
ApexCharts.propTypes = {
	options: PropTypes.object.isRequired,
	series: PropTypes.array.isRequired,
	type: PropTypes.string.isRequired,
	width: PropTypes.number,
	height: PropTypes.number
};

// ** Default Props
ApexCharts.defaultProps = {
	type: 'line'
};

export default ApexCharts;
