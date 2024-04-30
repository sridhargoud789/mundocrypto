// import node module libraries
import React, {useState, useEffect} from 'react';
import Odometer from 'react-odometerjs';

const GKOdometer = ({ value }) => {
	const [odometerValue, setOdometerValue] = useState(0);

	useEffect(() => {
		setTimeout(() => {
		  setOdometerValue(300);
		}, 1000);
	  }, []);

	return <Odometer value={value} />;
};

export default GKOdometer;
