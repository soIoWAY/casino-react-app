import { LiaCcVisa } from 'react-icons/lia'

interface IDepositModalCard {
	cardNumber: string
	cardHolder: string
	cardMonth: string
	cardYear: string
	cardCVV: string
}

const DepositModalCard = ({
	cardNumber,
	cardHolder,
	cardMonth,
	cardYear,
	cardCVV,
}: IDepositModalCard) => {
	const formattedCardNumber = (cardNumber: string) => {
		const formatted = cardNumber.match(/\d{1,4}/g)
		const result = formatted?.join(' ')
		return result
	}
	return (
		<div className='p-3 rounded-md border border-red-600 bg-[#1C1632] lg:w-[78%] md:w-[75%] sm:w-[78%] w-full'>
			<div className='text-5xl'>
				<LiaCcVisa />
			</div>
			<div className='card-number flex flex-col mt-4'>
				<span className='text-sm'>Card Number</span>
				<span className='mt-1 text-xl'>{formattedCardNumber(cardNumber)}</span>
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
	)
}

export default DepositModalCard
