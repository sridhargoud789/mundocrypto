// import node module libraries
import { Fragment, useEffect } from 'react';
import FooterWithLinks from './footers/FooterWithLinks';
import NavbarHelpCenter from './navbars/NavbarHelpCenter';

const HelpCenterLayout = (props) => {	
	useEffect(() => {
		document.body.style.backgroundColor = 'white';
	});
	return (
		<Fragment>			
			<NavbarHelpCenter bg="transparent" className="navbar-transparent" />			
			{props.children}
			<FooterWithLinks />
		</Fragment>
	);
};

export default HelpCenterLayout;
