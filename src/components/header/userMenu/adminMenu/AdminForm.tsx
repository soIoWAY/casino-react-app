interface IAdminForm {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	formData: { email: string; amount: number }
	setFormData: (data: { email: string; amount: number }) => void
	btnText: string
}

const AdminForm = ({
	onSubmit,
	formData,
	setFormData,
	btnText,
}: IAdminForm) => {
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className='flex flex-col items-center gap-2'>
					<div className='flex gap-2'>
						<input
							type='text'
							className='w-30 bg-transparent border-red-600 border-2 outline-none text-center'
							placeholder='email'
							value={formData.email}
							onChange={e =>
								setFormData({ ...formData, email: e.target.value })
							}
						/>
						<input
							type='number'
							className='w-14 bg-transparent border-red-600 border-2 outline-none text-center'
							placeholder='sum'
							value={formData.amount}
							onChange={e =>
								setFormData({ ...formData, amount: parseInt(e.target.value) })
							}
						/>
					</div>
					<button className='bg-red-600 w-36 h-9 rounded-md font-semibold'>
						{btnText}
					</button>
				</div>
			</form>
		</div>
	)
}

export default AdminForm
