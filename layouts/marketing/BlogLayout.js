// import node module libraries
import React, { Fragment, useEffect } from 'react';

// import layouts
import NavbarDefault from 'layouts/marketing/navbars/NavbarDefault';
import FooterWithLinks from 'layouts/marketing/footers/FooterWithLinks';

const BlogLayout = (props) => {
    
	useEffect(() => {
		document.body.style.backgroundColor = 'white';       
	});

	return (
		<Fragment>
			<NavbarDefault/>
			    {props.children}
			<FooterWithLinks />
		</Fragment>
	);
};

export default BlogLayout;
