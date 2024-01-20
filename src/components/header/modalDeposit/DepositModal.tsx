import { useState } from 'react'
import DepositModalCard from './DepositModalCard'
import DepositModalForm from './DepositModalForm'
interface IDepositModal {
	closeModal: () => void
}

const DepositModal = ({ closeModal }: IDepositModal) => {
	const [cardHolder, setCardHolder] = useState('Unknown')
	const [cardNumber, setCardNumber] = useState('0000000000000000')
	const [cardMonth, setCardMonth] = useState('00')
	const [cardYear, setCardYear] = useState('00')
	const [cardCVV, setCardCVV] = useState('000')

	return (
		<div className='fixed top-0 left-0 bg-black bg-opacity-75 h-screen w-full flex items-center justify-center'>
			<div className='bg-[#0f051e] mx-auto flex flex-col sm:h-4/6 px-3 lg:w-[35%] md:w-[55%] sm:w-[70%] w-[90%]'>
				<div className='flex justify-end mt-1'>
					<button className='text-xl' onClick={closeModal}>
						x
					</button>
				</div>
				<div className='text-white flex flex-col items-center'>
					<DepositModalCard
						cardHolder={cardHolder}
						cardNumber={cardNumber}
						cardMonth={cardMonth}
						cardYear={cardYear}
						cardCVV={cardCVV}
					/>
					<DepositModalForm
						setCardHolder={setCardHolder}
						setCardNumber={setCardNumber}
						setCardMonth={setCardMonth}
						setCardYear={setCardYear}
						setCardCVV={setCardCVV}
					/>
					<button className='bg-red-600 px-5 py-2 uppercase mt-5 rounded-md'>
						Deposit
					</button>
				</div>
			</div>
		</div>
	)
}

export default DepositModal
