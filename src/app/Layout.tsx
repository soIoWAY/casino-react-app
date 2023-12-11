import { ReactNode } from 'react'
import Header from '../components/Header'

interface LayoutProps {
	children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div>
			<header>
				<Header />
			</header>
			<main>{children}</main>
		</div>
	)
}

export default Layout
