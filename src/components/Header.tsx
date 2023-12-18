import { CgProfile } from 'react-icons/cg'
import { PiPlusCircleFill } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../store/store'
import Navbar from './Navbar'
const Header = () => {
	const { email, uid } = useSelector((state: RootState) => state.user)

	// const convetToNickname = (email: string | null) => {
	// 	if (email) {
	// 		const index = email.indexOf('@')

	// 		if (index !== -1) {
	// 			return email.substring(0, index)
	// 		} else {
	// 			console.log('Індекс не знайдено')
	// 		}
	// 	}
	// }
	return (
		<div className='flex justify-between items-center w-full flex-wrap mx-auto px-6 md:px-12 py-6 bg-[#1C1632] shadow-lg'>
			<Link to='/'>
				<h1 className='text-2xl font-bold'>
					7<span className='text-red-600'>Kings</span>
				</h1>
			</Link>
			<div className='hidden md:block'>
				<Navbar />
			</div>
			{uid ? (
				<div className='flex gap-2 items-center'>
					<div className='text-3xl border-r-2  pr-2'>
						<CgProfile />
					</div>
					<div className='font-semibold'>
						<span>94.34 ₴</span>
					</div>
					<button className='text-2xl text-red-600'>
						<PiPlusCircleFill />
					</button>
				</div>
			) : (
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
			)}
		</div>
	)
}

export default Header
