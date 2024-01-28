import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'
import {
	addUserBalance,
	fetchTotalGame,
	reduceUserBalance,
} from '../../../../utils/adminUtils'
import AdminForm from './AdminForm'
import AdminMenuRow from './AdminMenuRow'

interface IAdminMenu {
	closeAdmin: () => void
}

const AdminMenu = ({ closeAdmin }: IAdminMenu) => {
	const { db } = useSelector((state: RootState) => state.db)

	const [totalGames, setTotalGames] = useState({ wins: 0, loses: 0, total: 0 })

	const [formData, setFormData] = useState({ email: '', amount: 0 })

	useEffect(() => {
		fetchTotalGame(db, setTotalGames)
	}, [])

	const balanceFormSubmitHandler = (
		e: React.FormEvent<HTMLFormElement>,
		action: 'increase' | 'reduce'
	) => {
		e.preventDefault()
		if (formData.email && formData.amount) {
			if (action === 'increase') {
				addUserBalance(db, formData.email, formData.amount)
			} else {
				reduceUserBalance(db, formData.email, formData.amount)
			}
			setFormData({ email: '', amount: 0 })
		}
	}

	return (
		<div className='fixed top-0 left-0 bg-black bg-opacity-75 h-screen w-full flex items-center justify-center'>
			<div className='bg-[#0f051e] mx-auto flex flex-col sm:h-4/6 px-3 lg:w-[35%] md:w-[55%] sm:w-[70%] w-[90%]'>
				<div className='flex justify-end mt-1'>
					<button className='text-xl' onClick={closeAdmin}>
						x
					</button>
				</div>
				<div className='mt-3 p-2'>
					<AdminMenuRow title='Total Games' games={totalGames.total} />
					<AdminMenuRow title='Win Games' games={totalGames.wins} />
					<AdminMenuRow title='Lose Games' games={totalGames.loses} />
					<div className='flex flex-col items-center gap-2 border-t-2 border-red-600 pt-3'>
						<AdminForm
							onSubmit={e => balanceFormSubmitHandler(e, 'increase')}
							formData={formData}
							setFormData={setFormData}
							btnText='Increase Balance'
						/>
						<AdminForm
							onSubmit={e => balanceFormSubmitHandler(e, 'reduce')}
							formData={formData}
							setFormData={setFormData}
							btnText='Reduce Balance'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminMenu
