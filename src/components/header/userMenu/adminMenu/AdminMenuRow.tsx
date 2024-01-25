interface IAdminMenuRow {
	games: number
	title: string
}

const AdminMenuRow = ({ games, title }: IAdminMenuRow) => {
	return (
		<div className='flex flex-col items-center border-t-2 border-red-600 pb-1'>
			<span className='text-red-600 text-xl'>{title}</span>
			<span>{games}</span>
		</div>
	)
}

export default AdminMenuRow
