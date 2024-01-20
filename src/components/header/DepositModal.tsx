import classNames from 'classnames'
import { useState } from 'react'
import { LiaCcVisa } from 'react-icons/lia'
interface IDepositModal {
	closeModal: () => void
}

const DepositModal = ({ closeModal }: IDepositModal) => {
	const inputStyles =
		'bg-transparent border border-red-600 text-white rounded-md p-1 outline-none'
	const combinedInputStyles = classNames('w-20', inputStyles)
	const [cardHolder, setCardHolder] = useState('Unknown')
	const [cardNumber, setCardNumber] = useState('0000000000000000')
	const [cardMonth, setCardMonth] = useState('00')
	const [cardYear, setCardYear] = useState('00')
	const [cardCVV, setCardCVV] = useState('000')

	const formattedCardNumber = (cardNumber: string) => {
		const formatted = cardNumber.match(/\d{1,4}/g)
		const result = formatted?.join(' ')
		return result
	}

	return (
		<div className='fixed top-0 left-0 bg-black bg-opacity-75 h-screen w-full flex items-center justify-center'>
			<div className='bg-[#0f051e] mx-auto flex flex-col h-4/6 px-3 lg:w-[35%] md:w-[55%] sm:w-[70%] w-[90%]'>
				<div className='flex justify-end mt-1'>
					<button className='text-xl' onClick={closeModal}>
						x
					</button>
				</div>
				<div className='text-white flex flex-col items-center'>
					<div className='p-3 rounded-md border border-red-600 bg-[#1C1632] lg:w-[78%] md:w-[75%] sm:w-[78%] w-full'>
						<div className='text-5xl'>
							<LiaCcVisa />
						</div>
						<div className='card-number flex flex-col mt-4'>
							<span className='text-sm'>Card Number</span>
							<span className='mt-1 text-xl'>
								{formattedCardNumber(cardNumber)}
							</span>
						</div>
						<div className='flex justify-between mt-5'>
							<div className='flex flex-col'>
								<span>Card Holder</span>
								<span className='uppercase'>{cardHolder.split(' ')[0]}</span>
							</div>
							<div className='flex gap-6'>
								<div className='flex flex-col'>
									<span>Exp. Date</span>
									<span>
										{cardMonth}/{cardYear}
									</span>
								</div>
								<div className='flex flex-col'>
									<span>CCV</span>
									<span>{cardCVV}</span>
								</div>
							</div>
						</div>
					</div>
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
					<button className='bg-red-600 px-5 py-2 uppercase mt-5 rounded-md'>
						Deposit
					</button>
				</div>
			</div>
		</div>
	)
}

export default DepositModal
