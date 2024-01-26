import { Firestore, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchAdminStatus,
	fetchBalance,
	fetchStats,
} from '../../utils/statsUtils'

import { Link } from 'react-router-dom'
import { initializeFirebase } from '../../../firebase'
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
	const [win, setWin] = useState<number | null>(null)
	const [lose, setLose] = useState<number | null>(null)
	const [db, setDb] = useState<Firestore | null>(null)

	const dispatch = useDispatch()

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
		if (db && email) {
			fetchBalance(db, email, setBalance)
			fetchStats(db, email, setWin, setLose)
			fetchAdminStatus(db, email, dispatch)
		}
	}, [db, email])

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
