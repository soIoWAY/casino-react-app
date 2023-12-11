import { Link } from 'react-router-dom'
import Navbar from './Navbar'
const Header = () => {
	return (
		<div className='flex justify-between items-center w-full flex-wrap mx-auto px-6 md:px-12 py-6 bg-[#1C1632] shadow-lg'>
			<a href='/'>
				<h1 className='text-2xl font-bold'>
					777<span className='text-red-600'>Sergey</span>
				</h1>
			</a>
			<div className='hidden md:block'>
				<Navbar />
			</div>
			<div className='space-x-6'>
				<Link
					to='/login'
					className='bg-red-600 px-10 py-2 rounded-md text-white'
				>
					Log In
				</Link>
				<Link to='/register' className='border px-10 py-2 rounded-md'>
					Register
				</Link>
			</div>
		</div>
	)
}

export default Header
