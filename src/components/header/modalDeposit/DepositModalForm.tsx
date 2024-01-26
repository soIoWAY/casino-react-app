import classNames from 'classnames'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { increaseBalance } from '../../../store/user/stats.slice'
import { updateWinBalances } from '../../../utils/statsUtils'

interface IDepositModalForm {
	setCardHolder: (e: string) => void
	setCardNumber: (e: string) => void
	setCardMonth: (e: string) => void
	setCardYear: (e: string) => void
	setCardCVV: (e: string) => void
	closeModal: () => void
}

const DepositModalForm = ({
	setCardHolder,
	setCardNumber,
	setCardMonth,
	setCardYear,
	setCardCVV,
	closeModal,
}: IDepositModalForm) => {
	const inputStyles =
		'bg-transparent border border-red-600 text-white rounded-md p-1 outline-none'
	const combinedInputStyles = classNames('w-20', inputStyles)

	const [depositSum, setDepositSum] = useState(0)

	const dispatch = useDispatch()

	const { db } = useSelector((state: RootState) => state.db)
	const { email } = useSelector((state: RootState) => state.user)

	const deposit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			dispatch(increaseBalance(depositSum))
			updateWinBalances(db, email, depositSum)
		} catch (err) {
			console.error(err)
		}

		setCardHolder('')
		setCardNumber('')
		setCardMonth('')
		setCardYear('')
		setCardCVV('')
		setDepositSum(0)
		closeModal()
	}

	return (
		<form
			className='flex flex-col items-center w-1/3 gap-3 mt-3'
			onSubmit={deposit}
		>
			<div className='flex flex-col gap-3 mt-3'>
				<input
					type='text'
					placeholder='Card Holder'
					className={inputStyles}
					onChange={e => setCardHolder(e.target.value)}
					required
					maxLength={22}
				/>
				<input
					type='text'
					placeholder='Card Number'
					className={inputStyles}
					maxLength={16}
					required
					onChange={e => setCardNumber(e.target.value)}
				/>
			</div>
			<div className='flex justify-between gap-4'>
				<input
					type='text'
					placeholder='Month'
					className={combinedInputStyles}
					maxLength={2}
					required
					onChange={e => {
						setCardMonth(e.target.value)
					}}
				/>
				<input
					type='text'
					placeholder='Year'
					className={combinedInputStyles}
					maxLength={2}
					required
					onChange={e => {
						setCardYear(e.target.value)
					}}
				/>
			</div>
			<div className='flex gap-2'>
				<input
					type='text'
					placeholder='cvv'
					className={combinedInputStyles}
					maxLength={3}
					required
					onChange={e => {
						setCardCVV(e.target.value)
					}}
				/>
				<input
					type='number'
					placeholder='sum'
					className={combinedInputStyles}
					max={999}
					required
					onChange={e => {
						setDepositSum(parseInt(e.target.value))
					}}
				/>
			</div>
			<button className='bg-red-600 px-5 py-2 uppercase mt-3 rounded-md'>
				Deposit
			</button>
		</form>
	)
}

export default DepositModalForm
