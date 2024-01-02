interface IUserMenuProps {
	nickname: string | undefined
	wins: number | null
	loses: number | null
}

const UserMenu = ({ nickname, wins, loses }: IUserMenuProps) => {
	return (
		<div className='border-2 border-red-600 rounded-md px-4 md:px-6 py-3 bg-[#1C1632]'>
			<div className='user-menu_header border-b-2 pb-2'>
				<h4 className='font-bold'>{nickname}</h4>
			</div>
			<div className='user-menu_body flex flex-col justify-center items-center p-1'>
				<span>Wins: {wins}</span>
				<span>Loses: {loses}</span>
			</div>
			<div className='user-menu_footer border-t-2 font-bold text-center'>
				<button>
					Log <span className='text-red-600'>out</span>
				</button>
			</div>
		</div>
	)
}

export default UserMenu
