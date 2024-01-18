import classNames from 'classnames'
import { LiaCcVisa } from 'react-icons/lia'
interface IDepositModal {
	closeModal: () => void
}

const DepositModal = ({ closeModal }: IDepositModal) => {
	const inputStyles =
		'bg-transparent border border-red-600 text-white rounded-md p-1 outline-none'
	const combinedInputStyles = classNames('w-20', inputStyles)
	return (
		<div className='fixed top-0 left-0 bg-black bg-opacity-75 h-screen w-full flex items-center justify-center'>
			<div className='bg-[#0f051e] w-2/5 mx-auto flex flex-col h-3/5 px-3'>
				<div className='flex justify-end mt-1'>
					<button className='text-xl' onClick={closeModal}>
						x
					</button>
				</div>
				<div className='text-white flex flex-col items-center'>
					<div className='w-3/5 p-3 rounded-md border border-red-600 bg-[#1C1632]'>
						<div className='text-5xl'>
							<LiaCcVisa />
						</div>
						<div className='card-number flex flex-col mt-4'>
							<span className='text-sm'>Card Number</span>
							<span className='mt-1 text-xl'>0000 0000 0000 0000</span>
						</div>
						<div className='flex justify-between mt-5'>
							<div className='flex flex-col'>
								<span>Card Holder</span>
								<span>UNKNOWN UNKNOWN</span>
							</div>
							<div className='flex flex-col'>
								<span>Exp. Date</span>
								<span>00/00</span>
							</div>
							<div className='flex flex-col'>
								<span>CCV</span>
								<span>000</span>
							</div>
						</div>
					</div>
					<div className='flex flex-col items-center w-1/3 gap-3 mt-3'>
						<div className='flex flex-col gap-3 mt-3'>
							<input
								type='text'
								placeholder='Card Holder'
								className={inputStyles}
							/>
							<input
								type='text'
								placeholder='Card Number'
								className={inputStyles}
							/>
						</div>
						<div className='flex justify-between gap-4'>
							<input
								type='text'
								placeholder='Month'
								className={combinedInputStyles}
							/>
							<input
								type='text'
								placeholder='Year'
								className={combinedInputStyles}
							/>
						</div>
						<div>
							<input
								type='text'
								placeholder='cvv'
								className={combinedInputStyles}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DepositModal
