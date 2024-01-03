import { Firestore, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { fetchBalance, fetchStats } from '../utils/statsUtils'

import { CgProfile } from 'react-icons/cg'
import { PiPlusCircleFill } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeFirebase } from '../../firebase'
import { RootState } from '../store/store'
import Navbar from './Navbar'
import UserMenu from './userMenu/UserMenu'

const Header = () => {
	const { uid, email } = useSelector((state: RootState) => state.user)
	const [balance, setBalance] = useState<number | null>(null)
	const [wins, setWins] = useState<number | null>(null)
	const [loses, setLoses] = useState<number | null>(null)
	const [db, setDb] = useState<Firestore | null>(null)
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

	const openUserMenuHandler = () => {
		setIsUserMenuOpen(!isUserMenuOpen)
	}

	useEffect(() => {
		const firebaseApp = initializeFirebase()
		const firestore: Firestore = getFirestore(firebaseApp)
		setDb(firestore)
	}, [])

	useEffect(() => {
		if (db && uid) {
			fetchBalance(db, uid, setBalance)
			fetchStats(db, uid, setWins, setLoses)
		}
	}, [db, uid])

	const convetToNickname = (email: string | null) => {
		// hook
		if (email) {
			const index = email.indexOf('@')

			if (index !== -1) {
				return email.substring(0, index)
			} else {
				console.log('Індекс не знайдено')
			}
		}
	}
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
					<button
						className='text-3xl border-r-2 pr-2 cursor-pointer'
						onClick={openUserMenuHandler}
					>
						<CgProfile />
					</button>
					{isUserMenuOpen && (
						<div className='absolute shadow-md mt-3 right-26 top-14'>
							<UserMenu
								nickname={convetToNickname(email)}
								wins={wins}
								loses={loses}
							/>
						</div>
					)}
					<div className='font-semibold'>
						<span>{balance}₴</span>
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
