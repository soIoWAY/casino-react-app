import NavLink from './NavLink'

const navLinks = [
	{
		title: 'Sports',
		path: '/sports',
	},
	{
		title: 'Slots',
		path: '/slots',
	},
	{
		title: 'Referral',
		path: '/referral',
	},
	{
		title: 'Contacts',
		path: '/contacts',
	},
]

const Navbar = () => {
	return (
		<nav className='mx-auto'>
			<div className=''>
				<ul className='flex flex-wrap md:space-x-16 md:text-lg'>
					{navLinks.map((link, index) => (
						<li key={index} className='hover:text-red-600 transition-all'>
							<NavLink href={link.path} title={link.title} />
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}

export default Navbar
