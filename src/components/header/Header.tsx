import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchAdminStatus,
	fetchBalance,
	fetchStats,
} from '../../utils/statsUtils'

import { Database, getDatabase } from '@firebase/database'
import { Link } from 'react-router-dom'
import { initializeFirebase } from '../../../firebase'
import { setAdmin } from '../../store/admin/admin.slice'
import { setDB } from '../../store/db/db.slice'
import { RootState } from '../../store/store'
import { setStats } from '../../store/user/stats.slice'
import Navbar from './Navbar'
import LoginedHeader from './loginedHeader/LoginedHeader'
import UnloginedHeader from './loginedHeader/UnloginedHeader'
import DepositModal from './modalDeposit/DepositModal'

const Header = () => {
	const { uid, email } = useSelector((state: RootState) => state.user)
	const [balance, setBalance] = useState<number | null>(null)
	const [userIsAdmin, setUserIsAdmin] = useState(null)
	const [userStats, setUserStats] = useState({ wins: null, loses: null })
	const [db, setDb] = useState<Database | null>(null)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setDB({ db: db }))
	}, [db, dispatch])

	useEffect(() => {
		const firebaseApp = initializeFirebase()
		const db: Database = getDatabase(firebaseApp)
		setDb(db)
	}, [])

	useEffect(() => {
		if (balance !== null) {
			dispatch(
				setStats({
					balances: balance,
					wins: userStats.wins,
					loses: userStats.loses,
				})
			)
			dispatch(setAdmin({ isAdmin: userIsAdmin }))
		}
	}, [dispatch, balance, userStats, userIsAdmin])

	useEffect(() => {
		if (uid) {
			fetchBalance(uid)
				.then(balance => {
					setBalance(balance)
				})
				.catch(error => {
					console.error(error)
				})

			fetchStats(uid)
				.then(statsData => {
					setUserStats({ wins: statsData.wins, loses: statsData.loses })
				})
				.catch(error => {
					console.error(error)
				})

			fetchAdminStatus(uid)
				.then(adminStatus => {
					setUserIsAdmin(adminStatus)
				})
				.catch(error => {
					console.error(error)
				})
		}
	}, [uid])

	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => {
		setIsModalOpen(true)
	}
	const closeModal = () => {
		setIsModalOpen(false)
	}
	return (
		<div className='flex justify-between items-center w-full flex-wrap mx-auto px-6 md:px-12 py-6 bg-[#1C1632] shadow-lg h-20'>
			<Link to='/'>
				<h1 className='text-2xl font-bold'>
					7<span className='text-red-600'>Kings</span>
				</h1>
			</Link>
			<div className='hidden md:block'>
				<Navbar />
			</div>
			{uid ? (
				<LoginedHeader email={email} openModal={openModal} />
			) : (
				<UnloginedHeader />
			)}
			{isModalOpen && <DepositModal closeModal={closeModal} />}
		</div>
	)
}

export default Header
