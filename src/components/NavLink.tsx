interface INavLinkProps {
	title: string
	href: string
}

const NavLink = ({ title, href }: INavLinkProps) => {
	return (
		<div>
			<a href={href}>{title}</a>
		</div>
	)
}

export default NavLink
