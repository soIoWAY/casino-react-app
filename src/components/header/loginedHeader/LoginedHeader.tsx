import { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { PiPlusCircleFill } from 'react-icons/pi'
import useConvertEmail from '../../../hooks/useConvertEmail'
import Balance from '../Balance'
import UserMenu from '../userMenu/UserMenu'

interface ILoginedHeader {
	email: null | string
	openModal: () => void
}

const LoginedHeader = ({ email, openModal }: ILoginedHeader) => {
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

	const openUserMenuHandler = () => {
		setIsUserMenuOpen(!isUserMenuOpen)
	}

	const nickname = useConvertEmail(email)

	return (
		<div>
			<div className='flex gap-2 items-center'>
				<button
					className='text-3xl border-r-2 pr-2 cursor-pointer'
					onClick={openUserMenuHandler}
				>
					<CgProfile />
				</button>
				{isUserMenuOpen && (
					<div className='absolute shadow-md mt-3 right-26 top-14'>
						<UserMenu nickname={nickname} />
					</div>
				)}
				<div className='flex items-center'>
					<Balance />
					<button className='text-2xl text-red-600' onClick={openModal}>
						<PiPlusCircleFill />
					</button>
				</div>
			</div>
		</div>
	)
}

export default LoginedHeader
