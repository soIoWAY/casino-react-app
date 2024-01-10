import { Link } from 'react-router-dom'

interface INavLinkProps {
	title: string
	href: string
}

const NavLink = ({ title, href }: INavLinkProps) => {
	return (
		<div>
			<Link to={href}>{title}</Link>
		</div>
	)
}

export default NavLink
