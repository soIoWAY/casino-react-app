import { Firestore, getFirestore } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBalance, fetchStats } from '../utils/statsUtils'

import { CgProfile } from 'react-icons/cg'
import { PiPlusCircleFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { initializeFirebase } from '../../firebase'
import useConvertEmail from '../hooks/useConvertEmail'
import { setDB } from '../store/db/db.slice'
import { RootState } from '../store/store'
import { setStats } from '../store/user/stats.slice'
import Navbar from './Navbar'
import UserMenu from './userMenu/UserMenu'

const Header = () => {
	const { uid, email } = useSelector((state: RootState) => state.user)
	const { wins, loses, balances } = useSelector(
		(state: RootState) => state.stats
	)
	const [balance, setBalance] = useState<number | null>(null)
	const [win, setWin] = useState<number | null>(null)
	const [lose, setLose] = useState<number | null>(null)
	const [db, setDb] = useState<Firestore | null>(null)
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

	const dispatch = useDispatch()

	const openUserMenuHandler = () => {
		setIsUserMenuOpen(!isUserMenuOpen)
	}

	useEffect(() => {
		dispatch(setDB({ db: db }))
	}, [db, dispatch])

	useEffect(() => {
		const firebaseApp = initializeFirebase()
		const firestore: Firestore = getFirestore(firebaseApp)
		setDb(firestore)
	}, [])

	useEffect(() => {
		dispatch(
			setStats({
				balances: balance,
				wins: win,
				loses: lose,
			})
		)
	}, [dispatch, balance, win, lose])

	useEffect(() => {
		if (db && uid) {
			fetchBalance(db, uid, setBalance)
			fetchStats(db, uid, setWin, setLose)
		}
	}, [db, uid])

	const nickname = useConvertEmail(email)

	const balanceRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (balanceRef.current) {
			const width = balanceRef.current.offsetWidth
			balanceRef.current.style.width = `${width}px`
		}
	}, [balances])

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
							<UserMenu nickname={nickname} wins={wins} loses={loses} />
						</div>
					)}
					<div className='flex items-center'>
						<div className='font-semibold inline-block mr-1' ref={balanceRef}>
							<span>{balances}₴</span>
						</div>
						<button className='text-2xl text-red-600'>
							<PiPlusCircleFill />
						</button>
					</div>
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
