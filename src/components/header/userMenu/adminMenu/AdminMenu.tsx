import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'
import { fetchTotalGame } from '../../../../utils/adminUtils'
import AdminMenuRow from './AdminMenuRow'

interface IAdminMenu {
	closeAdmin: () => void
}

const AdminMenu = ({ closeAdmin }: IAdminMenu) => {
	// const { uid } = useSelector((state: RootState) => state.user)
	const { db } = useSelector((state: RootState) => state.db)

	const [totalGames, setTotalGames] = useState({ wins: 0, loses: 0, total: 0 })

	useEffect(() => {
		fetchTotalGame(db, setTotalGames)
	}, [])

	return (
		<div className='fixed top-0 left-0 bg-black bg-opacity-75 h-screen w-full flex items-center justify-center'>
			<div className='bg-[#0f051e] mx-auto flex flex-col sm:h-4/6 px-3 lg:w-[35%] md:w-[55%] sm:w-[70%] w-[90%]'>
				<div className='flex justify-end mt-1'>
					<button className='text-xl' onClick={closeAdmin}>
						x
					</button>
				</div>
				<div>
					<AdminMenuRow title='Total Games' games={totalGames.total} />
					<AdminMenuRow title='Win Games' games={totalGames.wins} />
					<AdminMenuRow title='Lose Games' games={totalGames.loses} />
				</div>
			</div>
		</div>
	)
}

export default AdminMenu
