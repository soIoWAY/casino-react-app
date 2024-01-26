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
				<div className='mt-3 p-2'>
					<AdminMenuRow title='Total Games' games={totalGames.total} />
					<AdminMenuRow title='Win Games' games={totalGames.wins} />
					<AdminMenuRow title='Lose Games' games={totalGames.loses} />
					<div className='flex flex-col items-center gap-2 border-t-2 border-red-600 pt-3'>
						<form>
							<div className='flex flex-col items-center gap-2'>
								<div className='flex gap-2'>
									<input
										type='text'
										className='w-30 bg-transparent border-red-600 border-2 outline-none text-center'
										placeholder='email'
									/>
									<input
										type='number'
										className='w-14 bg-transparent border-red-600 border-2 outline-none text-center'
										placeholder='sum'
									/>
								</div>
								<button className='bg-red-600 w-36 h-9 rounded-md font-semibold'>
									Add balance
								</button>
							</div>
						</form>
						<button className='bg-red-600 w-40 h-10 rounded-md font-bold'>
							Remove balance
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminMenu
