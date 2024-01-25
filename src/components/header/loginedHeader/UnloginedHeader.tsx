import { Link } from 'react-router-dom'

const UnloginedHeader = () => {
	return (
		<div>
			<div className='space-x-6'>
				<Link
					to='/login'
					className='bg-red-600 px-6 md:px-8 py-2 rounded-md text-white'
				>
					Log In
				</Link>
				<Link
					to='/register'
					className='border px-6 md:px-8 py-2 rounded-md md:inline-block hidden'
				>
					Register
				</Link>
			</div>
		</div>
	)
}

export default UnloginedHeader
