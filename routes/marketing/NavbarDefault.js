import { v4 as uuid } from 'uuid';

const NavbarDefault = [
	{
		id: uuid(),
		menuitem: 'Browse',
		link: '#',
		children: [
			{
				id: uuid(),
				menuitem: 'Web Development',
				link: '#',
				children: [
					{
						id: uuid(),
						menuitem: 'Bootstrap',
						link: '/marketing/course-category'
					},
					{
						id: uuid(),
						menuitem: 'React',
						link: '/marketing/course-category'
					},
					{
						id: uuid(),
						menuitem: 'GraphQl',
						link: '/marketing/course-category'
					},
					{
						id: uuid(),
						menuitem: 'Gatsby',
						link: '/marketing/course-category'
					},
					{
						id: uuid(),
						menuitem: 'Grunt',
						link: '/marketing/course-category'
					},
					{
						id: uuid(),
						menuitem: 'Svelte',
						link: '/marketing/course-category'
					},
					{
						id: uuid(),
						menuitem: 'Meteor',
						link: '/marketing/course-category'
					},
					{
						id: uuid(),
						menuitem: 'HTML5',
						link: '/marketing/course-category'
					},
					{
						id: uuid(),
						menuitem: 'Angular',
						link: '/marketing/course-category'
					}
				]
			},
			{
				id: uuid(),
				menuitem: 'Design',
				link: '#',
				children: [
					{
						id: uuid(),
						menuitem: 'Graphic Design',
						link: '/marketing/course-category'
					},
					{
						id: uuid(),
						menuitem: 'Illustrator',
						link: '/marketing/course-category'
					},
					{
						id: uuid(),
						menuitem: 'UX / UI Design',
						link: '/marketing/course-category'
					},
					{
						id: uuid(),
						menuitem: 'Figma Design',
						link: '/marketing/course-category'
					},
					{
						id: uuid(),
						menuitem: 'Adobe XD',
						link: '/marketing/course-category'
					},
					{
						id: uuid(),
						menuitem: 'Sketch',
						link: '/marketing/course-category'
					},
					{
						id: uuid(),
						menuitem: 'Icon Design',
						link: '/marketing/course-category'
					},
					{
						id: uuid(),
						menuitem: 'Photoshop',
						link: '/marketing/course-category'
					}
				]
			},
			{
				id: uuid(),
				menuitem: 'Mobile App',
				link: '/marketing/course-category'
			},
			{
				id: uuid(),
				menuitem: 'IT Software',
				link: '/marketing/course-category'
			},
			{
				id: uuid(),
				menuitem: 'Marketing',
				link: '/marketing/course-category'
			},
			{
				id: uuid(),
				menuitem: 'Music',
				link: '/marketing/course-category'
			},
			{
				id: uuid(),
				menuitem: 'Life Style',
				link: '/marketing/course-category'
			},
			{
				id: uuid(),
				menuitem: 'Business',
				link: '/marketing/course-category'
			},
			{
				id: uuid(),
				menuitem: 'Photography',
				link: '/marketing/course-category'
			}
		]
	},
	{
		id: uuid(),
		menuitem: 'Landings',
		link: '#',
		children: [
			{
				id: uuid(),
				header: true,
				header_text: 'LANDINGS'
			},
			{
				id: uuid(),
				menuitem: 'Courses',
				link: '/marketing/landings/landing-courses'
			},
			{
				id: uuid(),
				menuitem: 'Lead Course',
				link: '/marketing/landings/course-lead'
			},
			{
				id: uuid(),
				menuitem: 'Request Access',
				link: '/marketing/landings/request-access'
			},
			{
				id: uuid(),
				menuitem: 'SaaS',
				link: '/marketing/landings/landing-sass'
			}
		]
	},
	{
		id: uuid(),
		menuitem: 'Pages',
		link: '#',
		children: [
			{
				id: uuid(),
				menuitem: 'Courses',
				link: '#',
				children: [
					{
						id: uuid(),
						menuitem: 'Course Single',
						link: '/marketing/courses/course-single'
					},
					{
						id: uuid(),
						menuitem: 'Course Single v2',
						link: '/marketing/courses/course-single2'
					},
					{
						id: uuid(),
						menuitem: 'Course Resume',
						link: '/marketing/courses/course-resume'
					},
					{
						id: uuid(),
						menuitem: 'Course Category',
						link: '/marketing/course-category'
					},
					{
						id: uuid(),
						menuitem: 'Course Checkout',
						link: '/marketing/courses/course-checkout'
					},
					{
						id: uuid(),
						menuitem: 'Course List/Grid',
						link: '/marketing/courses/course-filter-page'
					},
					{
						id: uuid(),
						menuitem: 'Add New Course',
						link: '/marketing/instructor/add-new-course'
					}
				]
			},
			{
				id: uuid(),
				menuitem: 'Paths',
				link: '#',
				children: [
					{
						id: uuid(),
						menuitem: 'Browse Path',
						link: '/marketing/courses/course-path'
					},
					{
						id: uuid(),
						menuitem: 'Path Single',
						link: '/marketing/courses/course-path-single'
					}
				]
			},
			{
				id: uuid(),
				menuitem: 'Blog',
				link: '#',
				children: [
					{
						id: uuid(),
						menuitem: 'Listing',
						link: '/blog'
					},
					{
						id: uuid(),
						menuitem: 'Article',
						link: '/blog/getting-started-the-web-app-javascript-in-2020'
					},
					{
						id: uuid(),
						menuitem: 'Category',
						link: '/blog/category'
					},
					{
						id: uuid(),
						menuitem: 'Sidebar',
						link: '/blog/sidebar'
					}
				]
			},
			{
				id: uuid(),
				menuitem: 'Career',
				link: '#',
				children: [
					{
						id: uuid(),
						menuitem: 'Overview',
						link: '/marketing/career/overview'
					},
					{
						id: uuid(),
						menuitem: 'Listing',
						link: '/marketing/career/career-list'
					},
					{
						id: uuid(),
						menuitem: 'Opening',
						link: '/marketing/career/career-single'
					}
				]
			},
			{
				id: uuid(),
				menuitem: 'Specialty',
				link: '#',
				children: [
					{
						id: uuid(),
						menuitem: 'Coming Soon',
						link: '/marketing/specialty/coming-soon'
					},
					{
						id: uuid(),
						menuitem: 'Error 404',
						link: '/404'
					},
					{
						id: uuid(),
						menuitem: 'Maintenance Mode',
						link: '/marketing/specialty/maintenance-mode'
					},
					{
						id: uuid(),
						menuitem: 'Terms & Conditions',
						link: '/marketing/specialty/terms-and-conditions'
					}
				]
			},
			{
				id: uuid(),
				divider: true
			},
			{
				id: uuid(),
				menuitem: 'About',
				link: '/about'
			},
			{
				id: uuid(),
				menuitem: 'Help Center',
				link: '#',
				badge: 'New',
				badgecolor: 'primary',
				children: [
					{
						id: uuid(),
						menuitem: 'Help Center',
						link: '/marketing/help-center/'
					},
					{
						id: uuid(),
						menuitem: "FAQ's",
						link: '/marketing/help-center/faq/'
					},
					{
						id: uuid(),
						menuitem: 'Guide',
						link: '/marketing/help-center/guide/'
					},
					{
						id: uuid(),
						menuitem: 'Guide Single',
						link: '/marketing/help-center/guide-single/getting-started/what-is-this-geeks-app'
					},
					{
						id: uuid(),
						menuitem: 'Support',
						link: '/marketing/help-center/support/'
					}
				]
			},
			{
				id: uuid(),
				menuitem: 'Pricing',
				link: '/marketing/pricing'
			},
			{
				id: uuid(),
				menuitem: 'Compare Plan',
				link: '/marketing/compare-plan'
			},
			{
				id: uuid(),
				menuitem: 'Contact',
				link: '/contact'
			}
		]
	},
	{
		id: uuid(),
		menuitem: 'Accounts',
		link: '#',
		children: [
			{
				id: uuid(),
				header: true,
				header_text: 'Accounts'
			},
			{
				id: uuid(),
				menuitem: 'Instructor',
				link: '#',
				children: [
					{
						id: uuid(),
						header: true,
						header_text: 'Instructor',
						description: 'Instructor dashboard for manage courses and earning.'
					},
					{
						id: uuid(),
						divider: true
					},
					{
						id: uuid(),
						menuitem: 'Dashboard',
						link: '/marketing/instructor/dashboard'
					},
					{
						id: uuid(),
						menuitem: 'Profile',
						link: '/marketing/instructor/profile'
					},
					{
						id: uuid(),
						menuitem: 'My Courses',
						link: '/marketing/instructor/my-courses'
					},
					{
						id: uuid(),
						menuitem: 'Orders',
						link: '/marketing/instructor/orders'
					},
					{
						id: uuid(),
						menuitem: 'Reviews',
						link: '/marketing/instructor/reviews'
					},
					{
						id: uuid(),
						menuitem: 'Students',
						link: '/marketing/instructor/students'
					},
					{
						id: uuid(),
						menuitem: 'Payouts',
						link: '/marketing/instructor/payouts'
					},
					{
						id: uuid(),
						menuitem: 'Earning',
						link: '/marketing/instructor/earnings'
					}
				]
			},
			{
				id: uuid(),
				menuitem: 'Students',
				link: '#',
				children: [
					{
						id: uuid(),
						header: true,
						header_text: 'Students',
						description:
							'Students dashboard to manage your courses and subscriptions.'
					},
					{
						id: uuid(),
						divider: true
					},
					{
						id: uuid(),
						menuitem: 'Dashboard',
						link: '/privatearea/dashboard'
					},
					{
						id: uuid(),
						menuitem: 'Subscriptions',
						link: '/privatearea/subscriptions'
					},
					{
						id: uuid(),
						menuitem: 'Payments',
						link: '/privatearea/payment'
					},
					{
						id: uuid(),
						menuitem: 'Billing Info',
						link: '/privatearea/billing-info'
					},
					{
						id: uuid(),
						menuitem: 'Invoice',
						link: '/privatearea/invoice'
					},
					{
						id: uuid(),
						menuitem: 'Invoice Details',
						link: '/privatearea/invoice-details'
					},
					{
						id: uuid(),
						menuitem: 'Bookmarked',
						link: '/privatearea/dashboard'
					},
					{
						id: uuid(),
						menuitem: 'My Path',
						link: '/privatearea/dashboard'
					}
				]
			},
			{
				id: uuid(),
				menuitem: 'Admin',
				link: '#',
				children: [
					{
						id: uuid(),
						header: true,
						header_text: 'Master Admin',
						description:
							'Master admin dashboard to manage courses, user, site setting, and work with amazing apps.'
					},
					{
						id: uuid(),
						divider: true
					},
					{
						id: uuid(),
						menuitem: 'Go to Dashboard',
						link: '/dashboard/overview',
						type: 'button'
					}
				]
			},
			{
				id: uuid(),
				divider: true
			},
			{
				id: uuid(),
				menuitem: 'Sign In',
				link: '/authentication/sign-in'
			},
			{
				id: uuid(),
				menuitem: 'Sign Up',
				link: '/authentication/sign-up'
			},
			{
				id: uuid(),
				menuitem: 'Forgot Password',
				link: '/authentication/forget-password'
			},
			{
				id: uuid(),
				menuitem: 'Edit Profile',
				link: '/privatearea/edit-profile'
			},
			{
				id: uuid(),
				menuitem: 'Security',
				link: '/privatearea/security'
			},
			{
				id: uuid(),
				menuitem: 'Social Profiles',
				link: '/privatearea/social-profiles'
			},
			{
				id: uuid(),
				menuitem: 'Notifications',
				link: '/privatearea/notifications'
			},
			{
				id: uuid(),
				menuitem: 'Privacy Settings',
				link: '/privatearea/profile-privacy'
			},
			{
				id: uuid(),
				menuitem: 'Delete Profile',
				link: '/privatearea/delete-profile'
			},
			{
				id: uuid(),
				menuitem: 'Linked Accounts',
				link: '/privatearea/linked-accounts'
			}
		]
	}
];

export default NavbarDefault;
