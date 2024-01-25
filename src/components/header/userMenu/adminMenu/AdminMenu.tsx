interface IAdminMenu {
	closeAdmin: () => void
}

const AdminMenu = ({ closeAdmin }: IAdminMenu) => {
	return (
		<div className='fixed top-0 left-0 bg-black bg-opacity-75 h-screen w-full flex items-center justify-center'>
			<div className='bg-[#0f051e] mx-auto flex flex-col sm:h-4/6 px-3 lg:w-[35%] md:w-[55%] sm:w-[70%] w-[90%]'>
				<div className='flex justify-end mt-1'>
					<button className='text-xl' onClick={closeAdmin}>
						x
					</button>
				</div>
			</div>
		</div>
	)
}

export default AdminMenu
