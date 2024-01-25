import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { setUser } from '../../../store/user/user.slice'
import { logoutUser } from '../../../utils/authUtils'
import AdminMenu from './adminMenu/AdminMenu'

interface IUserMenuProps {
	nickname: string | null
}

const UserMenu = ({ nickname }: IUserMenuProps) => {
	const [adminOpen, setAdminOpen] = useState(false)

	const dispatch = useDispatch()

	const logoutHandler = async () => {
		try {
			await logoutUser()
			dispatch(
				setUser({
					email: null,
					uid: null,
				})
			)
		} catch (err) {
			console.error(err)
		}
	}

	const openAdminHandler = () => {
		setAdminOpen(!adminOpen)
	}

	const { wins, loses } = useSelector((state: RootState) => state.stats)
	const { isAdmin } = useSelector((state: RootState) => state.admin)
	return (
		<div className='border-2 border-red-600 rounded-md px-2 md:px-5 py-3 bg-[#1C1632]'>
			<div className='user-menu_header border-b-2 pb-2'>
				<h4 className='font-bold'>{nickname}</h4>
			</div>
			<div className='user-menu_body flex flex-col justify-center items-center p-1'>
				<span>Wins: {wins !== null && wins > 999 ? '999' : wins}</span>
				<span>Loses: {loses !== null && loses > 999 ? '999' : loses}</span>
			</div>
			{isAdmin && (
				<div className='border-t-2 font-bold text-center pb-1'>
					<button onClick={openAdminHandler}>
						<span className='text-red-600'>Admin</span>
					</button>
				</div>
			)}
			<div className='user-menu_footer border-t-2 font-bold text-center'>
				<button onClick={logoutHandler}>
					Log <span className='text-red-600'>out</span>
				</button>
			</div>
			{adminOpen && <AdminMenu closeAdmin={openAdminHandler} />}
		</div>
	)
}

export default UserMenu
