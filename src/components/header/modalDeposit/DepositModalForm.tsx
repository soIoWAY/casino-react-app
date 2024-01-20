import classNames from 'classnames'

interface IDepositModalForm {
	setCardHolder: (e: string) => void
	setCardNumber: (e: string) => void
	setCardMonth: (e: string) => void
	setCardYear: (e: string) => void
	setCardCVV: (e: string) => void
}

const DepositModalForm = ({
	setCardHolder,
	setCardNumber,
	setCardMonth,
	setCardYear,
	setCardCVV,
}: IDepositModalForm) => {
	const inputStyles =
		'bg-transparent border border-red-600 text-white rounded-md p-1 outline-none'
	const combinedInputStyles = classNames('w-20', inputStyles)

	return (
		<div className='flex flex-col items-center w-1/3 gap-3 mt-3'>
			<div className='flex flex-col gap-3 mt-3'>
				<input
					type='text'
					placeholder='Card Holder'
					className={inputStyles}
					onChange={e => setCardHolder(e.target.value)}
					maxLength={22}
				/>
				<input
					type='text'
					placeholder='Card Number'
					className={inputStyles}
					maxLength={16}
					onChange={e => setCardNumber(e.target.value)}
				/>
			</div>
			<div className='flex justify-between gap-4'>
				<input
					type='text'
					placeholder='Month'
					className={combinedInputStyles}
					maxLength={2}
					onChange={e => {
						setCardMonth(e.target.value)
					}}
				/>
				<input
					type='text'
					placeholder='Year'
					className={combinedInputStyles}
					maxLength={2}
					onChange={e => {
						setCardYear(e.target.value)
					}}
				/>
			</div>
			<div>
				<input
					type='text'
					placeholder='cvv'
					className={combinedInputStyles}
					maxLength={3}
					onChange={e => {
						setCardCVV(e.target.value)
					}}
				/>
			</div>
		</div>
	)
}

export default DepositModalForm
